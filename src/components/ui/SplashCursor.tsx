'use client';

import { useEffect, useRef } from 'react';

interface SplashCursorProps {
  SIM_RESOLUTION?: number;
  DYE_RESOLUTION?: number;
  CAPTURE_RESOLUTION?: number;
  DENSITY_DISSIPATION?: number;
  VELOCITY_DISSIPATION?: number;
  PRESSURE?: number;
  PRESSURE_ITERATIONS?: number;
  CURL?: number;
  SPLAT_RADIUS?: number;
  SPLAT_FORCE?: number;
  SHADING?: boolean;
  COLORFUL?: boolean;
  COLOR_UPDATE_SPEED?: number;
  PAUSED?: boolean;
  BACK_COLOR?: { r: number; g: number; b: number };
  TRANSPARENT?: boolean;
}

const SplashCursor = ({
  SIM_RESOLUTION = 128,
  DYE_RESOLUTION = 1024,
  CAPTURE_RESOLUTION = 512,
  DENSITY_DISSIPATION = 1,
  VELOCITY_DISSIPATION = 0.2,
  PRESSURE = 0.8,
  PRESSURE_ITERATIONS = 20,
  CURL = 30,
  SPLAT_RADIUS = 0.25,
  SPLAT_FORCE = 6000,
  SHADING = true,
  COLORFUL = true,
  COLOR_UPDATE_SPEED = 10,
  PAUSED = false,
  BACK_COLOR = { r: 0, g: 0, b: 0 },
  TRANSPARENT = true,
}: SplashCursorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const params = {
      alpha: true,
      depth: false,
      stencil: false,
      antialias: false,
      preserveDrawingBuffer: false,
    };

    let gl = (canvas.getContext('webgl2', params) || 
              canvas.getContext('webgl', params) || 
              canvas.getContext('experimental-webgl', params)) as WebGL2RenderingContext | WebGLRenderingContext;

    if (!gl) {
      console.warn('WebGL not supported');
      return;
    }

    const config = {
      SIM_RESOLUTION,
      DYE_RESOLUTION,
      CAPTURE_RESOLUTION,
      DENSITY_DISSIPATION,
      VELOCITY_DISSIPATION,
      PRESSURE,
      PRESSURE_ITERATIONS,
      CURL,
      SPLAT_RADIUS,
      SPLAT_FORCE,
      SHADING,
      COLORFUL,
      COLOR_UPDATE_SPEED,
      PAUSED,
      BACK_COLOR,
      TRANSPARENT,
    };

    function pointerPrototype() {
      this.id = -1;
      this.texcoordX = 0;
      this.texcoordY = 0;
      this.prevTexcoordX = 0;
      this.prevTexcoordY = 0;
      this.deltaX = 0;
      this.deltaY = 0;
      this.down = false;
      this.moved = false;
      this.color = [30, 0, 300];
    }

    let pointers: any[] = [new (pointerPrototype as any)()];

    // WebGL Extensions and Utils
    const isWebGL2 = !!(gl as any).clearBufferfv;
    let halfFloat;
    let supportLinearFiltering;
    if (isWebGL2) {
      gl.getExtension('EXT_color_buffer_float');
      supportLinearFiltering = gl.getExtension('OES_texture_float_linear');
    } else {
      halfFloat = gl.getExtension('OES_texture_half_float');
      supportLinearFiltering = gl.getExtension('OES_texture_half_float_linear');
    }

    const halfFloatTexType = isWebGL2 ? (gl as any).HALF_FLOAT : halfFloat?.HALF_FLOAT_OES;
    
    function getSupportedFormat(gl: WebGLRenderingContext | WebGL2RenderingContext, internalFormat: number, format: number, type: number) {
      if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
        switch (internalFormat) {
          case (gl as any).R16F:
            return getSupportedFormat(gl, (gl as any).RG16F, (gl as any).RG, type);
          case (gl as any).RG16F:
            return getSupportedFormat(gl, (gl as any).RGBA16F || gl.RGBA, gl.RGBA, type);
          default:
            return null;
        }
      }
      return { internalFormat, format };
    }

    function supportRenderTextureFormat(gl: WebGLRenderingContext | WebGL2RenderingContext, internalFormat: number, format: number, type: number) {
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);
      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
      return status === gl.FRAMEBUFFER_COMPLETE;
    }

    let formatRGBA: any, formatRG: any, formatR: any;
    if (isWebGL2) {
      formatRGBA = getSupportedFormat(gl, (gl as any).RGBA16F, gl.RGBA, halfFloatTexType!);
      formatRG = getSupportedFormat(gl, (gl as any).RG16F, (gl as any).RG, halfFloatTexType!);
      formatR = getSupportedFormat(gl, (gl as any).R16F, (gl as any).RED, halfFloatTexType!);
    } else {
      formatRGBA = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType!);
      formatRG = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType!);
      formatR = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType!);
    }

    if (!supportLinearFiltering) {
      config.DYE_RESOLUTION = 512;
      config.SHADING = false;
    }

    function compileShader(type: number, source: string, keywords: string[] | null = null) {
      if (keywords) {
        let keywordsString = '';
        keywords.forEach((keyword) => {
          keywordsString += '#define ' + keyword + '\n';
        });
        source = keywordsString + source;
      }
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(shader));
      return shader;
    }

    function createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader) {
      let program = gl.createProgram()!;
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) console.error(gl.getProgramInfoLog(program));
      return program;
    }

    class Material {
      vertexShader: WebGLShader;
      fragmentShaderSource: string;
      programs: { [key: string]: WebGLProgram };
      activeProgram: WebGLProgram | null;
      constructor(vertexShader: WebGLShader, fragmentShaderSource: string) {
        this.vertexShader = vertexShader;
        this.fragmentShaderSource = fragmentShaderSource;
        this.programs = {};
        this.activeProgram = null;
      }
      setKeywords(keywords: string[]) {
        let key = keywords.join(',');
        let program = this.programs[key];
        if (program == null) {
          let fragmentShader = compileShader(gl.FRAGMENT_SHADER, this.fragmentShaderSource, keywords);
          program = createProgram(this.vertexShader, fragmentShader);
          this.programs[key] = program;
        }
        if (program === this.activeProgram) return;
        this.activeProgram = program;
        gl.useProgram(program);
      }
    }

    const baseVertexShader = compileShader(
      gl.VERTEX_SHADER,
      `
    precision highp float;
    attribute vec2 aPosition;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform vec2 texelSize;
    void main () {
        vUv = aPosition * 0.5 + 0.5;
        vL = vUv - vec2(texelSize.x, 0.0);
        vR = vUv + vec2(texelSize.x, 0.0);
        vT = vUv + vec2(0.0, texelSize.y);
        vB = vUv - vec2(0.0, texelSize.y);
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }
`
    );

    const clearShader = `
    precision mediump float;
    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float value;
    void main () {
        gl_FragColor = value * texture2D(uTexture, vUv);
    }
`;

    const copyShader = `
    precision mediump float;
    varying vec2 vUv;
    uniform sampler2D uTexture;
    void main () {
        gl_FragColor = texture2D(uTexture, vUv);
    }
`;

    const displayShaderSource = `
    precision highp float;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;
    uniform vec2 texelSize;

    void main () {
        vec3 c = texture2D(uTexture, vUv).rgb;
    #ifdef SHADING
        vec3 lc = texture2D(uTexture, vL).rgb;
        vec3 rc = texture2D(uTexture, vR).rgb;
        vec3 tc = texture2D(uTexture, vT).rgb;
        vec3 bc = texture2D(uTexture, vB).rgb;

        float dx = length(rc) - length(lc);
        float dy = length(tc) - length(bc);

        vec3 n = normalize(vec3(dx, dy, length(texelSize)));
        vec3 l = vec3(0.0, 0.0, 1.0);

        float diffuse = max(0.0, dot(n, l));
        c *= diffuse;
    #endif
        gl_FragColor = vec4(c, 1.0);
    }
`;

    const splatShader = `
    precision highp float;
    varying vec2 vUv;
    uniform sampler2D uTarget;
    uniform float aspect;
    uniform vec3 color;
    uniform vec2 point;
    uniform float radius;
    void main () {
        vec2 p = vUv - point.xy;
        p.x *= aspect;
        vec3 splat = exp(-dot(p, p) / radius) * color;
        vec3 base = texture2D(uTarget, vUv).xyz;
        gl_FragColor = vec4(base + splat, 1.0);
    }
`;

    const advectionShader = `
    precision highp float;
    varying vec2 vUv;
    uniform sampler2D uVelocity;
    uniform sampler2D uSource;
    uniform vec2 texelSize;
    uniform float dt;
    uniform float dissipation;
    void main () {
        vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
        gl_FragColor = dissipation * texture2D(uSource, coord);
    }
`;

    const divergenceShader = `
    precision highp float;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uVelocity;
    void main () {
        float L = texture2D(uVelocity, vL).x;
        float R = texture2D(uVelocity, vR).x;
        float T = texture2D(uVelocity, vT).y;
        float B = texture2D(uVelocity, vB).y;
        float div = 0.5 * (R - L + T - B);
        gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
    }
`;

    const curlShader = `
    precision highp float;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uVelocity;
    void main () {
        float L = texture2D(uVelocity, vL).y;
        float R = texture2D(uVelocity, vR).y;
        float T = texture2D(uVelocity, vT).x;
        float B = texture2D(uVelocity, vB).x;
        float vorticity = R - L - T + B;
        gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
    }
`;

    const vorticityShader = `
    precision highp float;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uVelocity;
    uniform sampler2D uCurl;
    uniform float curl;
    uniform float dt;
    void main () {
        float L = texture2D(uCurl, vL).x;
        float R = texture2D(uCurl, vR).x;
        float T = texture2D(uCurl, vT).x;
        float B = texture2D(uCurl, vB).x;
        float C = texture2D(uCurl, vUv).x;
        vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
        force /= length(force) + 0.0001;
        force *= curl * C;
        vec2 velocity = texture2D(uVelocity, vUv).xy;
        gl_FragColor = vec4(velocity + force * dt, 0.0, 1.0);
    }
`;

    const pressureShader = `
    precision highp float;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uDivergence;
    void main () {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        float divergence = texture2D(uDivergence, vUv).x;
        float pressure = (L + R + B + T - divergence) * 0.25;
        gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
    }
`;

    const gradientSubtractShader = `
    precision highp float;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uVelocity;
    void main () {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity.xy -= vec2(R - L, T - B) * 0.5;
        gl_FragColor = vec4(velocity, 0.0, 1.0);
    }
`;

    const clearProgram = new Material(baseVertexShader, clearShader);
    const displayProgram = new Material(baseVertexShader, displayShaderSource);
    const splatProgram = new Material(baseVertexShader, splatShader);
    const advectionProgram = new Material(baseVertexShader, advectionShader);
    const divergenceProgram = new Material(baseVertexShader, divergenceShader);
    const curlProgram = new Material(baseVertexShader, curlShader);
    const vorticityProgram = new Material(baseVertexShader, vorticityShader);
    const pressureProgram = new Material(baseVertexShader, pressureShader);
    const gradSubtractProgram = new Material(baseVertexShader, gradientSubtractShader);

    // Setup Geometry
    const quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);

    function blit(target: any, clear = false) {
      if (target == null) {
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      } else {
        gl.viewport(0, 0, target.width, target.height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
      }
      if (clear) {
        gl.clearColor(0.0, 0.0, 0.0, 0.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
      }
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    }

    function createFBO(w: number, h: number, internalFormat: number, format: number, type: number, param: number) {
      gl.activeTexture(gl.TEXTURE0);
      let texture = gl.createTexture()!;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);
      let fbo = gl.createFramebuffer()!;
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      return { texture, fbo, width: w, height: h, texelSizeX: 1.0 / w, texelSizeY: 1.0 / h, attach(id: number) {
        gl.activeTexture(gl.TEXTURE0 + id);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        return id;
      }};
    }

    function createDoubleFBO(w: number, h: number, internalFormat: number, format: number, type: number, param: number) {
      let fbo1 = createFBO(w, h, internalFormat, format, type, param);
      let fbo2 = createFBO(w, h, internalFormat, format, type, param);
      return { width: w, height: h, texelSizeX: fbo1.texelSizeX, texelSizeY: fbo1.texelSizeY, 
               get read() { return fbo1; }, get write() { return fbo2; }, 
               swap() { let temp = fbo1; fbo1 = fbo2; fbo2 = temp; }};
    }

    let velocity: any, density: any, curl: any, pressure: any;

    function initFramebuffers() {
      let simRes = getResolution(config.SIM_RESOLUTION);
      let dyeRes = getResolution(config.DYE_RESOLUTION);
      const texType = halfFloatTexType!;
      const rgba = formatRGBA!;
      const rg = formatRG!;
      const r = formatR!;
      const filtering = supportLinearFiltering ? gl.LINEAR : gl.NEAREST;
      
      velocity = createDoubleFBO(simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering);
      density = createDoubleFBO(dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);
      curl = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
      pressure = createDoubleFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
    }

    function getResolution(resolution: number) {
      let aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight;
      if (aspectRatio < 1) aspectRatio = 1.0 / aspectRatio;
      let min = Math.round(resolution);
      let max = Math.round(resolution * aspectRatio);
      return gl.drawingBufferWidth > gl.drawingBufferHeight ? { width: max, height: min } : { width: min, height: max };
    }

    function update() {
      const dt = 0.016;
      gl.disable(gl.BLEND);

      curlProgram.setKeywords([]);
      gl.uniform2f(gl.getUniformLocation(curlProgram.activeProgram!, 'texelSize'), velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(gl.getUniformLocation(curlProgram.activeProgram!, 'uVelocity'), velocity.read.attach(0));
      blit(curl);

      vorticityProgram.setKeywords([]);
      gl.uniform2f(gl.getUniformLocation(vorticityProgram.activeProgram!, 'texelSize'), velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(gl.getUniformLocation(vorticityProgram.activeProgram!, 'uVelocity'), velocity.read.attach(0));
      gl.uniform1i(gl.getUniformLocation(vorticityProgram.activeProgram!, 'uCurl'), curl.attach(1));
      gl.uniform1f(gl.getUniformLocation(vorticityProgram.activeProgram!, 'curl'), config.CURL);
      gl.uniform1f(gl.getUniformLocation(vorticityProgram.activeProgram!, 'dt'), dt);
      blit(velocity.write);
      velocity.swap();

      divergenceProgram.setKeywords([]);
      gl.uniform2f(gl.getUniformLocation(divergenceProgram.activeProgram!, 'texelSize'), velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(gl.getUniformLocation(divergenceProgram.activeProgram!, 'uVelocity'), velocity.read.attach(0));
      blit(curl); // reusing curl fbo for divergence

      clearProgram.setKeywords([]);
      gl.uniform1i(gl.getUniformLocation(clearProgram.activeProgram!, 'uTexture'), pressure.read.attach(0));
      gl.uniform1f(gl.getUniformLocation(clearProgram.activeProgram!, 'value'), config.PRESSURE);
      blit(pressure.write);
      pressure.swap();

      pressureProgram.setKeywords([]);
      gl.uniform2f(gl.getUniformLocation(pressureProgram.activeProgram!, 'texelSize'), velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(gl.getUniformLocation(pressureProgram.activeProgram!, 'uDivergence'), curl.attach(0));
      for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
        gl.uniform1i(gl.getUniformLocation(pressureProgram.activeProgram!, 'uPressure'), pressure.read.attach(1));
        blit(pressure.write);
        pressure.swap();
      }

      gradSubtractProgram.setKeywords([]);
      gl.uniform2f(gl.getUniformLocation(gradSubtractProgram.activeProgram!, 'texelSize'), velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(gl.getUniformLocation(gradSubtractProgram.activeProgram!, 'uPressure'), pressure.read.attach(0));
      gl.uniform1i(gl.getUniformLocation(gradSubtractProgram.activeProgram!, 'uVelocity'), velocity.read.attach(1));
      blit(velocity.write);
      velocity.swap();

      advectionProgram.setKeywords([]);
      gl.uniform2f(gl.getUniformLocation(advectionProgram.activeProgram!, 'texelSize'), velocity.texelSizeX, velocity.texelSizeY);
      let velId = velocity.read.attach(0);
      gl.uniform1i(gl.getUniformLocation(advectionProgram.activeProgram!, 'uVelocity'), velId);
      gl.uniform1i(gl.getUniformLocation(advectionProgram.activeProgram!, 'uSource'), velId);
      gl.uniform1f(gl.getUniformLocation(advectionProgram.activeProgram!, 'dt'), dt);
      gl.uniform1f(gl.getUniformLocation(advectionProgram.activeProgram!, 'dissipation'), config.VELOCITY_DISSIPATION);
      blit(velocity.write);
      velocity.swap();

      gl.uniform1i(gl.getUniformLocation(advectionProgram.activeProgram!, 'uVelocity'), velocity.read.attach(0));
      gl.uniform1i(gl.getUniformLocation(advectionProgram.activeProgram!, 'uSource'), density.read.attach(1));
      gl.uniform1f(gl.getUniformLocation(advectionProgram.activeProgram!, 'dissipation'), config.DENSITY_DISSIPATION);
      blit(density.write);
      density.swap();

      for (let i = 0; i < pointers.length; i++) {
        const p = pointers[i];
        if (p.moved) {
          p.moved = false;
          splat(p.texcoordX, p.texcoordY, p.deltaX, p.deltaY, p.color);
        }
      }

      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.enable(gl.BLEND);
      displayProgram.setKeywords(config.SHADING ? ['SHADING'] : []);
      gl.uniform2f(gl.getUniformLocation(displayProgram.activeProgram!, 'texelSize'), 1.0 / canvas.width, 1.0 / canvas.height);
      gl.uniform1i(gl.getUniformLocation(displayProgram.activeProgram!, 'uTexture'), density.read.attach(0));
      blit(null);

      requestAnimationFrame(update);
    }

    function splat(x: number, y: number, dx: number, dy: number, color: number[]) {
      splatProgram.setKeywords([]);
      gl.uniform1i(gl.getUniformLocation(splatProgram.activeProgram!, 'uTarget'), velocity.read.attach(0));
      gl.uniform1f(gl.getUniformLocation(splatProgram.activeProgram!, 'aspect'), canvas.width / canvas.height);
      gl.uniform2f(gl.getUniformLocation(splatProgram.activeProgram!, 'point'), x, y);
      gl.uniform3f(gl.getUniformLocation(splatProgram.activeProgram!, 'color'), dx, dy, 0.0);
      gl.uniform1f(gl.getUniformLocation(splatProgram.activeProgram!, 'radius'), config.SPLAT_RADIUS / 100.0);
      blit(velocity.write);
      velocity.swap();

      gl.uniform1i(gl.getUniformLocation(splatProgram.activeProgram!, 'uTarget'), density.read.attach(0));
      gl.uniform3f(gl.getUniformLocation(splatProgram.activeProgram!, 'color'), color[0], color[1], color[2]);
      blit(density.write);
      density.swap();
    }

    function onMouseMove(e: MouseEvent) {
      let p = pointers[0];
      p.prevTexcoordX = p.texcoordX;
      p.prevTexcoordY = p.texcoordY;
      p.texcoordX = e.offsetX / canvas.width;
      p.texcoordY = 1.0 - e.offsetY / canvas.height;
      p.deltaX = (p.texcoordX - p.prevTexcoordX) * config.SPLAT_FORCE;
      p.deltaY = (p.texcoordY - p.prevTexcoordY) * config.SPLAT_FORCE;
      p.moved = true;
      if (p.id === -1) { p.id = 1; p.color = generateColor(); }
    }

    function generateColor() {
      let h = Math.random();
      let s = 1.0;
      let v = 1.0;
      let i = Math.floor(h * 6);
      let f = h * 6 - i;
      let p = v * (1 - s);
      let q = v * (1 - f * s);
      let t = v * (1 - (1 - f) * s);
      let r, g, b;
      switch (i % 6) {
        case 0: r = v; g = t; b = p; break;
        case 1: r = q; g = v; b = p; break;
        case 2: r = p; g = v; b = t; break;
        case 3: r = p; g = q; b = v; break;
        case 4: r = t; g = p; b = v; break;
        case 5: r = v; g = p; b = q; break;
      }
      return [r! * 0.15, g! * 0.15, b! * 0.15];
    }

    window.addEventListener('mousemove', onMouseMove);
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initFramebuffers();
    };
    window.addEventListener('resize', resize);
    resize();
    update();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[9999] opacity-70"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default SplashCursor;
