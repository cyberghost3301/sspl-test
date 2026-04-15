import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry.js';

export default function MobiusVersion1() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    const mobiusFunction = (u: number, v: number, target: THREE.Vector3) => {
      u = u * Math.PI * 2;
      v = (v - 0.5) * 2; 
      const R = 2.5;     
      const w = 0.25;    
      const twist = -1;  
      const x = (R + w * v * Math.cos(twist * u / 2)) * Math.cos(u);
      const y = (R + w * v * Math.cos(twist * u / 2)) * Math.sin(u);
      const z = w * v * Math.sin(twist * u / 2);
      target.set(x, y, z);
    };

    const geometry = new ParametricGeometry(mobiusFunction, 300, 20);
    
    const baseMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x050505,
      emissive: 0x020202,
      metalness: 0.9,
      roughness: 0.2,
      transmission: 0.8, 
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide
    });

    const wireframeGeometry = new THREE.WireframeGeometry(geometry);
    const wireframeMaterial = new THREE.LineBasicMaterial({ 
      color: 0x00d4ff,
      transparent: true, 
      opacity: 0.4,
      blending: THREE.AdditiveBlending
    });
    
    const ribbonBase = new THREE.Mesh(geometry, baseMaterial);
    const ribbonWireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
    
    const mobiusGroup = new THREE.Group();
    mobiusGroup.add(ribbonBase);
    mobiusGroup.add(ribbonWireframe);
    mobiusGroup.rotation.x = Math.PI / 6; 
    scene.add(mobiusGroup);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight1 = new THREE.PointLight(0x00d4ff, 150, 100);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x5500ff, 150, 100);
    pointLight2.position.set(-5, -5, -5);
    scene.add(pointLight2);

    camera.position.set(0, 0, 7);

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      mobiusGroup.rotation.z -= 0.002;
      mobiusGroup.rotation.y += 0.001;
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
      wireframeGeometry.dispose();
      baseMaterial.dispose();
      wireframeMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
}
