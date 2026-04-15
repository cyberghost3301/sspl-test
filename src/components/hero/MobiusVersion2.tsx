import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry.js';

export default function MobiusVersion2() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    const mobiusFunction = (u: number, v: number, target: THREE.Vector3) => {
      u = u * Math.PI * 2;
      v = (v - 0.5) * 2; 
      const R = 2;     
      const w = 0.4;   
      const twist = -1; 
      const x = (R + w * v * Math.cos(twist * u / 2)) * Math.cos(u);
      const y = (R + w * v * Math.cos(twist * u / 2)) * Math.sin(u);
      const z = w * v * Math.sin(twist * u / 2);
      target.set(x, y, z);
    };

    const geometry = new ParametricGeometry(mobiusFunction, 150, 30);
    
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x111111,
      emissive: 0x001122,
      metalness: 0.8,
      roughness: 0.1,
      transmission: 0.9, 
      side: THREE.DoubleSide
    });

    const edges = new THREE.EdgesGeometry(geometry);
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: 0x00d4ff, 
      transparent: true, 
      opacity: 0.4 
    });
    
    const mobius = new THREE.Mesh(geometry, material);
    const mobiusLines = new THREE.LineSegments(edges, lineMaterial);
    
    mobius.add(mobiusLines);
    mobius.rotation.x = Math.PI / 5;
    mobius.rotation.y = 0;
    scene.add(mobius);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x00d4ff, 100, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.set(0, 0, 7);

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      // Only animate Z for a continuous flowing loop
      mobius.rotation.z -= 0.002; 
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      currentMount.removeChild(renderer.domElement);
      geometry.dispose();
      edges.dispose();
      material.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
}
