import * as THREE from 'three';

export class ArchitecturalScene {
  constructor(scene, camera) {
    this.scene = scene;
    this.camera = camera;
    this.terrainGroup = new THREE.Group();
    this.clock = new THREE.Clock();

    this.init();
  }

  init() {
    // 1. Technical Lighting
    this.ambientLight = new THREE.AmbientLight(0xF5F7FA, 0.5);
    this.scene.add(this.ambientLight);

    this.directionalLight = new THREE.DirectionalLight(0xF5F7FA, 1.4);
    this.directionalLight.position.set(6, 10, 8);
    this.scene.add(this.directionalLight);

    // Amber Telemetry Spotlight
    this.spotLight = new THREE.SpotLight(0xF59E0B, 3, 25, Math.PI / 4, 0.4);
    this.spotLight.position.set(-5, 6, 4);
    this.scene.add(this.spotLight);

    // 2. PINN Loss Surface Manifold (3D Wireframe Plane)
    const width = 12;
    const height = 12;
    const segments = 42;
    this.geometry = new THREE.PlaneGeometry(width, height, segments, segments);

    // Compute initial mathematical topography: ODE thermal manifold
    const pos = this.geometry.attributes.position;
    this.originalZ = new Float32Array(pos.count);

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      // Mathematical wave packet simulating ODE thermal gradients
      const dist = Math.sqrt(x * x + y * y);
      const z = Math.sin(x * 0.7) * Math.cos(y * 0.7) * 0.85 + Math.exp(-dist * 0.25) * 0.6;
      pos.setZ(i, z);
      this.originalZ[i] = z;
    }
    this.geometry.computeVertexNormals();

    // Technical Blueprint Material
    this.material = new THREE.MeshStandardMaterial({
      color: 0x12151C,
      emissive: 0x08090C,
      roughness: 0.2,
      metalness: 0.85,
      wireframe: true
    });

    this.terrainMesh = new THREE.Mesh(this.geometry, this.material);
    this.terrainGroup.add(this.terrainMesh);

    // Solid Substrate Base Underneath Wireframe
    const baseMat = new THREE.MeshBasicMaterial({
      color: 0x08090C,
      transparent: true,
      opacity: 0.8
    });
    this.baseMesh = new THREE.Mesh(this.geometry, baseMat);
    this.baseMesh.position.z = -0.05;
    this.terrainGroup.add(this.baseMesh);

    // Position & Orientation: Orthographic Isometric Angle
    this.terrainGroup.rotation.x = -Math.PI / 3;
    this.terrainGroup.rotation.z = Math.PI / 6;
    this.terrainGroup.position.set(3.2, -0.5, -2);
    this.scene.add(this.terrainGroup);
  }

  update(mouse, scrollOffset) {
    const elapsedTime = this.clock.getElapsedTime();

    // Undulate the topological PINN loss manifold gently
    if (this.geometry) {
      const pos = this.geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const wave = Math.sin(x * 0.8 + elapsedTime * 0.6) * Math.cos(y * 0.8 + elapsedTime * 0.4) * 0.18;
        pos.setZ(i, this.originalZ[i] + wave);
      }
      this.geometry.computeVertexNormals();
      this.geometry.attributes.position.needsUpdate = true;
    }

    // Dynamic camera / orientation response to mouse
    if (this.terrainGroup) {
      const targetRotX = -Math.PI / 3 + (mouse.y * 0.2);
      const targetRotZ = Math.PI / 6 + (mouse.x * 0.25);

      this.terrainGroup.rotation.x += (targetRotX - this.terrainGroup.rotation.x) * 0.05;
      this.terrainGroup.rotation.z += (targetRotZ - this.terrainGroup.rotation.z) * 0.05;
      this.terrainGroup.position.y = -0.5 - (scrollOffset * 1.8);
    }
  }

  dispose() {
    this.scene.remove(this.ambientLight);
    this.scene.remove(this.directionalLight);
    this.scene.remove(this.spotLight);
    if (this.terrainGroup) {
      this.scene.remove(this.terrainGroup);
      this.geometry.dispose();
      this.material.dispose();
      this.baseMesh.material.dispose();
    }
  }
}
