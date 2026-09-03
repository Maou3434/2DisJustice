import * as THREE from 'three';

export function createKatana() {
  const katanaGroup = new THREE.Group();

  // Materials
  const steelMaterial = new THREE.MeshStandardMaterial({
    color: 0xE8ECF0,
    metalness: 0.98,
    roughness: 0.18,
    envMapIntensity: 1.5
  });

  const edgeMaterial = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    metalness: 0.95,
    roughness: 0.1,
    emissive: 0x111111
  });

  const goldHabakiMaterial = new THREE.MeshStandardMaterial({
    color: 0xD4AF37,
    metalness: 0.85,
    roughness: 0.25
  });

  const ironTsubaMaterial = new THREE.MeshStandardMaterial({
    color: 0x181A1F,
    metalness: 0.85,
    roughness: 0.4
  });

  const tsukaRayskinMaterial = new THREE.MeshStandardMaterial({
    color: 0xF0EAD6,
    roughness: 0.8
  });

  const itoWrapMaterial = new THREE.MeshStandardMaterial({
    color: 0x12141A,
    roughness: 0.6
  });

  const crimsonAccentMaterial = new THREE.MeshStandardMaterial({
    color: 0xC83226,
    metalness: 0.4,
    roughness: 0.3
  });

  const woodStandMaterial = new THREE.MeshStandardMaterial({
    color: 0x1F1A17,
    roughness: 0.7
  });

  // 1. Curved Katana Blade (Nagasa)
  // Constructed with smooth curvature points along the spine
  const bladeLength = 4.2;
  const bladeSegments = 24;
  const bladePoints = [];
  const edgePoints = [];

  for (let i = 0; i <= bladeSegments; i++) {
    const t = i / bladeSegments;
    const x = t * bladeLength;
    // Sori (curvature) equation: gentle upward curve
    const y = Math.pow(t, 1.8) * 0.38;
    bladePoints.push(new THREE.Vector2(x, y));
    edgePoints.push(new THREE.Vector2(x, y - 0.14 * (1 - t * 0.4)));
  }

  // Extrude blade profile
  const bladeShape = new THREE.Shape();
  bladeShape.moveTo(0, -0.07);
  bladeShape.lineTo(bladeLength * 0.95, -0.05 + 0.34);
  bladeShape.lineTo(bladeLength, 0.38); // Kissaki point
  bladeShape.lineTo(bladeLength * 0.95, 0.05 + 0.34);
  bladeShape.lineTo(0, 0.07);
  bladeShape.closePath();

  const extrudeSettings = {
    steps: 1,
    depth: 0.024,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.01,
    bevelSegments: 3
  };

  const bladeGeom = new THREE.ExtrudeGeometry(bladeShape, extrudeSettings);
  bladeGeom.center();
  const bladeMesh = new THREE.Mesh(bladeGeom, steelMaterial);
  bladeMesh.position.set(0.8, 0.1, 0);
  bladeMesh.rotation.z = 0.04;
  katanaGroup.add(bladeMesh);

  // Hamon (Temper Line Edge)
  const hamonGeom = new THREE.BoxGeometry(bladeLength * 0.92, 0.02, 0.03);
  const hamonMesh = new THREE.Mesh(hamonGeom, edgeMaterial);
  hamonMesh.position.set(0.8, -0.06, 0);
  hamonMesh.rotation.z = 0.04;
  katanaGroup.add(hamonMesh);

  // 2. Habaki (Blade Collar)
  const habakiGeom = new THREE.BoxGeometry(0.24, 0.18, 0.07);
  const habakiMesh = new THREE.Mesh(habakiGeom, goldHabakiMaterial);
  habakiMesh.position.set(-1.18, -0.01, 0);
  katanaGroup.add(habakiMesh);

  // 3. Tsuba (Handguard)
  const tsubaGeom = new THREE.CylinderGeometry(0.48, 0.48, 0.05, 32);
  const tsubaMesh = new THREE.Mesh(tsubaGeom, ironTsubaMaterial);
  tsubaMesh.rotation.z = Math.PI / 2;
  tsubaMesh.position.set(-1.32, -0.02, 0);
  katanaGroup.add(tsubaMesh);

  // Decorative Cinnabar Ring on Tsuba
  const tsubaRingGeom = new THREE.TorusGeometry(0.32, 0.02, 16, 32);
  const tsubaRing = new THREE.Mesh(tsubaRingGeom, crimsonAccentMaterial);
  tsubaRing.rotation.y = Math.PI / 2;
  tsubaRing.position.set(-1.32, -0.02, 0);
  katanaGroup.add(tsubaRing);

  // 4. Tsuka (Hilt / Handle)
  const tsukaLength = 1.6;
  const tsukaGeom = new THREE.CylinderGeometry(0.1, 0.11, tsukaLength, 16);
  const tsukaMesh = new THREE.Mesh(tsukaGeom, tsukaRayskinMaterial);
  tsukaMesh.rotation.z = Math.PI / 2;
  tsukaMesh.position.set(-1.32 - tsukaLength / 2, -0.03, 0);
  katanaGroup.add(tsukaMesh);

  // Tsuka-Ito Wrap segments (Cross-braided cords)
  const wrapCount = 12;
  for (let i = 0; i < wrapCount; i++) {
    const wrapX = -1.38 - (i / wrapCount) * (tsukaLength - 0.15);
    const wrapGeom = new THREE.TorusGeometry(0.115, 0.018, 8, 16);
    const wrapMesh = new THREE.Mesh(wrapGeom, itoWrapMaterial);
    wrapMesh.rotation.y = Math.PI / 2;
    wrapMesh.position.set(wrapX, -0.03, 0);
    katanaGroup.add(wrapMesh);
  }

  // Kashira (Pommel Cap at end of hilt)
  const kashiraGeom = new THREE.CylinderGeometry(0.11, 0.09, 0.12, 16);
  const kashiraMesh = new THREE.Mesh(kashiraGeom, ironTsubaMaterial);
  kashiraMesh.rotation.z = Math.PI / 2;
  kashiraMesh.position.set(-1.32 - tsukaLength - 0.05, -0.03, 0);
  katanaGroup.add(kashiraMesh);

  // 5. Traditional Display Stand (Kake)
  const standBaseGeom = new THREE.BoxGeometry(3.6, 0.08, 0.9);
  const standBase = new THREE.Mesh(standBaseGeom, woodStandMaterial);
  standBase.position.set(0, -0.85, 0);
  katanaGroup.add(standBase);

  // Upright Arms with resting notches
  const arm1Geom = new THREE.BoxGeometry(0.12, 0.8, 0.35);
  const arm1 = new THREE.Mesh(arm1Geom, woodStandMaterial);
  arm1.position.set(-1.1, -0.45, 0);
  katanaGroup.add(arm1);

  const arm2 = arm1.clone();
  arm2.position.set(1.1, -0.45, 0);
  katanaGroup.add(arm2);

  // Gold emblem inlay on stand base
  const emblemGeom = new THREE.CylinderGeometry(0.16, 0.16, 0.02, 16);
  const emblem = new THREE.Mesh(emblemGeom, crimsonAccentMaterial);
  emblem.rotation.x = Math.PI / 2;
  emblem.position.set(0, -0.85, 0.46);
  katanaGroup.add(emblem);

  return katanaGroup;
}
