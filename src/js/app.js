function getColorVal(){
  var colorPicker = document.querySelector(".js-color-picker");

  let palettes = [];
  palettes.push(colorPalette.getTriadicColors(colorPicker.value));
  palettes.push(colorPalette.getComplimentaryColors(colorPicker.value));
  palettes.push(colorPalette.getAnalogousColors(colorPicker.value));

  for(let x=0; x < palettes.length; x++) {
    let palette = palettes[x];
    for(let i=0; i < palette.colors.length; i++) {
      let color = palette.colors[i];
      const item = document.querySelector(`.js-${palette.type}-list .${palette.class}${i}`);
      item.setAttribute("style", `background-color: ${color.hex}`);
      document.querySelector(`.js-${palette.type}-list .${palette.class}${i} .color-hex`).textContent = color.hex;
      document.querySelector(`.js-${palette.type}-list .${palette.class}${i} .color-rgb`).textContent = `rgb(${color.r} ,${color.g} ,${color.b})`;
    }
  }
}
