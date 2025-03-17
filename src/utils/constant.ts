export const sizeOrderRank: { [key: string]: number } = {
  "2xs": 1,
  xs: 2,
  sm: 3,
  base: 4,
  md: 5,
  lg: 6,
  xl: 7,
  "2xl": 8,
  "3xl": 9,
};

// Font weight values - used to identify which numeric values should NOT be converted to rem
export const fontWeightValues = new Set([
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
  "thin",
  "extralight",
  "light",
  "normal",
  "medium",
  "semibold",
  "bold",
  "extrabold",
  "black",
]);
