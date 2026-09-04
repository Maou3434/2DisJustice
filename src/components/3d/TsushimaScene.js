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
    // 1. High-Atmosphere Lighting Setup
    this.ambientLight = new THREE.AmbientLight(0xF5EFE6, 0.85);
    this.scene.add(this.ambientLight);

    // Key Moonlight / Sunbeam from upper left
    this.directionalLight = new THREE.DirectionalLight(0xF5EFE6, 1.8);
    this.directionalLight.position.set(-4, 8, 6);
    this.scene.add(this.directionalLight);

    // Specular Follow Light (follows cursor horizontally along blade length)
    this.glintLight = new THREE.PointLight(0xFFFFFF, 3.0, 14);
    this.glintLight.position.set(0, 1, 4);
    this.scene.add(this.glintLight);

    // Warm Cinnabar Rim Accent
    this.rimLight = new THREE.PointLight(0xC83226, 3.2, 18);
    this.rimLight.position.set(5, -2, 2);
    this.scene.add(this.rimLight);

    // 2. Add Centered 3D Katana on Display Stand
    this.katana = createKatana();
    // Horizontally centered across the viewport
    this.katana.position.set(0.0, -0.85, -1.8);
    this.katana.rotation.set(0.10, 0.0, -0.035);
    this.katana.scale.set(1.15, 1.15, 1.15);
    this.scene.add(this.katana);

    // 3. Add Photorealistic 3D Maple Leaves (Momiji)
    this.mapleLeaves = new MapleLeaves(this.scene, 70);

    // 4. Subtle Golden Ember Sparkles
    const sparkleCount = 140;
    const sparkleGeom = new THREE.BufferGeometry();
    const sparklePos = new Float32Array(sparkleCount * 3);
    for (let i = 0; i < sparkleCount * 3; i += 3) {
      sparklePos[i] = (Math.random() - 0.5) * 28;
      sparklePos[i + 1] = (Math.random() - 0.5) * 16;
      sparklePos[i + 2] = (Math.random() - 0.5) * 12;
    }
    sparkleGeom.setAttribute('position', new THREE.BufferAttribute(sparklePos, 3));

    const sparkleMat = new THREE.PointsMaterial({
      color: 0xF59E0B,
      size: 0.05,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });
    this.sparkles = new THREE.Points(sparkleGeom, sparkleMat);
    this.scene.add(this.sparkles);
  }

  update(mouse, scrollOffset) {
    const elapsedTime = this.clock.getElapsedTime();

    // 1. Update 3D Maple Leaves
    if (this.mapleLeaves) {
      this.mapleLeaves.update(elapsedTime);
    }

    // 2. Interactive Centered 3D Katana
    if (this.katana) {
      // Gentle breathing elevation
      const floatY = Math.sin(elapsedTime * 0.9) * 0.06;
      const floatRoll = Math.cos(elapsedTime * 0.7) * 0.015;

      // Mouse-guided tilt & parallax
      const targetRotY = (mouse.x * 0.35);
      const targetRotX = 0.10 + (mouse.y * 0.25);

      this.katana.rotation.y += (targetRotY - this.katana.rotation.y) * 0.05;
      this.katana.rotation.x += (targetRotX - this.katana.rotation.x) * 0.05;
      this.katana.rotation.z = -0.035 + floatRoll;

      // Vertical position shifts cleanly on scroll
      this.katana.position.y = -0.85 + floatY - (scrollOffset * 2.5);

      // Point light tracks cursor along X-axis across the blade
      this.glintLight.position.x = mouse.x * 5;
      this.glintLight.position.y = mouse.y * 2 + 1;
    }

    // 3. Sparkle drift
    if (this.sparkles) {
      const pos = this.sparkles.geometry.attributes.position.array;
      for (let i = 0; i < pos.length; i += 3) {
        pos[i] += 0.007;
        pos[i + 1] -= 0.003;
        if (pos[i] > 14) pos[i] = -14;
        if (pos[i + 1] < -8) pos[i + 1] = 8;
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
