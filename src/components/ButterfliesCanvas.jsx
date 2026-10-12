import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ButterfliesCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 25;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Ambient & Directional Lights
    const ambientLight = new THREE.AmbientLight(0xffb5d0, 1.2);
    scene.add(ambientLight);

    const pinkLight = new THREE.PointLight(0xff6ea7, 2, 50);
    pinkLight.position.set(0, 5, 10);
    scene.add(pinkLight);

    // Create Butterfly Wing Shape
    function createWingShape() {
      const shape = new THREE.Shape();
      shape.moveTo(0, 0);
      shape.bezierCurveTo(0.8, 1.2, 2.2, 1.8, 2.8, 1.0);
      shape.bezierCurveTo(3.2, 0.4, 2.8, -0.6, 1.6, -1.0);
      shape.bezierCurveTo(2.4, -1.8, 1.5, -2.6, 0.8, -2.0);
      shape.bezierCurveTo(0.2, -1.5, 0.1, -0.6, 0, 0);
      return shape;
    }

    const wingGeom = new THREE.ShapeGeometry(createWingShape(), 16);
    
    // Shader/Material for Butterfly with Pink & Iridescent Shimmer
    const wingMat = new THREE.MeshPhongMaterial({
      color: 0xff6b9c,
      emissive: 0x5a1835,
      specular: 0xffffff,
      shininess: 90,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.88,
      depthWrite: false
    });

    const bodyGeom = new THREE.CylinderGeometry(0.08, 0.05, 1.4, 8);
    const bodyMat = new THREE.MeshBasicMaterial({ color: 0x4a0e28 });

    // Group of butterflies
    const butterflies = [];
    const butterflyCount = 10;

    for (let i = 0; i < butterflyCount; i++) {
      const bGroup = new THREE.Group();

      // Body
      const body = new THREE.Mesh(bodyGeom, bodyMat);
      body.rotation.x = Math.PI / 2;
      bGroup.add(body);

      // Left Wing
      const leftWing = new THREE.Mesh(wingGeom, wingMat.clone());
      leftWing.position.set(-0.05, 0, 0);
      bGroup.add(leftWing);

      // Right Wing (mirrored)
      const rightWing = new THREE.Mesh(wingGeom, wingMat.clone());
      rightWing.scale.set(-1, 1, 1);
      rightWing.position.set(0.05, 0, 0);
      bGroup.add(rightWing);

      // Random starting coordinates
      const scale = 0.45 + Math.random() * 0.45;
      bGroup.scale.set(scale, scale, scale);

      const radius = 8 + Math.random() * 12;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 22;

      bGroup.position.set(
        Math.cos(angle) * radius,
        height,
        (Math.random() - 0.5) * 14
      );

      butterflies.push({
        group: bGroup,
        leftWing,
        rightWing,
        speed: 1.2 + Math.random() * 1.5,
        flapSpeed: 14 + Math.random() * 8,
        seed: Math.random() * 100,
        radius,
        baseY: height,
        angle
      });

      scene.add(bGroup);
    }

    // Touch / Mouse Tracking for interactive reaction
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const onPointerMove = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      mouse.targetX = (clientX / window.innerWidth - 0.5) * 15;
      mouse.targetY = -(clientY / window.innerHeight - 0.5) * 15;
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });

    // Window Resize Handler
    const handleResize = () => {
      if (!mount) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let clock = new THREE.Clock();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth pointer lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      butterflies.forEach((b) => {
        // Wing Flapping animation
        const flap = Math.sin(elapsedTime * b.flapSpeed + b.seed) * 0.9;
        b.leftWing.rotation.y = flap;
        b.rightWing.rotation.y = -flap;

        // Flutter Movement Path
        b.angle += 0.008 * b.speed;
        const currentRadius = b.radius + Math.sin(elapsedTime * 0.8 + b.seed) * 2.5;
        const targetX = Math.cos(b.angle) * currentRadius + (mouse.x * 0.2);
        const targetZ = Math.sin(b.angle) * currentRadius * 0.6;
        const targetY = b.baseY + Math.sin(elapsedTime * b.speed + b.seed) * 2.5 + (mouse.y * 0.2);

        // Previous position to calculate heading
        const prevPos = b.group.position.clone();
        b.group.position.set(targetX, targetY, targetZ);

        // Orient butterfly towards motion
        const moveVec = b.group.position.clone().sub(prevPos);
        if (moveVec.lengthSq() > 0.0001) {
          b.group.quaternion.slerp(
            new THREE.Quaternion().setFromUnitVectors(
              new THREE.Vector3(0, 1, 0),
              moveVec.normalize()
            ),
            0.1
          );
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('resize', handleResize);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 15
      }}
    />
  );
}
