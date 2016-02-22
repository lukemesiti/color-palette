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
    // is valid hex value
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
    // for(var i = 0; i < length; i++) {
    //   colorGradient.push(hex);
    // }

    var rgb = hexToRgb(hex);
    var hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);

    var variations = getColorVariations(hsv.s, hsv.v);

    rgb = hsvToRgb(hsv.h, variations[0][0], variations[0][1]);
    var firstVariation = rgbToHex(rgb.red, rgb.green, rgb.blue);

    rgb = hsvToRgb(hsv.h, variations[1][0], variations[1][1]);
    var secondVariation = rgbToHex(rgb.red, rgb.green, rgb.blue);

    colorGradient.push(hex);
    colorGradient.push(firstVariation);
    colorGradient.push(secondVariation);

    return colorGradient;
  };

  function getColorVariations(saturation, v) {
     var middleOf = {
         areaOne: [0.5, 0.9],
         areaTwo: [0.7, 0.9],
         areaThree: [0.9, 0.9],
         areaFour: [0.5, 0.7],
         areaFive: [0.7, 0.7],
         areaSix: [0.9, 0.7],
         areaSeven: [0.5, 0.5],
         areaEight: [0.7, 0.5],
         areaNine: [0.7, 0.5]
     }

     // area 1
     if (saturation >= 0.40 && saturation < 0.60 && v >= 0.80) {
         return [middleOf.areaThree, middleOf.areaNine];
     }
     // area 2
     else if (saturation >= 0.60 && saturation < 0.80 && v >= 0.80) {
         return [middleOf.areaSeven, middleOf.areaNine];
     }
     // area 3
     else if (saturation >= 0.80 && value >= 0.80) {
         return [middleOf.areaOne, middleOf.areaNine];
     }
     // area 4
     else if (saturation >= 0.40 && saturation < 0.60 && v >= 0.60 && v < 0.80) {
         return [middleOf.areaThree, middleOf.areaNine];
     }
     // area 5
     else if (saturation >= 0.60 && saturation < 0.80 && v >= 0.60 && v < 0.80) {
         return [middleOf.areaOne, middleOf.areaNine];
     }
     // area 6
     else if (saturation >= 0.80 && v >= 0.60 && v < 0.80) {
         return [middleOf.areaOne, middleOf.areaSeven];
     }
     // area 7
     else if (saturation >= 0.40 && saturation < 0.60 && v >= 0.40 && v < 0.60) {
         return [middleOf.areaOne, middleOf.areaNine];
     }
     // area 8
     else if (saturation >= 0.60 && saturation < 0.80 && v >= 0.40 && v < 0.60) {
         return [middleOf.areaOne, middleOf.areaThree];
     }
     // area 9
     else if (saturation >= 0.80 && v >= 0.40 && v < 0.60) {
         return [middleOf.areaThree, middleOf.areaSeven];
     }
     return [middleOf.areaTwo, middleOf.areaSix];
  }

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

  function rgbToHex(red, green, blue) {
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
      h: hue,
      s: saturation,
      v: value
    }
  }

  // function hsvToRgb(h, s, v) {
  //     var r, g, b;
  //
  //     var i = Math.floor(h * 6);
  //     var f = h * 6 - i;
  //     var p = v * (1 - s);
  //     var q = v * (1 - f * s);
  //     var t = v * (1 - (1 - f) * s);
  //
  //     switch (i % 6) {
  //         case 0: r = v, g = t, b = p; break;
  //         case 1: r = q, g = v, b = p; break;
  //         case 2: r = p, g = v, b = t; break;
  //         case 3: r = p, g = q, b = v; break;
  //         case 4: r = t, g = p, b = v; break;
  //         case 5: r = v, g = p, b = q; break;
  //     }
  //
  //     return { red: r * 255, green: g * 255, blue: b * 255};
  // }

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
