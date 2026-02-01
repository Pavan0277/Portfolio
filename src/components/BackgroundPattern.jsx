import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "./ThemeContext";

const BackgroundPattern = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const mountRef = useRef(null);
    const isDarkRef = useRef(isDark);
    // Store normalized mouse coordinates (-1 to 1)
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        isDarkRef.current = isDark;
    }, [isDark]);

    useEffect(() => {
        if (!mountRef.current) return;

        // --- CONFIGURATION ---
        const PARTICLE_COUNT = 14000; // Slightly reduced for 60fps smoothness
        const BASE_SIZE = 0.08; // Slightly larger for better glow

        // --- SCENE SETUP ---
        const scene = new THREE.Scene();

        // Deep fog for depth perception
        const fogColor = isDarkRef.current ? 0x020205 : 0xf0f0f0;
        scene.fog = new THREE.FogExp2(fogColor, 0.025);

        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000,
        );
        // Tilted camera angle for a better "landscape" view
        camera.position.set(0, 3, 8);
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: "high-performance",
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        mountRef.current.appendChild(renderer.domElement);

        // --- TEXTURE GENERATION (Soft Glow) ---
        const getTexture = () => {
            const canvas = document.createElement("canvas");
            canvas.width = 32;
            canvas.height = 32;
            const context = canvas.getContext("2d");
            // Inner bright core, outer soft fade
            const gradient = context.createRadialGradient(
                16,
                16,
                0,
                16,
                16,
                16,
            );
            gradient.addColorStop(0, "rgba(255,255,255,1)");
            gradient.addColorStop(0.4, "rgba(255,255,255,0.5)");
            gradient.addColorStop(1, "rgba(255,255,255,0)");
            context.fillStyle = gradient;
            context.fillRect(0, 0, 32, 32);
            return new THREE.CanvasTexture(canvas);
        };

        // --- PARTICLE SYSTEM ---
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(PARTICLE_COUNT * 3);
        const colors = new Float32Array(PARTICLE_COUNT * 3);
        const sizes = new Float32Array(PARTICLE_COUNT);
        // Store initial x/z to calculate wave offset from
        const initialPositions = new Float32Array(PARTICLE_COUNT * 3);

        const colorObj = new THREE.Color();

        // Spread particles in a larger area
        const SPREAD = 18;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const i3 = i * 3;
            // Random distribution but biased towards center
            const x = (Math.random() - 0.5) * SPREAD;
            const z = (Math.random() - 0.5) * SPREAD;
            const y = 0;

            positions[i3] = x;
            positions[i3 + 1] = y;
            positions[i3 + 2] = z;

            initialPositions[i3] = x;
            initialPositions[i3 + 1] = y;
            initialPositions[i3 + 2] = z;

            // Random sizes for depth feel
            sizes[i] = Math.random() * 1.5 + 0.5;
        }

        geometry.setAttribute(
            "position",
            new THREE.BufferAttribute(positions, 3),
        );
        geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.PointsMaterial({
            size: BASE_SIZE,
            map: getTexture(),
            vertexColors: true,
            alphaTest: 0.01,
            transparent: true,
            opacity: 0.9,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true,
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        // --- ORGANIC WAVE MATH ---
        // Calculates a more realistic "ocean" wave using multiple sine layers
        const calculateHeight = (x, z, time) => {
            let y = 0;
            // Large rolling wave
            y += Math.sin(x * 0.3 + time * 0.8) * 0.8;
            // Cross wave
            y += Math.sin(z * 0.4 + time * 0.6) * 0.6;
            // Detailed ripples
            y += Math.sin(Math.sqrt(x * x + z * z) * 1.0 - time * 1.5) * 0.2;
            return y;
        };

        // --- ANIMATION LOOP ---
        const clock = new THREE.Clock();

        const animate = () => {
            requestAnimationFrame(animate);

            const time = clock.getElapsedTime();
            const isDark = isDarkRef.current;
            const mx = mouseRef.current.x; // Mouse X (-1 to 1)
            const my = mouseRef.current.y; // Mouse Y (-1 to 1)

            // Smooth background/fog transition
            const targetFog = isDark ? 0x020205 : 0xf0f0f0;
            scene.fog.color.lerp(new THREE.Color(targetFog), 0.05);

            const pos = geometry.attributes.position.array;
            const col = geometry.attributes.color.array;

            // Color Palettes
            const colorDeep = isDark
                ? new THREE.Color(0x2b0057)
                : new THREE.Color(0x3a86ff); // Deep purple or Blue
            const colorPeak = isDark
                ? new THREE.Color(0x00f0ff)
                : new THREE.Color(0x80ffdb); // Cyan or Light Teal

            for (let i = 0; i < PARTICLE_COUNT; i++) {
                const i3 = i * 3;
                const ix = initialPositions[i3];
                const iz = initialPositions[i3 + 2];

                // 1. Calculate Wave Height
                let targetY = calculateHeight(ix, iz, time);

                // 2. Mouse Interaction (Repel effect)
                // Calculate distance from mouse ray (approximate for performance)
                // We project mouse 2D to rough 3D space
                const mouseDist = Math.sqrt(
                    Math.pow(ix - mx * 8, 2) + Math.pow(iz + my * 5, 2), // tilt compensation
                );

                // If close to mouse, push down and out
                if (mouseDist < 3) {
                    const force = (3 - mouseDist) / 3;
                    targetY -= force * 1.5; // Push down
                }

                // 3. Smooth Update
                pos[i3] = ix; // Keep X stable (or add slight drift)
                pos[i3 + 2] = iz; // Keep Z stable
                // Lerp Y for smoothness
                pos[i3 + 1] += (targetY - pos[i3 + 1]) * 0.1;

                // 4. Height-Based Coloring
                // Normalize height roughly between -1.5 and 1.5 to 0-1
                const heightAlpha = (pos[i3 + 1] + 1.5) / 3.0;
                const clampedAlpha = Math.max(0, Math.min(1, heightAlpha));

                colorObj.copy(colorDeep).lerp(colorPeak, clampedAlpha);

                col[i3] = colorObj.r;
                col[i3 + 1] = colorObj.g;
                col[i3 + 2] = colorObj.b;
            }

            geometry.attributes.position.needsUpdate = true;
            geometry.attributes.color.needsUpdate = true;

            // Subtle Scene Rotation
            particles.rotation.y = time * 0.02;

            renderer.render(scene, camera);
        };

        animate();

        // --- CLEANUP ---
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, []);

    // Mouse Listener
    useEffect(() => {
        const handleMouseMove = (e) => {
            // Normalize mouse to -1 to 1
            mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div
            ref={mountRef}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: -1,
                // Darker gradient for better contrast
                background: isDark
                    ? "radial-gradient(circle at 50% 50%, #0a0514 0%, #000000 100%)"
                    : "radial-gradient(circle at 50% 50%, #fdfdfd 0%, #e8e8e8 100%)",
                transition: "background 1s ease",
            }}
        />
    );
};

export default BackgroundPattern;
