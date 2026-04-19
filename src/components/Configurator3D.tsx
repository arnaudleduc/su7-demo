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
import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as THREE from "three";
import { SkeletonUtils } from "three-stdlib";

/* ─── Types ─── */
interface ColorOption {
  name: string;
  hex: string;
  metalness: number;
  roughness: number;
}

interface Category {
  id: string;
  label: string;
  matName: string;
  colors: ColorOption[];
}

type Selections = Record<string, ColorOption>;

/* ─── Color catalog ─── */
const CATEGORIES: Category[] = [
  {
    id: "body",
    label: "Carrosserie",
    matName: "untitledMAT_CarPaint_SU7_Base1",
    colors: [
      { name: "Obsidian Black",  hex: "#141414", metalness: 0.85, roughness: 0.12 },
      { name: "Pearl White",     hex: "#f0ede8", metalness: 0.35, roughness: 0.22 },
      { name: "Xiaomi Red",      hex: "#dc2626", metalness: 0.55, roughness: 0.18 },
      { name: "Ocean Blue",      hex: "#1e3a8a", metalness: 0.65, roughness: 0.16 },
      { name: "Arctic Silver",   hex: "#8fa0b0", metalness: 0.82, roughness: 0.18 },
      { name: "Champagne Gold",  hex: "#c8a45a", metalness: 0.78, roughness: 0.16 },
    ],
  },
  {
    id: "rims",
    label: "Jantes",
    matName: "untitledMAT_Tire_Hub_127",
    colors: [
      { name: "Diamond Silver", hex: "#c0c8d0", metalness: 0.92, roughness: 0.10 },
      { name: "Gloss Black",    hex: "#141414", metalness: 0.80, roughness: 0.12 },
      { name: "Gun Metal",      hex: "#3d4552", metalness: 0.88, roughness: 0.14 },
      { name: "Satin Gold",     hex: "#c8a45a", metalness: 0.80, roughness: 0.18 },
      { name: "Titanium",       hex: "#7a8a96", metalness: 0.90, roughness: 0.12 },
    ],
  },
  {
    id: "calipers",
    label: "Étriers",
    matName: "untitledMAT_Tire_Brake_331",
    colors: [
      { name: "Stealth Black",  hex: "#1a1a1a", metalness: 0.60, roughness: 0.25 },
      { name: "Xiaomi Red",     hex: "#dc2626", metalness: 0.50, roughness: 0.22 },
      { name: "Racing Yellow",  hex: "#f59e0b", metalness: 0.45, roughness: 0.22 },
      { name: "British Green",  hex: "#166534", metalness: 0.50, roughness: 0.24 },
      { name: "Electric Blue",  hex: "#1d4ed8", metalness: 0.55, roughness: 0.22 },
    ],
  },
];

const CONFIGURABLE_MATS = new Set(CATEGORIES.map((c) => c.matName));

const defaultSelections = (): Selections =>
  Object.fromEntries(CATEGORIES.map((cat) => [cat.id, cat.colors[0]]));

/* ─── Loader ─── */
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
        <div style={{ width: 180, height: 2, background: "rgba(255,255,255,0.1)", borderRadius: 2, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: "#dc2626", borderRadius: 2, transition: "width 0.3s ease" }} />
        </div>
        <span style={{ fontSize: "0.7rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body)" }}>
          {Math.round(progress)}%
        </span>
      </div>
    </Html>
  );
}

/* ─── 3D Model ─── */
function SU7Model({
  selections,
  onLoaded,
}: {
  selections: Selections;
  onLoaded: () => void;
}) {
  const gltf = useGLTF("/2024_xiaomi_su7_max.glb");

  const clone = useMemo(() => {
    const c = SkeletonUtils.clone(gltf.scene);
    // Clone every configurable material so we never mutate the cached originals
    c.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        const mat = child.material as THREE.MeshStandardMaterial;
        if (CONFIGURABLE_MATS.has(mat.name)) {
          child.material = mat.clone();
          child.material.name = mat.name;
        }
      }
    });
    return c;
  }, [gltf.scene]);

  useEffect(() => { onLoaded(); }, [onLoaded]);

  // Apply all color selections on every change
  useEffect(() => {
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        const mat = child.material as THREE.MeshStandardMaterial;
        const category = CATEGORIES.find((c) => c.matName === mat.name);
        if (!category) return;
        const sel = selections[category.id];
        mat.color.set(sel.hex);
        mat.metalness  = sel.metalness;
        mat.roughness  = sel.roughness;
        mat.needsUpdate = true;
      }
    });
  }, [selections, clone]);

  return (
    <group dispose={null} scale={0.01}>
      <primitive object={clone} />
    </group>
  );
}

useGLTF.preload("/2024_xiaomi_su7_max.glb");

