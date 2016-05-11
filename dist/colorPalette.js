'use strict';

Number.isInteger = Number.isInteger || function (value) {
  return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
};

var colorPalette = function () {
  var cp = {};

  function Color(hex) {
    this.hex = hex;
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.h = null;
    this.s = null;
    this.v = null;
  }

  function initColor(hex) {
    if (hex == null || !/^#([0-9a-f]{3}){1,2}$/.test(hex)) {
      return;
    }
    var color = new Color(hex);
    color.calculateRgb();
    color.calculateHsv();
    return color;
  }

  function hueShift(h, s) {
    h += s;
    while (h >= 360) {
      h -= 360;
    }
    while (h < 0) {
      h += 360;
    }
    return h;
  }

  // todo: get analogous colors
  cp.getAnalogousColors = function (hex) {
    var color = initColor(hex);
    var analogousOne = initColor(hex);
    analogousOne.setHsv(hueShift(analogousOne.h * 360, -40) / 360, analogousOne.s, analogousOne.v);
    var analogousTwo = initColor(hex);
    analogousTwo.setHsv(hueShift(analogousTwo.h * 360, 40) / 360, analogousTwo.s, analogousTwo.v);

    return {
      type: "analogous",
      class: "a",
      colors: [analogousOne, color, analogousTwo]
    };
  };

  cp.getComplimentaryColors = function (hex) {
    var color = initColor(hex);
    var complimentaryColor = initColor(hex);
    complimentaryColor.setHsv(complimentaryColor.h + 0.5, complimentaryColor.s, complimentaryColor.v);

    return {
      type: "complimentary",
      class: "c",
      colors: [color, complimentaryColor]
    };
  };

  cp.getTriadicColors = function (hex) {
    var triadOne = initColor(hex);
    var triadTwo = initColor(hex);
    triadTwo.setHsv(triadTwo.h + 0.33, triadTwo.s, triadTwo.v);
    var triadThree = initColor(hex);
    triadThree.setHsv(triadThree.h + 0.66, triadThree.s, triadThree.v);

    return {
      type: "triadic",
      class: "t",
      colors: [triadOne, triadTwo, triadThree]
    };
  };

  // cp.getColorGradient = function(hex, length) {
  //   if (hex == null || length == null) {
  //     return [];
  //   }
  //   // is valid hex value
  //   if(!/^#([0-9a-f]{3}){1,2}$/.test(hex)) {
  //     return [];
  //   }
  //   if(!Number.isInteger(length)) {
  //     return [];
  //   }
  //   if(length < 1) {
  //     return [];
  //   }
  //
  //   var colorGradient = [];
  //   var rgb = hexToRgb(hex);
  //   var hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
  //   console.log(hsv.h);
  //   // tints
  //   for(var i = 1; i <= length/2; i++) {
  //     rgb = hsvToRgb(hsv.h, 1/(length/2)*i, 1);
  //     colorGradient.push(rgbToHex(rgb.red, rgb.green, rgb.blue));
  //   }
  //
  //   // shades
  //   for(var i = length/2; i > 0; i--) {
  //     rgb = hsvToRgb(hsv.h, 1, 1/(length/2)*i);
  //     colorGradient.push(rgbToHex(rgb.red, rgb.green, rgb.blue));
  //   }
  //   return colorGradient;
  // };

  Color.prototype.calculateRgb = function () {
    var trimHex = this.hex.substring(1);
    if (trimHex.length === 3) {
      trimHex = trimHex.concat(trimHex);
    }
    this.r = parseInt(trimHex.substr(0, 2), 16);
    this.g = parseInt(trimHex.substr(2, 2), 16);
    this.b = parseInt(trimHex.substr(4, 2), 16);
  };

  Color.prototype.rgbToHex = function () {
    var r = Math.round(this.r).toString(16);
    r = ("00" + r).substr(r.length);

    var g = Math.round(this.g).toString(16);
    g = ("00" + g).substr(g.length);

    var b = Math.round(this.b).toString(16);
    b = ("00" + b).substr(b.length);

    this.hex = '#' + r + g + b;
  };

  Color.prototype.calculateHsv = function () {
    var r = this.r / 255,
        g = this.g / 255,
        b = this.b / 255;
    var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    var h = void 0,
        s = void 0,
        v = max;
    var d = max - min;
    s = max == 0 ? 0 : d / max;

    if (max == min) {
      h = 0; // achromatic
    } else {
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);break;
          case g:
            h = (b - r) / d + 2;break;
          case b:
            h = (r - g) / d + 4;break;
        }
        h /= 6;
      }
    this.h = h;
    this.s = s;
    this.v = v;
  };

  Color.prototype.setHsv = function (h, s, v) {
    this.h = h;
    this.s = s;
    this.v = v;

    this.hsvToRgb();
    this.rgbToHex();
  };

  Color.prototype.hsvToRgb = function () {
    var r = void 0,
        g = void 0,
        b = void 0;
    var i = Math.floor(this.h * 6);
    var f = this.h * 6 - i;
    var p = this.v * (1 - this.s);
    var q = this.v * (1 - f * this.s);
    var t = this.v * (1 - (1 - f) * this.s);

    switch (i % 6) {
      case 0:
        r = this.v, g = t, b = p;break;
      case 1:
        r = q, g = this.v, b = p;break;
      case 2:
        r = p, g = this.v, b = t;break;
      case 3:
        r = p, g = q, b = this.v;break;
      case 4:
        r = t, g = p, b = this.v;break;
      case 5:
        r = this.v, g = p, b = q;break;
    }
    this.r = Math.round(r * 255);
    this.g = Math.round(g * 255);
    this.b = Math.round(b * 255);
  };

  return cp;
}();