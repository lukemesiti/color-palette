'use strict';

Number.isInteger = Number.isInteger || function(value) {
  return typeof value === "number" &&
    isFinite(value) &&
    Math.floor(value) === value;
};

(function(exports){

  exports.getColorGradient = function(hex, length) {
    if (hex == null || length == null) {
      return [];
    }
    if(!/^#([0-9a-f]{3}){1,2}$/.test(hex)) {
      return [];
    }
    if(!Number.isInteger(length)) {
      return [];
    }
    if(length < 1 || length > 5) {
      return [];
    }

    var colorGradient = [];
    for(var i = 0; i < length; i++) {
      colorGradient.push(hex);
    }
    return colorGradient;
  };

  function hexToRgb(hex) {
    var hex = hex.substring(1);    // strip #
    if(hex.length === 3) {
      hex = hex.concat(hex);
    }
    return {
      r: parseInt(hex.substr(0, 2), 16),
      g: parseInt(hex.substr(2, 2), 16),
      b: parseInt(hex.substr(4, 2), 16)
    }
  }

  function rgbToHex(red, gree, blue) {
    var r = Math.round(red).toString(16);
    r = ("00" + r).substr(r.length);

    var g = Math.round(green).toString(16);
    g = ("00" + g).substr(g.length);

    var b = Math.round(blue).toString(16);
    b = ("00" + b).substr(b.length);

    return '#' + r + g + b;
  }

  function rgbToHsv(red, green, blue) {
    red = red / 255;
    green = green / 255;
    blue = blue / 255;

    var max = Math.max(red, green, blue);
    var min = Math.max(red, green, blue);
    var delta = max - min;
    var saturation = max == 0 ? 0 : delta / max;
    var hue = 0;

    if (delta) {
      switch (max) {
        case red:
          hue = ((green - blue) / delta);
          break;
        case green:
          hue = 2 + (blue - red) / delta;
          break;
        case blue:
          hue = 4 + (red - green) / delta;
          break;
      }
		}

		hue = 60 * hue | 0;
		if (hue < 0) hue += 360;
		saturation = (saturation * 100) | 0;
		var value = (max * 100) | 0;

    return {
      hue: hue,
      saturation: saturation,
      value: value
    }
  }

  function hsvToRgb(hue, saturation, value) {
    saturation = saturation / 100;
    value = value / 100;
    var chroma = saturation * value;
    var h = hue / 60;
    var x = chroma * (1 - Math.abs(h % 2 - 1));
    var m = value - chroma;

    chroma = (chroma + m) * 255 | 0;
    x = (x + m) * 255 | 0;
    m = m * 255 | 0;

    if (h >= 0 && h < 1) {	return { red: chroma, green: x, blue: m}; }
		if (h >= 1 && h < 2) {	return { red: x, green: chroma, blue: m}; }
		if (h >= 2 && h < 3) {	return { red: m, green: chroma, blue: x}; }
		if (h >= 3 && h < 4) {	return { red: m, green: x, blue: chroma}; }
		if (h >= 4 && h < 5) {	return { red: x, green: m, blue: chroma}; }
		if (h >= 5 && h < 6) {	return { red: chroma, green: m, blue: x}; }
  }

})(this.colorPalette = {});
