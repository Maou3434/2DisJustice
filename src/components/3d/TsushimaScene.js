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
    this.ambientLight = new THREE.AmbientLight(0xF4EFE6, 0.75);
    this.scene.add(this.ambientLight);

    // Key Moonlight / Sunbeam
    this.directionalLight = new THREE.DirectionalLight(0xF4EFE6, 1.6);
    this.directionalLight.position.set(5, 8, 6);
    this.scene.add(this.directionalLight);

    // Steel Glint Specular Follow Light (follows cursor)
    this.glintLight = new THREE.PointLight(0xFFFFFF, 2.5, 12);
    this.glintLight.position.set(0, 2, 4);
    this.scene.add(this.glintLight);

    // Warm Cinnabar Rim Accent
    this.rimLight = new THREE.PointLight(0xC83226, 3.0, 16);
    this.rimLight.position.set(-6, -2, 3);
    this.scene.add(this.rimLight);

    // 2. Add Realistic 3D Katana on Display Stand
    this.katana = createKatana();
    // Position katana prominently in upper-right / mid-ground
    this.katana.position.set(3.0, 0.3, -0.8);
    this.katana.rotation.y = -0.35;
    this.katana.rotation.x = 0.15;
    this.katana.scale.set(1.15, 1.15, 1.15);
    this.scene.add(this.katana);

    // 3. Add 3D Tumbling Maple Leaves (Momiji)
    this.mapleLeaves = new MapleLeaves(this.scene, 80);

    // 4. Subtle Golden Ember Sparkles
    const sparkleCount = 120;
    const sparkleGeom = new THREE.BufferGeometry();
    const sparklePos = new Float32Array(sparkleCount * 3);
    for (let i = 0; i < sparkleCount * 3; i += 3) {
      sparklePos[i] = (Math.random() - 0.5) * 22;
      sparklePos[i + 1] = (Math.random() - 0.5) * 14;
      sparklePos[i + 2] = (Math.random() - 0.5) * 10;
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

    // 2. Interactive 3D Katana Inspection with Mouse Parallax
    if (this.katana) {
      // Gentle breathing float
      const floatY = Math.sin(elapsedTime * 0.9) * 0.08;
      const floatRoll = Math.cos(elapsedTime * 0.6) * 0.02;

      // Mouse-guided tilt & specular reflection angle
      const targetRotY = -0.35 + (mouse.x * 0.45);
      const targetRotX = 0.15 + (mouse.y * 0.35);

      this.katana.rotation.y += (targetRotY - this.katana.rotation.y) * 0.06;
      this.katana.rotation.x += (targetRotX - this.katana.rotation.x) * 0.06;
      this.katana.rotation.z = floatRoll;

      // Vertical position shifts cleanly on scroll
      this.katana.position.y = 0.3 + floatY - (scrollOffset * 2.2);

      // Point light moves with cursor to create blade reflection glints!
      this.glintLight.position.x = mouse.x * 4;
      this.glintLight.position.y = mouse.y * 3 + 1;
    }

    // 3. Sparkle drift
    if (this.sparkles) {
      const pos = this.sparkles.geometry.attributes.position.array;
      for (let i = 0; i < pos.length; i += 3) {
        pos[i] += 0.008;
        pos[i + 1] -= 0.004;
        if (pos[i] > 11) pos[i] = -11;
        if (pos[i + 1] < -7) pos[i + 1] = 7;
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
