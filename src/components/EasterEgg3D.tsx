import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, RotateCcw, Clapperboard, Eye } from 'lucide-react';
import OutlinedTitle from './OutlinedTitle';
import { RedlineNote } from './ArchitecturalMarkup';

type ColorTheme = 'CHROME' | 'KODAK' | 'MATRIX' | 'BURGUNDY';

const themeConfigs: Record<ColorTheme, { main: number; emissive: number; wire: number; name: string }> = {
  CHROME: { main: 0xe8e8e8, emissive: 0x333333, wire: 0xdfc9a6, name: 'Veloth Chrome' },
  KODAK: { main: 0xfbb03b, emissive: 0xa6191e, wire: 0xf3ede0, name: 'Kodak 35mm' },
  MATRIX: { main: 0x00ff88, emissive: 0x003311, wire: 0x55ffaa, name: 'Break The Matrix' },
  BURGUNDY: { main: 0x9e1b22, emissive: 0x4a0a0e, wire: 0xdfc9a6, name: 'Luxury Editorial' },
};

const EasterEgg3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeTheme, setActiveTheme] = useState<ColorTheme>('CHROME');
  const [clapped, setClapped] = useState(false);
  const [takeCount, setTakeCount] = useState(1);
  const [isDragging, setIsDragging] = useState(false);

  // Three.js object references for dynamic manipulation
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const prismGroupRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const materialsRef = useRef<THREE.MeshStandardMaterial[]>([]);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);
    cameraRef.current = camera;

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff5e6, 2.5);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xdfc9a6, 2.0);
    rimLight.position.set(-5, -5, -3);
    scene.add(rimLight);

    const blueLight = new THREE.PointLight(0x3b60c5, 3, 10);
    blueLight.position.set(0, 3, 2);
    scene.add(blueLight);

    // 4. Central 3D Interactive Group (Anamorphic Lens & Film Reel Core)
    const prismGroup = new THREE.Group();
    scene.add(prismGroup);
    prismGroupRef.current = prismGroup;

    materialsRef.current = [];

    // Core icosahedron (Lens Crystal)
    const coreGeo = new THREE.IcosahedronGeometry(1.5, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: themeConfigs[activeTheme].main,
      metalness: 0.9,
      roughness: 0.15,
      emissive: themeConfigs[activeTheme].emissive,
      emissiveIntensity: 0.4,
      wireframe: false,
    });
    materialsRef.current.push(coreMat);
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    prismGroup.add(coreMesh);

    // Wireframe Cage around crystal
    const wireGeo = new THREE.IcosahedronGeometry(1.85, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: themeConfigs[activeTheme].wire,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    prismGroup.add(wireMesh);

    // Outer Film Strip Torus Rings (Simulating camera lens barrel)
    const ringGeo1 = new THREE.TorusGeometry(2.3, 0.04, 16, 64);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0xdfc9a6,
      metalness: 0.95,
      roughness: 0.1,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 3;
    prismGroup.add(ringMesh1);

    const ringGeo2 = new THREE.TorusGeometry(2.6, 0.03, 16, 64);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0xec633d,
      metalness: 0.8,
      roughness: 0.2,
    });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.y = Math.PI / 4;
    prismGroup.add(ringMesh2);

    // 5. Floating Dust / Bokeh Particle Cloud
    const particleCount = 180;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 12;
      particlePositions[i + 1] = (Math.random() - 0.5) * 12;
      particlePositions[i + 2] = (Math.random() - 0.5) * 10;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      color: 0xdfc9a6,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);
    particlesRef.current = particleSystem;

    // 6. Interaction: Mouse Drag Rotation with Inertia
    let isPointerDown = false;
    let prevPointerX = 0;
    let prevPointerY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isPointerDown = true;
      setIsDragging(true);
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevPointerX = clientX;
      prevPointerY = clientY;
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isPointerDown) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const deltaX = clientX - prevPointerX;
      const deltaY = clientY - prevPointerY;
      prevPointerX = clientX;
      prevPointerY = clientY;

      targetRotY += deltaX * 0.008;
      targetRotX += deltaY * 0.008;
    };

    const handlePointerUp = () => {
      isPointerDown = false;
      setIsDragging(false);
    };

    container.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);

    container.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);

    // 7. Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Inertia smoothing
      currentRotX += (targetRotX - currentRotX) * 0.08;
      currentRotY += (targetRotY - currentRotY) * 0.08;

      if (prismGroup) {
        prismGroup.rotation.x = currentRotX + Math.sin(elapsedTime * 0.5) * 0.15;
        prismGroup.rotation.y = currentRotY + elapsedTime * 0.3;
        ringMesh1.rotation.z = elapsedTime * 0.4;
        ringMesh2.rotation.z = -elapsedTime * 0.3;
      }

      if (particleSystem) {
        particleSystem.rotation.y = elapsedTime * 0.05;
      }

      renderer.render(scene, camera);
    };
    animate();

    // 8. Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      container.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);

      renderer.dispose();
      coreGeo.dispose();
      wireGeo.dispose();
      ringGeo1.dispose();
      ringGeo2.dispose();
      particleGeo.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update theme dynamically
  useEffect(() => {
    if (!materialsRef.current.length) return;
    const cfg = themeConfigs[activeTheme];
    materialsRef.current.forEach((mat) => {
      mat.color.setHex(cfg.main);
      mat.emissive.setHex(cfg.emissive);
    });
  }, [activeTheme]);

  // Action button: Trigger Clapperboard burst
  const handleActionClapper = () => {
    setClapped(true);
    setTakeCount((prev) => prev + 1);

    if (prismGroupRef.current) {
      prismGroupRef.current.scale.set(1.35, 1.35, 1.35);
      setTimeout(() => {
        if (prismGroupRef.current) {
          prismGroupRef.current.scale.set(1, 1, 1);
        }
      }, 250);
    }

    setTimeout(() => setClapped(false), 2400);
  };

  return (
    <section className="relative z-10 py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#DFC9A6]/20 bg-[#140F0B]/80 overflow-hidden">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] uppercase text-[#EC633D] font-bold mb-2">
            <span>✦ BONUS EASTER EGG</span>
            <span>//</span>
            <span>3D DIRECTOR'S LENS CORE</span>
          </div>
          <OutlinedTitle text="3D DIRECTOR" accentText="interactive lab" className="text-3xl sm:text-5xl md:text-6xl" />
          <div className="mt-1">
            <RedlineNote rotate="-rotate-1">
              "Kéo chuột để xoay 360° khối lăng kính điện ảnh 3D"
            </RedlineNote>
          </div>
        </div>

        {/* Action Button: Clapperboard */}
        <button
          onClick={handleActionClapper}
          className="group relative flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-[#EC633D] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-[4px_4px_0px_rgba(0,0,0,0.5)] hover:bg-[#ff7550] transition-all duration-200 active:scale-95"
        >
          <Clapperboard className={`w-4 h-4 ${clapped ? 'animate-bounce' : 'group-hover:rotate-12 transition-transform'}`} />
          <span>ACTION! TAKE #{takeCount}</span>
        </button>
      </div>

      {/* 3D Canvas Stage */}
      <div className="relative w-full h-[440px] sm:h-[520px] rounded-3xl bg-[#1A140F] border border-[#DFC9A6]/30 shadow-[8px_8px_0px_rgba(0,0,0,0.6)] overflow-hidden flex items-center justify-center select-none">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-grid-drafting opacity-30 pointer-events-none" />

        {/* Three.js Canvas Mount */}
        <div
          ref={mountRef}
          className={`w-full h-full cursor-grab active:cursor-grabbing ${isDragging ? 'cursor-grabbing' : ''}`}
          title="Kéo chuột để xoay 3D lăng kính"
        />

        {/* Interactive HUD Overlay: Theme Switcher */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-20">
          {(Object.keys(themeConfigs) as ColorTheme[]).map((theme) => (
            <button
              key={theme}
              onClick={() => setActiveTheme(theme)}
              className={`px-3 py-1 rounded-full font-mono text-[10px] uppercase font-bold tracking-wider transition-all border ${
                activeTheme === theme
                  ? 'bg-[#DFC9A6] text-[#140F0B] border-[#DFC9A6] shadow-[0_0_12px_rgba(223,201,166,0.4)]'
                  : 'bg-black/60 text-[#AFA59A] border-white/10 hover:border-[#DFC9A6]'
              }`}
            >
              {themeConfigs[theme].name}
            </button>
          ))}
        </div>

        {/* Viewport instruction badge */}
        <div className="absolute bottom-4 left-4 z-20 font-mono text-[10px] tracking-widest uppercase text-[#AFA59A] bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
          <span>DRAG TO ROTATE 3D // THREE.JS ENGINE</span>
        </div>

        {/* Clapper Toast Notification */}
        {clapped && (
          <div className="absolute bottom-4 right-4 z-30 max-w-sm p-4 rounded-xl bg-[#283F7D]/95 text-white font-mono text-xs border border-white/20 shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom-3 duration-200">
            <div className="flex items-center gap-2 text-[#EC633D] font-bold mb-1">
              <span>🎬 TAKE #{takeCount} // SCENE: INTERNSHIP 2026</span>
            </div>
            <p className="text-[11px] text-[#F6F1E7]/90 leading-relaxed font-light">
              "Cảm ơn bạn đã lướt đến tận đáy trang web! Em luôn sẵn sàng đem tư duy điện ảnh, tốc độ dựng Match Cut và khả năng làm chủ công nghệ 3D/AI này vào đội ngũ của bạn."
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default EasterEgg3D;
