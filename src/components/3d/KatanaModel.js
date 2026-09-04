import * as THREE from 'three';

export function createKatana() {
  const katanaGroup = new THREE.Group();

  // Fine materials
  const steelMaterial = new THREE.MeshStandardMaterial({
    color: 0xF0F4F8,
    metalness: 0.98,
    roughness: 0.16,
    envMapIntensity: 2.0
  });

  const edgeMaterial = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    metalness: 0.95,
    roughness: 0.08,
    emissive: 0x222222
  });

  const goldHabakiMaterial = new THREE.MeshStandardMaterial({
    color: 0xD4AF37,
    metalness: 0.88,
    roughness: 0.22
  });

  const ironTsubaMaterial = new THREE.MeshStandardMaterial({
    color: 0x16181D,
    metalness: 0.85,
    roughness: 0.38
  });

  const tsukaRayskinMaterial = new THREE.MeshStandardMaterial({
    color: 0xF2EDE4,
    roughness: 0.85
  });

  const itoWrapMaterial = new THREE.MeshStandardMaterial({
    color: 0x14161C,
    roughness: 0.65
  });

  const crimsonAccentMaterial = new THREE.MeshStandardMaterial({
    color: 0xC83226,
    metalness: 0.45,
    roughness: 0.3
  });

  const woodStandMaterial = new THREE.MeshStandardMaterial({
    color: 0x1B1714,
    roughness: 0.75
  });

  // Balanced centering:
  // Center of the sword at (0, 0, 0): Tsuba is at x = -0.6
  // Blade extends from x = -0.48 to x = +3.3 (length ~3.8)
  // Tsuka (hilt) extends from x = -0.65 to x = -2.3 (length ~1.65)
  // Total sword length ~ 5.6; center of gravity is near x = +0.5.
  // We offset the whole sword mesh by -0.5 so its visual center is precisely x = 0.0!

  const swordOffset = -0.5;

  // 1. Curved Katana Blade (Nagasa)
  const bladeLength = 3.8;
  const bladeShape = new THREE.Shape();
  bladeShape.moveTo(0, -0.065);
  bladeShape.lineTo(bladeLength * 0.92, -0.045 + 0.30);
  bladeShape.lineTo(bladeLength, 0.34); // Sharp Kissaki tip
  bladeShape.lineTo(bladeLength * 0.92, 0.045 + 0.30);
  bladeShape.lineTo(0, 0.065);
  bladeShape.closePath();

  const extrudeSettings = {
    steps: 1,
    depth: 0.022,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.008,
    bevelSegments: 3
  };

  const bladeGeom = new THREE.ExtrudeGeometry(bladeShape, extrudeSettings);
  bladeGeom.center();
  const bladeMesh = new THREE.Mesh(bladeGeom, steelMaterial);
  // Center of blade positioned along the X-axis
  bladeMesh.position.set(bladeLength / 2 - 0.48 + swordOffset, 0.12, 0);
  bladeMesh.rotation.z = 0.035;
  katanaGroup.add(bladeMesh);

  // Hamon (Wavy Edge Reflection)
  const hamonGeom = new THREE.BoxGeometry(bladeLength * 0.94, 0.018, 0.028);
  const hamonMesh = new THREE.Mesh(hamonGeom, edgeMaterial);
  hamonMesh.position.set(bladeLength / 2 - 0.48 + swordOffset, -0.04, 0);
  hamonMesh.rotation.z = 0.035;
  katanaGroup.add(hamonMesh);

  // 2. Habaki (Blade Collar)
  const habakiGeom = new THREE.BoxGeometry(0.22, 0.17, 0.065);
  const habakiMesh = new THREE.Mesh(habakiGeom, goldHabakiMaterial);
  habakiMesh.position.set(-0.48 + swordOffset, -0.01, 0);
  katanaGroup.add(habakiMesh);

  // 3. Tsuba (Handguard Disc)
  const tsubaGeom = new THREE.CylinderGeometry(0.46, 0.46, 0.045, 32);
  const tsubaMesh = new THREE.Mesh(tsubaGeom, ironTsubaMaterial);
  tsubaMesh.rotation.z = Math.PI / 2;
  tsubaMesh.position.set(-0.62 + swordOffset, -0.015, 0);
  katanaGroup.add(tsubaMesh);

  // Decorative Cinnabar Ring on Tsuba
  const tsubaRingGeom = new THREE.TorusGeometry(0.30, 0.018, 16, 32);
  const tsubaRing = new THREE.Mesh(tsubaRingGeom, crimsonAccentMaterial);
  tsubaRing.rotation.y = Math.PI / 2;
  tsubaRing.position.set(-0.62 + swordOffset, -0.015, 0);
  katanaGroup.add(tsubaRing);

  // 4. Tsuka (Hilt / Handle)
  const tsukaLength = 1.6;
  const tsukaGeom = new THREE.CylinderGeometry(0.095, 0.105, tsukaLength, 16);
  const tsukaMesh = new THREE.Mesh(tsukaGeom, tsukaRayskinMaterial);
  tsukaMesh.rotation.z = Math.PI / 2;
  tsukaMesh.position.set(-0.62 - tsukaLength / 2 + swordOffset, -0.025, 0);
  katanaGroup.add(tsukaMesh);

  // Tsuka-Ito Wrap Segments
  const wrapCount = 12;
  for (let i = 0; i < wrapCount; i++) {
    const wrapX = -0.68 - (i / wrapCount) * (tsukaLength - 0.15) + swordOffset;
    const wrapGeom = new THREE.TorusGeometry(0.11, 0.016, 8, 16);
    const wrapMesh = new THREE.Mesh(wrapGeom, itoWrapMaterial);
    wrapMesh.rotation.y = Math.PI / 2;
    wrapMesh.position.set(wrapX, -0.025, 0);
    katanaGroup.add(wrapMesh);
  }

  // Kashira (Pommel Cap)
  const kashiraGeom = new THREE.CylinderGeometry(0.105, 0.085, 0.11, 16);
  const kashiraMesh = new THREE.Mesh(kashiraGeom, ironTsubaMaterial);
  kashiraMesh.rotation.z = Math.PI / 2;
  kashiraMesh.position.set(-0.62 - tsukaLength - 0.05 + swordOffset, -0.025, 0);
  katanaGroup.add(kashiraMesh);

  // 5. Ceremonial Wooden Display Stand (Centered below the sword)
  const standBaseGeom = new THREE.BoxGeometry(3.6, 0.07, 0.8);
  const standBase = new THREE.Mesh(standBaseGeom, woodStandMaterial);
  standBase.position.set(0, -0.80, 0);
  katanaGroup.add(standBase);

  // Upright Arms with resting notches
  const arm1Geom = new THREE.BoxGeometry(0.11, 0.72, 0.3);
  const arm1 = new THREE.Mesh(arm1Geom, woodStandMaterial);
  arm1.position.set(-1.1, -0.42, 0);
  katanaGroup.add(arm1);

  const arm2 = arm1.clone();
  arm2.position.set(1.1, -0.42, 0);
  katanaGroup.add(arm2);

  // Inkan Seal Emblem Inlay on Stand
  const emblemGeom = new THREE.CylinderGeometry(0.14, 0.14, 0.02, 16);
  const emblem = new THREE.Mesh(emblemGeom, crimsonAccentMaterial);
  emblem.rotation.x = Math.PI / 2;
  emblem.position.set(0, -0.80, 0.41);
  katanaGroup.add(emblem);

  return katanaGroup;
}
