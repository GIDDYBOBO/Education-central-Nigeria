import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Layers, Eye, RotateCw, Sparkles, RefreshCw, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';

interface ThreeDNationalHubProps {
  onSelectRegion?: (regionName: string) => void;
}

export const ThreeDNationalHub: React.FC<ThreeDNationalHubProps> = ({ onSelectRegion }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  // Bottom dock state
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [explosionFactor, setExplosionFactor] = useState(0); // 0 (closed) to 1 (fully exploded)
  const [autoRotate, setAutoRotate] = useState(true);
  const [rotationSpeed, setRotationSpeed] = useState(1);
  const [activeFinish, setActiveFinish] = useState<'emerald' | 'gold' | 'slate'>('emerald');
  const [activeNodeName, setActiveNodeName] = useState<string>('National Central Core (Abuja)');

  // Mutable refs for Three.js render loop to avoid garbage collection
  const stateRef = useRef({
    explosion: 0,
    autoRotate: true,
    speed: 1,
    finish: 'emerald' as 'emerald' | 'gold' | 'slate',
  });

  // Keep stateRef in sync with React state
  useEffect(() => {
    stateRef.current.explosion = explosionFactor;
    stateRef.current.autoRotate = autoRotate;
    stateRef.current.speed = rotationSpeed;
    stateRef.current.finish = activeFinish;
  }, [explosionFactor, autoRotate, rotationSpeed, activeFinish]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || 540;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a1612); // Deep Nigerian dark spruce
    scene.fog = new THREE.FogExp2(0x0a1612, 0.035);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 7.5, 15.5);

    // 2. Renderer with safe WebGL fallback
    const isHeadless = navigator.webdriver || /HeadlessChrome/i.test(navigator.userAgent);
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    } catch (err) {
      console.warn('WebGL initialization fallback:', err);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(isHeadless ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isHeadless;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 3. Studio Environment Map (PMREMGenerator + RoomEnvironment)
    try {
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
      pmremGenerator.dispose();
    } catch (envErr) {
      console.warn('Studio environment generation fallback:', envErr);
    }

    // 4. Lighting Rig
    const warmKeyLight = new THREE.DirectionalLight(0xfff3db, 2.8);
    warmKeyLight.position.set(8, 14, 10);
    warmKeyLight.castShadow = !isHeadless;
    if (warmKeyLight.shadow) {
      warmKeyLight.shadow.mapSize.width = 1024;
      warmKeyLight.shadow.mapSize.height = 1024;
      warmKeyLight.shadow.camera.near = 0.5;
      warmKeyLight.shadow.camera.far = 30;
      warmKeyLight.shadow.camera.left = -9;
      warmKeyLight.shadow.camera.right = 9;
      warmKeyLight.shadow.camera.top = 9;
      warmKeyLight.shadow.camera.bottom = -9;
      warmKeyLight.shadow.bias = -0.0005;
      warmKeyLight.shadow.normalBias = 0.02;
    }
    scene.add(warmKeyLight);

    const coolHemiFill = new THREE.HemisphereLight(0x38bdf8, 0x052e16, 1.2);
    scene.add(coolHemiFill);

    const rimLight = new THREE.DirectionalLight(0x008751, 1.8);
    rimLight.position.set(-9, 5, -8);
    scene.add(rimLight);

    // 5. Procedural Textures & Materials
    // Create soft radial contact shadow texture via procedural 2D canvas
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext('2d')!;
    const grad = sCtx.createRadialGradient(128, 128, 10, 128, 128, 120);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
    grad.addColorStop(0.4, 'rgba(0, 10, 5, 0.4)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    sCtx.fillStyle = grad;
    sCtx.fillRect(0, 0, 256, 256);

    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    shadowTexture.colorSpace = THREE.SRGBColorSpace;

    // Contact shadow plane
    const shadowGeo = new THREE.PlaneGeometry(16, 16);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = 0.01;
    scene.add(shadowMesh);

    // Material definitions with varied roughness and metalness
    const materials = {
      baseStone: new THREE.MeshStandardMaterial({
        color: 0x111e18,
        roughness: 0.85,
        metalness: 0.15,
      }),
      goldTrim: new THREE.MeshPhysicalMaterial({
        color: 0xf59e0b,
        roughness: 0.22,
        metalness: 0.92,
        clearcoat: 0.4,
      }),
      emeraldCore: new THREE.MeshPhysicalMaterial({
        color: 0x008751,
        roughness: 0.18,
        metalness: 0.35,
        transmission: 0.65,
        thickness: 1.2,
        ior: 1.52,
      }),
      wireframeHolo: new THREE.MeshBasicMaterial({
        color: 0x34d399,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      }),
      nodeGlow: new THREE.MeshStandardMaterial({
        color: 0x10b981,
        emissive: 0x047857,
        emissiveIntensity: 0.6,
        roughness: 0.3,
        metalness: 0.7,
      }),
      satelliteGold: new THREE.MeshStandardMaterial({
        color: 0xfbbf24,
        roughness: 0.25,
        metalness: 0.85,
      })
    };

    // 6. Assemble Composite 3-12 Part Procedural Monument (`THREE.Group`)
    const hubGroup = new THREE.Group();
    hubGroup.position.set(0, 0, 0);
    scene.add(hubGroup);

    // --- Sub-assembly 1: Hexagonal Tiered Foundation Dais ---
    const foundationGroup = new THREE.Group();
    hubGroup.add(foundationGroup);

    // Primary silhouette: Tier 1 Hexagonal Plinth
    const plinthGeo = new THREE.CylinderGeometry(5.8, 6.4, 0.5, 6);
    const plinthMesh = new THREE.Mesh(plinthGeo, materials.baseStone);
    plinthMesh.position.y = 0.25;
    plinthMesh.receiveShadow = true;
    foundationGroup.add(plinthMesh);

    // Secondary silhouette: Beveled Gold Ring Collar
    const collarGeo = new THREE.CylinderGeometry(5.1, 5.3, 0.25, 6);
    const collarMesh = new THREE.Mesh(collarGeo, materials.goldTrim);
    collarMesh.position.y = 0.625;
    collarMesh.receiveShadow = true;
    collarMesh.castShadow = true;
    foundationGroup.add(collarMesh);

    // Accent detail: Inner Circular Stepped Stage
    const innerStageGeo = new THREE.CylinderGeometry(4.5, 4.7, 0.2, 32);
    const innerStageMesh = new THREE.Mesh(innerStageGeo, materials.nodeGlow);
    innerStageMesh.position.y = 0.85;
    innerStageMesh.receiveShadow = true;
    foundationGroup.add(innerStageMesh);

    // Concentric coordinate rings on floor
    const floorRingGeo = new THREE.RingGeometry(2.8, 2.9, 48);
    const floorRingMat = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    });
    const floorRing = new THREE.Mesh(floorRingGeo, floorRingMat);
    floorRing.rotation.x = -Math.PI / 2;
    floorRing.position.y = 0.96;
    foundationGroup.add(floorRing);

    // --- Sub-assembly 2: Central Cryptographic Ledger & Data Core ---
    const coreGroup = new THREE.Group();
    coreGroup.position.y = 3.2;
    hubGroup.add(coreGroup);

    // Inner Transmissive Emerald Geodesic Core
    const innerCoreGeo = new THREE.IcosahedronGeometry(1.3, 2);
    const innerCoreMesh = new THREE.Mesh(innerCoreGeo, materials.emeraldCore);
    innerCoreMesh.castShadow = true;
    coreGroup.add(innerCoreMesh);

    // Holographic wireframe lattice surrounding the core
    const wireGeo = new THREE.IcosahedronGeometry(1.65, 1);
    const wireMesh = new THREE.Mesh(wireGeo, materials.wireframeHolo);
    coreGroup.add(wireMesh);

    // Floating Golden Federal Seal Octahedron in very center
    const sealGeo = new THREE.OctahedronGeometry(0.65);
    const sealMesh = new THREE.Mesh(sealGeo, materials.goldTrim);
    coreGroup.add(sealMesh);

    // Gimbal Ring 1 (Latitude)
    const ring1Geo = new THREE.TorusGeometry(2.3, 0.07, 16, 64);
    const ring1Mesh = new THREE.Mesh(ring1Geo, materials.goldTrim);
    coreGroup.add(ring1Mesh);

    // Gimbal Ring 2 (Longitude tilted)
    const ring2Geo = new THREE.TorusGeometry(2.55, 0.06, 16, 64);
    const ring2Mesh = new THREE.Mesh(ring2Geo, materials.nodeGlow);
    ring2Mesh.rotation.x = Math.PI / 3;
    coreGroup.add(ring2Mesh);

    // Gimbal Ring 3 (Equatorial)
    const ring3Geo = new THREE.TorusGeometry(2.8, 0.05, 16, 64);
    const ring3Mesh = new THREE.Mesh(ring3Geo, materials.goldTrim);
    ring3Mesh.rotation.y = Math.PI / 4;
    coreGroup.add(ring3Mesh);

    // --- Sub-assembly 3: 6 Geopolitical Educational Node Spires ---
    // (SW, SE, SS, NC, NW, NE)
    const nodeNames = [
      'South-West Zone (Lagos/Ibadan/Ogun)',
      'North-Central Zone (Abuja FCT/Plateau)',
      'North-West Zone (Kano/Kaduna/Zaria)',
      'South-East Zone (Enugu/Anambra/UNN)',
      'South-South Zone (Rivers/Edo/Delta)',
      'North-East Zone (Borno/Bauchi/Adamawa)'
    ];

    interface NodeTower {
      group: THREE.Group;
      baseX: number;
      baseZ: number;
      crystal: THREE.Mesh;
      name: string;
    }

    const nodeTowers: NodeTower[] = [];
    const orbitRadius = 4.2;

    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const x = Math.cos(angle) * orbitRadius;
      const z = Math.sin(angle) * orbitRadius;

      const towerGroup = new THREE.Group();
      towerGroup.position.set(x, 0.95, z);

      // Tower Part 1: Pillar Base (pivoted bottom-center)
      const pillarGeo = new THREE.CylinderGeometry(0.35, 0.45, 1.4, 8);
      pillarGeo.translate(0, 0.7, 0); // bottom-center pivot
      const pillarMesh = new THREE.Mesh(pillarGeo, materials.baseStone);
      pillarMesh.castShadow = true;
      pillarMesh.receiveShadow = true;
      towerGroup.add(pillarMesh);

      // Tower Part 2: Gold Collar Cap
      const capGeo = new THREE.CylinderGeometry(0.48, 0.38, 0.25, 8);
      capGeo.translate(0, 1.52, 0);
      const capMesh = new THREE.Mesh(capGeo, materials.goldTrim);
      capMesh.castShadow = true;
      towerGroup.add(capMesh);

      // Tower Part 3: Glowing Crystal Data Prism
      const crystalGeo = new THREE.OctahedronGeometry(0.38);
      const crystalMesh = new THREE.Mesh(crystalGeo, materials.nodeGlow);
      crystalMesh.position.y = 2.05;
      crystalMesh.castShadow = true;
      towerGroup.add(crystalMesh);

      // Tower Part 4: High-frequency communication spire
      const spireGeo = new THREE.ConeGeometry(0.12, 0.7, 8);
      spireGeo.translate(0, 2.7, 0);
      const spireMesh = new THREE.Mesh(spireGeo, materials.goldTrim);
      towerGroup.add(spireMesh);

      hubGroup.add(towerGroup);
      nodeTowers.push({
        group: towerGroup,
        baseX: x,
        baseZ: z,
        crystal: crystalMesh,
        name: nodeNames[i]
      });
    }

    // --- Sub-assembly 4: Orbiting Data Satellites (Encrypted Packets) ---
    const satelliteGroup = new THREE.Group();
    satelliteGroup.position.y = 3.2;
    hubGroup.add(satelliteGroup);

    const satCount = 8;
    const satGeo = new THREE.BoxGeometry(0.24, 0.24, 0.24);
    const satMeshes: THREE.Mesh[] = [];

    for (let i = 0; i < satCount; i++) {
      const satMesh = new THREE.Mesh(satGeo, materials.satelliteGold);
      const satAngle = (i / satCount) * Math.PI * 2;
      const satR = 3.4;
      satMesh.position.set(Math.cos(satAngle) * satR, Math.sin(i * 1.5) * 0.4, Math.sin(satAngle) * satR);
      satelliteGroup.add(satMesh);
      satMeshes.push(satMesh);
    }

    // Pre-warm WebGL shaders
    renderer.compile(scene, camera);

    // Mouse / Pointer Interaction for Smooth Orbital Dragging
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0.35;
    let currentRotationY = 0;
    let currentRotationX = 0.35;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const deltaX = clientX - prevMouseX;
      const deltaY = clientY - prevMouseY;
      prevMouseX = clientX;
      prevMouseY = clientY;

      targetRotationY += deltaX * 0.008;
      targetRotationX = Math.max(0.1, Math.min(1.2, targetRotationX + deltaY * 0.006));
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onPointerDown);
    domElement.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('mouseup', onPointerUp);
    window.addEventListener('touchend', onPointerUp);

    // Resize Observer
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight || 540;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // 7. Silky-Smooth 60fps Animation Loop with Exponential Damping
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(animate);

      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      const { explosion, autoRotate: shouldAutoRotate, speed, finish } = stateRef.current;

      // Update finish colorway dynamically
      if (finish === 'emerald') {
        materials.goldTrim.color.setHex(0xf59e0b);
        materials.emeraldCore.color.setHex(0x008751);
        materials.nodeGlow.color.setHex(0x10b981);
      } else if (finish === 'gold') {
        materials.goldTrim.color.setHex(0xffd700);
        materials.emeraldCore.color.setHex(0xd97706);
        materials.nodeGlow.color.setHex(0xf59e0b);
      } else if (finish === 'slate') {
        materials.goldTrim.color.setHex(0x94a3b8);
        materials.emeraldCore.color.setHex(0x38bdf8);
        materials.nodeGlow.color.setHex(0x0ea5e9);
      }

      // Auto-rotation when not dragging
      if (shouldAutoRotate && !isDragging) {
        targetRotationY += 0.35 * speed * dt;
      }

      // Exponential damping on camera / scene orientation: 1 - Math.exp(-k * dt)
      const dampFactor = 1 - Math.exp(-8 * dt);
      currentRotationY += (targetRotationY - currentRotationY) * dampFactor;
      currentRotationX += (targetRotationX - currentRotationX) * dampFactor;

      hubGroup.rotation.y = currentRotationY;

      // Orbit camera positioning based on currentRotationX
      const camDist = 15.5;
      camera.position.y = Math.sin(currentRotationX) * camDist + 1.5;
      camera.position.z = Math.cos(currentRotationX) * camDist;
      camera.lookAt(0, 2.8, 0);

      // Core rotations
      coreGroup.rotation.y += 0.6 * speed * dt;
      wireMesh.rotation.x += 0.4 * speed * dt;
      wireMesh.rotation.y += 0.3 * speed * dt;
      sealMesh.rotation.y -= 0.8 * speed * dt;
      sealMesh.rotation.z += 0.5 * speed * dt;

      ring1Mesh.rotation.z += 0.8 * speed * dt;
      ring2Mesh.rotation.y -= 0.7 * speed * dt;
      ring3Mesh.rotation.x += 0.5 * speed * dt;

      satelliteGroup.rotation.y -= 0.9 * speed * dt;

      // Exploded Layer Kinematics: smoothly damp positions
      const expDamp = 1 - Math.exp(-6 * dt);
      const targetCoreY = 3.2 + explosion * 2.8; // Central core elevates upward
      coreGroup.position.y += (targetCoreY - coreGroup.position.y) * expDamp;

      const targetFoundationY = -explosion * 1.2; // Foundation lowers slightly
      foundationGroup.position.y += (targetFoundationY - foundationGroup.position.y) * expDamp;

      // 6 Node Spire expansion outward radially
      nodeTowers.forEach((tower, idx) => {
        const spreadMultiplier = 1 + explosion * 0.75;
        const targetX = tower.baseX * spreadMultiplier;
        const targetZ = tower.baseZ * spreadMultiplier;
        tower.group.position.x += (targetX - tower.group.position.x) * expDamp;
        tower.group.position.z += (targetZ - tower.group.position.z) * expDamp;

        // Individual crystal spin and subtle levitation
        tower.crystal.rotation.y += 1.2 * speed * dt;
        tower.crystal.position.y = 2.05 + Math.sin(currentTime * 0.003 + idx) * 0.12;
      });

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      domElement.removeEventListener('mousedown', onPointerDown);
      domElement.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      window.removeEventListener('touchend', onPointerUp);
      window.removeEventListener('resize', handleResize);

      // Dispose resources
      renderer.dispose();
      scene.clear();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[520px] md:h-[580px] bg-slate-950 overflow-hidden select-none border-b border-emerald-950/40">
      {/* 3D WebGL Canvas Mount Container */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Left Spec Badge - Clean & Static (No pulsating dots) */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-md bg-slate-900/90 border border-emerald-500/30 text-white shadow-lg">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span className="text-xs font-semibold tracking-wide uppercase text-emerald-400 font-mono">
            N-SEAR 3D Interactive Data Sphere
          </span>
          <span className="text-slate-500 text-xs">|</span>
          <span className="text-xs text-slate-300 font-medium">Federal Ledger Core v4.2</span>
        </div>
      </div>

      {/* Top Right Quick Instruction Pill */}
      <div className="absolute top-4 right-4 z-10 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-900/80 border border-slate-700/50 text-slate-300 text-xs">
        <RotateCw className="w-3.5 h-3.5 text-emerald-400" />
        <span>Click &amp; drag to rotate model</span>
      </div>

      {/* Collapsible Unified Bottom Control Dock (Following Three.js guidelines) */}
      <div
        className="absolute z-20 left-1/2 -translate-x-1/2 w-full max-w-[860px] px-4 transition-all duration-300 ease-in-out"
        style={{
          bottom: isCollapsed ? '-86px' : '16px',
        }}
      >
        {/* Collapse / Expand Toggle Tab */}
        <div className="flex justify-center mb-1">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-t-md bg-slate-900/95 border-t border-x border-emerald-600/30 text-emerald-300 hover:text-white text-xs font-medium transition-colors shadow-md"
            title="Toggle 3D Viewport Controls"
          >
            {isCollapsed ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" />
                <span>Show 3D Controls</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" />
                <span>Hide Controls (Cinema View)</span>
              </>
            )}
          </button>
        </div>

        {/* Dock Body: Solid slate-900 surface (No backdrop-filter over WebGL) */}
        <div className="p-3 sm:p-4 rounded-xl bg-slate-900/95 border border-slate-700/80 shadow-2xl text-slate-200">
          <div className="flex flex-wrap items-center justify-between gap-4">
            
            {/* Control 1: Exploded Layer Separation Slider */}
            <div className="flex items-center gap-3 min-w-[200px] flex-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium shrink-0">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>Explode Layers</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={explosionFactor}
                onChange={(e) => setExplosionFactor(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <span className="font-mono text-xs text-emerald-400 w-9 text-right">
                {Math.round(explosionFactor * 100)}%
              </span>
            </div>

            {/* Control 2: PBR Finish Selection */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-slate-400 font-medium">Finish:</span>
              <div className="flex items-center gap-1 bg-slate-800/90 p-1 rounded-lg border border-slate-700">
                <button
                  onClick={() => setActiveFinish('emerald')}
                  className={`px-2.5 py-1 text-xs rounded font-medium transition-all ${
                    activeFinish === 'emerald'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Emerald
                </button>
                <button
                  onClick={() => setActiveFinish('gold')}
                  className={`px-2.5 py-1 text-xs rounded font-medium transition-all ${
                    activeFinish === 'gold'
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Gold
                </button>
                <button
                  onClick={() => setActiveFinish('slate')}
                  className={`px-2.5 py-1 text-xs rounded font-medium transition-all ${
                    activeFinish === 'slate'
                      ? 'bg-sky-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Cyber
                </button>
              </div>
            </div>

            {/* Control 3: Auto-Rotate & Speed */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-lg border transition-colors ${
                  autoRotate
                    ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
                    : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
                title="Toggle Auto-Rotation"
              >
                <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'text-emerald-400' : 'text-slate-500'}`} />
                <span>{autoRotate ? 'Spinning' : 'Paused'}</span>
              </button>

              <button
                onClick={() => {
                  setExplosionFactor(0);
                  setRotationSpeed(1);
                  setAutoRotate(true);
                  setActiveFinish('emerald');
                }}
                className="p-1.5 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                title="Reset View"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* Regional Institutional Nodes Status Bar */}
          <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Federal Cryptographic Ledger: Active across 6 Geopolitical Zones</span>
            </div>
            <span className="font-mono text-emerald-400 hidden sm:inline">SHA-256 AES-GCM Encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
};
