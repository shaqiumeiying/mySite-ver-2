"use client";

import { Suspense, useRef, useState, useEffect, useMemo, Component, ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Center,
  ContactShadows,
  Environment,
  OrbitControls,
  useGLTF,
  Lightformer,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Group } from "three";

const MODEL_DESKTOP = "/models/OC.glb";
const MODEL_MOBILE = "/models/heartnstars.glb";
const DRACO_CDN = "https://www.gstatic.com/draco/versioned/decoders/1.5.6/";

const MOBILE_BREAKPOINT = 1024; // tablets and phones use lighter model

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("3D Model Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function Model({ modelPath }: { modelPath: string }) {
  const groupRef = useRef<Group>(null);
  const { scene } = useGLTF(modelPath, DRACO_CDN);
  
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={clonedScene} scale={1.2} />
      </Center>
    </group>
  );
}

function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-700 border-t-[#7affe7]" />
        <p className="text-sm tracking-widest text-zinc-500">
          Loading 3D Workspace...
        </p>
      </div>
    </div>
  );
}

function ErrorFallback({ error }: { error?: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-4 px-6 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
          <span className="text-2xl">⚠️</span>
        </div>
        <p className="text-sm font-medium text-zinc-300">
          Failed to load 3D model
        </p>
        <p className="text-xs text-zinc-500">
          {error || "Check console for details"}
        </p>
      </div>
    </div>
  );
}

function FloatingRings() {
  const ring1Ref = useRef<any>(null);
  const ring2Ref = useRef<any>(null);
  const ring3Ref = useRef<any>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.1;
      ring1Ref.current.rotation.x = Math.sin(t * 0.2) * 0.1;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.08;
      ring2Ref.current.rotation.y = Math.cos(t * 0.15) * 0.1;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = t * 0.05;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh ref={ring1Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[4, 0.008, 8, 48]} />
        <meshBasicMaterial color="#ffc7d7" transparent opacity={0.15} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[Math.PI / 3.5, 0.3, 0]}>
        <torusGeometry args={[3, 0.006, 8, 48]} />
        <meshBasicMaterial color="#ff8fa3" transparent opacity={0.12} />
      </mesh>
      <mesh ref={ring3Ref} rotation={[Math.PI / 1.8, -0.2, 0]}>
        <torusGeometry args={[4.5, 0.004, 8, 48]} />
        <meshBasicMaterial color="#7affe7" transparent opacity={0.06} />
      </mesh>
    </group>
  );
}

function GridFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]}>
      <planeGeometry args={[25, 25, 15, 15]} />
      <meshBasicMaterial 
        color="#ff8fa3" 
        wireframe 
        transparent 
        opacity={0.06} 
      />
    </mesh>
  );
}

function Scene({ modelPath }: { modelPath: string }) {
  const controlsRef = useRef<any>(null);

  return (
    <>
      {/* Soft ambient */}
      <ambientLight intensity={0.4} />

      {/* Main key light */}
      <directionalLight position={[5, 5, 5]} intensity={1.2} />

      {/* Pink rim light */}
      <pointLight position={[-4, 2, -3]} intensity={2.5} color="#ffc7d7" distance={15} />

      {/* Cyan accent */}
      <pointLight position={[4, -1, 3]} intensity={1.5} color="#7affe7" distance={12} />

      {/* Front spotlight */}
      <spotLight
        position={[0, 1, 6]}
        angle={0.4}
        penumbra={0.5}
        intensity={1.5}
        color="#ffffff"
        distance={15}
      />

      <Suspense fallback={null}>
        <Model key={modelPath} modelPath={modelPath} />
        <FloatingRings />
        <GridFloor />
        
        {/* Simple contact shadows */}
        <ContactShadows
          position={[0, -2.4, 0]}
          opacity={0.5}
          scale={8}
          blur={2}
          far={3}
        />
        
        {/* HDRI environment with neon lightformers */}
        <Environment resolution={128} background={false}>
          <Lightformer
            intensity={4}
            rotation-y={Math.PI / 2}
            position={[-5, 1, 0]}
            scale={[10, 4, 1]}
            color="#ffc7d7"
          />
          <Lightformer
            intensity={2.5}
            rotation-y={-Math.PI / 2}
            position={[5, 1, 0]}
            scale={[10, 4, 1]}
            color="#7affe7"
          />
        </Environment>
      </Suspense>

      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableZoom={true}
        minDistance={4}
        maxDistance={20}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2}
        autoRotate={false}
        makeDefault
      />

      {/* Subtle bloom */}
      <EffectComposer enableNormalPass={false} multisampling={0}>
        <Bloom
          luminanceThreshold={0.6}
          luminanceSmoothing={0.9}
          intensity={0.4}
        />
      </EffectComposer>
    </>
  );
}

