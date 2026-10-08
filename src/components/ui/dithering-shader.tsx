"use client";

import type React from "react";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

const VERTEX_SHADER_SOURCE = `
attribute vec2 a_position;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER_SOURCE = `
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec4 u_colorBack;
uniform vec4 u_colorFront;
uniform float u_shape;
uniform float u_type;
uniform float u_pxSize;

// Ordered (Bayer) dithering computed with bit-pattern arithmetic so it works
// on WebGL1, where dynamic indexing into a const array is not allowed.
float bayer2(vec2 a) {
  a = floor(a);
  return fract(a.x / 2.0 + a.y * a.y * 0.75);
}
#define bayer4(a) (bayer2(0.5 * (a)) * 0.25 + bayer2(a))
#define bayer8(a) (bayer4(0.5 * (a)) * 0.25 + bayer2(a))

void main() {
  float t = 0.5 * u_time;
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  uv -= 0.5;

  // Pixelise the shape so the dither resolves into visible cells.
  float pxSize = u_pxSize;
  vec2 pxSizeUv = gl_FragCoord.xy;
  pxSizeUv -= 0.5 * u_resolution;
  pxSizeUv /= pxSize;
  vec2 pixelizedUv = floor(pxSizeUv) * pxSize / u_resolution.xy;

  vec2 shape_uv = pixelizedUv;
  vec2 dithering_uv = pxSizeUv;

  float shape = 0.0;

  if (u_shape < 0.5) {
    // Wave
    shape_uv *= 4.0;
    float wave = cos(0.5 * shape_uv.x - 2.0 * t)
      * sin(1.5 * shape_uv.x + t)
      * (0.75 + 0.25 * cos(3.0 * t));
    shape = 1.0 - smoothstep(-1.0, 1.0, shape_uv.y + wave);
  } else {
    // Ripple
    float dist = length(shape_uv);
    shape = sin(pow(dist, 1.7) * 7.0 - 3.0 * t) * 0.5 + 0.5;
  }

  float dithering;
  if (u_type < 1.5) {
    dithering = bayer2(dithering_uv);
  } else if (u_type < 2.5) {
    dithering = bayer4(dithering_uv);
  } else {
    dithering = bayer8(dithering_uv);
  }

  dithering -= 0.5;
  float res = step(0.5, shape + dithering);

  vec3 fgColor = u_colorFront.rgb * u_colorFront.a;
  float fgOpacity = u_colorFront.a;
  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  float bgOpacity = u_colorBack.a;

  vec3 color = fgColor * res;
  float opacity = fgOpacity * res;

  color += bgColor * (1.0 - opacity);
  opacity += bgOpacity * (1.0 - opacity);

  gl_FragColor = vec4(color, opacity);
}
`;

export const DitheringShapes = ["wave", "ripple"] as const;
export const DitheringTypes = ["2x2", "4x4", "8x8"] as const;

export type DitheringShape = (typeof DitheringShapes)[number];
export type DitheringType = (typeof DitheringTypes)[number];

const SHAPE_INDEX: Record<DitheringShape, number> = {
	wave: 0,
	ripple: 1,
};

const TYPE_INDEX: Record<DitheringType, number> = {
	"2x2": 1,
	"4x4": 2,
	"8x8": 3,
};

export interface DitheringShaderProps {
	shape?: DitheringShape;
	type?: DitheringType;
	colorBack?: string;
	colorFront?: string;
	pxSize?: number;
	speed?: number;
	className?: string;
	style?: React.CSSProperties;
}

type RGBA = [number, number, number, number];

function parseColor(input: string): RGBA {
	const value = input.trim();

	if (value.startsWith("#")) {
		const hex = value.slice(1);
		const expanded =
			hex.length === 3 || hex.length === 4
				? hex
						.split("")
						.map((c) => c + c)
						.join("")
				: hex;

		const r = Number.parseInt(expanded.slice(0, 2), 16) / 255;
		const g = Number.parseInt(expanded.slice(2, 4), 16) / 255;
		const b = Number.parseInt(expanded.slice(4, 6), 16) / 255;
		const a = expanded.length === 8 ? Number.parseInt(expanded.slice(6, 8), 16) / 255 : 1;

		return [r || 0, g || 0, b || 0, Number.isFinite(a) ? a : 1];
	}

	const match = value.match(/rgba?\(([^)]+)\)/i);
	if (match) {
		const parts = match[1].split(",").map((p) => Number.parseFloat(p.trim()));
		return [
			(parts[0] || 0) / 255,
			(parts[1] || 0) / 255,
			(parts[2] || 0) / 255,
			Number.isFinite(parts[3]) ? parts[3] : 1,
		];
	}

	return [0, 0, 0, 1];
}

function createShader(
	gl: WebGLRenderingContext,
	type: number,
	source: string,
): WebGLShader | null {
	const shader = gl.createShader(type);
	if (!shader) return null;

	gl.shaderSource(shader, source);
	gl.compileShader(shader);

	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		console.error(
			`An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`,
		);
		gl.deleteShader(shader);
		return null;
	}

	return shader;
}

function createProgram(
	gl: WebGLRenderingContext,
	vertexSource: string,
	fragmentSource: string,
): WebGLProgram | null {
	const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
	const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);

	if (!vertexShader || !fragmentShader) return null;

	const program = gl.createProgram();
	if (!program) return null;

	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);

	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		console.error(
			"Unable to initialize the shader program: " +
				gl.getProgramInfoLog(program),
		);
		gl.deleteProgram(program);
		return null;
	}

	return program;
}

export function DitheringShader({
	shape = "wave",
	type = "8x8",
	colorBack = "#000000",
	colorFront = "#ffffff",
	pxSize = 3,
	speed = 0.6,
	className,
	style,
}: DitheringShaderProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	// Latest props, read by the animation loop. Kept out of the effect deps so
	// changing colours never tears down and re-creates the WebGL context.
	const targetsRef = useRef({
		shape,
		type,
		pxSize,
		speed,
		colorBack: parseColor(colorBack),
		colorFront: parseColor(colorFront),
	});

	useEffect(() => {
		targetsRef.current.shape = shape;
		targetsRef.current.type = type;
		targetsRef.current.pxSize = pxSize;
		targetsRef.current.speed = speed;
		targetsRef.current.colorBack = parseColor(colorBack);
		targetsRef.current.colorFront = parseColor(colorFront);
	}, [shape, type, pxSize, speed, colorBack, colorFront]);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const gl = canvas.getContext("webgl", {
			antialias: false,
			alpha: true,
			premultipliedAlpha: false,
			powerPreference: "low-power",
		});
		if (!gl) {
			console.error("WebGL not supported");
			return;
		}

		const program = createProgram(
			gl,
			VERTEX_SHADER_SOURCE,
			FRAGMENT_SHADER_SOURCE,
		);
		if (!program) return;

		gl.useProgram(program);

		const locations = {
			time: gl.getUniformLocation(program, "u_time"),
			resolution: gl.getUniformLocation(program, "u_resolution"),
			colorBack: gl.getUniformLocation(program, "u_colorBack"),
			colorFront: gl.getUniformLocation(program, "u_colorFront"),
			shape: gl.getUniformLocation(program, "u_shape"),
			type: gl.getUniformLocation(program, "u_type"),
			pxSize: gl.getUniformLocation(program, "u_pxSize"),
		};

		const positionBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
		gl.bufferData(
			gl.ARRAY_BUFFER,
			new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
			gl.STATIC_DRAW,
		);

		const positionLocation = gl.getAttribLocation(program, "a_position");
		gl.enableVertexAttribArray(positionLocation);
		gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

		const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
		let reduced = motionQuery.matches;

		const dpr = Math.min(window.devicePixelRatio || 1, 2);

		// Animated colours, eased toward the parsed prop colours each frame so
		// theme switches cross-fade instead of popping.
		const anim = {
			back: parseColor(colorBack),
			front: parseColor(colorFront),
		};

		const startTime = performance.now();
		let rafId = 0;

		const renderFrame = (now: number, snap: boolean) => {
			const targets = targetsRef.current;
			const k = snap ? 1 : 0.09;

			for (let i = 0; i < 4; i++) {
				anim.back[i] += (targets.colorBack[i] - anim.back[i]) * k;
				anim.front[i] += (targets.colorFront[i] - anim.front[i]) * k;
			}

			const t = reduced ? 0 : (now - startTime) * 0.001 * targets.speed;

			gl.uniform1f(locations.time, t);
			gl.uniform2f(locations.resolution, canvas.width, canvas.height);
			gl.uniform4fv(locations.colorBack, anim.back);
			gl.uniform4fv(locations.colorFront, anim.front);
			gl.uniform1f(locations.shape, SHAPE_INDEX[targets.shape]);
			gl.uniform1f(locations.type, TYPE_INDEX[targets.type]);
			gl.uniform1f(locations.pxSize, targets.pxSize * dpr);
			gl.drawArrays(gl.TRIANGLES, 0, 6);
		};

		const loop = (now: number) => {
			renderFrame(now, false);
			if (!reduced) {
				rafId = requestAnimationFrame(loop);
			}
		};

		const stop = () => {
			if (rafId) {
				cancelAnimationFrame(rafId);
				rafId = 0;
			}
		};

		const resize = () => {
			const width = Math.max(1, Math.round(canvas.clientWidth * dpr));
			const height = Math.max(1, Math.round(canvas.clientHeight * dpr));
			if (canvas.width !== width || canvas.height !== height) {
				canvas.width = width;
				canvas.height = height;
				gl.viewport(0, 0, width, height);
			}
			if (reduced) renderFrame(performance.now(), true);
		};

		const resizeObserver = new ResizeObserver(resize);
		resizeObserver.observe(canvas);

		const onMotionChange = () => {
			reduced = motionQuery.matches;
			stop();
			if (reduced) {
				renderFrame(performance.now(), true);
			} else {
				rafId = requestAnimationFrame(loop);
			}
		};

		motionQuery.addEventListener("change", onMotionChange);

		resize();
		if (reduced) {
			renderFrame(performance.now(), true);
		} else {
			rafId = requestAnimationFrame(loop);
		}

		return () => {
			stop();
			resizeObserver.disconnect();
			motionQuery.removeEventListener("change", onMotionChange);
			gl.deleteProgram(program);
			if (positionBuffer) gl.deleteBuffer(positionBuffer);
		};
		// Props are read through targetsRef, so this never needs to re-run.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={cn("relative h-full w-full", className)} style={style}>
			<canvas ref={canvasRef} className="block h-full w-full" />
		</div>
	);
}

export default DitheringShader;