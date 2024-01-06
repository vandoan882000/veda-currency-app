/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
/* eslint-disable @typescript-eslint/no-unused-expressions */
function check(hex: string){
  var re = /[0-9A-Fa-f]{6}/g;
  return re.test(hex)
}

export function hexToHsl(hex: string) {
  let currentHex = hex;
  if(!check(hex)) {
    currentHex = hex.replace(/#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/g, "#$1$1$2$2$3$3");
  }

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(currentHex) as any;
  var r = parseInt(result[1], 16);
  var g = parseInt(result[2], 16);
  var b = parseInt(result[3], 16);

  r /= 255, g /= 255, b /= 255;
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var s, l = (max + min) / 2;
  var h;

  if(max == min){
      h = s = 0; // achromatic
  } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch(max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
      }
      h = (h as number) / 6;
  }

  // s = s * 100;
  // s = Math.round(s);
  // l = l * 100;
  // l = Math.round(l);
  h = Math.round(360 * h);
  return {
    hue: h,
    brightness: l,
    saturation: s,
  }
}
