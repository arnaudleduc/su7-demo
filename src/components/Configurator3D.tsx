"use client";

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  useGLTF,
  useProgress,
  Html,
} from "@react-three/drei";
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { SkeletonUtils } from "three-stdlib";

/* ─── Color palette ─── */
const BODY_COLORS = [
  { name: "Obsidian Black",  hex: "#141414", metalness: 0.85, roughness: 0.12 },
  { name: "Pearl White",     hex: "#f0ede8", metalness: 0.35, roughness: 0.22 },
  { name: "Xiaomi Red",      hex: "#dc2626", metalness: 0.55, roughness: 0.18 },
  { name: "Ocean Blue",      hex: "#1e3a8a", metalness: 0.65, roughness: 0.16 },
  { name: "Arctic Silver",   hex: "#8fa0b0", metalness: 0.82, roughness: 0.18 },
  { name: "Champagne Gold",  hex: "#c8a45a", metalness: 0.78, roughness: 0.16 },
];
type BodyColor = (typeof BODY_COLORS)[0];

const CAR_PAINT_MAT = "untitledMAT_CarPaint_SU7_Base1";

/* ─── Loader overlay ─── */
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
        <div style={{ width: 180, height: 2, background: "rgba(255,255,255,0.1)", borderRadius: 2, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: "#dc2626", borderRadius: 2, transition: "width 0.3s ease" }} />
        </div>
        <span style={{ fontSize: "0.7rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-body)" }}>
          {Math.round(progress)}%
        </span>
      </div>
    </Html>
  );
}

/* ─── 3D Model ─── */
function SU7Model({ bodyColor, onLoaded }: { bodyColor: BodyColor; onLoaded: () => void }) {
  const gltf = useGLTF("/2024_xiaomi_su7_max.glb");

  const clone = useMemo(() => {
    const c = SkeletonUtils.clone(gltf.scene);
    // Clone the car paint material so we never mutate the cached original
    c.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        const mat = child.material as THREE.MeshStandardMaterial;
        if (mat.name === CAR_PAINT_MAT) {
          child.material = mat.clone();
          child.material.name = CAR_PAINT_MAT;
        }
      }
    });
    return c;
  }, [gltf.scene]);

  useEffect(() => { onLoaded(); }, [onLoaded]);

  // Update color & finish whenever the selection changes
  useEffect(() => {
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        const mat = child.material as THREE.MeshStandardMaterial;
        if (mat.name === CAR_PAINT_MAT) {
          mat.color.set(bodyColor.hex);
          mat.metalness  = bodyColor.metalness;
          mat.roughness  = bodyColor.roughness;
          mat.needsUpdate = true;
        }
      }
    });
  }, [bodyColor, clone]);

  return (
    <group dispose={null} scale={0.01}>
      <primitive object={clone} />
    </group>
  );
}

useGLTF.preload("/2024_xiaomi_su7_max.glb");

/* ─── Scene ─── */
function Scene({ bodyColor, onLoaded }: { bodyColor: BodyColor; onLoaded: () => void }) {
  const [userInteracted, setUserInteracted] = useState(false);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[6, 10, 6]}  intensity={1.4} castShadow />
      <directionalLight position={[-6, 4, -4]} intensity={0.5} color="#b8d4ff" />
      <spotLight position={[0, 8, 0]} intensity={0.3} angle={0.6} penumbra={1} />

      <Environment preset="studio" background={false} />

      <Suspense fallback={<Loader />}>
        <SU7Model bodyColor={bodyColor} onLoaded={onLoaded} />
      </Suspense>

      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.5}
        scale={14}
        blur={2.2}
        far={3}
        color="#000"
      />

      <OrbitControls
        enablePan={false}
        minDistance={2.5}
        maxDistance={11}
        maxPolarAngle={Math.PI / 2 - 0.04}
        autoRotate={!userInteracted}
        autoRotateSpeed={0.5}
        onStart={() => setUserInteracted(true)}
      />
    </>
  );
}

/* ─── UI: color swatch ─── */
function ColorSwatch({ color, selected, onClick, onHover }: {
  color: BodyColor;
  selected: boolean;
  onClick: () => void;
  onHover: (name: string | null) => void;
}) {
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => onHover(color.name)}
      onMouseLeave={() => onHover(null)}
      aria-label={color.name}
      style={{
        width:  selected ? 34 : 26,
        height: selected ? 34 : 26,
        borderRadius: "50%",
        background: color.hex,
        border: selected ? "2.5px solid rgba(255,255,255,0.9)" : "2px solid rgba(255,255,255,0.2)",
        boxShadow: selected
          ? `0 0 0 3px rgba(255,255,255,0.2), 0 4px 14px rgba(0,0,0,0.5)`
          : "0 2px 6px rgba(0,0,0,0.4)",
        cursor: "pointer",
        flexShrink: 0,
        transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
        transform: selected ? "scale(1)" : "scale(0.88)",
      }}
    />
  );
}

/* ─── Main export ─── */
export default function Configurator3D() {
  const [selected, setSelected]   = useState(BODY_COLORS[0]);
  const [hovered,  setHovered]    = useState<string | null>(null);
  const [loaded,   setLoaded]     = useState(false);
  const handleLoaded              = useCallback(() => setLoaded(true), []);

  const displayName = hovered ?? selected.name;

  return (
    <div style={{ position: "relative", width: "100%", height: "75vh", minHeight: 500 }}>
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [5, 1.8, 8], fov: 42 }}
        shadows
        dpr={[1, 2]}
        style={{ background: "transparent" }}
      >
        <Scene bodyColor={selected} onLoaded={handleLoaded} />
      </Canvas>

      {/* Drag hint */}
      <div style={{
        position: "absolute", top: 20, right: 24,
        display: "flex", alignItems: "center", gap: 6,
        opacity: loaded ? 0.45 : 0, transition: "opacity 1.2s ease 1s",
        pointerEvents: "none",
      }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
          <path d="M8 3l4-2 4 2M8 21l4 2 4-2M3 8l-2 4 2 4M21 8l2 4-2 4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <span style={{ fontSize: "0.68rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-body)" }}>
          Glisser · Zoomer
        </span>
      </div>

      {/* Color picker */}
      <div style={{
        position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
        opacity: loaded ? 1 : 0, transition: "opacity 0.9s ease",
      }}>
        <p style={{
          fontFamily: "var(--font-heading), Georgia, serif",
          fontStyle: "italic",
          fontSize: "1.05rem",
          color: "rgba(255,255,255,0.88)",
          margin: 0,
          letterSpacing: "-0.01em",
          transition: "opacity 0.15s ease",
          minWidth: 180,
          textAlign: "center",
        }}>
          {displayName}
        </p>

        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "12px 20px",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(20px)",
          borderRadius: 50,
          border: "1px solid rgba(255,255,255,0.09)",
        }}>
          {BODY_COLORS.map((c) => (
            <ColorSwatch
              key={c.name}
              color={c}
              selected={selected.name === c.name}
              onClick={() => setSelected(c)}
              onHover={setHovered}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
