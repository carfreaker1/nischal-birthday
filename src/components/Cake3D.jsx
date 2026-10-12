import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import confetti from 'canvas-confetti';
import { Sparkles, Wind, RotateCcw, Heart } from 'lucide-react';

export default function Cake3D({ onCandleBlown }) {
  const mountRef = useRef(null);
  const [candlesLit, setCandlesLit] = useState(true);
  const [isBlown, setIsBlown] = useState(false);
  const [wishRevealed, setWishRevealed] = useState(false);

  // References for Three.js control
  const flameLightsRef = useRef([]);
  const flameMeshesRef = useRef([]);
  const cakeGroupRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 4.2, 8.5);
    camera.lookAt(0, 1.2, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    mount.appendChild(renderer.domElement);

    // Cake Main Group
    const cakeGroup = new THREE.Group();
    cakeGroupRef.current = cakeGroup;
    scene.add(cakeGroup);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xfff0f5, 1.4);
    scene.add(ambientLight);

    const spotLight = new THREE.DirectionalLight(0xffb6c1, 2.0);
    spotLight.position.set(5, 12, 8);
    spotLight.castShadow = true;
    scene.add(spotLight);

    const backRimLight = new THREE.DirectionalLight(0xff3385, 1.2);
    backRimLight.position.set(-6, 6, -6);
    scene.add(backRimLight);

    // Materials
    const plateMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.8,
      roughness: 0.2
    });

    const tier1Mat = new THREE.MeshStandardMaterial({
      color: 0xff7597, // Soft blush pink
      roughness: 0.35,
      metalness: 0.1
    });

    const tier2Mat = new THREE.MeshStandardMaterial({
      color: 0xff9ebb, // Pastel strawberry pink
      roughness: 0.35,
      metalness: 0.1
    });

    const creamMat = new THREE.MeshStandardMaterial({
      color: 0xfffcf5, // Cream vanilla
      roughness: 0.25
    });

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      metalness: 0.9,
      roughness: 0.2
    });

    // 1. Plate / Pedestal
    const plate = new THREE.Mesh(new THREE.CylinderGeometry(3.2, 2.5, 0.2, 48), plateMaterial);
    plate.position.y = 0;
    cakeGroup.add(plate);

    // Gold Rim on Plate
    const plateGoldRim = new THREE.Mesh(new THREE.TorusGeometry(3.2, 0.08, 16, 64), goldMat);
    plateGoldRim.rotation.x = Math.PI / 2;
    plateGoldRim.position.y = 0.1;
    cakeGroup.add(plateGoldRim);

    // 2. Tier 1 (Bottom Tier)
    const tier1Height = 1.3;
    const tier1 = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 2.6, tier1Height, 48), tier1Mat);
    tier1.position.y = 0.1 + tier1Height / 2;
    cakeGroup.add(tier1);

    // Frosting ring between tier 1 & plate
    const creamBallsCount1 = 28;
    for (let i = 0; i < creamBallsCount1; i++) {
      const angle = (i / creamBallsCount1) * Math.PI * 2;
      const pearl = new THREE.Mesh(new THREE.SphereGeometry(0.14, 16, 16), creamMat);
      pearl.position.set(Math.cos(angle) * 2.62, 0.2, Math.sin(angle) * 2.62);
      cakeGroup.add(pearl);
    }

    // Tier 1 upper frosting border
    for (let i = 0; i < creamBallsCount1; i++) {
      const angle = (i / creamBallsCount1) * Math.PI * 2;
      const pearl = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), goldMat);
      pearl.position.set(Math.cos(angle) * 2.58, 0.1 + tier1Height, Math.sin(angle) * 2.58);
      cakeGroup.add(pearl);
    }

    // 3. Tier 2 (Top Tier)
    const tier2Height = 1.1;
    const tier2 = new THREE.Mesh(new THREE.CylinderGeometry(1.7, 1.7, tier2Height, 48), tier2Mat);
    tier2.position.y = tier1.position.y + tier1Height / 2 + tier2Height / 2;
    cakeGroup.add(tier2);

    // Tier 2 cream rosettes on top edge
    const creamBallsCount2 = 20;
    for (let i = 0; i < creamBallsCount2; i++) {
      const angle = (i / creamBallsCount2) * Math.PI * 2;
      const pearl = new THREE.Mesh(new THREE.SphereGeometry(0.13, 16, 16), creamMat);
      pearl.position.set(
        Math.cos(angle) * 1.68,
        tier2.position.y + tier2Height / 2,
        Math.sin(angle) * 1.68
      );
      cakeGroup.add(pearl);
    }

    // Heart topper on cake side
    const heartShape = new THREE.Shape();
    heartShape.moveTo(0, 0);
    heartShape.bezierCurveTo(0, 0.4, -0.6, 0.6, -0.6, 0.2);
    heartShape.bezierCurveTo(-0.6, -0.2, 0, -0.4, 0, -0.8);
    heartShape.bezierCurveTo(0, -0.4, 0.6, -0.2, 0.6, 0.2);
    heartShape.bezierCurveTo(0.6, 0.6, 0, 0.4, 0, 0);

    const heartGeom = new THREE.ShapeGeometry(heartShape);
    const heartMesh = new THREE.Mesh(heartGeom, goldMat);
    heartMesh.scale.set(0.6, 0.6, 0.6);
    heartMesh.rotation.y = 0;
    heartMesh.position.set(0, tier1.position.y, 2.65);
    cakeGroup.add(heartMesh);

    // 4. Candles and Flames
    const candlesGroup = new THREE.Group();
    const candleCoords = [
      { x: 0, z: 0 },
      { x: -0.7, z: -0.4 },
      { x: 0.7, z: -0.4 },
      { x: -0.5, z: 0.6 },
      { x: 0.5, z: 0.6 }
    ];

    const candleMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.4
    });

    const flameMat = new THREE.MeshBasicMaterial({
      color: 0xffaa00
    });

    const flameMeshes = [];
    const flameLights = [];

    const candleBaseY = tier2.position.y + tier2Height / 2;

    candleCoords.forEach((pos) => {
      // Candle stick
      const candle = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.75, 16), candleMat);
      candle.position.set(pos.x, candleBaseY + 0.75 / 2, pos.z);
      candlesGroup.add(candle);

      // Candle stripes
      const stripe = new THREE.Mesh(new THREE.TorusGeometry(0.065, 0.02, 8, 24), tier1Mat);
      stripe.rotation.x = Math.PI / 2;
      stripe.position.set(pos.x, candleBaseY + 0.35, pos.z);
      candlesGroup.add(stripe);

      // Wick
      const wick = new THREE.Mesh(
        new THREE.CylinderGeometry(0.015, 0.015, 0.12, 8),
        new THREE.MeshBasicMaterial({ color: 0x333333 })
      );
      wick.position.set(pos.x, candleBaseY + 0.75 + 0.06, pos.z);
      candlesGroup.add(wick);

      // Flame Mesh
      const flame = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.28, 16), flameMat.clone());
      flame.position.set(pos.x, candleBaseY + 0.75 + 0.22, pos.z);
      candlesGroup.add(flame);
      flameMeshes.push(flame);

      // Candle Glow Point Light
      const pLight = new THREE.PointLight(0xff9900, 1.2, 4);
      pLight.position.set(pos.x, candleBaseY + 0.75 + 0.3, pos.z);
      candlesGroup.add(pLight);
      flameLights.push(pLight);
    });

    cakeGroup.add(candlesGroup);
    flameMeshesRef.current = flameMeshes;
    flameLightsRef.current = flameLights;

    // Interactive Drag to Rotate
    let isDragging = false;
    let prevX = 0;
    let autoRotate = true;

    const onPointerDown = (e) => {
      isDragging = true;
      autoRotate = false;
      prevX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const deltaX = clientX - prevX;
      prevX = clientX;
      cakeGroup.rotation.y += deltaX * 0.008;
    };

    const onPointerUp = () => {
      isDragging = false;
      setTimeout(() => {
        autoRotate = true;
      }, 3000);
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    domEl.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp, { passive: true });

    // Render & Animation Loop
    let clock = new THREE.Clock();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Gentle auto spin
      if (autoRotate) {
        cakeGroup.rotation.y += 0.005;
      }

      // Flame flicker animation
      flameMeshes.forEach((flame, index) => {
        if (flame.visible) {
          const s = 0.9 + Math.sin(time * 15 + index) * 0.18;
          flame.scale.set(s, s * 1.1, s);
          flame.rotation.z = Math.sin(time * 8 + index) * 0.15;
        }
      });

      flameLights.forEach((light, index) => {
        if (light.visible) {
          light.intensity = 1.0 + Math.sin(time * 20 + index * 2) * 0.35;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      domEl.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      domEl.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      window.removeEventListener('resize', handleResize);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Handle Blow Candle Action
  const handleBlowCandles = () => {
    if (!candlesLit) return;

    // Extinguish flames
    flameMeshesRef.current.forEach((mesh) => (mesh.visible = false));
    flameLightsRef.current.forEach((light) => (light.visible = false));

    setCandlesLit(false);
    setIsBlown(true);
    setWishRevealed(true);

    if (onCandleBlown) onCandleBlown();

    // Trigger massive celebratory confetti explosion
    const count = 200;
    const defaults = {
      origin: { y: 0.6 }
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
        colors: ['#ff5b8e', '#ffd700', '#ff9ebb', '#ffffff', '#d62266']
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  const handleRelight = () => {
    flameMeshesRef.current.forEach((mesh) => (mesh.visible = true));
    flameLightsRef.current.forEach((light) => (light.visible = true));
    setCandlesLit(true);
    setIsBlown(false);
    setWishRevealed(false);
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* 3D Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-[360px] sm:h-[400px] cursor-grab active:cursor-grabbing relative"
        style={{ touchAction: 'none' }}
      />

      {/* Swipe Hint */}
      <p className="text-xs text-pink-300/70 tracking-widest uppercase mb-4 animate-pulse">
        ✦ Drag 360° to rotate cake ✦
      </p>

      {/* Interactive Action Controls */}
      <div className="flex gap-3 z-10">
        {candlesLit ? (
          <button
            onClick={handleBlowCandles}
            className="flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 shadow-lg shadow-pink-500/40 hover:scale-105 active:scale-95 transition-all duration-300 border border-pink-300/30"
          >
            <Wind className="w-5 h-5 animate-bounce" />
            <span>Blow the Candles! 🎂</span>
          </button>
        ) : (
          <button
            onClick={handleRelight}
            className="flex items-center gap-2 px-5 py-3 rounded-full font-medium text-pink-200 glass-pill hover:bg-pink-500/20 active:scale-95 transition-all duration-300"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Relight Candles 🕯️</span>
          </button>
        )}
      </div>

      {/* Wish Reveal Card */}
      {wishRevealed && (
        <div className="mt-5 mx-4 p-5 rounded-2xl glass-panel border border-pink-400/40 text-center animate-fadeIn glow-box-pink max-w-sm">
          <div className="flex items-center justify-center gap-2 text-pink-300 mb-2">
            <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
            <span className="text-xs uppercase tracking-widest font-semibold">Make A Wish</span>
            <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
          </div>
          <h4 className="font-cursive text-2xl text-pink-100 font-bold mb-2">
            May all your dreams take flight! 🌸
          </h4>
          <p className="text-xs text-pink-200/90 leading-relaxed font-light">
            Happy Birthday, dearest <strong className="text-pink-300 font-semibold">Nischal</strong>!
            May this new year bring boundless happiness, golden horizons on your rides, and endless love!
          </p>
          <div className="mt-3 flex justify-center text-pink-400">
            <Heart className="w-5 h-5 fill-pink-500 text-pink-500 animate-pulse" />
          </div>
        </div>
      )}
    </div>
  );
}
