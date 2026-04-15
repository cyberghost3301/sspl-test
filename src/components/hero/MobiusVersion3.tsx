import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry.js';

export default function MobiusVersion3() {
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
      const R = 2.2;     
      const w = 0.5;   
      const twist = -1; 
      const x = (R + w * v * Math.cos(twist * u / 2)) * Math.cos(u);
      const y = (R + w * v * Math.cos(twist * u / 2)) * Math.sin(u);
      const z = w * v * Math.sin(twist * u / 2);
      target.set(x, y, z);
    };

    // Extreme density for the "energy ribbon" look
    const geometry = new ParametricGeometry(mobiusFunction, 400, 40);
    
    // Pure wireframe material with additive blending for glow
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: 0x00d4ff, 
      transparent: true, 
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    const mobiusLines = new THREE.LineSegments(
      new THREE.WireframeGeometry(geometry), 
      lineMaterial
    );
    
    // Lock the angle so it flows nicely across the screen
    mobiusLines.rotation.x = Math.PI / 5;
    scene.add(mobiusLines);

    camera.position.set(0, 0, 6.5);

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      // Smooth, flowing treadmill loop
      mobiusLines.rotation.z -= 0.003; 
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
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
}
