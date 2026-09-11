import * as THREE from 'three';

export class MapleLeaves {
  constructor(scene, count = 80) {
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
      alphaTest: 0.05,
      depthWrite: false,
      side: THREE.DoubleSide,
      roughness: 0.45,
      metalness: 0.1
    });

    const goldMaterial = new THREE.MeshStandardMaterial({
      map: goldTexture,
      transparent: true,
      alphaTest: 0.05,
      depthWrite: false,
      side: THREE.DoubleSide,
      roughness: 0.45,
      metalness: 0.1
    });

    const geom = new THREE.PlaneGeometry(0.65, 0.65, 2, 2);

    for (let i = 0; i < this.count; i++) {
      const mat = Math.random() > 0.4 ? redMaterial : goldMaterial;
      const mesh = new THREE.Mesh(geom, mat);

      const scale = 0.7 + Math.random() * 0.7;
      mesh.scale.set(scale, scale, scale);

      mesh.position.set(
        (Math.random() - 0.5) * 28,
        (Math.random() * 14) - 6, // Spans visible Y between -6 and +8
        (Math.random() - 0.5) * 6
      );

      mesh.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );

      this.leafGroup.add(mesh);

      this.leaves.push({
        mesh,
        baseSpeedX: 0.012 + Math.random() * 0.018,
        baseSpeedY: -0.015 - Math.random() * 0.02,
        rotSpeedX: (Math.random() - 0.5) * 0.035,
        rotSpeedY: (Math.random() - 0.5) * 0.045,
        rotSpeedZ: (Math.random() - 0.5) * 0.025,
        swayPhase: Math.random() * Math.PI * 2,
        swayFreq: 0.8 + Math.random() * 1.2
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
      m.rotation.x += item.rotSpeedX * (1 + gust * 4);
      m.rotation.y += item.rotSpeedY * (1 + gust * 4);
      m.rotation.z += item.rotSpeedZ * (1 + gust * 4);

      // Downward and horizontal wind drift
      m.position.x += item.baseSpeedX + gust * 1.2;
      m.position.y += item.baseSpeedY - gust * 1.5 + Math.sin(elapsedTime * item.swayFreq + item.swayPhase) * 0.006;

      // Subtle mouse interaction: leaves near mouse push outward
      const dx = m.position.x - (mouse.x * 10);
      const dy = m.position.y - (mouse.y * 6);
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 3.2) {
        const push = (3.2 - dist) * 0.005;
        m.position.x += dx * push;
        m.position.y += dy * push;
      }

      // Continuous loop boundaries within camera visible frustum
      if (m.position.x > 15) m.position.x = -15;
      if (m.position.x < -15) m.position.x = 15;
      if (m.position.y < -6.5) {
        m.position.y = 7.0 + Math.random() * 2.0;
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
