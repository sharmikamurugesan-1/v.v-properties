'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Compass, Maximize2, ShieldCheck, Sparkles } from 'lucide-react';

export default function Hero3DScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setIsReducedMotion(mediaQuery.matches);

      const checkCanvas = document.createElement('canvas');
      const gl = checkCanvas.getContext('webgl') || checkCanvas.getContext('experimental-webgl');
      if (!gl) setIsWebGLSupported(false);
    }
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !isWebGLSupported || isReducedMotion) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // SCENE
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x071b35); // Architectural midnight
    scene.fog = new THREE.FogExp2(0x071b35, 0.025);

    // CAMERA
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(14, 11, 18);
    camera.lookAt(0, 2.5, 0);

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
    renderer.toneMappingExposure = 1.1;

    // LIGHTING
    const ambientLight = new THREE.AmbientLight(0xdceeff, 0.85);
    scene.add(ambientLight);

    const sun = new THREE.DirectionalLight(0xfff5e6, 1.4);
    sun.position.set(16, 24, 14);
    scene.add(sun);

    const blueRim = new THREE.DirectionalLight(0x087fe8, 0.9);
    blueRim.position.set(-14, 8, -12);
    scene.add(blueRim);

    const warmInterior = new THREE.PointLight(0xffb040, 2.2, 12);
    warmInterior.position.set(0, 3, 2);
    scene.add(warmInterior);

    // ARCHITECTURAL HERO MODEL GROUP
    const villaGroup = new THREE.Group();

    // Blueprint grid floor
    const grid = new THREE.GridHelper(28, 28, 0x087fe8, 0x173a66);
    grid.position.y = 0.02;
    villaGroup.add(grid);

    // Cadastral plot boundary line
    const boxGeo = new THREE.BoxGeometry(16, 0.08, 18);
    const wireGeo = new THREE.WireframeGeometry(boxGeo);
    const wireMat = new THREE.LineBasicMaterial({ color: 0x39a8f4, linewidth: 2 });
    const boundary = new THREE.LineSegments(wireGeo, wireMat);
    boundary.position.y = 0.05;
    villaGroup.add(boundary);

    // Ground concrete plinth
    const plinthMat = new THREE.MeshStandardMaterial({ color: 0xd8e1ea, roughness: 0.8 });
    const plinth = new THREE.Mesh(new THREE.BoxGeometry(11, 0.6, 12), plinthMat);
    plinth.position.set(0, 0.3, 0);
    villaGroup.add(plinth);

    // Architectural White Walls
    const wallMat = new THREE.MeshStandardMaterial({ color: 0xfcfdfe, roughness: 0.65 });
    
    // Ground floor volume
    const gfVolume = new THREE.Mesh(new THREE.BoxGeometry(8.5, 3.4, 9.5), wallMat);
    gfVolume.position.set(-0.8, 2.3, 0);
    villaGroup.add(gfVolume);

    // First floor cantilevered volume (shifted toward front-right)
    const ffVolume = new THREE.Mesh(new THREE.BoxGeometry(9.2, 3.2, 8.8), wallMat);
    ffVolume.position.set(0.6, 5.6, 0.8);
    villaGroup.add(ffVolume);

    // Low-E Glass Curtain Walls
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x6bb3e8,
      transparent: true,
      opacity: 0.6,
      roughness: 0.05,
      metalness: 0.85
    });

    // GF Glass front
    const gfGlass = new THREE.Mesh(new THREE.BoxGeometry(6.4, 2.8, 0.1), glassMat);
    gfGlass.position.set(-0.8, 2.2, 4.8);
    villaGroup.add(gfGlass);

    // FF Glass front
    const ffGlass = new THREE.Mesh(new THREE.BoxGeometry(5.8, 2.6, 0.1), glassMat);
    ffGlass.position.set(0.2, 5.5, 5.25);
    villaGroup.add(ffGlass);

    // Architectural Teak Louver Screen Accent
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x9e6538, roughness: 0.5 });
    const louver = new THREE.Mesh(new THREE.BoxGeometry(2.4, 3.2, 0.25), woodMat);
    louver.position.set(3.8, 5.5, 5.25);
    villaGroup.add(louver);

    // Modern Balcony Railing Glass
    const balconyGlass = new THREE.Mesh(new THREE.BoxGeometry(6.2, 0.85, 0.06), glassMat);
    balconyGlass.position.set(0.2, 4.3, 6.2);
    villaGroup.add(balconyGlass);

    // Surrounding Landscaped Base
    const lawnMat = new THREE.MeshStandardMaterial({ color: 0x1e5a34, roughness: 0.9 });
    const lawn = new THREE.Mesh(new THREE.BoxGeometry(20, 0.1, 22), lawnMat);
    lawn.position.set(0, -0.05, 0);
    villaGroup.add(lawn);

    // Driveway Pavers
    const driveMat = new THREE.MeshStandardMaterial({ color: 0x3d4957, roughness: 0.7 });
    const drive = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.15, 8.5), driveMat);
    drive.position.set(2.6, 0.05, 7.0);
    villaGroup.add(drive);

    scene.add(villaGroup);

    // Gentle floating and subtle pointer interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    window.addEventListener('mousemove', handlePointerMove);

    let animationFrameId = 0;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth damp pointer tilt
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Gentle continuous architectural rotation + pointer parallax
      villaGroup.rotation.y = elapsedTime * 0.08 + targetX * 0.25;
      camera.position.y = 11 + targetY * 1.5;
      camera.lookAt(0, 3.2, 0);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, [isWebGLSupported, isReducedMotion]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[360px] sm:h-[460px] lg:h-[520px] rounded-2xl overflow-hidden border border-white/10 bg-brand-midnight shadow-architectural select-none group"
    >
      {isWebGLSupported && !isReducedMotion ? (
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover cursor-grab active:cursor-grabbing"
          style={{ touchAction: 'pan-y' }}
        />
      ) : (
        /* Reduced Motion & Non-WebGL Fallback */
        <div className="absolute inset-0 bg-brand-midnight flex items-center justify-center p-8 blueprint-grid-dark text-center">
          <div className="space-y-3 max-w-sm">
            <span className="text-[10px] font-mono text-brand-electric uppercase tracking-widest font-bold">
              Architectural Concept View
            </span>
            <h4 className="text-xl font-bold text-white">V.V Properties Master Design Model</h4>
            <p className="text-xs text-brand-softblue">
              Engineered with 40ft blacktop arterial road access, M25 concrete structures, and 100% Vastu orientation.
            </p>
          </div>
        </div>
      )}

      {/* Subtle CAD Framing Grid Lines & Coordinates */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-brand-electric animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-softblue font-bold">
            11.0168° N, 76.9558° E • COIMBATORE
          </span>
        </div>
        <span className="text-[9px] font-mono text-white/50 block mt-0.5">
          CAD SCALE 1:100 • RESIDENTIAL CONCEPTUAL MASSING
        </span>
      </div>

      <div className="absolute top-4 right-4 z-10 pointer-events-none">
        <span className="px-2.5 py-1 rounded bg-white/10 backdrop-blur-md border border-white/15 text-white text-[10px] font-mono font-bold">
          3D SPATIAL VIEW
        </span>
      </div>

      {/* Bottom Architectural Info Pill */}
      <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-none flex items-center justify-between">
        <div className="bg-brand-midnight/90 backdrop-blur-md border border-white/15 rounded-lg px-3 py-1.5 text-[11px] font-medium text-white/80 shadow-md">
          <span className="text-brand-electric font-bold mr-1">Move cursor</span> to inspect spatial depth
        </div>
        <div className="bg-brand-midnight/90 backdrop-blur-md border border-white/15 rounded-lg px-3 py-1.5 text-[10px] font-mono text-brand-softblue hidden sm:block">
          DTCP & RERA STANDARD MATRIX
        </div>
      </div>
    </div>
  );
}
