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

  update(mouse, mouseVelocity = { vx: 0, vy: 0, speed: 0 }, scrollOffset = 0, scrollVelocity = 0) {
    const elapsedTime = this.clock.getElapsedTime();

    // 1. Update Leaves with Guiding Wind Physics
    if (this.mapleLeaves) {
      this.mapleLeaves.update(elapsedTime, mouse, mouseVelocity, scrollVelocity);
    }

    // 2. Cursor Follow Ambient Light with Speed Reactivity
    if (this.glintLight) {
      this.glintLight.position.x = mouse.x * 6.5;
      this.glintLight.position.y = mouse.y * 3.5 + 0.8;
      this.glintLight.intensity = 1.8 + Math.min((mouseVelocity.speed || 0) * 15, 2.0);
    }

    // 3. Interactive Ember Sparkle Drift
    if (this.sparkles) {
      const pos = this.sparkles.geometry.attributes.position.array;
      const cursor3DX = mouse.x * 7.0;
      const cursor3DY = mouse.y * 3.8;
      const speed = mouseVelocity.speed || 0;

      for (let i = 0; i < pos.length; i += 3) {
        // Base drift
        pos[i] += 0.008 + (scrollVelocity * 0.0005);
        pos[i + 1] -= 0.005 + (scrollVelocity * 0.001);

        // Wind draft interaction on embers
        if (speed > 0.002) {
          const dx = pos[i] - cursor3DX;
          const dy = pos[i + 1] - cursor3DY;
          const distSq = dx * dx + dy * dy;
          if (distSq < 16) {
            const factor = (1 - Math.sqrt(distSq) / 4.0) * speed * 3.5;
            pos[i] += (mouseVelocity.vx || 0) * factor;
            pos[i + 1] += (mouseVelocity.vy || 0) * factor;
          }
        }

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
