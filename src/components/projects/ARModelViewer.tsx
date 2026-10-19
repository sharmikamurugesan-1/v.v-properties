'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  Box, Smartphone, QrCode, Maximize2, RotateCw, 
  Sparkles, CheckCircle2, X, Compass 
} from 'lucide-react';

interface ARModelViewerProps {
  modelTitle: string;
}

export default function ARModelViewer({ modelTitle }: ARModelViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showARModal, setShowARModal] = useState(false);
  const [isRotating, setIsRotating] = useState(true);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const width = canvas.clientWidth || 600;
    const height = canvas.clientHeight || 400;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x071b35); // Architectural midnight
    scene.fog = new THREE.FogExp2(0x071b35, 0.03);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(12, 9, 14);
    camera.lookAt(0, 2, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights
    const ambientLight = new THREE.AmbientLight(0xdceeff, 0.8);
    scene.add(ambientLight);

    const sun = new THREE.DirectionalLight(0xfff0dd, 1.4);
    sun.position.set(15, 20, 10);
    scene.add(sun);

    const blueRim = new THREE.DirectionalLight(0x087fe8, 0.7);
    blueRim.position.set(-10, 5, -10);
    scene.add(blueRim);

    // Villa Model Group
    const modelGroup = new THREE.Group();

    // Ground Plot
    const groundGeo = new THREE.BoxGeometry(14, 0.2, 14);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x1f5431, roughness: 0.9 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.y = -0.1;
    modelGroup.add(ground);

    // Grid wireframe
    const grid = new THREE.GridHelper(16, 16, 0x087fe8, 0x1d3a66);
    grid.position.y = 0.02;
    modelGroup.add(grid);

    // Ground Floor Concrete Volume
    const gfGeo = new THREE.BoxGeometry(6.4, 3.2, 7.2);
    const whiteMat = new THREE.MeshStandardMaterial({ color: 0xfcfdfe, roughness: 0.7 });
    const gf = new THREE.Mesh(gfGeo, whiteMat);
    gf.position.set(0, 1.6, 0);
    modelGroup.add(gf);

    // First Floor Cantilevered Volume (shifted forward)
    const ffGeo = new THREE.BoxGeometry(7.2, 3.0, 6.8);
    const ff = new THREE.Mesh(ffGeo, whiteMat);
    ff.position.set(0.4, 4.7, 0.6);
    modelGroup.add(ff);

    // Teak Wood Louver Accent
    const woodGeo = new THREE.BoxGeometry(2.0, 3.0, 0.3);
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x9e6538, roughness: 0.5 });
    const louver = new THREE.Mesh(woodGeo, woodMat);
    louver.position.set(2.4, 4.7, 4.1);
    modelGroup.add(louver);

    // Glass Windows
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x6bb3e8,
      transparent: true,
      opacity: 0.6,
      roughness: 0.1,
      metalness: 0.8
    });
    const gfGlass = new THREE.Mesh(new THREE.BoxGeometry(5.2, 2.6, 0.1), glassMat);
    gfGlass.position.set(0, 1.5, 3.65);
    modelGroup.add(gfGlass);

    const ffGlass = new THREE.Mesh(new THREE.BoxGeometry(4.4, 2.4, 0.1), glassMat);
    ffGlass.position.set(-1.0, 4.7, 4.05);
    modelGroup.add(ffGlass);

    scene.add(modelGroup);

    let animationFrameId = 0;
    let angle = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (isRotating) {
        angle += 0.006;
        modelGroup.rotation.y = angle;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!canvas) return;
      const w = canvas.clientWidth || 600;
      const h = canvas.clientHeight || 400;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, [isRotating]);

  return (
    <div className="bg-brand-midnight text-white rounded-2xl p-6 sm:p-8 border border-white/10 shadow-architectural text-left space-y-6 blueprint-grid-dark">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-electric block">
            Spatial Intelligence
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            3D Conceptual Villa & Spatial Orbit
          </h3>
          <p className="text-xs text-brand-softblue mt-0.5">
            Interactive real-time 3D architectural massing model for {modelTitle.split('—')[0]}.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all ${
              isRotating 
                ? 'bg-brand-electric/20 border-brand-electric/40 text-brand-electric' 
                : 'bg-white/10 border-white/20 text-white/80'
            }`}
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>{isRotating ? 'Auto Orbiting' : 'Paused'}</span>
          </button>

          <button
            onClick={() => setShowARModal(true)}
            className="px-4 py-1.5 rounded-lg bg-brand-electric hover:bg-brand-royal text-white text-xs font-bold shadow-subtle flex items-center gap-1.5 transition-all"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>View in AR</span>
          </button>
        </div>
      </div>

      {/* 3D Canvas Box */}
      <div className="relative aspect-[16/10] sm:aspect-[2/1] rounded-xl overflow-hidden border border-white/10 bg-brand-midnight">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover"
        />

        {/* Orbit indicator pill */}
        <div className="absolute bottom-3 left-3 px-3 py-1 rounded-md bg-brand-midnight/80 backdrop-blur-md border border-white/15 text-[11px] font-mono text-brand-softblue flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-brand-electric" />
          <span>Interactive Architectural Massing</span>
        </div>
      </div>

      {/* AR Modal */}
      {showARModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white text-brand-text rounded-2xl max-w-md w-full p-6 sm:p-8 space-y-6 relative border border-brand-border shadow-2xl animate-in zoom-in-95 duration-200">
            
            <button
              onClick={() => setShowARModal(false)}
              className="absolute top-5 right-5 p-1 rounded-full text-brand-subtext hover:text-brand-navy"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-electric block">
                Augmented Reality
              </span>
              <h4 className="text-xl font-bold text-brand-navy">
                Place {modelTitle.split('—')[0]} In Your Space
              </h4>
              <p className="text-xs text-brand-subtext">
                Scan the QR code with your mobile camera (iOS QuickLook / Android SceneViewer compatible) to view the villa model on your plot.
              </p>
            </div>

            {/* QR Code Container */}
            <div className="p-6 bg-brand-warmwhite rounded-xl border border-brand-border flex flex-col items-center justify-center space-y-3">
              <div className="w-44 h-44 bg-white p-3 rounded-lg border border-brand-border shadow-sm flex items-center justify-center">
                <QrCode className="w-36 h-36 text-brand-navy" />
              </div>
              <span className="text-[11px] font-mono text-brand-subtext font-medium">
                ar.vvproperties.com/{modelTitle.toLowerCase().replace(/[^a-z0-9]/g, '-')}
              </span>
            </div>

            <div className="space-y-2 text-xs text-brand-navy/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-foliage flex-shrink-0" />
                <span>True-to-scale 1:1 ground projection</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-foliage flex-shrink-0" />
                <span>Works on iPhone, iPad, and ARCore Android devices</span>
              </div>
            </div>

            <button
              onClick={() => setShowARModal(false)}
              className="w-full py-2.5 bg-brand-navy text-white text-xs font-bold rounded-lg hover:bg-brand-royal transition-all"
            >
              Close AR Preview
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
