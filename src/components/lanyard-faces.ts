/**
 * Draws the lanyard's front, back and strap as images.
 * Card faces are 1024x1440 (matches the portrait card ratio 1.6 : 2.25).
 * Keep the top ~170px clear: the clip slot sits there.
 */

export type LanyardAssets = { front: string; back: string; strap: string };

/** Put your photo in /public and point this at it. */
export const PHOTO_SRC = "/hero/profile-cutout.png";

const INK = "#0c0c0f";
const W = 1024;
const H = 1440;
const CX = W / 2;
const EMAIL = "divyanshu.vitc@gmail.com";

type Ctx = CanvasRenderingContext2D & { letterSpacing?: string };

function surface(w: number, h: number) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d") as Ctx;
  return { canvas, ctx };
}

function write(
  ctx: Ctx,
  value: string,
  x: number,
  y: number,
  size: number,
  weight: number,
  family: string,
  color: string,
  tracking = "0em",
  align: CanvasTextAlign = "center",
) {
  ctx.font = `${weight} ${size}px ${family}`;
  ctx.letterSpacing = tracking;
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = "alphabetic";
  ctx.fillText(value, x, y);
  ctx.letterSpacing = "0em";
}

/** Rounded-top "arch" path. */
function arch(ctx: Ctx, x: number, y: number, w: number, h: number, bottomRadius = 40) {
  const r = w / 2;
  ctx.beginPath();
  ctx.moveTo(x, y + h - bottomRadius);
  ctx.lineTo(x, y + r);
  ctx.arc(x + r, y + r, r, Math.PI, 0);
  ctx.lineTo(x + w, y + h - bottomRadius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - bottomRadius, y + h);
  ctx.lineTo(x + bottomRadius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - bottomRadius);
  ctx.closePath();
}

function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function front(accent: string, family: string, photo: HTMLImageElement | null) {
  const { canvas, ctx } = surface(W, H);

  ctx.fillStyle = INK;
  ctx.fillRect(0, 0, W, H);

  // soft accent glow, bottom right
  ctx.save();
  ctx.globalAlpha = 0.4;
  const glow = ctx.createRadialGradient(W * 0.9, H * 0.98, 0, W * 0.9, H * 0.98, W * 0.95);
  glow.addColorStop(0, accent);
  glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);
  ctx.restore();

  // photo, centred in an arch
  const aw = 780;
  const ah = 780;
  const ax = (W - aw) / 2;
  const ay = 200;
  ctx.fillStyle = accent;
  arch(ctx, ax, ay, aw, ah);
  ctx.fill();

  if (photo) {
    ctx.save();
    arch(ctx, ax, ay, aw, ah);
    ctx.clip();
    const scale = Math.max(aw / photo.width, ah / photo.height);
    const dw = photo.width * scale;
    const dh = photo.height * scale;
    // centred horizontally, nudged toward the top so faces are not cropped
    ctx.drawImage(photo, ax + (aw - dw) / 2, ay + (ah - dh) * 0.15, dw, dh);
    ctx.restore();
  } else {
    write(ctx, "DS.", CX, ay + ah - 80, 260, 800, family, INK, "-0.05em");
  }

  // name + email
  write(ctx, "Divyanshu", CX, 1100, 118, 800, family, "#ffffff", "-0.04em");
  write(ctx, "Singh", CX, 1220, 118, 800, family, "#ffffff", "-0.04em");
  write(ctx, EMAIL, CX, 1330, 36, 500, family, "rgba(255,255,255,0.55)");

  return canvas.toDataURL("image/png");
}

function back(accent: string, family: string, light: boolean) {
  const { canvas, ctx } = surface(W, H);

  ctx.fillStyle = accent;
  ctx.fillRect(0, 0, W, H);

  const ink = light ? "#ffffff" : INK;
  const labelInk = light ? "rgba(255,255,255,0.65)" : "rgba(12,12,15,0.62)";
  const emailInk = light ? "rgba(255,255,255,0.82)" : "rgba(12,12,15,0.78)";

  write(ctx, "Tech stack", CX, 420, 44, 500, family, labelInk);
  write(ctx, "NextJS", CX, 580, 138, 800, family, ink, "-0.04em");
  write(ctx, "Flask", CX, 730, 138, 800, family, ink, "-0.04em");
  write(ctx, "Python", CX, 880, 138, 800, family, ink, "-0.04em");

  write(ctx, EMAIL, CX, 1320, 38, 500, family, emailInk);

  return canvas.toDataURL("image/png");
}

/** Wide image that repeats along the band. Its height spans the band's width. */
function strap(accent: string, family: string) {
  const unitText = "DIVYANSHU SINGH   \u2022   CODE WITH INTENT   \u2022   ";
  const height = 120;
  const size = 50;

  const probe = surface(8, 8).ctx;
  probe.font = `800 ${size}px ${family}`;
  probe.letterSpacing = "0.12em";
  const unit = Math.ceil(probe.measureText(unitText).width);

  // two whole units, so the repeat is seamless
  const { canvas, ctx } = surface(unit * 2, height);
  ctx.fillStyle = INK;
  ctx.fillRect(0, 0, canvas.width, height);
  for (let i = 0; i < 2; i++) {
    write(ctx, unitText, i * unit, height / 2 + size * 0.35, size, 800, family, accent, "0.12em", "left");
  }
  return canvas.toDataURL("image/png");
}

export async function buildLanyardAssets(
  accent: string,
  family: string,
  photoSrc: string = PHOTO_SRC,
  light: boolean = false,
): Promise<LanyardAssets> {
  const photo = await loadImage(photoSrc);
  return {
    front: front(accent, family, photo),
    back: back(accent, family, light),
    strap: strap(accent, family),
  };
}