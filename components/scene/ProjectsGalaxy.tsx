"use client";

import { Billboard, Float, Html, Line, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { AnimatePresence, motion } from "framer-motion";
import { Suspense, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import type { Project } from "@/lib/portfolio-data";
import { projects } from "@/lib/portfolio-data";

function ProjectPlanet({
  project,
  index,
  onSelect,
  active,
}: {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
  active: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const angle = (index / projects.length) * Math.PI * 2;
  const radius = 1.70 + (index % 2) * 0.60;
  const color = useMemo(() => new THREE.Color(project.accent), [project.accent]);

  useFrame(({ clock }) => {
    const elapsed = clock.elapsedTime;
    if (!meshRef.current) return;
    meshRef.current.position.set(
      Math.cos(angle + elapsed * 0.08) * radius,
      Math.sin(elapsed * 0.6 + index) * 0.30,
      Math.sin(angle + elapsed * 0.10) * radius * 0.45,
    );
    meshRef.current.rotation.y += 0.006;
    meshRef.current.scale.lerp(new THREE.Vector3(active ? 1.08 : 1, active ? 1.08 : 1, active ? 1.08 : 1), 0.08);
  });

  return (
    <group>
      <Float speed={1 + index * 0.1} floatIntensity={0.16} rotationIntensity={0.08}>
        <mesh
          ref={meshRef}
          onPointerOver={() => {
            document.body.style.cursor = "pointer";
            onSelect(project);
          }}
          onPointerOut={() => {
            document.body.style.cursor = "";
          }}
          onClick={() => onSelect(project)}
        >
          <icosahedronGeometry args={[0.38, 4]} />
          <meshPhysicalMaterial
            color={color}
            roughness={0.34}
            metalness={0.46}
            clearcoat={0.8}
            transmission={0.05}
            emissive={color}
            emissiveIntensity={active ? 0.32 : 0.12}
          />
          <Billboard>
            <Html transform distanceFactor={3.35}>
              <button type="button" className="project-holo-label" onClick={() => onSelect(project)}>
                <span>{project.category}</span>
                <strong>{project.title}</strong>
              </button>
            </Html>
          </Billboard>
        </mesh>
      </Float>
    </group>
  );
}

function GalaxyScene({ selected, onSelect }: { selected: Project; onSelect: (project: Project) => void }) {
  const groupRef = useRef<THREE.Group>(null);
  const orbitPoints = useMemo(() => {
    return Array.from({ length: 220 }, (_, index) => {
      const angle = (index / 219) * Math.PI * 2;
      return new THREE.Vector3(Math.cos(angle) * 2.18, Math.sin(angle) * 0.22, Math.sin(angle) * 0.78);
    });
  }, []);

  useFrame(({ pointer }, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.055;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, pointer.y * 0.12, 0.08);
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.18, 6.8]} fov={36} />
      <ambientLight intensity={0.66} />
      <directionalLight position={[2, 4, 5]} intensity={1.3} />
      <pointLight position={[-3, 2, 2]} color="#a78bfa" intensity={9} />
      <group ref={groupRef} scale={0.92}>
        <Line points={orbitPoints} color="#36f5c7" transparent opacity={0.18} lineWidth={1} />
        {projects.map((project, index) => (
          <ProjectPlanet
            key={project.id}
            project={project}
            index={index}
            active={selected.id === project.id}
            onSelect={onSelect}
          />
        ))}
      </group>
    </>
  );
}

export function ProjectsGalaxy() {
  const [selected, setSelected] = useState(projects[0]);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-stretch">
      <div className="relative h-[560px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025]">
        <Canvas gl={{ antialias: true, alpha: true }} dpr={[1, 1.6]} performance={{ min: 0.55 }}>
          <Suspense fallback={null}>
            <GalaxyScene selected={selected} onSelect={setSelected} />
          </Suspense>
        </Canvas>
      </div>
      <AnimatePresence mode="wait">
        <motion.aside
          key={selected.id}
          className="glass-panel rounded-[2rem] border border-white/10 p-6"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ type: "spring", stiffness: 210, damping: 22 }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/70">{selected.category}</p>
          <h3 className="mt-4 text-4xl leading-none text-white">{selected.title}</h3>
          <p className="mt-4 text-white/62">{selected.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {selected.stack.map((item) => (
              <span key={item} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-sm text-white/68">
                {item}
              </span>
            ))}
          </div>
          <p className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-4 text-cyan-100/80">{selected.metrics}</p>
          <a
            href={selected.href}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-cyan-200"
          >
            Open project →
          </a>
        </motion.aside>
      </AnimatePresence>
    </div>
  );
}
