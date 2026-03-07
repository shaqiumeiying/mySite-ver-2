"use client";

import { useRef, useCallback, useEffect, useMemo, useLayoutEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { BufferGeometry, BufferAttribute, AdditiveBlending, MathUtils, Mesh, Group, Vector3 } from "three";
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing";
import { useTexture } from "@react-three/drei";
import { BlendFunction } from "postprocessing";

const PARTICLE_COUNT = 1200;
const RADIUS = 60;
const DEPTH = 40;
const MOUSE_INFLUENCE = 0.5;
const LERP_FACTOR = 0.05;

const PINK: [number, number, number] = [1.0, 0.78, 0.84];
const CYAN: [number, number, number] = [0.48, 1.0, 0.91];

function ClearBackground() {
  const { scene } = useThree();
  useLayoutEffect(() => {
    scene.background = null;
  }, [scene]);
  return null;
}

function Rig({ mouseRef }: { mouseRef: React.RefObject<{ x: number; y: number }> }) {
  useFrame((state) => {
    if (!mouseRef.current) return;
    const { camera } = state;
    const { x: mx, y: my } = mouseRef.current;

    const targetX = mx * MOUSE_INFLUENCE;
    const targetY = my * MOUSE_INFLUENCE;

    camera.position.x = MathUtils.lerp(camera.position.x, targetX, LERP_FACTOR);
    camera.position.y = MathUtils.lerp(camera.position.y, targetY, LERP_FACTOR);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function generateSphericalPosition(): [number, number, number] {
  const r = RADIUS + DEPTH * Math.random();
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);
  return [
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.sin(phi) * Math.sin(theta),
    r * Math.cos(phi),
  ];
}

const METEOR_SPEED = 1.2;
const METEOR_MAX_LENGTH = 1.8;
const METEOR_TRAVEL_DISTANCE = 3;
const METEOR_ANGLE = -Math.PI * 0.75;

const NEON_PINK = "#ffc7d7";
const NEON_CYAN = "#7affe7";

function ShootingStar({ initialDelay = 0 }: { initialDelay?: number }) {
  const groupRef = useRef<Group>(null);
  const tailRef = useRef<Mesh>(null);
  const headRef = useRef<Mesh>(null);
  const { viewport } = useThree();

  const starTex = useTexture("/images/star.png");

  const flightState = useRef({
    active: false,
    progress: 0,
    startPos: new Vector3(),
    endPos: new Vector3(),
    rotation: 0,
    color: NEON_PINK,
  });

  const spawn = useCallback(() => {
    const startX = (Math.random() - 0.5) * viewport.width * 0.9;
    const startY = (Math.random() - 0.5) * viewport.height * 0.9;

    const angle = METEOR_ANGLE;
    const distance = METEOR_TRAVEL_DISTANCE + Math.random() * 2;

    const endX = startX + Math.cos(angle) * distance;
    const endY = startY + Math.sin(angle) * distance;

    flightState.current.startPos.set(startX, startY, -5);
    flightState.current.endPos.set(endX, endY, -5);

    flightState.current.rotation = angle - Math.PI / 2;

    flightState.current.color = Math.random() < 0.5 ? NEON_PINK : NEON_CYAN;

    flightState.current.progress = 0;
    flightState.current.active = true;

    if (tailRef.current) {
      (tailRef.current.material as THREE.MeshBasicMaterial).color.set(
        flightState.current.color
      );
    }
  }, [viewport]);

  const scheduleRespawn = useCallback(() => {
    const delay = 3000 + Math.random() * 7000;
    setTimeout(() => spawn(), delay);
  }, [spawn]);

  useEffect(() => {
    const timeout = setTimeout(() => spawn(), initialDelay * 1000);
    return () => clearTimeout(timeout);
  }, [initialDelay, spawn]);

  useFrame((_, delta) => {
    if (!groupRef.current || !tailRef.current || !headRef.current) return;

    if (!flightState.current.active) {
      groupRef.current.visible = false;
      return;
    }

    flightState.current.progress += delta * METEOR_SPEED;
    const progress = Math.min(flightState.current.progress, 1);

    const breathScale = Math.sin(progress * Math.PI);

    const currentLength = Math.max(0.001, breathScale * METEOR_MAX_LENGTH);
    tailRef.current.scale.y = currentLength;
    tailRef.current.scale.x = 0.6 + breathScale * 0.5;
    tailRef.current.scale.z = 0.6 + breathScale * 0.5;
    tailRef.current.position.y = -currentLength / 2;

    headRef.current.scale.setScalar(Math.max(0.001, breathScale * 1.2));

    const currentPos = new Vector3().lerpVectors(
      flightState.current.startPos,
      flightState.current.endPos,
      progress
    );
    groupRef.current.position.copy(currentPos);
    groupRef.current.rotation.set(0, 0, flightState.current.rotation);

    groupRef.current.visible = breathScale > 0.005;

    if (progress >= 1) {
      flightState.current.active = false;
      groupRef.current.visible = false;
      scheduleRespawn();
    }
  });

  return (
    <group ref={groupRef} visible={false}>
      <mesh ref={tailRef}>
        <cylinderGeometry args={[0.015, 0, 1, 8]} />
        <meshBasicMaterial
          color={NEON_PINK}
          transparent
          opacity={0.9}
        />
      </mesh>
      <mesh ref={headRef}>
        <planeGeometry args={[0.15, 0.15]} />
        <meshBasicMaterial
          map={starTex}
          transparent
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function StarField() {
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const [x, y, z] = generateSphericalPosition();
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const rand = Math.random();
      let r: number, g: number, b: number;

      if (rand < 0.025) {
        [r, g, b] = PINK;
      } else if (rand < 0.05) {
        [r, g, b] = CYAN;
      } else {
        const brightness = 0.8 + Math.random() * 0.2;
        r = g = b = brightness;
      }

      colors[i * 3] = r;
      colors[i * 3 + 1] = g;
      colors[i * 3 + 2] = b;
    }

    return { positions, colors };
  }, []);

  const geometry = useMemo(() => {
    const geo = new BufferGeometry();
    geo.setAttribute("position", new BufferAttribute(positions, 3));
    geo.setAttribute("color", new BufferAttribute(colors, 3));
    geo.computeBoundingSphere();
    return geo;
  }, [positions, colors]);

  return (
    <points geometry={geometry}>
      <pointsMaterial
        size={0.05}
        sizeAttenuation={true}
        vertexColors={true}
        transparent={true}
        opacity={0.8}
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  );
}

export default function ParticleBackground() {
  const mouseRef = useRef({ x: 0, y: 0 });

  const handlePointerMove = useCallback((e: PointerEvent) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    mouseRef.current = { x, y };
  }, []);

  useEffect(() => {
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [handlePointerMove]);

  return (
    <div
      className="fixed inset-0 -z-10 bg-black/90 pointer-events-none"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: "high-performance",
          stencil: false,
          depth: false,
        }}
      >
        <ClearBackground />
        <StarField />
        <ShootingStar initialDelay={2} />
        <Rig mouseRef={mouseRef} />
        <EffectComposer enableNormalPass={false} multisampling={0}>
          <Bloom
            luminanceThreshold={0.3}
            luminanceSmoothing={0.9}
            intensity={0.8}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
