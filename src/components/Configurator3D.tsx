"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  useGLTF,
  useProgress,
  Html,
} from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsType } from "three-stdlib";
import type { GLTF } from "three-stdlib";

/* ─── Color palette ─── */
const BODY_COLORS = [
  { name: "Obsidian Black", hex: "#1a1a1a", metalness: 0.85, roughness: 0.15 },
  { name: "Pearl White", hex: "#ededea", metalness: 0.4, roughness: 0.2 },
  { name: "Xiaomi Red", hex: "#dc2626", metalness: 0.55, roughness: 0.2 },
  { name: "Ocean Blue", hex: "#1e40af", metalness: 0.65, roughness: 0.18 },
  { name: "Arctic Silver", hex: "#94a3b8", metalness: 0.8, roughness: 0.2 },
  { name: "Champagne Gold", hex: "#c8a55a", metalness: 0.75, roughness: 0.18 },
];

/* ─── GLTF types ─── */
type GLTFResult = GLTF & {
  nodes: Record<string, THREE.Mesh>;
  materials: {
    "interior1.001": THREE.MeshStandardMaterial;
    "interior2.001": THREE.MeshStandardMaterial;
    "interior4.001": THREE.MeshStandardMaterial;
    "M_IRON.004": THREE.MeshStandardMaterial;
    "M_ChePai.004": THREE.MeshStandardMaterial;
    "M_LOGO.004": THREE.MeshStandardMaterial;
    "M_BODY_inside.004": THREE.MeshStandardMaterial;
    Car_body: THREE.MeshPhysicalMaterial;
    "M_BODY_black.004": THREE.MeshStandardMaterial;
    Car_window: THREE.MeshPhysicalMaterial;
    Car_backlight: THREE.MeshStandardMaterial;
    Car_lightglass: THREE.MeshStandardMaterial;
    Car_frontlight: THREE.MeshStandardMaterial;
    Car_radar: THREE.MeshStandardMaterial;
    "pasted__M_BODY_inside.001": THREE.MeshStandardMaterial;
    "interior3.001": THREE.MeshStandardMaterial;
    "M_Wheel_ALL.002": THREE.MeshStandardMaterial;
  };
};

/* ─── Loading screen ─── */
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
          color: "rgba(255,255,255,0.7)",
          fontFamily: "var(--font-body), system-ui",
        }}
      >
        <div
          style={{
            width: "200px",
            height: "2px",
            background: "rgba(255,255,255,0.15)",
            borderRadius: "2px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: "#dc2626",
              borderRadius: "2px",
              transition: "width 0.3s ease",
            }}
          />
        </div>
        <span style={{ fontSize: "0.75rem", letterSpacing: "0.1em" }}>
          Chargement du modèle… {Math.round(progress)}%
        </span>
      </div>
    </Html>
  );
}

