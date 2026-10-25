import React, { useEffect, useRef } from 'react';

// GLSL Vertex Shader: Fullscreen quad
const vertexShaderSource = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

// GLSL Fragment Shader: Domain-warped fluid noise flow
const fragmentShaderSource = `
  precision highp float;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_time;
  uniform float u_is_light;

  // Simplex-inspired 2D Hash & Noise
  vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float noise(in vec2 p) {
    const float K1 = 0.366025404; // (sqrt(3)-1)/2;
    const float K2 = 0.211324865; // (3-sqrt(3))/6;
    vec2 i = floor(p + (p.x + p.y) * K1);
    vec2 a = p - i + (i.x + i.y) * K2;
    vec2 o = (a.x > a.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec2 b = a - o + K2;
    vec2 c = a - 1.0 + 2.0 * K2;
    vec3 h = max(0.5 - vec3(dot(a, a), dot(b, b), dot(c, c)), 0.0);
    vec3 n = h * h * h * h * vec3(dot(a, hash(i + 0.0)), dot(b, hash(i + o)), dot(c, hash(i + 1.0)));
    return dot(n, vec3(70.0));
  }

  // Fractional Brownian Motion with domain warping
  float fbm(vec2 p) {
    float f = 0.0;
    mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
    f += 0.5000 * noise(p); p = m * p;
    f += 0.2500 * noise(p); p = m * p;
    f += 0.1250 * noise(p); p = m * p;
    f += 0.0625 * noise(p);
    return f;
  }

  void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.x *= u_resolution.x / u_resolution.y;

    // Interactive mouse influence (softly ripples toward cursor)
    vec2 mouseNorm = (u_mouse / u_resolution) * vec2(u_resolution.x / u_resolution.y, 1.0);
    float distToMouse = length(st - mouseNorm);
    float mouseWave = smoothstep(0.85, 0.0, distToMouse) * 0.40;

    // Time scaling for smooth silky flow
    float t = u_time * 0.18;

    // Domain Warping flow vectors (q and r)
    vec2 q = vec2(
      fbm(st + vec2(t * 0.6, t * 0.4)),
      fbm(st + vec2(1.0) - vec2(t * 0.3, t * 0.5))
    );

    vec2 r = vec2(
      fbm(st + 1.8 * q + vec2(1.7, 9.2) + 0.15 * t + mouseWave),
      fbm(st + 1.8 * q + vec2(8.3, 2.8) + 0.12 * t)
    );

    float f = fbm(st + 2.4 * r);
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;

    // -------------------------------------------------------------
    // LIGHT MODE: Exact Logo-Matched Solar Aero Palette
    // Centroids extracted directly from Zoe's logo emblem:
    // - Pearlescent Ice Silver Base: #eff6fb
    // - Ice Cyan Substrate:          #afd6ed
    // - Vivid Sky Azure:             #67a8ff
    // - Periwinkle / Lavender Glow:  #91bafe
    // - Deep Electric Cobalt Core:   #5663ff
    // - Specular Crest Gleam:        #ffffff
    // -------------------------------------------------------------
    vec3 light_ice_base  = vec3(0.937, 0.965, 0.984);
    vec3 light_ice_cyan  = vec3(0.688, 0.840, 0.930);
    vec3 light_sky_azure = vec3(0.407, 0.660, 1.000);
    vec3 light_lavender  = vec3(0.570, 0.731, 1.000);
    vec3 light_cobalt    = vec3(0.341, 0.390, 1.000);
    vec3 light_specular  = vec3(1.000, 1.000, 1.000);

    // Layer 1: Base pearlescent silver with soft ice cyan fluid undertone
    vec3 col_light = mix(light_ice_base, light_ice_cyan, clamp(length(q) * 0.65, 0.0, 0.75));

    // Layer 2: Vivid Sky Azure flow ribbons along primary warping vectors
    float azureFlow = smoothstep(0.18, 0.68, f + 0.25 * r.y);
    col_light = mix(col_light, light_sky_azure, azureFlow * 0.85);

    // Layer 3: Soft Periwinkle/Lavender glow feathering wave junctions
    float lavenderGlow = smoothstep(0.25, 0.75, r.x * 1.4 + 0.3 * q.y);
    col_light = mix(col_light, light_lavender, lavenderGlow * 0.70);

    // Layer 4: Deep Electric Cobalt peaks in turbulence cores & cursor wake
    float cobaltCore = smoothstep(0.42, 0.92, (f * f) * 2.2 + r.x * 0.45 + mouseWave * 0.85);
    col_light = mix(col_light, light_cobalt, cobaltCore * 0.90);

    // Layer 5: Specular gleam catching the fluid crests
    float specularCatch = pow(clamp(f * r.y * 2.0, 0.0, 1.0), 3.0);
    col_light = mix(col_light, light_specular, specularCatch * 0.35);

    // Soft radial feathering
    float lightVignette = smoothstep(1.4, 0.3, length(uv - vec2(0.5, 0.45)));
    col_light = mix(light_ice_base, col_light, 0.45 + 0.55 * lightVignette);

    // -------------------------------------------------------------
    // DARK MODE: Deep Void & Bioluminescent Cyan/Cobalt Streaks
    // -------------------------------------------------------------
    vec3 dark_bg        = vec3(0.035, 0.047, 0.078);
    vec3 dark_primary   = vec3(0.325, 0.384, 1.000); // Electric Cobalt
    vec3 dark_secondary = vec3(0.000, 0.722, 0.831); // Cyan
    vec3 dark_tertiary  = vec3(0.850, 0.920, 1.000); // Specular Ice

    vec3 col_dark = mix(dark_bg, dark_primary, clamp((f * f) * 3.8, 0.0, 1.0));
    col_dark = mix(col_dark, dark_secondary, clamp(length(q) * 0.9, 0.0, 1.0));
    col_dark = mix(col_dark, dark_tertiary, clamp(r.x * r.y * 1.5, 0.0, 0.45));
    col_dark = mix(dark_bg, col_dark, smoothstep(1.3, 0.25, length(uv - vec2(0.5, 0.45))) * 0.72);

    // Blend between dark mode and light mode
    vec3 col = mix(col_dark, col_light, u_is_light);

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function FlowShaderCanvas({ theme = 'dark' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      console.warn('WebGL not supported for FlowShaderCanvas');
      return;
    }

    // Helper: Compile shader
    function createShader(gl, type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Fullscreen quad buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1.0, -1.0,
        1.0, -1.0,
        -1.0, 1.0,
        -1.0, 1.0,
        1.0, -1.0,
        1.0, 1.0,
      ]),
      gl.STATIC_DRAW
    );

    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uResolutionLoc = gl.getUniformLocation(program, 'u_resolution');
    const uTimeLoc = gl.getUniformLocation(program, 'u_time');
    const uMouseLoc = gl.getUniformLocation(program, 'u_mouse');
    const uIsLightLoc = gl.getUniformLocation(program, 'u_is_light');

    let mouseX = window.innerWidth * 0.5;
    let mouseY = window.innerHeight * 0.5;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e) => {
      targetMouseX = e.clientX;
      targetMouseY = window.innerHeight - e.clientY; // Invert for WebGL coordinates
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Resize handler
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5); // Cap DPR at 1.5 for buttery 60fps performance
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Render loop
    let animationFrameId;
    const startTime = performance.now();

    const render = () => {
      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Soft mouse interpolation for organic spring feel
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
      gl.uniform1f(uTimeLoc, elapsedTime);
      gl.uniform2f(uMouseLoc, mouseX * dpr, mouseY * dpr);
      gl.uniform1f(uIsLightLoc, theme === 'light' ? 1.0 : 0.0);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
      if (positionBuffer) gl.deleteBuffer(positionBuffer);
      if (program) gl.deleteProgram(program);
      if (vertexShader) gl.deleteShader(vertexShader);
      if (fragmentShader) gl.deleteShader(fragmentShader);
    };
  }, [theme]);

  return (
    <div className="flow-shader-container" aria-hidden="true">
      <canvas ref={canvasRef} className="flow-shader-canvas" />
      <div className="flow-shader-overlay"></div>
    </div>
  );
}
