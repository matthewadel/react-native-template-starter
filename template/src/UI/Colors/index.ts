function hexToRgbA(hex: string, alpha: number) {
  if (hex.charAt(0) === '#') {
    hex = hex.substr(1);
  }
  var values = hex.split(''),
    r,
    g,
    b;

  if (hex.length === 2) {
    r = parseInt(values[0].toString() + values[1].toString(), 16);
    g = r;
    b = r;
  } else if (hex.length === 3) {
    r = parseInt(values[0].toString() + values[0].toString(), 16);
    g = parseInt(values[1].toString() + values[1].toString(), 16);
    b = parseInt(values[2].toString() + values[2].toString(), 16);
  } else if (hex.length === 6) {
    r = parseInt(values[0].toString() + values[1].toString(), 16);
    g = parseInt(values[2].toString() + values[3].toString(), 16);
    b = parseInt(values[4].toString() + values[5].toString(), 16);
  }
  return `rgba(${r}, ${g}, ${b},${alpha})`;
}

export const Colors = (alpha = 1) => {
  return {
    White: hexToRgbA("#FFF", alpha),
    Dark: hexToRgbA("#000", alpha),
    Primary: hexToRgbA("#4C6FDE", alpha),
    Secondary: hexToRgbA("#F1F4FD", alpha),
    Red: hexToRgbA("#CD4631", alpha),
  }
}