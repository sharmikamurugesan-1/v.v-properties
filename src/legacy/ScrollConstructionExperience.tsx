'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCcw, ChevronRight } from 'lucide-react';

interface StageInfo {
  id: number;
  number: string;
  stageLabel: string;
  title: string;
  oneLine: string;
  progressRange: [number, number];
}

const FOUR_STAGES: StageInfo[] = [
  {
    id: 1,
    number: '01',
    stageLabel: 'STAGE 01',
    title: 'Blueprint & Boundary Grid',
    oneLine: 'Demarcated total station cadastral lines and underground utility axis.',
    progressRange: [0.0, 0.25]
  },
  {
    id: 2,
    number: '02',
    stageLabel: 'STAGE 02',
    title: 'Reinforced Structural Frame',
    oneLine: 'M25 concrete plinth, column grid and double-slab floor plates.',
    progressRange: [0.25, 0.50]
  },
  {
    id: 3,
    number: '03',
    stageLabel: 'STAGE 03',
    title: 'Building Envelope & Glazing',
    oneLine: 'Low-E acoustic glass curtain walls and architectural teak louver screens.',
    progressRange: [0.50, 0.75]
  },
  {
    id: 4,
    number: '04',
    stageLabel: 'STAGE 04',
    title: 'Completed Conceptual Residence',
    oneLine: 'Turnkey architectural villa with native landscaping and dusk illumination.',
    progressRange: [0.75, 1.0]
  }
];

