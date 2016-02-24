'use strict';

Number.isInteger = Number.isInteger || function(value) {
  return typeof value === "number" &&
    isFinite(value) &&
    Math.floor(value) === value;
};

(function(exports){
  // todo: get analogous colors
  // todo: get complimentary colors
  exports.getComplimentaryColors = function(hex) {
    var rgb = hexToRgb(hex);
    var hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);

    var compOne = hsvToRgb(hsv.h + 0.33, hsv.s, hsv.v);
    var compTwo = hsvToRgb(hsv.h + 0.66, hsv.s, hsv.v);
    var complimentaryColors =
    [
      hex,
      rgbToHex(compOne.red, compOne.green, compOne.blue),
      rgbToHex(compTwo.red, compTwo.green, compTwo.blue)
    ];

    return complimentaryColors;
  }

  exports.getColorGradient = function(hex, length) {
    if (hex == null || length == null) {
      return [];
    }
    // is valid hex value
    if(!/^#([0-9a-f]{3}){1,2}$/.test(hex)) {
      return [];
    }
    if(!Number.isInteger(length)) {
      return [];
    }
    if(length < 1) {
      return [];
    }

    var colorGradient = [];
    var rgb = hexToRgb(hex);
    var hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
    console.log(hsv.h);
    // tints
    for(var i = 1; i <= length/2; i++) {
      rgb = hsvToRgb(hsv.h, 1/(length/2)*i, 1);
      colorGradient.push(rgbToHex(rgb.red, rgb.green, rgb.blue));
    }

    // shades
    for(var i = length/2; i > 0; i--) {
      rgb = hsvToRgb(hsv.h, 1, 1/(length/2)*i);
      colorGradient.push(rgbToHex(rgb.red, rgb.green, rgb.blue));
    }
    return colorGradient;
  };

  function hexToRgb(hex) {
    var hex = hex.substring(1);
    if(hex.length === 3) {
      hex = hex.concat(hex);
    }
    return {
      r: parseInt(hex.substr(0, 2), 16),
      g: parseInt(hex.substr(2, 2), 16),
      b: parseInt(hex.substr(4, 2), 16)
    }
  }

  function rgbToHex(red, green, blue) {
    var r = Math.round(red).toString(16);
    r = ("00" + r).substr(r.length);

    var g = Math.round(green).toString(16);
    g = ("00" + g).substr(g.length);

    var b = Math.round(blue).toString(16);
    b = ("00" + b).substr(b.length);

    return '#' + r + g + b;
  }

  function rgbToHsv(r, g, b) {
    r = r / 255, g = g / 255, b = b / 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, v = max;
    var d = max - min;
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
    return {h: h, s: s, v: v};
  }

  function hsvToRgb(h, s, v) {
      var r, g, b;
      var i = Math.floor(h * 6);
      var f = h * 6 - i;
      var p = v * (1 - s);
      var q = v * (1 - f * s);
      var t = v * (1 - (1 - f) * s);

      switch (i % 6) {
          case 0: r = v, g = t, b = p; break;
          case 1: r = q, g = v, b = p; break;
          case 2: r = p, g = v, b = t; break;
          case 3: r = p, g = q, b = v; break;
          case 4: r = t, g = p, b = v; break;
          case 5: r = v, g = p, b = q; break;
      }
      return { red: r * 255, green: g * 255, blue: b * 255};
  }

})(this.colorPalette = {});
