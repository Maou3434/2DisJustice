import * as THREE from 'three';

export function createBatteryPack() {
  const packGroup = new THREE.Group();

  // 1. Aluminum Chassis Tray
  const trayWidth = 4.2;
  const trayDepth = 2.8;
  const trayHeight = 0.4;

  const trayGeom = new THREE.BoxGeometry(trayWidth, trayHeight, trayDepth);
  const trayMat = new THREE.MeshStandardMaterial({
    color: 0x141822,
    metalness: 0.92,
    roughness: 0.25
  });
  const trayMesh = new THREE.Mesh(trayGeom, trayMat);
  trayMesh.position.y = -0.2;
  packGroup.add(trayMesh);

  // Coolant Manifold Tubes (Orange/Copper)
  const pipeMat = new THREE.MeshStandardMaterial({
    color: 0xD97706,
    metalness: 0.85,
    roughness: 0.3
  });
  const pipeGeom1 = new THREE.CylinderGeometry(0.08, 0.08, trayWidth + 0.3, 16);
  const pipe1 = new THREE.Mesh(pipeGeom1, pipeMat);
  pipe1.rotation.z = Math.PI / 2;
  pipe1.position.set(0, -0.15, trayDepth / 2 + 0.08);
  packGroup.add(pipe1);

  const pipe2 = pipe1.clone();
  pipe2.position.set(0, -0.15, -trayDepth / 2 - 0.08);
  packGroup.add(pipe2);

  // 2. Matrix of Cylindrical Battery Cells with PINN Thermal Gradients
  const rows = 6;
  const cols = 10;
  const cellRadius = 0.14;
  const cellHeight = 0.75;
  const spacingX = trayWidth / (cols + 1);
  const spacingZ = trayDepth / (rows + 1);

  const cellGeom = new THREE.CylinderGeometry(cellRadius, cellRadius, cellHeight, 16);

  // Array to hold cell meshes for thermal pulsing
  const cells = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = -trayWidth / 2 + (c + 1) * spacingX;
      const z = -trayDepth / 2 + (r + 1) * spacingZ;

      // Distance from core hotspot
      const distFromCenter = Math.sqrt((x * x) / 3.0 + (z * z));
      const normalizedHeat = Math.max(0, 1 - distFromCenter / 1.6); // 1 = hotspot, 0 = cool perimeter

      // Interpolate color from cool Cyan/Blue (25°C) to incandescent Amber/Red (65°C)
      const color = new THREE.Color();
      if (normalizedHeat < 0.4) {
        color.setHSL(0.55 - normalizedHeat * 0.3, 0.9, 0.45); // Blue to Greenish
      } else if (normalizedHeat < 0.75) {
        color.setHSL(0.16 - (normalizedHeat - 0.4) * 0.3, 0.95, 0.55); // Yellow to Amber
      } else {
        color.setHSL(0.02, 1.0, 0.55); // Red Hotspot (65°C)
      }

      const cellMat = new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.15 + normalizedHeat * 0.4,
        metalness: 0.7,
        roughness: 0.3
      });

      const cellMesh = new THREE.Mesh(cellGeom, cellMat);
      cellMesh.position.set(x, cellHeight / 2 - 0.05, z);
      cellMesh.userData = { initialY: cellMesh.position.y, heat: normalizedHeat, phase: Math.random() * Math.PI };
      packGroup.add(cellMesh);
      cells.push(cellMesh);
    }
  }

  // 3. Neural Network Layer Line Overlay (Floating ODE constraint vectors)
  const lineMat = new THREE.LineBasicMaterial({
    color: 0xF59E0B,
    transparent: true,
    opacity: 0.45
  });

  const linePoints = [];
  for (let i = 0; i < 24; i++) {
    const startIdx = Math.floor(Math.random() * cells.length);
    const startCell = cells[startIdx];
    const startPos = startCell.position;

    linePoints.push(new THREE.Vector3(startPos.x, startPos.y + cellHeight / 2, startPos.z));
    linePoints.push(new THREE.Vector3(
      startPos.x + (Math.random() - 0.5) * 0.8,
      startPos.y + cellHeight / 2 + 0.6 + Math.random() * 0.4,
      startPos.z + (Math.random() - 0.5) * 0.8
    ));
  }

  const lineGeom = new THREE.BufferGeometry().setFromPoints(linePoints);
  const neuralLines = new THREE.LineSegments(lineGeom, lineMat);
  packGroup.add(neuralLines);

  // 4. Hotspot Telemetry Badge in 3D
  const badgeGeom = new THREE.RingGeometry(0.2, 0.24, 24);
  const badgeMat = new THREE.MeshBasicMaterial({
    color: 0xFF3D00,
    side: THREE.DoubleSide
  });
  const badge = new THREE.Mesh(badgeGeom, badgeMat);
  badge.rotation.x = Math.PI / 2;
  badge.position.set(0, cellHeight + 0.05, 0);
  packGroup.add(badge);

  packGroup.userData = { cells, neuralLines, badge };
  return packGroup;
}
