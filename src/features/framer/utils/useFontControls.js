// @ts-ignore
import { fontStack } from './constants.js';

const fontWeights = {
  100: 'Thin',
  200: 'Extra-light',
  300: 'Light',
  400: 'Regular',
  500: 'Medium',
  600: 'Semi-bold',
  700: 'Bold',
  800: 'Extra-bold',
  900: 'Black'
};

export function useFontControls(props) {
  const {
    fontFamily = 'Inter',
    fontSize = 16,
    fontWeight = 400
  } = props;
  const fontWeightName = fontWeights[fontWeight];
  const customFontStack = `"${fontFamily} ${fontWeightName}", "${fontFamily}", ${fontStack}`;
  return fontFamily ? {
    fontSize,
    fontWeight,
    fontFamily: customFontStack
  } : {fontSize, fontWeight};
}
