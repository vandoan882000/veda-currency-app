// function rgbToHex(rgb: string) {
//   // Check if the input matches the RGB format (e.g., "rgb(255, 0, 128)")
//   const rgbRegex = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/;
//   const match = rgb.match(rgbRegex);

//   if (!match) {
//     return "Invalid input format. Please provide RGB values in the format 'rgb(r, g, b)'.";
//   }

//   // Extract individual values for red, green, and blue
//   const [, red, green, blue] = match.map(Number);

//   // Convert decimal values to hexadecimal
//   const redHex = red.toString(16).padStart(2, '0');
//   const greenHex = green.toString(16).padStart(2, '0');
//   const blueHex = blue.toString(16).padStart(2, '0');

//   // Construct the hexadecimal representation
//   const hex = `#${redHex}${greenHex}${blueHex}`;

//   return hex.toUpperCase(); // Convert to uppercase for standard hex format
// }

// function rgbaToHex(rgba: string) {
//   // Check if the input matches the RGBA format (e.g., "rgba(255, 0, 128, 0.5)")
//   const rgbaRegex = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*([0-9.]+)\)$/;
//   const match = rgba.match(rgbaRegex);

//   if (!match) {
//     return "Invalid input format. Please provide RGBA values in the format 'rgba(r, g, b, a)'.";
//   }

//   // Extract individual values for red, green, blue, and alpha
//   const [, red, green, blue, alpha] = match.map(Number);

//   // Convert decimal values to hexadecimal
//   const redHex = red.toString(16).padStart(2, '0');
//   const greenHex = green.toString(16).padStart(2, '0');
//   const blueHex = blue.toString(16).padStart(2, '0');

//   // Convert alpha value to its hexadecimal representation
//   const alphaHex = Math.round(alpha * 255).toString(16).padStart(2, '0');

//   // Construct the hexadecimal representation
//   const hex = `#${redHex}${greenHex}${blueHex}${alphaHex}`;

//   return hex.toUpperCase(); // Convert to uppercase for standard hex format
// }

export const convertColor = (color: string) => {
  const hexRe = /^#(?:[A-Fa-f0-9]{3}){1,2}$/g;
  // const rgbRe = /^rgb[(](?:\s*0*(?:\d\d?(?:\.\d+)?(?:\s*%)?|\.\d+\s*%|100(?:\.0*)?\s*%|(?:1\d\d|2[0-4]\d|25[0-5])(?:\.\d+)?)\s*(?:,(?![)])|(?=[)]))){3}[)]$/g;
  // const rgbaRe = /^^rgba[(](?:\s*0*(?:\d\d?(?:\.\d+)?(?:\s*%)?|\.\d+\s*%|100(?:\.0*)?\s*%|(?:1\d\d|2[0-4]\d|25[0-5])(?:\.\d+)?)\s*,){3}\s*0*(?:\.\d+|1(?:\.0*)?)\s*[)]$/g;
  // const hslRe = /^hsl[(]\s*0*(?:[12]?\d{1,2}|3(?:[0-5]\d|60))\s*(?:\s*,\s*0*(?:\d\d?(?:\.\d+)?\s*%|\.\d+\s*%|100(?:\.0*)?\s*%)){2}\s*[)]$/g;
  // const hslaRe = /^hsla[(]\s*0*(?:[12]?\d{1,2}|3(?:[0-5]\d|60))\s*(?:\s*,\s*0*(?:\d\d?(?:\.\d+)?\s*%|\.\d+\s*%|100(?:\.0*)?\s*%)){2}\s*,\s*0*(?:\.\d+|1(?:\.0*)?)\s*[)]$/g;
  if(hexRe.test(color)) {
    return color;
  } else {
    return'#ffffff'
  }
}
