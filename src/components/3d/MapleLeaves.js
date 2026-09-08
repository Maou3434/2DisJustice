import * as THREE from 'three';

export class MapleLeaves {
  constructor(scene, count = 75) {
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
      roughness: 0.5,
      metalness: 0.1
    });

    const goldMaterial = new THREE.MeshStandardMaterial({
      map: goldTexture,
      transparent: true,
      alphaTest: 0.08,
      side: THREE.DoubleSide,
      roughness: 0.5,
      metalness: 0.1
    });

    const geom = new THREE.PlaneGeometry(0.55, 0.55, 2, 2);

    for (let i = 0; i < this.count; i++) {
      const mat = Math.random() > 0.45 ? redMaterial : goldMaterial;
      const mesh = new THREE.Mesh(geom, mat);

      const scale = 0.6 + Math.random() * 0.8;
      mesh.scale.set(scale, scale, scale);

      mesh.position.set(
        (Math.random() - 0.5) * 32,
        (Math.random() * 36) - 24, // Spans Y from +12 down to -24 to cover full page scroll
        (Math.random() - 0.5) * 14
      );

      mesh.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );

      this.leafGroup.add(mesh);

      this.leaves.push({
        mesh,
        baseSpeedX: 0.015 + Math.random() * 0.02,
        baseSpeedY: -0.012 - Math.random() * 0.018,
        rotSpeedX: (Math.random() - 0.5) * 0.04,
        rotSpeedY: (Math.random() - 0.5) * 0.05,
        rotSpeedZ: (Math.random() - 0.5) * 0.03,
        swayPhase: Math.random() * Math.PI * 2,
        swayFreq: 0.9 + Math.random() * 1.4
      });
    }

    this.scene.add(this.leafGroup);
  }

  update(elapsedTime, mouse, scrollVelocity = 0) {
    // Gust factor from scroll velocity
    const gust = Math.min(scrollVelocity * 0.008, 0.08);

    for (let i = 0; i < this.leaves.length; i++) {
      const item = this.leaves[i];
      const m = item.mesh;

      // Tumbling rotation accelerates with wind gust
      m.rotation.x += item.rotSpeedX * (1 + gust * 5);
      m.rotation.y += item.rotSpeedY * (1 + gust * 5);
      m.rotation.z += item.rotSpeedZ * (1 + gust * 5);

      // Downward and horizontal wind drift
      m.position.x += item.baseSpeedX + gust * 1.5;
      m.position.y += item.baseSpeedY - gust * 2.0 + Math.sin(elapsedTime * item.swayFreq + item.swayPhase) * 0.006;

      // Subtle mouse interaction: leaves near mouse push outward
      const dx = m.position.x - (mouse.x * 12);
      const dy = m.position.y - (mouse.y * 8);
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 3.5) {
        const push = (3.5 - dist) * 0.004;
        m.position.x += dx * push;
        m.position.y += dy * push;
      }

      // Loop boundaries across full scroll range
      if (m.position.x > 20) m.position.x = -20;
      if (m.position.y < -26) {
        m.position.y = 12;
        m.position.x = (Math.random() - 0.5) * 32;
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
