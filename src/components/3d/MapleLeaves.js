import * as THREE from 'three';

export class MapleLeaves {
  constructor(scene, count = 65) {
    this.scene = scene;
    this.count = count;
    this.leafGroup = new THREE.Group();
    this.leaves = [];

    const loader = new THREE.TextureLoader();
    const redTexture = loader.load('/images/momiji-leaf-red.png');
    const goldTexture = loader.load('/images/momiji-leaf-gold.png');

    const redMaterial = new THREE.MeshStandardMaterial({
      map: redTexture,
      transparent: true,
      alphaTest: 0.08,
      side: THREE.DoubleSide,
      roughness: 0.6,
      metalness: 0.1
    });

    const goldMaterial = new THREE.MeshStandardMaterial({
      map: goldTexture,
      transparent: true,
      alphaTest: 0.08,
      side: THREE.DoubleSide,
      roughness: 0.6,
      metalness: 0.1
    });

    // Square quad geometry with slight natural bend
    const geom = new THREE.PlaneGeometry(0.52, 0.52, 2, 2);

    for (let i = 0; i < this.count; i++) {
      const mat = Math.random() > 0.45 ? redMaterial : goldMaterial;
      const mesh = new THREE.Mesh(geom, mat);

      // Random scale for realistic depth variation
      const scale = 0.65 + Math.random() * 0.75;
      mesh.scale.set(scale, scale, scale);

      // Distribute widely across the entire screen and depth
      mesh.position.set(
        (Math.random() - 0.5) * 28,
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 10
      );

      mesh.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );

      this.leafGroup.add(mesh);

      this.leaves.push({
        mesh,
        rotSpeedX: (Math.random() - 0.5) * 0.035,
        rotSpeedY: (Math.random() - 0.5) * 0.045,
        rotSpeedZ: (Math.random() - 0.5) * 0.025,
        speedX: 0.012 + Math.random() * 0.018,
        speedY: -0.010 - Math.random() * 0.016,
        swayPhase: Math.random() * Math.PI * 2,
        swayFreq: 0.8 + Math.random() * 1.2
      });
    }

    this.scene.add(this.leafGroup);
  }

  update(elapsedTime) {
    for (let i = 0; i < this.leaves.length; i++) {
      const item = this.leaves[i];
      const m = item.mesh;

      // Organic tumbling rotation
      m.rotation.x += item.rotSpeedX;
      m.rotation.y += item.rotSpeedY;
      m.rotation.z += item.rotSpeedZ;

      // Wind drift: gentle horizontal and downward float with natural sway
      m.position.x += item.speedX;
      m.position.y += item.speedY + Math.sin(elapsedTime * item.swayFreq + item.swayPhase) * 0.005;

      // Loop smoothly within bounding box
      if (m.position.x > 15) m.position.x = -15;
      if (m.position.y < -8) {
        m.position.y = 8;
        m.position.x = (Math.random() - 0.5) * 26;
      }
    }
  }

  dispose() {
    this.scene.remove(this.leafGroup);
    this.leaves.forEach(({ mesh }) => {
      mesh.geometry.dispose();
    });
  }
}
