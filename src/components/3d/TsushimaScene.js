import * as THREE from 'three';
import { createKatana } from './KatanaModel.js';
import { MapleLeaves } from './MapleLeaves.js';

export class TsushimaScene {
  constructor(scene, camera) {
    this.scene = scene;
    this.camera = camera;
    this.katana = null;
    this.mapleLeaves = null;
    this.sparkles = null;
    this.clock = new THREE.Clock();

    this.init();
  }

  init() {
    // 1. High-Atmosphere Lighting
    this.ambientLight = new THREE.AmbientLight(0xF5EFE6, 0.9);
    this.scene.add(this.ambientLight);

    // Directional Sunlight / Moonlight
    this.directionalLight = new THREE.DirectionalLight(0xF5EFE6, 2.0);
    this.directionalLight.position.set(-5, 9, 7);
    this.scene.add(this.directionalLight);

    // Interactive Specular Cursor Follow Light
    this.glintLight = new THREE.PointLight(0xFFFFFF, 3.5, 16);
    this.glintLight.position.set(0, 1, 4);
    this.scene.add(this.glintLight);

    // Warm Cinnabar Rim Accent
    this.rimLight = new THREE.PointLight(0xC83226, 3.8, 20);
    this.rimLight.position.set(6, -2, 2);
    this.scene.add(this.rimLight);

    // 2. Centered 3D Katana
    this.katana = createKatana();
    this.katana.position.set(0.0, -0.9, -1.8);
    this.katana.rotation.set(0.12, 0.0, -0.04);
    this.katana.scale.set(1.2, 1.2, 1.2);
    this.scene.add(this.katana);

    // 3. 3D Maple Leaves with Real Assets & Interactive Wind
    this.mapleLeaves = new MapleLeaves(this.scene, 75);

    // 4. Subtle Golden Ember Sparkles
    const sparkleCount = 140;
    const sparkleGeom = new THREE.BufferGeometry();
    const sparklePos = new Float32Array(sparkleCount * 3);
    for (let i = 0; i < sparkleCount * 3; i += 3) {
      sparklePos[i] = (Math.random() - 0.5) * 32;
      sparklePos[i + 1] = (Math.random() - 0.5) * 18;
      sparklePos[i + 2] = (Math.random() - 0.5) * 12;
    }
    sparkleGeom.setAttribute('position', new THREE.BufferAttribute(sparklePos, 3));

    const sparkleMat = new THREE.PointsMaterial({
      color: 0xF59E0B,
      size: 0.055,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    this.sparkles = new THREE.Points(sparkleGeom, sparkleMat);
    this.scene.add(this.sparkles);
  }

  update(mouse, scrollOffset, scrollVelocity = 0) {
    const elapsedTime = this.clock.getElapsedTime();

    // 1. Update Leaves with Wind Physics
    if (this.mapleLeaves) {
      this.mapleLeaves.update(elapsedTime, mouse, scrollVelocity);
    }

    // 2. Interactive Centered 3D Katana with Real Specular Glint
    if (this.katana) {
      // Gentle breathing idle float
      const floatY = Math.sin(elapsedTime * 0.9) * 0.07;
      const floatRoll = Math.cos(elapsedTime * 0.7) * 0.02;

      // Mouse-guided tilt & parallax (immediate visual responsiveness!)
      const targetRotY = (mouse.x * 0.45);
      const targetRotX = 0.12 + (mouse.y * 0.35);

      this.katana.rotation.y += (targetRotY - this.katana.rotation.y) * 0.08;
      this.katana.rotation.x += (targetRotX - this.katana.rotation.x) * 0.08;
      this.katana.rotation.z = -0.04 + floatRoll + (mouse.x * 0.05);

      // Vertical position shifts cleanly on scroll
      this.katana.position.y = -0.9 + floatY - (scrollOffset * 3.0);

      // Point light follows cursor along blade length to cast bright specular glint
      this.glintLight.position.x = mouse.x * 6;
      this.glintLight.position.y = mouse.y * 3 + 1;
      this.glintLight.intensity = 3.0 + Math.abs(mouse.x) * 1.5;
    }

    // 3. Sparkle drift
    if (this.sparkles) {
      const pos = this.sparkles.geometry.attributes.position.array;
      for (let i = 0; i < pos.length; i += 3) {
        pos[i] += 0.008 + (scrollVelocity * 0.0005);
        pos[i + 1] -= 0.004 + (scrollVelocity * 0.001);
        if (pos[i] > 16) pos[i] = -16;
        if (pos[i + 1] < -9) pos[i + 1] = 9;
      }
      this.sparkles.geometry.attributes.position.needsUpdate = true;
    }
  }

  dispose() {
    this.scene.remove(this.ambientLight);
    this.scene.remove(this.directionalLight);
    this.scene.remove(this.glintLight);
    this.scene.remove(this.rimLight);

    if (this.katana) {
      this.scene.remove(this.katana);
      this.katana.traverse((child) => {
        if (child.isMesh) {
          child.geometry.dispose();
          if (child.material.isMaterial) child.material.dispose();
        }
      });
    }

    if (this.mapleLeaves) {
      this.mapleLeaves.dispose();
    }

    if (this.sparkles) {
      this.scene.remove(this.sparkles);
      this.sparkles.geometry.dispose();
      this.sparkles.material.dispose();
    }
  }
}