/* ─── 3D Model ─── */
function SU7Model({
  bodyColor,
  onLoaded,
}: {
  bodyColor: (typeof BODY_COLORS)[0];
  onLoaded: () => void;
}) {
  const { nodes, materials } = useGLTF(
    "/su7-xiaomini/source/su7-xiaomini.glb"
  ) as unknown as GLTFResult;

  const bodyMat = useMemo(() => {
    const mat = materials.Car_body.clone();
    return mat;
  }, [materials.Car_body]);

  useEffect(() => {
    onLoaded();
  }, [onLoaded]);

  useEffect(() => {
    bodyMat.color.set(bodyColor.hex);
    bodyMat.metalness = bodyColor.metalness;
    bodyMat.roughness = bodyColor.roughness;
    bodyMat.needsUpdate = true;
  }, [bodyColor, bodyMat]);

  const n = nodes;
  const m = materials;

  return (
    <group dispose={null} scale={0.38} position={[0, -0.7, 0]}>
      <group rotation={[-Math.PI / 2, 0, -Math.PI / 2]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          {/* Plaque / Logo / Fer */}
          <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
            <mesh geometry={n.Object_12.geometry} material={m["M_IRON.004"]} />
            <mesh geometry={n.Object_13.geometry} material={m["M_ChePai.004"]} />
            <mesh geometry={n.Object_14.geometry} material={m["M_LOGO.004"]} />
          </group>

          {/* Carrosserie principale */}
          <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
            <mesh geometry={n.Object_18.geometry} material={bodyMat} />
            <mesh geometry={n.Object_19.geometry} material={m["M_BODY_inside.004"]} />
            <mesh geometry={n.Object_20.geometry} material={m["M_BODY_black.004"]} />
            <mesh geometry={n.Object_21.geometry} material={m.Car_window} />
            <mesh geometry={n.Object_22.geometry} material={m.Car_backlight} />
            <mesh geometry={n.Object_23.geometry} material={m.Car_lightglass} />
            <mesh geometry={n.Object_24.geometry} material={m.Car_frontlight} />
            <mesh geometry={n.Object_25.geometry} material={m.Car_radar} />
          </group>

          {/* Porte avant gauche */}
          <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
            <mesh geometry={n.Object_27.geometry} material={m["M_BODY_black.004"]} />
            <mesh geometry={n.Object_28.geometry} material={m["pasted__M_BODY_inside.001"]} />
            <mesh geometry={n.Object_29.geometry} material={m["M_BODY_inside.004"]} />
          </group>

          {/* Porte avant droite */}
          <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
            <mesh geometry={n.Object_31.geometry} material={m["M_BODY_inside.004"]} />
            <mesh geometry={n.Object_32.geometry} material={bodyMat} />
            <mesh geometry={n.Object_33.geometry} material={m["M_BODY_black.004"]} />
            <mesh geometry={n.Object_34.geometry} material={m["M_IRON.004"]} />
            <mesh geometry={n.Object_35.geometry} material={m["interior3.001"]} />
            <mesh geometry={n.Object_36.geometry} material={m.Car_window} />
          </group>

          {/* Porte arrière gauche */}
          <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
            <mesh geometry={n.Object_38.geometry} material={m["M_BODY_inside.004"]} />
            <mesh geometry={n.Object_39.geometry} material={bodyMat} />
            <mesh geometry={n.Object_40.geometry} material={m.Car_window} />
            <mesh geometry={n.Object_41.geometry} material={m["interior3.001"]} />
            <mesh geometry={n.Object_42.geometry} material={m["M_BODY_black.004"]} />
          </group>

          {/* Porte arrière droite */}
          <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
            <mesh geometry={n.Object_44.geometry} material={m["M_BODY_inside.004"]} />
            <mesh geometry={n.Object_45.geometry} material={bodyMat} />
            <mesh geometry={n.Object_46.geometry} material={m["M_BODY_black.004"]} />
            <mesh geometry={n.Object_47.geometry} material={m["M_IRON.004"]} />
            <mesh geometry={n.Object_48.geometry} material={m["interior3.001"]} />
            <mesh geometry={n.Object_49.geometry} material={m.Car_window} />
          </group>

          {/* Coffre */}
          <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
            <mesh geometry={n.Object_51.geometry} material={m["M_BODY_inside.004"]} />
            <mesh geometry={n.Object_52.geometry} material={bodyMat} />
            <mesh geometry={n.Object_53.geometry} material={m.Car_window} />
            <mesh geometry={n.Object_54.geometry} material={m["interior3.001"]} />
          </group>

          {/* Intérieur */}
          <mesh geometry={n.Object_4.geometry} material={m["interior1.001"]} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
          <mesh geometry={n.Object_6.geometry} material={m["interior2.001"]} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
          <mesh geometry={n.Object_8.geometry} material={m["interior2.001"]} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
          <mesh geometry={n.Object_10.geometry} material={m["interior4.001"]} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
          <mesh geometry={n.Object_16.geometry} material={m["M_BODY_inside.004"]} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />

          {/* Jantes */}
          <mesh geometry={n.Object_56.geometry} material={m["M_Wheel_ALL.002"]} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/su7-xiaomini/source/su7-xiaomini.glb");

/* ─── Scene ─── */
function Scene({
  bodyColor,
  onLoaded,
}: {
  bodyColor: (typeof BODY_COLORS)[0];
  onLoaded: () => void;
}) {
  const controlsRef = useRef<OrbitControlsType>(null);
  const [userInteracted, setUserInteracted] = useState(false);

  useFrame(() => {
    if (controlsRef.current && !userInteracted) {
      controlsRef.current.autoRotate = true;
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-5, 4, -5]} intensity={0.5} color="#c0d8ff" />

      <Environment preset="studio" background={false} />

      <Suspense fallback={<Loader />}>
        <SU7Model bodyColor={bodyColor} onLoaded={onLoaded} />
      </Suspense>

      <ContactShadows
        position={[0, -0.71, 0]}
        opacity={0.5}
        scale={18}
        blur={2.5}
        far={5}
        color="#000000"
      />

      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        minDistance={3}
        maxDistance={14}
        maxPolarAngle={Math.PI / 2 - 0.05}
        autoRotate={!userInteracted}
        autoRotateSpeed={0.6}
        onStart={() => setUserInteracted(true)}
      />
    </>
  );
}

/* ─── Main component ─── */
export default function Configurator3D() {
  const [selectedColor, setSelectedColor] = useState(BODY_COLORS[0]);
  const [loaded, setLoaded] = useState(false);
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);

  const displayName = hoveredColor ?? selectedColor.name;

  return (
    <div style={{ position: "relative", width: "100%", height: "75vh", minHeight: "500px" }}>
      {/* Canvas */}
      <Canvas
        camera={{ position: [6, 2.5, 9], fov: 42 }}
        shadows
        dpr={[1, 2]}
        style={{ background: "transparent" }}
      >
        <Scene bodyColor={selectedColor} onLoaded={() => setLoaded(true)} />
      </Canvas>

      {/* Hint */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "24px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          opacity: loaded ? 0.5 : 0,
          transition: "opacity 1s ease 1s",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M12 5v14M5 12l7 7 7-7" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span style={{ fontSize: "0.7rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-body)" }}>
          Glisser · Zoomer
        </span>
      </div>

      {/* Color picker UI */}
      <div
        style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "14px",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.8s ease",
        }}
      >
        {/* Color name */}
        <p
          style={{
            fontFamily: "var(--font-heading), Georgia, serif",
            fontStyle: "italic",
            fontSize: "1.1rem",
            color: "rgba(255,255,255,0.9)",
            letterSpacing: "-0.01em",
            margin: 0,
            transition: "opacity 0.2s ease",
          }}
        >
          {displayName}
        </p>

        {/* Swatches */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            padding: "14px 22px",
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(16px)",
            borderRadius: "50px",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {BODY_COLORS.map((color) => {
            const isSelected = selectedColor.name === color.name;
            return (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color)}
                onMouseEnter={() => setHoveredColor(color.name)}
                onMouseLeave={() => setHoveredColor(null)}
                aria-label={color.name}
                style={{
                  width: isSelected ? "36px" : "28px",
                  height: isSelected ? "36px" : "28px",
                  borderRadius: "50%",
                  background: color.hex,
                  border: isSelected
                    ? "2px solid rgba(255,255,255,0.9)"
                    : "2px solid rgba(255,255,255,0.2)",
                  boxShadow: isSelected
                    ? `0 0 0 3px rgba(255,255,255,0.25), 0 4px 12px rgba(0,0,0,0.4)`
                    : "0 2px 6px rgba(0,0,0,0.3)",
                  cursor: "pointer",
                  transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
                  transform: isSelected ? "scale(1)" : "scale(0.9)",
                  flexShrink: 0,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
