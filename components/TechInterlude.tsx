"use client";

import { Suspense, useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Environment, Billboard, useTexture } from "@react-three/drei";
import { MathUtils, AdditiveBlending, Group } from "three";
import { motion } from "framer-motion";

const SKILLS = [
  { name: "Unity", icon: "/icons/unity.png" },
  { name: "Blender", icon: "/icons/blender.png" },
  { name: "Python", icon: "/icons/python.png" },
  { name: "C++", icon: "/icons/CP.png" },
  { name: "JavaScript", icon: "/icons/js.png" },
  { name: "HTML", icon: "/icons/html.png" },
  { name: "CSS", icon: "/icons/css.png" },
  { name: "R", icon: "/icons/R.png" },
  { name: "SQL", icon: "/icons/sql.png" },
  { name: "MATLAB", icon: "/icons/matlab.png" },
  { name: "Figma", icon: "/icons/figma.png" },
  { name: "After Effects", icon: "/icons/ac.png" },
];


const ORBIT_PLANES = [
  { rotation: [Math.PI / 2.5, 0, 0.2], radius: 2.4, speed: 0.12 },
  { rotation: [Math.PI / 2, 0.5, -0.3], radius: 2.8, speed: 0.09 },
  { rotation: [Math.PI / 1.8, -0.4, 0.5], radius: 3.2, speed: 0.07 },
];

function SatelliteIcon({ icon }: { icon: string }) {
  const texture = useTexture(icon);
  
  return (
    <mesh scale={0.4}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial 
        map={texture} 
        transparent 
        toneMapped={false}
        depthWrite={false}
      />
    </mesh>
  );
}

function Satellite({ icon, plane, index, total }: any) {
  const ref = useRef<Group>(null);
  const angle = (index / total) * Math.PI * 2;
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * plane.speed + angle;
    if (ref.current) {
      ref.current.position.x = Math.cos(t) * plane.radius;
      ref.current.position.y = 0;
      ref.current.position.z = Math.sin(t) * plane.radius;
    }
  });

  return (
    <group ref={ref}>
      <Billboard>
        <Suspense fallback={
          <mesh scale={0.2}>
            <circleGeometry args={[1, 16]} />
            <meshBasicMaterial color="#7affe7" transparent opacity={0.3} />
          </mesh>
        }>
          <SatelliteIcon icon={icon} />
        </Suspense>
        <mesh scale={0.45} position={[0, 0, -0.01]}>
          <circleGeometry args={[1, 16]} />
          <meshBasicMaterial 
            color="#7affe7" 
            transparent 
            opacity={0.05} 
            blending={AdditiveBlending} 
            depthWrite={false}
          />
        </mesh>
      </Billboard>
    </group>
  );
}

function CentralCore() {
  const coreRef = useRef<any>(null);

  return (
    <group>

      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.2, 4]} />
        <MeshDistortMaterial
          color="#050508"
          roughness={0.4}
          metalness={0.2}
          distort={0.5}
          speed={1.5}
          transparent
          opacity={0.9}
        />
      </mesh>
      

      <pointLight position={[0.5, 0.5, 0.5]} intensity={2} color="#7affe7" distance={3} />
      <pointLight position={[-0.5, -0.5, -0.5]} intensity={1.5} color="#ffc7d7" distance={3} />
      

      {ORBIT_PLANES.map((p, i) => (
        <mesh key={i} rotation={p.rotation as any}>
          <torusGeometry args={[p.radius, 0.006, 8, 80]} />
          <meshBasicMaterial 
            color={i % 2 === 0 ? "#7affe7" : "#ffc7d7"} 
            transparent 
            opacity={0.1} 
            blending={AdditiveBlending} 
          />
        </mesh>
      ))}
    </group>
  );
}

function Scene() {
  const mainGroup = useRef<Group>(null);

  useFrame((state) => {
    if (mainGroup.current) {
      mainGroup.current.rotation.y = MathUtils.lerp(mainGroup.current.rotation.y, state.pointer.x * 0.3, 0.05);
      mainGroup.current.rotation.x = MathUtils.lerp(mainGroup.current.rotation.x, -state.pointer.y * 0.2, 0.05);
    }
  });

  return (
    <group ref={mainGroup}>
      <CentralCore />
      {SKILLS.map((skill, i) => {
        const planeIndex = i % ORBIT_PLANES.length;
        const iconsInPlane = Math.ceil(SKILLS.length / ORBIT_PLANES.length);
        const indexInPlane = Math.floor(i / ORBIT_PLANES.length);
        
        return (
          <group key={skill.name} rotation={ORBIT_PLANES[planeIndex].rotation as any}>
            <Satellite 
              icon={skill.icon} 
              plane={ORBIT_PLANES[planeIndex]} 
              index={indexInPlane} 
              total={iconsInPlane} 
            />
          </group>
        );
      })}
    </group>
  );
}

export default function TechInterlude() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setHasLoaded(true);
        }
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: "150px", threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasLoaded]);

  return (
    <section className="relative py-32 overflow-hidden" ref={containerRef}>
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 relative z-10"
        >
          <h3 className="text-3xl font-serif text-white tracking-tight">Technical Ecosystem</h3>
          <p className="text-zinc-500 mt-2 font-sans text-sm tracking-widest uppercase">
            Unity & VR Development Pipeline
          </p>
        </motion.div>

        <div className="relative h-[600px] w-full">
          {hasLoaded ? (
            <Suspense fallback={<div className="flex h-full items-center justify-center"><div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-700 border-t-cyan-400" /></div>}>
              <Canvas 
                camera={{ position: [0, 0, 8], fov: 40 }} 
                frameloop={isVisible ? "always" : "never"}
                gl={{ 
                  alpha: true, 
                  antialias: false,
                  powerPreference: "high-performance",
                  stencil: false,
                }}
                dpr={[1, 1.5]}
              >
                <ambientLight intensity={0.4} />
                <Scene />
                <Environment preset="night" />
              </Canvas>
            </Suspense>
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-700 border-t-cyan-400" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Preload all icon textures
SKILLS.forEach(skill => {
  useTexture.preload(skill.icon);
});