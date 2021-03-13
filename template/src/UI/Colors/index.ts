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
    App: {
      Primary: hexToRgbA('#01A791', alpha),
      Secondary: hexToRgbA('#FFF', alpha),
    },
    Text: {
      Primary: hexToRgbA('#FFF', alpha),
      Secondary: hexToRgbA('#01A791', alpha),
      Error: hexToRgbA('#F00', alpha),
      Dark: hexToRgbA('#000', alpha),
    },
    Input: {
      Primary: hexToRgbA('#FFF', alpha),
      Secondary: hexToRgbA('#01A791', alpha),
      Error: hexToRgbA('#F00', alpha),
      Background: hexToRgbA('#FFF', alpha),
      Border: hexToRgbA('#01A791', alpha),
    },
    Button: {
      Primary: {
        Border: hexToRgbA('#01A791', alpha),
        Text: hexToRgbA('#FFF', alpha),
        Background: hexToRgbA('#01A791', alpha),
      },
      Secondary: {
        Border: hexToRgbA('#01A791', alpha),
        Text: hexToRgbA('#01A791', alpha),
        Background: hexToRgbA('#FFF', alpha),
      },
    },
    ActivityIndicator: {
      Primary: hexToRgbA('#01A791', alpha),
    },
    MessageBox: {
      Header: hexToRgbA('#ccc', alpha),
      Title: hexToRgbA('#000', alpha),
      CloseBackground: hexToRgbA('#aaa', alpha),
      CloseIcon: hexToRgbA('#ccc', alpha),
      Body: hexToRgbA('#FFF', alpha),
      Message: hexToRgbA('#000', alpha),
    },
  };
};
