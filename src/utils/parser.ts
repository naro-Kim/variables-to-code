type RGB = { r: number; g: number; b: number };
type HSL = { h: number; s: number; l: number };

export const rgbToHsl = ({ r, g, b }: RGB): HSL => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
};

export const hslValueToString = ({ h, s, l }: HSL): string =>
  `${h}, ${s}%, ${l}%`;

export const pxToRem = (px: number, base: number = 16): string => {
  if (px % 4 === 0) {
    return `${px / 4}rem`; // Convert to Tailwind's 0.25rem units
  }
  return `${px / base}rem`;
};

export const sanitizeName = (name: string): string => {
  // Replace spaces and special characters with dashes
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-") // Replace multiple consecutive dashes with a single dash
    .replace(/^-|-$/g, ""); // Remove leading/trailing dashes
};
