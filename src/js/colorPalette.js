"use strict";

import Color from "./Color.js";

export default class ColorPalette {
  constructor(hex) {
    this.hex = hex;
  }

  initColor (hex, luminance) {
    if(hex == null || !/^#([0-9a-f]{3}){1,2}$/.test(hex)) {
      return;
    }
    const color = new Color(hex);
    if (luminance) {
      color.setLuminance(luminance);
      color.calculateLuminance();
    }
    color.calculateRgb();
    color.calculateHsv();
    return color;
  }

  hueShift (h, s) {
    h +=s;
    while (h >= 360) {
      h -= 360;
    }
    while (h < 0) {
      h += 360;
    }
    return h;
  }

  getAnalogousColors (hex) {
    const color = this.initColor(hex);
    const analogousOne = this.initColor(hex);
    analogousOne.setHsv(this.hueShift((analogousOne.h*360), -40)/360, analogousOne.s, analogousOne.v);
    const analogousTwo = this.initColor(hex);
    analogousTwo.setHsv(this.hueShift((analogousTwo.h*360), 40)/360, analogousTwo.s, analogousTwo.v);

    return [analogousOne, color, analogousTwo];
  }

  getComplimentaryColors (hex) {
    const color = this.initColor(hex);
    const complimentaryColor = this.initColor(hex);
    complimentaryColor.setHsv(complimentaryColor.h + 0.5, complimentaryColor.s, complimentaryColor.v);

    return [color, complimentaryColor];
  }

  getTriadicColors (hex) {
    const triadOne = this.initColor(hex);
    const triadTwo = this.initColor(hex);
    triadTwo.setHsv(triadTwo.h + 0.33, triadTwo.s, triadTwo.v);
    const triadThree = this.initColor(hex);
    triadThree.setHsv(triadThree.h + 0.66, triadThree.s, triadThree.v);

    return [triadOne, triadTwo, triadThree];
  }

  getGradientColors (hex) {
    const color = this.initColor(hex, 0);
    const colorGradientOne = this.initColor(hex, 0.3);
    const colorGradientTwo = this.initColor(hex, -0.5);

    return [color, colorGradientTwo, colorGradientOne];
  }
}
