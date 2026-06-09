export const orbVertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;

  uniform float uTime;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vec3 transformed = position + normal * sin(position.y * 5.0 + uTime * 1.8) * 0.045;
    vPosition = transformed;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
  }
`;

export const orbFragmentShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;

  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;

  float fresnel(vec3 normal, vec3 viewDirection) {
    return pow(1.0 - dot(normalize(normal), normalize(viewDirection)), 2.6);
  }

  void main() {
    float wave = sin(vPosition.x * 4.0 + uTime) * 0.5 + sin(vPosition.y * 6.0 - uTime * 1.35) * 0.5;
    float pulse = 0.5 + 0.5 * sin(uTime * 2.0);
    vec3 viewDirection = vec3(0.0, 0.0, 1.0);
    float rim = fresnel(vNormal, viewDirection);
    vec3 base = mix(uColorA, uColorB, vUv.y + wave * 0.08);
    vec3 color = mix(base, uColorC, rim * 0.9 + pulse * 0.08);
    gl_FragColor = vec4(color + rim * 0.7, 1.0);
  }
`;

export const nebulaVertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

export const nebulaFragmentShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  void main() {
    vec2 uv = vUv;
    vec2 drift = vec2(uTime * 0.015, -uTime * 0.01);
    float n = noise(uv * 4.0 + drift) * 0.55 + noise(uv * 9.0 - drift) * 0.28;
    float mouseGlow = smoothstep(0.62, 0.0, distance(uv, uMouse * 0.5 + 0.5));
    vec3 teal = vec3(0.08, 0.95, 0.72);
    vec3 violet = vec3(0.55, 0.28, 1.0);
    vec3 amber = vec3(1.0, 0.65, 0.18);
    vec3 color = mix(teal, violet, uv.x + n * 0.2);
    color = mix(color, amber, mouseGlow * 0.28);
    float alpha = n * 0.18 + mouseGlow * 0.16;
    gl_FragColor = vec4(color, alpha);
  }
`;
