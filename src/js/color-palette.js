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

})(this.colorPalette = {});
