"user strict";

function getColorPalettes(){
  const colorPicker = document.querySelector(".js-color-picker");

  const palettes = [];
  palettes.push(addPalettes("gradient",colorPalette.getGradientColors(colorPicker.value)));
  palettes.push(addPalettes("triadic",colorPalette.getTriadicColors(colorPicker.value)));
  palettes.push(addPalettes("complimentary",colorPalette.getComplimentaryColors(colorPicker.value)));
  palettes.push(addPalettes("analogous",colorPalette.getAnalogousColors(colorPicker.value)));

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
