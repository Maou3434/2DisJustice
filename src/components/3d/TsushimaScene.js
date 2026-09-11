import * as THREE from 'three';
import { MapleLeaves } from './MapleLeaves.js';

export class TsushimaScene {
  constructor(scene, camera) {
    this.scene = scene;
    this.camera = camera;
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

    // Subtle Specular Cursor Follow Light
    this.glintLight = new THREE.PointLight(0xFFFFFF, 1.8, 16);
    this.glintLight.position.set(0, 1, 4);
    this.scene.add(this.glintLight);

    // Warm Cinnabar Rim Accent
    this.rimLight = new THREE.PointLight(0xC83226, 2.5, 20);
    this.rimLight.position.set(6, -2, 2);
    this.scene.add(this.rimLight);

    // 2. 3D Maple Leaves with Real Assets & Interactive Wind
    this.mapleLeaves = new MapleLeaves(this.scene, 80);

    // 3. Subtle Cinnabar & Gold Ember Sparkles
    const sparkleCount = 120;
    const sparkleGeom = new THREE.BufferGeometry();
    const sparklePos = new Float32Array(sparkleCount * 3);
    for (let i = 0; i < sparkleCount * 3; i += 3) {
      sparklePos[i] = (Math.random() - 0.5) * 26;
      sparklePos[i + 1] = (Math.random() - 0.5) * 12;
      sparklePos[i + 2] = (Math.random() - 0.5) * 6;
    }
    sparkleGeom.setAttribute('position', new THREE.BufferAttribute(sparklePos, 3));

    const sparkleMat = new THREE.PointsMaterial({
      color: 0xE84B35,
      size: 0.065,
      transparent: true,
      opacity: 0.85,
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

    // 2. Cursor Follow Ambient Light
    if (this.glintLight) {
      this.glintLight.position.x = mouse.x * 6;
      this.glintLight.position.y = mouse.y * 3 + 1;
    }

    // 3. Sparkle drift
    if (this.sparkles) {
      const pos = this.sparkles.geometry.attributes.position.array;
      for (let i = 0; i < pos.length; i += 3) {
        pos[i] += 0.008 + (scrollVelocity * 0.0005);
        pos[i + 1] -= 0.005 + (scrollVelocity * 0.001);
        if (pos[i] > 14) pos[i] = -14;
        if (pos[i + 1] < -6) pos[i + 1] = 6;
      }
      this.sparkles.geometry.attributes.position.needsUpdate = true;
    }
  }

  dispose() {
    this.scene.remove(this.ambientLight);
    this.scene.remove(this.directionalLight);
    this.scene.remove(this.glintLight);
    this.scene.remove(this.rimLight);

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
