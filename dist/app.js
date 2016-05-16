"use strict";
"user strict";

function getColorPalettes() {
  var colorPicker = document.querySelector(".js-color-picker");

  var palettes = [];
  palettes.push(colorPalette.getGradientColors(colorPicker.value));
  palettes.push(colorPalette.getTriadicColors(colorPicker.value));
  palettes.push(colorPalette.getComplimentaryColors(colorPicker.value));
  palettes.push(colorPalette.getAnalogousColors(colorPicker.value));

  for (var x = 0; x < palettes.length; x++) {
    var palette = palettes[x];
    displayPalette(palette);
  }
}

function displayPalette(palette) {
  for (var i = 0; i < palette.colors.length; i++) {
    var color = palette.colors[i];
    var item = document.querySelector(".js-" + palette.type + "-list ." + palette.class + i);
    item.setAttribute("style", "background-color: " + color.hex);
    document.querySelector(".js-" + palette.type + "-list ." + palette.class + i + " .color-hex").textContent = color.hex;
    document.querySelector(".js-" + palette.type + "-list ." + palette.class + i + " .color-rgb").textContent = "rgb(" + color.r + " ," + color.g + " ," + color.b + ")";
  }
}