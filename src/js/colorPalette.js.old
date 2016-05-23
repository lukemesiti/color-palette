"use strict";

Number.isInteger = Number.isInteger || function(value) {
  return typeof value === "number" &&
    isFinite(value) &&
    Math.floor(value) === value;
};

var colorPalette = (function(){
  let cp = {};

  function Color(hex) {
    this.hex = hex;
    this.r = null;
    this.g = null;
    this.b = null;
    this.h = null;
    this.s = null;
    this.v = null;
    this.l = null;
  }

  Color.prototype.calculateLuminance = function () {
    let trimHex = this.hex.substring(1);
    let rgb = "#", c;
  	for (let i = 0; i < 3; i++) {
  		c = parseInt(trimHex.substr(i*2,2), 16);
  		c = Math.round(Math.min(Math.max(0, c + (c * this.l)), 255)).toString(16);
  		rgb += ("00"+c).substr(c.length);
  	}
    this.hex = rgb;
  }

  Color.prototype.calculateRgb = function () {
    let trimHex = this.hex.substring(1);
    if(trimHex.length === 3) {
      trimHex = trimHex.concat(trimHex);
    }
    this.r = parseInt(trimHex.substr(0, 2), 16);
    this.g = parseInt(trimHex.substr(2, 2), 16);
    this.b = parseInt(trimHex.substr(4, 2), 16);
  }

  Color.prototype.rgbToHex = function () {
    let r = Math.round(this.r).toString(16);
    r = ("00" + r).substr(r.length);

    let g = Math.round(this.g).toString(16);
    g = ("00" + g).substr(g.length);

    let b = Math.round(this.b).toString(16);
    b = ("00" + b).substr(b.length);

    this.hex = '#' + r + g + b;
  }

  Color.prototype.calculateHsv = function () {
    let r = this.r / 255, g = this.g / 255, b = this.b / 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, v = max;
    let d = max - min;
    s = max == 0 ? 0 : d / max;

    if (max == min) {
        h = 0; // achromatic
    } else {
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    this.h = h;
    this.s = s;
    this.v = v;
  }

  Color.prototype.setLuminance = function (l) {
    this.l = l;
  }

  Color.prototype.setHsv = function (h, s, v) {
    this.h = h;
    this.s = s;
    this.v = v;

    this.hsvToRgb();
    this.rgbToHex();
  }

  Color.prototype.hsvToRgb = function () {
      let r, g, b;
      let i = Math.floor(this.h * 6);
      let f = this.h * 6 - i;
      let p = this.v * (1 - this.s);
      let q = this.v * (1 - f * this.s);
      let t = this.v * (1 - (1 - f) * this.s);

      switch (i % 6) {
          case 0: r = this.v, g = t, b = p; break;
          case 1: r = q, g = this.v, b = p; break;
          case 2: r = p, g = this.v, b = t; break;
          case 3: r = p, g = q, b = this.v; break;
          case 4: r = t, g = p, b = this.v; break;
          case 5: r = this.v, g = p, b = q; break;
      }
      this.r = Math.round(r * 255);
      this.g = Math.round(g * 255);
      this.b = Math.round(b * 255);
  }

  function initColor(hex, luminance) {
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

  function hueShift(h, s) {
    h +=s;
    while (h >= 360) {
      h -= 360;
    }
    while (h < 0) {
      h += 360;
    }
    return h;
  }

  cp.getAnalogousColors = function (hex) {
    const color = initColor(hex);
    const analogousOne = initColor(hex);
    analogousOne.setHsv(hueShift((analogousOne.h*360), -40)/360, analogousOne.s, analogousOne.v);
    const analogousTwo = initColor(hex);
    analogousTwo.setHsv(hueShift((analogousTwo.h*360), 40)/360, analogousTwo.s, analogousTwo.v);

    return [analogousOne, color, analogousTwo];
  }

  cp.getComplimentaryColors = function (hex) {
    const color = initColor(hex);
    const complimentaryColor = initColor(hex);
    complimentaryColor.setHsv(complimentaryColor.h + 0.5, complimentaryColor.s, complimentaryColor.v);

    return [color, complimentaryColor];
  }

  cp.getTriadicColors = function (hex) {
    const triadOne = initColor(hex);
    const triadTwo = initColor(hex);
    triadTwo.setHsv(triadTwo.h + 0.33, triadTwo.s, triadTwo.v);
    const triadThree = initColor(hex);
    triadThree.setHsv(triadThree.h + 0.66, triadThree.s, triadThree.v);

    return [triadOne, triadTwo, triadThree];
  }

  cp.getGradientColors = function (hex) {
    const color = initColor(hex, 0);
    const colorGradientOne = initColor(hex, 0.3);
    const colorGradientTwo = initColor(hex, -0.5);

    return [color, colorGradientTwo, colorGradientOne];
  }

  return cp;
})();