/* ─── Scene ─── */
function Scene({
  selections,
  onLoaded,
}: {
  selections: Selections;
  onLoaded: () => void;
}) {
  const [userInteracted, setUserInteracted] = useState(false);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[6, 10, 6]}  intensity={1.4} castShadow />
      <directionalLight position={[-6, 4, -4]} intensity={0.5} color="#b8d4ff" />
      <spotLight position={[0, 8, 0]} intensity={0.3} angle={0.6} penumbra={1} />

      <Environment preset="studio" background={false} />

      <Suspense fallback={<Loader />}>
        <SU7Model selections={selections} onLoaded={onLoaded} />
      </Suspense>

      <ContactShadows position={[0, 0, 0]} opacity={0.5} scale={14} blur={2.2} far={3} color="#000" />

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

/* ─── UI ─── */
export default function Configurator3D() {
  const [selections,      setSelections]      = useState<Selections>(defaultSelections);
  const [activeCatId,     setActiveCatId]     = useState(CATEGORIES[0].id);
  const [hoveredName,     setHoveredName]     = useState<string | null>(null);
  const [loaded,          setLoaded]          = useState(false);

  const handleLoaded  = useCallback(() => setLoaded(true), []);
  const activeCategory = CATEGORIES.find((c) => c.id === activeCatId)!;
  const currentSel    = selections[activeCatId];
  const displayName   = hoveredName ?? currentSel.name;

  const selectColor = (color: ColorOption) =>
    setSelections((prev) => ({ ...prev, [activeCatId]: color }));

  return (
    <div style={{ position: "relative", width: "100%", height: "75vh", minHeight: 500 }}>
      {/* Canvas */}
      <Canvas camera={{ position: [5, 1.8, 8], fov: 42 }} shadows dpr={[1, 2]} style={{ background: "transparent" }}>
        <Scene selections={selections} onLoaded={handleLoaded} />
      </Canvas>

      {/* Drag hint */}
      <div style={{
        position: "absolute", top: 20, right: 24,
        display: "flex", alignItems: "center", gap: 6,
        opacity: loaded ? 0.4 : 0, transition: "opacity 1.2s ease 1s",
        pointerEvents: "none",
      }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <path d="M8 3l4-2 4 2M8 21l4 2 4-2M3 8l-2 4 2 4M21 8l2 4-2 4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <span style={{ fontSize: "0.68rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-body)" }}>
          Glisser · Zoomer
        </span>
      </div>

      {/* Configurator panel */}
      <div style={{
        position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
        opacity: loaded ? 1 : 0, transition: "opacity 0.9s ease",
      }}>
        {/* Category tabs */}
        <div style={{
          display: "flex", gap: 4,
          padding: "5px",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(20px)",
          borderRadius: 50,
          border: "1px solid rgba(255,255,255,0.08)",
        }}>
          {CATEGORIES.map((cat) => {
            const isActive = cat.id === activeCatId;
            return (
              <button
                key={cat.id}
                onClick={() => { setActiveCatId(cat.id); setHoveredName(null); }}
                style={{
                  padding: "7px 16px",
                  borderRadius: 50,
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  fontFamily: "var(--font-body)",
                  transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
                  background: isActive ? "rgba(255,255,255,0.14)" : "transparent",
                  color: isActive ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.4)",
                  boxShadow: isActive ? "inset 0 1px 0 rgba(255,255,255,0.1)" : "none",
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Color name */}
        <p style={{
          fontFamily: "var(--font-heading), Georgia, serif",
          fontStyle: "italic",
          fontSize: "1rem",
          color: "rgba(255,255,255,0.85)",
          margin: 0,
          letterSpacing: "-0.01em",
          minWidth: 160,
          textAlign: "center",
          transition: "opacity 0.15s ease",
        }}>
          {displayName}
        </p>

        {/* Swatches */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "12px 20px",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(20px)",
          borderRadius: 50,
          border: "1px solid rgba(255,255,255,0.08)",
        }}>
          {activeCategory.colors.map((color) => {
            const isSelected = currentSel.name === color.name;
            return (
              <button
                key={color.name}
                onClick={() => selectColor(color)}
                onMouseEnter={() => setHoveredName(color.name)}
                onMouseLeave={() => setHoveredName(null)}
                aria-label={color.name}
                style={{
                  width:      isSelected ? 34 : 26,
                  height:     isSelected ? 34 : 26,
                  borderRadius: "50%",
                  background: color.hex,
                  border:     isSelected ? "2.5px solid rgba(255,255,255,0.9)" : "2px solid rgba(255,255,255,0.2)",
                  boxShadow:  isSelected
                    ? "0 0 0 3px rgba(255,255,255,0.18), 0 4px 14px rgba(0,0,0,0.5)"
                    : "0 2px 6px rgba(0,0,0,0.35)",
                  cursor: "pointer",
                  flexShrink: 0,
                  transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
                  transform:  isSelected ? "scale(1)" : "scale(0.88)",
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
