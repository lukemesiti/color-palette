"user strict";

import ColorPalette from "./ColorPalette.js";

const colorPicker = document.querySelector(".js-color-picker");
colorPicker.addEventListener("change", getColorPalettes);

function getColorPalettes(event){
  let colorPalette = new ColorPalette();
  const value = event.target.value;

  const palettes = [];
  palettes.push(addPalettes("gradient",colorPalette.getGradientColors(value)));
  palettes.push(addPalettes("triadic",colorPalette.getTriadicColors(value)));
  palettes.push(addPalettes("complimentary",colorPalette.getComplimentaryColors(value)));
  palettes.push(addPalettes("analogous",colorPalette.getAnalogousColors(value)));

  for(let x=0; x < palettes.length; x++) {
    const palette = palettes[x];
    displayPalette(palette);
  }
}

function addPalettes(type, colors) {
  return {
    type: type,
    class: type.substring(0,1),
    colors: colors
  }
}

function displayPalette(palette) {
  for(let i=0; i < palette.colors.length; i++) {
    const color = palette.colors[i];
    const item = document.querySelector(`.js-${palette.type}-list .${palette.class}${i}`);
    item.setAttribute("style", `background-color: ${color.hex}`);
    document.querySelector(`.js-${palette.type}-list .${palette.class}${i} .color-hex`).textContent = color.hex;
    document.querySelector(`.js-${palette.type}-list .${palette.class}${i} .color-rgb`).textContent = `rgb(${color.r} ,${color.g} ,${color.b})`;
  }
}