export default function ScrollConstructionExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [currentProgress, setCurrentProgress] = useState(0);
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // References for Three.js state
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const reqAnimRef = useRef<number | null>(null);

  // Interactive Orbit Drag States
  const isDraggingRef = useRef(false);
  const previousPointerPosRef = useRef({ x: 0, y: 0 });
  const orbitOffsetRef = useRef({ yaw: 0, pitch: 0 });

  // Scene group references
  const blueprintGroupRef = useRef<THREE.Group | null>(null);
  const structureGroupRef = useRef<THREE.Group | null>(null);
  const facadeGroupRef = useRef<THREE.Group | null>(null);
  const landscapeGroupRef = useRef<THREE.Group | null>(null);
  const lightsGroupRef = useRef<THREE.Group | null>(null);

  // Smooth lerp progress tracking
  const targetProgressRef = useRef(0);
  const renderedProgressRef = useRef(0);

  // Check reduced motion & WebGL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setIsReducedMotion(mediaQuery.matches);

      const checkCanvas = document.createElement('canvas');
      const gl = checkCanvas.getContext('webgl') || checkCanvas.getContext('experimental-webgl');
      if (!gl) {
        setIsWebGLSupported(false);
      }
    }
  }, []);

  // Initialize Three.js scene
  useEffect(() => {
    if (!canvasRef.current || !isWebGLSupported || isReducedMotion) return;

    const canvas = canvasRef.current;
    const width = canvas.clientWidth || window.innerWidth;
    const height = canvas.clientHeight || window.innerHeight;

    // SCENE
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a1626); // Architectural deep navy
    scene.fog = new THREE.FogExp2(0x0a1626, 0.024);
    sceneRef.current = scene;

    // CAMERA — Tuned so building occupies >= 70% of viewport
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(11, 7.5, 13);
    camera.lookAt(0, 2.8, 0);
    cameraRef.current = camera;

    // RENDERER
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;

    // LIGHTING RIG
    const ambientLight = new THREE.AmbientLight(0xdceeff, 0.85);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff5e6, 1.4);
    sunLight.position.set(16, 28, 14);
    scene.add(sunLight);

    const navyAccentLight = new THREE.DirectionalLight(0x4a779d, 0.75);
    navyAccentLight.position.set(-14, 8, -10);
    scene.add(navyAccentLight);

    // Warm interior lights for reveal stage
    const lightsGroup = new THREE.Group();
    const interiorLight1 = new THREE.PointLight(0xff9d3b, 0, 12);
    interiorLight1.position.set(0, 2.2, 0);
    lightsGroup.add(interiorLight1);

    const interiorLight2 = new THREE.PointLight(0xffb86c, 0, 12);
    interiorLight2.position.set(0, 5.5, 0);
    lightsGroup.add(interiorLight2);

    const porchLight = new THREE.PointLight(0xffd180, 0, 8);
    porchLight.position.set(0, 1.6, 5.5);
    lightsGroup.add(porchLight);

    scene.add(lightsGroup);
    lightsGroupRef.current = lightsGroup;

    // -------------------------------------------------------------
    // STAGE A: BLUEPRINT WIREFRAME & REFINED CAD GRID
    // -------------------------------------------------------------
    const blueprintGroup = new THREE.Group();

    // Refined subtle ground grid
    const gridHelper = new THREE.GridHelper(30, 30, 0x334e68, 0x162638);
    gridHelper.position.y = 0.02;
    blueprintGroup.add(gridHelper);

    // Subtle boundary wireframe
    const boundaryBoxGeo = new THREE.BoxGeometry(14, 0.04, 15);
    const boundaryWireGeo = new THREE.WireframeGeometry(boundaryBoxGeo);
    const boundaryWireMat = new THREE.LineBasicMaterial({ 
      color: 0x627d98, 
      linewidth: 1,
      transparent: true,
      opacity: 0.85 
    });
    const boundaryWire = new THREE.LineSegments(boundaryWireGeo, boundaryWireMat);
    boundaryWire.position.y = 0.04;
    blueprintGroup.add(boundaryWire);

    // Architectural villa wireframe lines
    const villaWireGeo = new THREE.WireframeGeometry(new THREE.BoxGeometry(11, 7.2, 12.5));
    const villaWireMat = new THREE.LineBasicMaterial({
      color: 0x829ab1,
      transparent: true,
      opacity: 0.65
    });
    const villaWire = new THREE.LineSegments(villaWireGeo, villaWireMat);
    villaWire.position.set(0, 3.8, 0);
    blueprintGroup.add(villaWire);

    scene.add(blueprintGroup);
    blueprintGroupRef.current = blueprintGroup;

    // -------------------------------------------------------------
    // STAGE B: STRUCTURAL SKELETON (Plinth, Columns, Beams & Slabs)
    // -------------------------------------------------------------
    const structureGroup = new THREE.Group();

    const concreteMat = new THREE.MeshStandardMaterial({
      color: 0xc4cdd5,
      roughness: 0.85,
      metalness: 0.1
    });
    const plinthSlab = new THREE.Mesh(new THREE.BoxGeometry(11, 0.7, 12.5), concreteMat);
    plinthSlab.position.set(0, 0.35, 0);
    structureGroup.add(plinthSlab);

    // Columns
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x1f3044,
      roughness: 0.6,
      metalness: 0.3
    });
    const colGeo = new THREE.BoxGeometry(0.48, 7.0, 0.48);
    const colCoords = [
      [-4.8, 3.8, -5.5], [0, 3.8, -5.5], [4.8, 3.8, -5.5],
      [-4.8, 3.8, 0],    [4.8, 3.8, 0],
      [-4.8, 3.8, 5.5],  [0, 3.8, 5.5],  [4.8, 3.8, 5.5]
    ];
    colCoords.forEach(([x, y, z]) => {
      const col = new THREE.Mesh(colGeo, frameMat);
      col.position.set(x, y, z);
      structureGroup.add(col);
    });

    // Horizontal tie-beams
    const beamMat = new THREE.MeshStandardMaterial({ color: 0x1b2838, roughness: 0.5 });
    [3.7, 7.2].forEach((levelY) => {
      [-4.8, 4.8].forEach((x) => {
        const longBeam = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.35, 11.5), beamMat);
        longBeam.position.set(x, levelY, 0);
        structureGroup.add(longBeam);
      });
      [-5.5, 0, 5.5].forEach((z) => {
        const latBeam = new THREE.Mesh(new THREE.BoxGeometry(10.0, 0.35, 0.4), beamMat);
        latBeam.position.set(0, levelY, z);
        structureGroup.add(latBeam);
      });
    });

    // Floor Plates
    const floorMat = new THREE.MeshStandardMaterial({ color: 0xd8e2ec, roughness: 0.7 });
    const level1Slab = new THREE.Mesh(new THREE.BoxGeometry(11.4, 0.3, 13.5), floorMat);
    level1Slab.position.set(0, 3.8, 0.5);
    structureGroup.add(level1Slab);

    const roofSlab = new THREE.Mesh(new THREE.BoxGeometry(12.2, 0.35, 14.2), floorMat);
    roofSlab.position.set(0, 7.3, 0.5);
    structureGroup.add(roofSlab);

    scene.add(structureGroup);
    structureGroup.visible = false;
    structureGroupRef.current = structureGroup;

    // -------------------------------------------------------------
    // STAGE C: FACADE & GLAZING (Enclosure, Glass Curtains, Louvers)
    // -------------------------------------------------------------
    const facadeGroup = new THREE.Group();

    const wallMat = new THREE.MeshStandardMaterial({
      color: 0xfcfdfe,
      roughness: 0.8,
      metalness: 0.05
    });

    const woodMat = new THREE.MeshStandardMaterial({
      color: 0x8c5b36,
      roughness: 0.6
    });

    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x5a8fb2,
      transparent: true,
      opacity: 0.55,
      roughness: 0.08,
      metalness: 0.85
    });

    const rearWall = new THREE.Mesh(new THREE.BoxGeometry(10.2, 3.1, 0.25), wallMat);
    rearWall.position.set(0, 2.0, -5.4);
    facadeGroup.add(rearWall);

    const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.25, 3.1, 11.0), wallMat);
    leftWall.position.set(-4.6, 2.0, 0);
    facadeGroup.add(leftWall);

    const gfGlass = new THREE.Mesh(new THREE.BoxGeometry(9.6, 2.9, 0.08), glassMat);
    gfGlass.position.set(0, 2.0, 5.3);
    facadeGroup.add(gfGlass);

    const ffSideWall = new THREE.Mesh(new THREE.BoxGeometry(0.25, 3.1, 10.8), wallMat);
    ffSideWall.position.set(4.6, 5.5, 0);
    facadeGroup.add(ffSideWall);

    const ffRearWall = new THREE.Mesh(new THREE.BoxGeometry(10.2, 3.1, 0.25), wallMat);
    ffRearWall.position.set(0, 5.5, -5.4);
    facadeGroup.add(ffRearWall);

    const ffGlass = new THREE.Mesh(new THREE.BoxGeometry(7.4, 2.9, 0.08), glassMat);
    ffGlass.position.set(-1.0, 5.5, 5.7);
    facadeGroup.add(ffGlass);

    const louverPanel = new THREE.Mesh(new THREE.BoxGeometry(2.2, 2.9, 0.2), woodMat);
    louverPanel.position.set(3.6, 5.5, 5.7);
    facadeGroup.add(louverPanel);

    const balconyGlass = new THREE.Mesh(new THREE.BoxGeometry(7.4, 0.8, 0.06), glassMat);
    balconyGlass.position.set(-1.0, 4.3, 7.0);
    facadeGroup.add(balconyGlass);

    scene.add(facadeGroup);
    facadeGroup.visible = false;
    facadeGroupRef.current = facadeGroup;

    // -------------------------------------------------------------
    // STAGE D: LANDSCAPE & REVEAL ENVIRONMENT
    // -------------------------------------------------------------
    const landscapeGroup = new THREE.Group();

    // Lawn
    const lawnGeo = new THREE.BoxGeometry(22, 0.12, 24);
    const lawnMat = new THREE.MeshStandardMaterial({
      color: 0x1b4d2e,
      roughness: 0.9
    });
    const lawn = new THREE.Mesh(lawnGeo, lawnMat);
    lawn.position.set(0, -0.05, 0);
    landscapeGroup.add(lawn);

    // Driveway Pavers
    const driveGeo = new THREE.BoxGeometry(4.6, 0.14, 8.5);
    const driveMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.75 });
    const driveway = new THREE.Mesh(driveGeo, driveMat);
    driveway.position.set(2.2, 0.04, 8.0);
    landscapeGroup.add(driveway);

    // Perimeter Hedges
    const hedgeMat = new THREE.MeshStandardMaterial({ color: 0x133820, roughness: 0.85 });
    const backHedge = new THREE.Mesh(new THREE.BoxGeometry(20, 0.8, 0.7), hedgeMat);
    backHedge.position.set(0, 0.4, -10.5);
    landscapeGroup.add(backHedge);

    // Architectural Trees
    const trunkGeo = new THREE.CylinderGeometry(0.15, 0.2, 2.8, 8);
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x3e2d20 });
    const foliageGeo = new THREE.SphereGeometry(1.4, 12, 12);
    const foliageMat = new THREE.MeshStandardMaterial({ color: 0x225c35, roughness: 0.8 });

    [[-8.0, 0, 6.5], [-8.2, 0, -4.5], [8.2, 0, -5.5]].forEach(([tx, ty, tz]) => {
      const treeGroup = new THREE.Group();
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.y = 1.4;
      treeGroup.add(trunk);

      const foliage = new THREE.Mesh(foliageGeo, foliageMat);
      foliage.position.y = 3.2;
      foliage.scale.set(1, 1.25, 1);
      treeGroup.add(foliage);

      treeGroup.position.set(tx, ty, tz);
      landscapeGroup.add(treeGroup);
    });

    scene.add(landscapeGroup);
    landscapeGroup.visible = false;
    landscapeGroupRef.current = landscapeGroup;

    // -------------------------------------------------------------
    // POINTER INTERACTION FOR RESTRAINED ORBIT
    // -------------------------------------------------------------
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDraggingRef.current = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousPointerPosRef.current = { x: clientX, y: clientY };
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDraggingRef.current) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - previousPointerPosRef.current.x;
      const deltaY = clientY - previousPointerPosRef.current.y;

      orbitOffsetRef.current.yaw = Math.max(-0.5, Math.min(0.5, orbitOffsetRef.current.yaw + deltaX * 0.005));
      orbitOffsetRef.current.pitch = Math.max(-0.25, Math.min(0.25, orbitOffsetRef.current.pitch - deltaY * 0.004));

      previousPointerPosRef.current = { x: clientX, y: clientY };
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
    };

    canvas.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);

    canvas.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);

    // -------------------------------------------------------------
    // RENDER ANIMATION LOOP WITH LERP INTERPOLATION
    // -------------------------------------------------------------
    let animationFrameId = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      reqAnimRef.current = animationFrameId;

      const target = targetProgressRef.current;
      renderedProgressRef.current += (target - renderedProgressRef.current) * 0.085;
      const p = renderedProgressRef.current;

      const activeIdx = FOUR_STAGES.findIndex(
        (st) => p >= st.progressRange[0] && p <= st.progressRange[1]
      );
      if (activeIdx !== -1) {
        setActiveStageIndex(activeIdx);
      } else if (p >= 0.99) {
        setActiveStageIndex(3);
      }

      // -----------------------------------------------------------
      // PROGRESSIVE STAGE VISIBILITY & DAMPING
      // -----------------------------------------------------------
      if (blueprintGroupRef.current) {
        blueprintGroupRef.current.visible = true;
        const wireOp = Math.max(0.12, 1.0 - (p / 0.5) * 0.88);
        boundaryWireMat.opacity = wireOp;
        villaWireMat.opacity = Math.max(0.0, 0.65 - (p / 0.3) * 0.65);
      }

      if (structureGroupRef.current) {
        if (p < 0.18) {
          structureGroupRef.current.visible = false;
        } else {
          structureGroupRef.current.visible = true;
          const stageP = Math.min(1.0, Math.max(0.01, (p - 0.18) / 0.22));
          structureGroupRef.current.scale.set(1, stageP, 1);
        }
      }

      if (facadeGroupRef.current) {
        if (p < 0.44) {
          facadeGroupRef.current.visible = false;
        } else {
          facadeGroupRef.current.visible = true;
          const stageP = Math.min(1.0, Math.max(0.01, (p - 0.44) / 0.22));
          facadeGroupRef.current.scale.set(1, stageP, 1);
        }
      }

      if (landscapeGroupRef.current) {
        if (p < 0.68) {
          landscapeGroupRef.current.visible = false;
        } else {
          landscapeGroupRef.current.visible = true;
          const stageP = Math.min(1.0, Math.max(0.01, (p - 0.68) / 0.20));
          landscapeGroupRef.current.scale.set(stageP, 1, stageP);
        }
      }

      if (lightsGroupRef.current) {
        const revealP = Math.min(1.0, Math.max(0.0, (p - 0.72) / 0.28));
        interiorLight1.intensity = revealP * 2.8;
        interiorLight2.intensity = revealP * 3.2;
        porchLight.intensity = revealP * 2.0;

        if (revealP > 0) {
          sunLight.intensity = 1.4 - revealP * 0.4;
          sunLight.color.setHex(0xffcb85);
        }
      }

      // Smooth relax drag offset
      if (!isDraggingRef.current) {
        orbitOffsetRef.current.yaw *= 0.95;
        orbitOffsetRef.current.pitch *= 0.95;
      }

      // Camera positioned closely to ensure building occupies >= 70% of viewport
      const baseAngle = 0.85 + p * 1.6 + orbitOffsetRef.current.yaw;
      const radius = 14.8 - p * 2.8;
      const camY = 8.8 - p * 3.4 + orbitOffsetRef.current.pitch * 6;

      camera.position.x = Math.sin(baseAngle) * radius;
      camera.position.z = Math.cos(baseAngle) * radius;
      camera.position.y = camY;
      camera.lookAt(0, 3.2 + p * 0.3, 0);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!canvas) return;
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      canvas.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      canvas.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
      window.removeEventListener('resize', handleResize);
      if (reqAnimRef.current) cancelAnimationFrame(reqAnimRef.current);
      renderer.dispose();
    };
  }, [isWebGLSupported, isReducedMotion]);

  // Handle Natural Page Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const windowHeight = window.innerHeight;

      const totalScrollable = containerHeight - windowHeight;
      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.min(1.0, Math.max(0.0, scrolled / totalScrollable));

      targetProgressRef.current = progress;
      setCurrentProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const jumpToStage = (stage: StageInfo) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight;
    const windowHeight = window.innerHeight;
    const totalScrollable = containerHeight - windowHeight;

    const targetScrollY = containerTop + (stage.progressRange[0] + 0.02) * totalScrollable;
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  };

  const resetCamera = () => {
    orbitOffsetRef.current = { yaw: 0, pitch: 0 };
  };

  const currentStage = FOUR_STAGES[activeStageIndex] || FOUR_STAGES[0];

  return (
    <div 
      ref={containerRef} 
      id="construction-experience"
      className="relative w-full bg-[#0a1626] text-white min-h-[300vh]"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between select-none">
        
        {/* Three.js Canvas or Fallback */}
        {isWebGLSupported && !isReducedMotion ? (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover z-0 cursor-grab active:cursor-grabbing"
            style={{ touchAction: 'pan-y' }}
          />
        ) : (
          /* Reduced-Motion / Non-WebGL Fallback Poster */
          <div className="absolute inset-0 z-0 bg-[#0a1626] flex items-center justify-center p-8 text-center">
            <div className="max-w-xl space-y-3">
              <span className="text-[11px] font-sans text-[#93C5FD] uppercase tracking-widest font-semibold">
                {currentStage.stageLabel}
              </span>
              <h3 className="text-3xl font-serif text-white">
                {currentStage.title}
              </h3>
              <p className="text-sm text-white/70">
                {currentStage.oneLine}
              </p>
            </div>
          </div>
        )}

        {/* Minimal Subtle Header: Reset View Angle */}
        <div className="relative z-20 px-6 lg:px-12 pt-8 flex items-center justify-end pointer-events-auto">
          <button
            onClick={resetCamera}
            title="Reset Perspective"
            className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/15 text-[11px] font-sans text-white/80 hover:text-white transition-all flex items-center gap-1.5 backdrop-blur-sm"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset View</span>
          </button>
        </div>

        {/* Compact Bottom-Left Caption Card */}
        <div className="relative z-20 px-6 lg:px-12 pb-24 sm:pb-20 pointer-events-none text-left">
          <div className="max-w-md pointer-events-auto bg-[#071B35]/85 backdrop-blur-md rounded-xl p-5 sm:p-6 border border-white/10 shadow-xl transition-all duration-300">
            <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#93C5FD] block">
              {currentStage.stageLabel}
            </span>
            <h3 className="text-xl sm:text-2xl font-serif text-white tracking-tight mt-1">
              {currentStage.title}
            </h3>
            <p className="text-xs text-white/80 mt-1.5 line-clamp-1 font-sans">
              {currentStage.oneLine}
            </p>
          </div>
        </div>

        {/* Slim Stage Selector at the Bottom */}
        <div className="relative z-20 px-6 pb-6 pointer-events-auto">
          <div className="max-w-md mx-auto flex items-center justify-center gap-2 sm:gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
            {FOUR_STAGES.map((stage, idx) => {
              const isActive = activeStageIndex === idx;

              return (
                <button
                  key={stage.id}
                  onClick={() => jumpToStage(stage)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-sans transition-all ${
                    isActive 
                      ? 'bg-white text-[#0a1626] font-semibold shadow-sm' 
                      : 'text-white/60 hover:text-white'
                  }`}
                  aria-label={`Jump to ${stage.title}`}
                >
                  <span className="font-semibold">{stage.number}</span>
                  <span className="hidden sm:inline">{stage.title.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
