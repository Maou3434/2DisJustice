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
        extraVx: 0,
        extraVy: 0,
        extraRotX: 0,
        extraRotY: 0,
        extraRotZ: 0,
        swayPhase: Math.random() * Math.PI * 2,
        swayFreq: 0.8 + Math.random() * 1.2
      });
    }

    this.scene.add(this.leafGroup);
  }

  update(elapsedTime, mouse, mouseVelocity = { vx: 0, vy: 0, speed: 0 }, scrollVelocity = 0) {
    // Gust factor from scroll velocity
    const gust = Math.min(scrollVelocity * 0.008, 0.08);

    // 3D position of cursor projected into leaf plane (z ~ 0)
    const cursor3DX = mouse.x * 7.5;
    const cursor3DY = mouse.y * 4.2;
    const cursorSpeed = mouseVelocity.speed || 0;

    for (let i = 0; i < this.leaves.length; i++) {
      const item = this.leaves[i];
      const m = item.mesh;

      // Distance to cursor in 3D
      const dx = m.position.x - cursor3DX;
      const dy = m.position.y - cursor3DY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const radius = 4.2;

      if (dist < radius && dist > 0.05) {
        // Quadratic proximity falloff
        const influence = Math.pow(1 - dist / radius, 1.8);

        // 1. Directional Guiding Wind Draft: Leaves caught in cursor trajectory
        if (cursorSpeed > 0.003) {
          const windPush = Math.min(cursorSpeed * 2.8, 0.22);
          item.extraVx += mouseVelocity.vx * windPush * influence * 12;
          item.extraVy += mouseVelocity.vy * windPush * influence * 12;
        }

        // 2. Wake Dispersion Vortex: Leaves part around cursor path
        const wakeForce = (cursorSpeed * 0.08 + 0.012) * influence;
        item.extraVx += (dx / dist) * wakeForce;
        item.extraVy += (dy / dist) * wakeForce;

        // 3. Dynamic Flutter & Spin Turbulence
        const spinImpulse = (cursorSpeed * 1.5 + 0.04) * influence;
        item.extraRotX += (Math.random() - 0.5) * spinImpulse;
        item.extraRotY += (Math.random() - 0.5) * spinImpulse * 1.5;
        item.extraRotZ += (Math.random() - 0.5) * spinImpulse * 0.8;
      }

      // Smooth aerodynamic drag decay
      item.extraVx *= 0.92;
      item.extraVy *= 0.92;
      item.extraRotX *= 0.90;
      item.extraRotY *= 0.90;
      item.extraRotZ *= 0.90;

      // Apply rotations (ambient + gust + interactive turbulence)
      m.rotation.x += item.rotSpeedX * (1 + gust * 4) + item.extraRotX;
      m.rotation.y += item.rotSpeedY * (1 + gust * 4) + item.extraRotY;
      m.rotation.z += item.rotSpeedZ * (1 + gust * 4) + item.extraRotZ;

      // Apply translations (base drift + scroll gust + interactive wind draft)
      m.position.x += item.baseSpeedX + gust * 1.2 + item.extraVx;
      m.position.y += item.baseSpeedY - gust * 1.5 + item.extraVy + Math.sin(elapsedTime * item.swayFreq + item.swayPhase) * 0.006;

      // Continuous boundary cycling
      if (m.position.x > 16) m.position.x = -16;
      if (m.position.x < -16) m.position.x = 16;
      if (m.position.y < -7.0) {
        m.position.y = 7.5 + Math.random() * 2.0;
        m.position.x = (Math.random() - 0.5) * 28;
        item.extraVx = 0;
        item.extraVy = 0;
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
