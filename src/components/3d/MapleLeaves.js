import * as THREE from 'three';

export class MapleLeaves {
  constructor(scene, count = 75) {
    this.scene = scene;
    this.count = count;
    this.leafGroup = new THREE.Group();
    this.leaves = [];

    // Leaf Geometry (A 5-point stylized maple leaf shape)
    const leafShape = new THREE.Shape();
    leafShape.moveTo(0, 0);
    leafShape.lineTo(0.04, 0.08);
    leafShape.lineTo(0.12, 0.06);
    leafShape.lineTo(0.06, 0.14);
    leafShape.lineTo(0.14, 0.22);
    leafShape.lineTo(0.04, 0.20);
    leafShape.lineTo(0, 0.28); // Tip
    leafShape.lineTo(-0.04, 0.20);
    leafShape.lineTo(-0.14, 0.22);
    leafShape.lineTo(-0.06, 0.14);
    leafShape.lineTo(-0.12, 0.06);
    leafShape.lineTo(-0.04, 0.08);
    leafShape.closePath();

    const leafGeom = new THREE.ShapeGeometry(leafShape);

    // Two color palettes: Crimson Momiji & Golden Ginkgo
    const crimsonMat = new THREE.MeshStandardMaterial({
      color: 0xC83226,
      side: THREE.DoubleSide,
      roughness: 0.6,
      metalness: 0.1
    });

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xD97706,
      side: THREE.DoubleSide,
      roughness: 0.6,
      metalness: 0.1
    });

    for (let i = 0; i < this.count; i++) {
      const mat = Math.random() > 0.35 ? crimsonMat : goldMat;
      const mesh = new THREE.Mesh(leafGeom, mat);

      // Random scale and starting position
      const scale = 0.5 + Math.random() * 0.7;
      mesh.scale.set(scale, scale, scale);

      mesh.position.set(
        (Math.random() - 0.5) * 22,
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 8
      );

      mesh.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );

      this.leafGroup.add(mesh);

      this.leaves.push({
        mesh,
        rotSpeedX: (Math.random() - 0.5) * 0.04,
        rotSpeedY: (Math.random() - 0.5) * 0.05,
        rotSpeedZ: (Math.random() - 0.5) * 0.03,
        speedX: 0.015 + Math.random() * 0.02,
        speedY: -0.012 - Math.random() * 0.018,
        swayPhase: Math.random() * Math.PI * 2,
        swayFreq: 1.2 + Math.random() * 1.5
      });
    }

    this.scene.add(this.leafGroup);
  }

  update(elapsedTime) {
    for (let i = 0; i < this.leaves.length; i++) {
      const item = this.leaves[i];
      const m = item.mesh;

      // Tumbling rotation
      m.rotation.x += item.rotSpeedX;
      m.rotation.y += item.rotSpeedY;
      m.rotation.z += item.rotSpeedZ;

      // Downward & forward wind drift
      m.position.x += item.speedX;
      m.position.y += item.speedY + Math.sin(elapsedTime * item.swayFreq + item.swayPhase) * 0.006;

      // Boundary loop
      if (m.position.x > 12) m.position.x = -12;
      if (m.position.y < -7) {
        m.position.y = 7;
        m.position.x = (Math.random() - 0.5) * 20;
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
