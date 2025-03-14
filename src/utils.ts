export const rgbToHex = (value: RGBA) => {
  if (!value) return "-";
  const r = Math.round(value.r * 255);
  const g = Math.round(value.g * 255);
  const b = Math.round(value.b * 255);
  const a = value.a !== undefined ? value.a.toFixed(2) : 1;
  const colorStr = `rgba(${r}, ${g}, ${b}, ${a})`;
  return colorStr;
};