export default function ModelViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [modelPath, setModelPath] = useState(MODEL_DESKTOP);

  // Lazy: only mount Canvas when section is near viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setHasLoaded(true);
        }
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: "150px", threshold: 0 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasLoaded]);

  // Use lighter model on tablets and phones for performance
  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const update = () => setModelPath(media.matches ? MODEL_MOBILE : MODEL_DESKTOP);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <section id="3d-showcase" className="space-y-6" ref={containerRef}>
      <div className="rounded-xl bg-black/40 px-4 py-3 backdrop-blur-sm sm:px-5">
      <h2 className="font-sora text-lg font-extrabold tracking-tighter text-zinc-50 sm:text-xl">
      Code x Canvas
      </h2>
      <h3 className="font-sora mt-1 text-sm font-light leading-relaxed tracking-tight text-zinc-300">
        A curated selection of technical 3D artifacts and experiments built with logic inside and soul outside. {" "} 
        <span className="font-semibold bg-gradient-to-r from-[#7affe7] to-[#ffc7d7] bg-clip-text text-transparent">
       Logic
      </span>{" "}
      inside and{" "}
      <span className="font-semibold bg-gradient-to-r from-[#7affe7] to-[#ffc7d7] bg-clip-text text-transparent">
       Soul
      </span>{" "}
      outside.
      </h3>
  
      <p className="mt-2 text-[10px] font-medium uppercase tracking-widest text-zinc-500">
      Drag to rotate · Scroll to zoom
      </p>
      </div>

      <div
        className="relative h-[400px] w-full overflow-hidden rounded-2xl border border-white/5 bg-black sm:h-[500px] lg:h-[600px]"
        style={{
          boxShadow: "inset 0 0 20px rgba(122,255,231,0.05), inset 0 0 40px rgba(255,199,215,0.03), 0 0 1px rgba(122,255,231,0.2)",
        }}
      >
        {hasLoaded ? (
          <ErrorBoundary fallback={<ErrorFallback />}>
            <Suspense fallback={<LoadingFallback />}>
              <Canvas
                camera={{ position: [0, 0.5, 14], fov: 35 }}
                frameloop={isVisible ? "always" : "never"}
                gl={{ 
                  antialias: false, 
                  alpha: true,
                  powerPreference: "high-performance",
                  stencil: false,
                }}
                dpr={[1, 1.5]}
                style={{ width: "100%", height: "100%" }}
              >
                <Scene modelPath={modelPath} />
              </Canvas>
            </Suspense>
          </ErrorBoundary>
        ) : (
          <LoadingFallback />
        )}

        {/* Subtle gradient overlay at edges */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-black/50 via-transparent to-black/30" />

        {/* Technical status bar */}
        <div className="absolute bottom-4 right-4 flex items-center gap-3 rounded-md bg-black/40 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500 backdrop-blur-sm">
          <span>RENDERER: WEBGL 2.0</span>
          <span className="h-0.5 w-0.5 rounded-full bg-zinc-600" />
          <span className="text-[#7affe7]/90">STATUS: ACTIVE</span>
        </div>
      </div>
    </section>
  );
}

