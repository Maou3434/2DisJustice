import * as THREE from 'three';
import { createBatteryPack } from './BatteryModel.js';

export class ArchitecturalScene {
  constructor(scene, camera) {
    this.scene = scene;
    this.camera = camera;
    this.batteryPack = null;
    this.wireframeGrid = null;
    this.clock = new THREE.Clock();

    this.init();
  }

  init() {
    // 1. High-Contrast Technical Lighting
    this.ambientLight = new THREE.AmbientLight(0xF5F7FA, 0.7);
    this.scene.add(this.ambientLight);

    this.directionalLight = new THREE.DirectionalLight(0xF5F7FA, 1.8);
    this.directionalLight.position.set(6, 12, 8);
    this.scene.add(this.directionalLight);

    // Laser Telemetry Spot
    this.spotLight = new THREE.SpotLight(0xF59E0B, 4, 30, Math.PI / 4, 0.3);
    this.spotLight.position.set(-4, 8, 6);
    this.scene.add(this.spotLight);

    // Specular Cursor Follow Light
    this.cursorLight = new THREE.PointLight(0xF59E0B, 2.0, 10);
    this.cursorLight.position.set(0, 3, 4);
    this.scene.add(this.cursorLight);

    // 2. Add Realistic 3D EV Battery Pack Module (PINN Digital Twin)
    this.batteryPack = createBatteryPack();
    this.batteryPack.position.set(3.2, 0.1, -1.0);
    // Isometric angle presentation
    this.batteryPack.rotation.x = 0.55;
    this.batteryPack.rotation.y = -0.55;
    this.batteryPack.rotation.z = 0.12;
    this.batteryPack.scale.set(1.0, 1.0, 1.0);
    this.scene.add(this.batteryPack);

    // 3. Ground Orthographic Floor Grid (Blueprint Matrix)
    const gridHelper = new THREE.GridHelper(24, 24, 0xF59E0B, 0x1F2430);
    gridHelper.position.set(0, -3.5, 0);
    this.wireframeGrid = gridHelper;
    this.scene.add(this.wireframeGrid);
  }

  update(mouse, scrollOffset) {
    const elapsedTime = this.clock.getElapsedTime();

    if (this.batteryPack) {
      // Gentle breathing elevation
      const floatY = Math.sin(elapsedTime * 0.8) * 0.06;

      // Mouse-guided isometric rotation
      const targetRotY = -0.55 + (mouse.x * 0.4);
      const targetRotX = 0.55 + (mouse.y * 0.3);

      this.batteryPack.rotation.y += (targetRotY - this.batteryPack.rotation.y) * 0.05;
      this.batteryPack.rotation.x += (targetRotX - this.batteryPack.rotation.x) * 0.05;

      // Vertical position tied to scroll
      this.batteryPack.position.y = 0.1 + floatY - (scrollOffset * 2.2);

      // Pulse cell heights and emissive heat based on simulated ODE thermal wave
      const { cells, badge } = this.batteryPack.userData;
      if (cells) {
        for (let i = 0; i < cells.length; i++) {
          const cell = cells[i];
          const heat = cell.userData.heat;
          const pulse = Math.sin(elapsedTime * 2.5 + cell.userData.phase) * 0.04 * heat;
          cell.position.y = cell.userData.initialY + pulse;
        }
      }

      if (badge) {
        badge.rotation.z = elapsedTime * 0.8;
      }

      // Cursor light follow
      this.cursorLight.position.x = mouse.x * 4;
      this.cursorLight.position.y = mouse.y * 3 + 1;
    }

    if (this.wireframeGrid) {
      this.wireframeGrid.rotation.y = elapsedTime * 0.02;
    }
  }

  dispose() {
    this.scene.remove(this.ambientLight);
    this.scene.remove(this.directionalLight);
    this.scene.remove(this.spotLight);
    this.scene.remove(this.cursorLight);

    if (this.batteryPack) {
      this.scene.remove(this.batteryPack);
      this.batteryPack.traverse((child) => {
        if (child.isMesh) {
          child.geometry.dispose();
          if (child.material.isMaterial) child.material.dispose();
        }
      });
    }

    if (this.wireframeGrid) {
      this.scene.remove(this.wireframeGrid);
      this.wireframeGrid.geometry.dispose();
      this.wireframeGrid.material.dispose();
    }
  }
}
