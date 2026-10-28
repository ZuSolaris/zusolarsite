import React, { useEffect, useRef } from 'react';

// GLSL Vertex Shader: Fullscreen quad
const vertexShaderSource = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

// GLSL Fragment Shader: Pure, ultra-smooth aquatic caustics & volumetric god-rays (Man I love shaders, don't you?)
const fragmentShaderSource = `
  precision highp float;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_time;
  uniform float u_is_light;
  uniform float u_scroll_depth;

  // Analytical rippling caustics: 3 harmonic wave interference passes (ultra-lightweight & silky)
  float getCausticWeb(vec2 uv, float t) {
    vec2 p = uv * 3.6;
    vec2 p1 = p + vec2(t * 0.20, t * 0.15);
    vec2 p2 = p * 1.25 - vec2(t * 0.16, t * 0.25);
    vec2 p3 = p * 0.85 + vec2(sin(t * 0.14) * 0.4, cos(t * 0.17) * 0.4);

    float w1 = sin(p1.x * 2.2 + sin(p1.y * 1.7 + t * 0.75)) + cos(p1.y * 2.1 + cos(p1.x * 1.5 - t * 0.65));
    float w2 = sin(p2.x * 2.6 - cos(p2.y * 1.8 - t * 0.55)) + cos(p2.y * 2.8 + sin(p2.x * 1.9 + t * 0.6));
    float w3 = sin(p3.x * 3.2 + p3.y * 2.2 + t * 0.95);

    float c = min(abs(w1), abs(w2));
    float caustic = pow(clamp(1.0 - c * 0.48, 0.0, 1.0), 3.0);
    caustic += pow(clamp(1.0 - abs(w3) * 0.56, 0.0, 1.0), 3.8) * 0.32;
    return caustic;
  }

  // Volumetric god-rays / sun shafts penetrating from surface downward
  float getLightRays(vec2 uv, float t) {
    float slant = uv.x + (1.0 - uv.y) * 0.38;
    float r1 = sin(slant * 7.5 + t * 0.32) * 0.5 + 0.5;
    float r2 = sin(slant * 16.0 - t * 0.42) * 0.5 + 0.5;
    float r3 = sin(slant * 24.0 + t * 0.2) * 0.5 + 0.5;

    float rays = r1 * 0.55 + r2 * 0.30 + r3 * 0.15;
    rays = pow(rays, 2.2);

    float depthAtten = smoothstep(-0.25, 0.95, uv.y);
    return rays * depthAtten;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 aspectUv = uv;
    aspectUv.x *= u_resolution.x / u_resolution.y;

    // Interactive mouse current (gentle aquatic wave ripple around cursor)
    vec2 mouseNorm = u_mouse / u_resolution;
    mouseNorm.x *= u_resolution.x / u_resolution.y;
    float mouseDist = length(aspectUv - mouseNorm);
    float mouseRipple = smoothstep(0.55, 0.0, mouseDist) * 0.055;
    vec2 warpedUv = aspectUv + vec2(sin(mouseDist * 14.0 - u_time * 3.0), cos(mouseDist * 14.0 - u_time * 3.0)) * mouseRipple;

    float t = u_time * 0.22;

    // Calculate light rays & caustics
    float rays = getLightRays(uv, t);
    float caustics = getCausticWeb(warpedUv, t);

    // Vertical gradient with scroll depth progression
    float verticalDepth = clamp(1.0 - uv.y + u_scroll_depth * 0.45, 0.0, 1.0);

    // -----------------------------------------------------------------
    // LIGHT THEME: Sunlit Aquamarine / Crystal Tropical Lagoon
    // -----------------------------------------------------------------
    vec3 light_surface   = vec3(0.935, 0.982, 0.995); // Shallow sunlit surface
    vec3 light_mid_water = vec3(0.560, 0.880, 0.935); // Translucent bondi turquoise
    vec3 light_deep_abyss= vec3(0.020, 0.460, 0.550); // Deep oceanic teal

    vec3 col_water_light = mix(light_surface, light_mid_water, smoothstep(0.0, 0.65, verticalDepth));
    col_water_light = mix(col_water_light, light_deep_abyss, smoothstep(0.45, 1.0, verticalDepth) * 0.65);

    // Light theme caustic crests and god-rays
    col_water_light += vec3(0.98, 1.0, 1.0) * (caustics * 0.24);
    col_water_light += vec3(0.75, 0.96, 1.0) * (rays * 0.28);

    // -----------------------------------------------------------------
    // DARK THEME: Submarine Oceanic Abyss / Deep Void & Bioluminescence
    // -----------------------------------------------------------------
    vec3 dark_surface    = vec3(0.035, 0.075, 0.125); // Twilight surface water
    vec3 dark_mid_water  = vec3(0.012, 0.038, 0.075); // Submarine cruising depth
    vec3 dark_deep_abyss = vec3(0.005, 0.016, 0.032); // Hadal trench void

    vec3 col_water_dark = mix(dark_surface, dark_mid_water, smoothstep(0.0, 0.65, verticalDepth));
    col_water_dark = mix(col_water_dark, dark_deep_abyss, smoothstep(0.45, 1.0, verticalDepth) * 0.75);

    // Bioluminescent electric cyan caustic filaments & light beams
    vec3 causticColorDark = mix(vec3(0.12, 0.75, 0.95), vec3(0.35, 0.45, 1.0), caustics);
    col_water_dark += causticColorDark * (caustics * 0.28);
    col_water_dark += vec3(0.15, 0.52, 0.85) * (rays * 0.22);

    // Blend between light and dark modes
    vec3 finalCol = mix(col_water_dark, col_water_light, u_is_light);

    // Soft cinematic lens vignette
    float vignette = smoothstep(1.5, 0.4, length(uv - vec2(0.5, 0.5)));
    finalCol *= (0.70 + 0.30 * vignette);

    gl_FragColor = vec4(finalCol, 1.0);
  }
`;

