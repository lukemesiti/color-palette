'use strict';

Number.isInteger = Number.isInteger || function(value) {
  return typeof value === "number" &&
    isFinite(value) &&
    Math.floor(value) === value;
};

(function(exports){
  // var colorPalette = {};

  exports.getColorGradient = function(hex, length) {
    if (hex == null || length == null) {
      return [];
    }
    if(!/^#([0-9a-f]{3}){1,2}$/.test(hex)) {
      return [];
    }
    if(!Number.isInteger(length) || length <= 1 || length > 5) {
      return [];
    }
  };

})(this.colorPalette = {});
