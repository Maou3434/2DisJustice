import * as THREE from 'three';

export class TsushimaScene {
  constructor(scene, camera) {
    this.scene = scene;
    this.camera = camera;
    this.particles = null;
    this.talismanGroup = new THREE.Group();
    this.particleCount = 650;
    this.particlePositions = new Float32Array(this.particleCount * 3);
    this.particleVelocities = [];
    this.clock = new THREE.Clock();

    this.init();
  }

  init() {
    // 1. Atmospheric Ambient & Directional Lighting
    this.ambientLight = new THREE.AmbientLight(0xF4EFE6, 0.6);
    this.scene.add(this.ambientLight);

    this.directionalLight = new THREE.DirectionalLight(0xF4EFE6, 1.2);
    this.directionalLight.position.set(5, 8, 5);
    this.scene.add(this.directionalLight);

    // Warm cinnabar rim light
    this.rimLight = new THREE.PointLight(0xC83226, 2.5, 15);
    this.rimLight.position.set(-4, -2, 2);
    this.scene.add(this.rimLight);

    // 2. Wind & Falling Ember Particles
    const particleGeometry = new THREE.BufferGeometry();
    for (let i = 0; i < this.particleCount; i++) {
      const i3 = i * 3;
      this.particlePositions[i3] = (Math.random() - 0.5) * 28;
      this.particlePositions[i3 + 1] = (Math.random() - 0.5) * 18;
      this.particlePositions[i3 + 2] = (Math.random() - 0.5) * 14;

      this.particleVelocities.push({
        x: 0.02 + Math.random() * 0.03,
        y: -0.015 - Math.random() * 0.02,
        z: (Math.random() - 0.5) * 0.01,
        swaySpeed: 1 + Math.random() * 2,
        swayOffset: Math.random() * Math.PI * 2
      });
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(this.particlePositions, 3));

    // Particle Material
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xC83226,
      size: 0.065,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });

    this.particles = new THREE.Points(particleGeometry, particleMaterial);
    this.scene.add(this.particles);

    // 3. Dimensional Ceremonial Talisman / Tsuba (Katana Guard)
    this.createTalisman();
    this.scene.add(this.talismanGroup);
  }

  createTalisman() {
    // Outer Guard Rim (Thick Torus)
    const rimGeom = new THREE.TorusGeometry(1.5, 0.08, 16, 64);
    const rimMat = new THREE.MeshStandardMaterial({
      color: 0x22242B,
      metalness: 0.92,
      roughness: 0.28,
    });
    const rimMesh = new THREE.Mesh(rimGeom, rimMat);
    this.talismanGroup.add(rimMesh);

    // Inner Disc with Central Cutout
    const discGeom = new THREE.RingGeometry(0.35, 1.48, 48);
    const discMat = new THREE.MeshStandardMaterial({
      color: 0x181A20,
      metalness: 0.88,
      roughness: 0.35,
      side: THREE.DoubleSide
    });
    const discMesh = new THREE.Mesh(discGeom, discMat);
    this.talismanGroup.add(discMesh);

    // Ornamental Ray Inlays (Cinnabar Inlays)
    const raysCount = 8;
    for (let i = 0; i < raysCount; i++) {
      const angle = (i / raysCount) * Math.PI * 2;
      const rayGeom = new THREE.BoxGeometry(0.04, 0.9, 0.06);
      const rayMat = new THREE.MeshStandardMaterial({
        color: 0xC83226,
        emissive: 0x551108,
        metalness: 0.5,
        roughness: 0.4
      });
      const rayMesh = new THREE.Mesh(rayGeom, rayMat);
      rayMesh.position.set(Math.cos(angle) * 0.85, Math.sin(angle) * 0.85, 0.02);
      rayMesh.rotation.z = angle + Math.PI / 2;
      this.talismanGroup.add(rayMesh);
    }

    // Position talisman in right background mid-plane
    this.talismanGroup.position.set(3.6, 0.2, -1.5);
    this.talismanGroup.rotation.x = 0.2;
    this.talismanGroup.rotation.y = -0.35;
  }

  update(mouse, scrollOffset) {
    const elapsedTime = this.clock.getElapsedTime();

    // 1. Wind Particle Flow
    if (this.particles) {
      const positions = this.particles.geometry.attributes.position.array;
      for (let i = 0; i < this.particleCount; i++) {
        const i3 = i * 3;
        const vel = this.particleVelocities[i];

        positions[i3] += vel.x;
        positions[i3 + 1] += vel.y + Math.sin(elapsedTime * vel.swaySpeed + vel.swayOffset) * 0.008;
        positions[i3 + 2] += vel.z;

        // Wrap around boundary bounds
        if (positions[i3] > 14) positions[i3] = -14;
        if (positions[i3 + 1] < -9) positions[i3] = 9;
      }
      this.particles.geometry.attributes.position.needsUpdate = true;
    }

    // 2. Talisman Floating & Mouse Tilt
    if (this.talismanGroup) {
      // Floating oscillation
      const floatY = Math.sin(elapsedTime * 0.8) * 0.15;
      const floatRotZ = Math.cos(elapsedTime * 0.5) * 0.04;

      // Mouse responsive parallax
      const targetRotX = 0.2 + (mouse.y * 0.4);
      const targetRotY = -0.35 + (mouse.x * 0.5);

      this.talismanGroup.rotation.x += (targetRotX - this.talismanGroup.rotation.x) * 0.05;
      this.talismanGroup.rotation.y += (targetRotY - this.talismanGroup.rotation.y) * 0.05;
      this.talismanGroup.rotation.z = floatRotZ;
      this.talismanGroup.position.y = 0.2 + floatY - (scrollOffset * 1.5);
    }
  }

  dispose() {
    this.scene.remove(this.ambientLight);
    this.scene.remove(this.directionalLight);
    this.scene.remove(this.rimLight);
    if (this.particles) {
      this.scene.remove(this.particles);
      this.particles.geometry.dispose();
      this.particles.material.dispose();
    }
    if (this.talismanGroup) {
      this.scene.remove(this.talismanGroup);
      this.talismanGroup.traverse((child) => {
        if (child.isMesh) {
          child.geometry.dispose();
          child.material.dispose();
        }
      });
    }
  }
}
