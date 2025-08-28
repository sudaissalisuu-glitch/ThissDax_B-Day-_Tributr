"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

const ThreeScene = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / (window.innerHeight * 0.8),
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight * 0.8);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;


    // "Quasimodo" model - a simple abstract shape
    const group = new THREE.Group();
    const material = new THREE.MeshStandardMaterial({
      color: 0x6a2cbd,
      roughness: 0.3,
      metalness: 0.2,
    });
    const accentMaterial = new THREE.MeshStandardMaterial({
      color: 0xa851eb,
      roughness: 0.1,
      metalness: 0.1,
    });

    const mainBody = new THREE.Mesh(new THREE.BoxGeometry(1.5, 2, 1.5), material);
    mainBody.position.y = 0;
    group.add(mainBody);

    const head = new THREE.Mesh(new THREE.SphereGeometry(0.7, 32, 32), accentMaterial);
    head.position.y = 1.6;
    group.add(head);

    const arm1 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 1.2, 0.4), material);
    arm1.position.set(-1.1, 0.2, 0);
    arm1.rotation.z = 0.4;
    group.add(arm1);

    const arm2 = arm1.clone();
    arm2.position.x = 1.1;
    arm2.rotation.z = -0.4;
    group.add(arm2);

    group.rotation.y = -0.5;
    group.rotation.x = -0.1;
    scene.add(group);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 2);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xa851eb, 5);
    pointLight2.position.set(-5, -3, 2);
    scene.add(pointLight2);

    // Animation
    const mouse = new THREE.Vector2();
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / (window.innerHeight * 0.8)) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      requestAnimationFrame(animate);

      // Animate rotation based on mouse position
      gsap.to(group.rotation, {
        y: mouse.x * 0.5 + Math.sin(elapsedTime * 0.2) * 0.3,
        x: -mouse.y * 0.3,
        duration: 2,
      });

      renderer.render(scene, camera);
    };
    animate();

    // Handle Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / (window.innerHeight * 0.8);
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight * 0.8);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    const mount = mountRef.current;
    const currentRenderer = rendererRef.current;
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (mount && currentRenderer) {
        mount.removeChild(currentRenderer.domElement);
      }
      scene.traverse(object => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
             object.material.forEach(material => material.dispose());
          } else {
             object.material.dispose();
          }
        }
      })
    };
  }, []);

  return <div ref={mountRef} className="absolute top-0 left-0 w-full h-full" />;
};

export default ThreeScene;