export default function UnderwaterShaderCanvas({ theme = 'dark' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: false, antialias: false, powerPreference: 'low-power' }) ||
      canvas.getContext('experimental-webgl');
    if (!gl) {
      console.warn('WebGL not supported for UnderwaterShaderCanvas');
      return;
    }

    // Helper: Compile shader
    function createShader(gl, type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Underwater shader compilation error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Underwater program linking error:', gl.getProgramInfoLog(program));
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
    const uScrollDepthLoc = gl.getUniformLocation(program, 'u_scroll_depth');

    let mouseX = window.innerWidth * 0.5;
    let mouseY = window.innerHeight * 0.5;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;
    let scrollDepth = 0.0;
    let isTabVisible = true;

    const handleMouseMove = (e) => {
      targetMouseX = e.clientX;
      targetMouseY = window.innerHeight - e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleScroll = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollDepth = Math.min(1.0, window.scrollY / maxScroll);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const handleVisibilityChange = () => {
      isTabVisible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Resize handler (capped DPR for optimal 60fps power efficiency)
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Render loop
    let animationFrameId;
    const startTime = performance.now();

    const render = () => {
      if (isTabVisible) {
        const elapsedTime = (performance.now() - startTime) * 0.001;

        mouseX += (targetMouseX - mouseX) * 0.04;
        mouseY += (targetMouseY - mouseY) * 0.04;

        const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
        gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
        gl.uniform1f(uTimeLoc, elapsedTime);
        gl.uniform2f(uMouseLoc, mouseX * dpr, mouseY * dpr);
        gl.uniform1f(uIsLightLoc, theme === 'light' ? 1.0 : 0.0);
        gl.uniform1f(uScrollDepthLoc, scrollDepth);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (positionBuffer) gl.deleteBuffer(positionBuffer);
      if (program) gl.deleteProgram(program);
      if (vertexShader) gl.deleteShader(vertexShader);
      if (fragmentShader) gl.deleteShader(fragmentShader);
    };
  }, [theme]);

  return (
    <div className="underwater-shader-container" aria-hidden="true">
      <canvas ref={canvasRef} className="underwater-shader-canvas" />
      <div className="underwater-shader-overlay"></div>
    </div>
  );
}
