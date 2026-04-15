import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry.js';

export default function MobiusVersion4() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    // Ensure maximum sharpness on high-DPI displays
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // 1. Create a naturally larger Mobius to avoid extreme stretching later
    const mobiusFunction = (u: number, v: number, target: THREE.Vector3) => {
      u = u * Math.PI * 2;
      v = (v - 0.5) * 2; 
      const R = 3.2;     // Increased base radius significantly
      const w = 0.8;     // Kept proportional width
      const twist = -1; 
      const x = (R + w * v * Math.cos(twist * u / 2)) * Math.cos(u);
      const y = (R + w * v * Math.cos(twist * u / 2)) * Math.sin(u);
      const z = w * v * Math.sin(twist * u / 2);
      target.set(x, y, z);
    };

    // Extreme density (500x40) to keep the glowing lines razor sharp
    const geometry = new ParametricGeometry(mobiusFunction, 500, 40);
    
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: 0x00d4ff, 
      transparent: true, 
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    const mobiusLines = new THREE.LineSegments(
      new THREE.WireframeGeometry(geometry), 
      lineMaterial
    );

    // 2. The Gentle Scale Hack
    // We use a much lighter ratio (1.6 to 0.7) so the lines stay crisp and maintain their aspect ratio
    const scaleGroup = new THREE.Group();
    scaleGroup.add(mobiusLines);
    scene.add(scaleGroup);

    // 2. Dynamic Responsive Layout
    const updateLayout = () => {
      const isMobile = window.innerWidth < 768;
      
      if (isMobile) {
        // Mobile: Less stretch, pull camera WAY back to fit the vertical screen
        scaleGroup.scale.set(1.0, 0.8, 1.0); 
        scaleGroup.rotation.x = Math.PI / 4;
        camera.position.set(0, 0, 14); 
      } else {
        // Desktop: Wide infinity stretch, closer camera
        scaleGroup.scale.set(1.6, 0.7, 1.0); 
        scaleGroup.rotation.x = Math.PI / 3.5;
        camera.position.set(0, 0, 8.5);
      }
    };

    // Run once on load
    updateLayout();

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      // Smooth treadmill flow inside the group
      mobiusLines.rotation.z -= 0.003; 
      
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      updateLayout(); // Re-calculate 3D scaling on window resize
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
