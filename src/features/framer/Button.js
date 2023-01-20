import { jsx as _jsx } from 'react/jsx-runtime';
import { motion, addPropertyControls, ControlType } from 'framer';
import {
  colorTokentoValue,
  defaultEvents,
  fontControls,
  usePadding,
  useRadius,
  paddingControl,
  borderRadiusControl,
  fontSizeOptions,
  useFontControls
} from './utils/DefaultUtils';

/**
 * BUTTON
 *
 * @framerIntrinsicWidth 90
 * @framerIntrinsicHeight 50
 *
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight any
 */ export function Button(props) {
  const {
    text,
    defaultBackground,
    defaultTextColor,
    hoverBackground,
    hoverTextColor,
    pressedBackground,
    pressedTextColor,
    disabledBackground,
    disabledTextColor,
    shadow,
    variant,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    radius,
    topLeft,
    topRight,
    bottomRight,
    bottomLeft,
    isMixed,
    paddingPerSide,
    padding,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    whileHoverScale,
    whileTapScale,
    colorTransition,
    scaleTransition,
    alignment,
    disabled,
    style,
    ...rest
  } = props;
  const borderRadius = useRadius(props);
  const paddingValue = usePadding(props);
  const variants = {
    default: {
      background: colorTokentoValue(defaultBackground),
      color: colorTokentoValue(defaultTextColor),
      scale: 1,
      boxShadow: shadow ? '0px 2px 6px rgba(0,0,0,0.1), 0px 4px 16px rgba(0,0,0,0.1)' : '0px 0px 0px rgba(0,0,0,0)'
    },
    hover: {
      background: colorTokentoValue(hoverBackground),
      color: colorTokentoValue(hoverTextColor),
      scale: whileHoverScale,
      boxShadow: shadow ? '0px 2px 6px rgba(0,0,0,0.1), 0px 4px 16px rgba(0,0,0,0.1)' : '0px 0px 0px rgba(0,0,0,0)'
    },
    pressed: {
      background: colorTokentoValue(pressedBackground),
      color: colorTokentoValue(pressedTextColor),
      scale: whileTapScale,
      shadow: shadow ? '0px 1px 4px rgba(0,0,0,0.2), 0px 2px 4px rgba(0,0,0,0.2)' : '0px 0px 0px rgba(0,0,0,0)'
    },
    disabled: {
      background: colorTokentoValue(disabledBackground),
      color: colorTokentoValue(disabledTextColor),
      scale: 1,
      boxShadow: shadow ? '0px 2px 6px rgba(0,0,0,0.1), 0px 4px 16px rgba(0,0,0,0.1)' : '0px 0px 0px rgba(0,0,0,0)'
    }
  };// variant as a prop
// whene TOGGLED it should animate
  const isDisabled = variant === 'Disabled' || disabled;
  const activeVariant = isDisabled ? 'disabled' : variant.toLowerCase();
  const fontStyles = useFontControls(props);
  const buttonStyles = {
    ...baseStyle, ...style, ...fontStyles,
    borderRadius,
    padding: paddingValue,
    textAlign: alignment,
    border: 'none',
    outline: 'none'
  };
  return (/*#__PURE__*/ _jsx(motion.button, {
    type: 'button',
    transition: {scale: scaleTransition, default: colorTransition},
    initial: activeVariant,
    animate: activeVariant,
    variants: variants,
    disabled: isDisabled,
    'data-framer-highlight': !isDisabled,
    whileHover: 'hover',
    whileTap: 'pressed', ...!isDisabled && {
      onClick,
      onMouseEnter,
      onMouseLeave,
      onMouseDown,
      onMouseUp
    },
    style: buttonStyles, ...rest,
    children: text
  }));
}

Button.defaultProps = {
  height: 50,
  width: 90,
  text: 'Tap',
  variant: 'Default',
  shadow: false,
  fontSize: 16,
  defaultBackground: '#0099FF',
  defaultTextColor: '#ffffff',
  hoverBackground: '#0077FF',
  hoverTextColor: '#ffffff',
  pressedBackground: '#0088FF',
  pressedTextColor: '#ffffff',
  disabledBackground: '#f3f3f3',
  disabledTextColor: '#AAAAAA',
  disabled: false,
  borderRadius: 8,
  padding: 10,
  paddingPerSide: true,
  paddingTop: 15,
  paddingRight: 25,
  paddingBottom: 15,
  paddingLeft: 25,
  whileTapScale: 0.95,
  whileHoverScale: 1.1,
  alignment: 'center',
  fontWeight: 600,
  scaleTransition: {type: 'spring', duration: 0.3, delay: 0, stiffness: 600, damping: 30, mass: 1}
};
const baseStyle = {
  border: 'none',
  color: 'white',
  outline: 'none',
  resize: 'none',
  width: 'max-content',
  wordBreak: 'break-word',
  overflowWrap: 'break-word',
  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
  letterSpacing: '-0.2px'
};
addPropertyControls(Button, {
  text: {title: 'Text', type: ControlType.String, defaultValue: Button.defaultProps.text},
  alignment: {
    title: 'Text Align',
    type: ControlType.Enum,
    displaySegmentedControl: true,
    optionTitles: ['Left', 'Center', 'Right'],
    options: ['left', 'center', 'right']
  },
  shadow: {
    title: 'Shadow',
    type: ControlType.Boolean,
    enabledTitle: 'Show',
    disabledTitle: 'Hide'
  }, ...fontControls,
  disabled: {
    title: 'Disabled',
    type: ControlType.Boolean,
    enabledTitle: 'Yes',
    disabledTitle: 'No'
  },
  variant: {
    title: 'Variant',
    type: ControlType.Enum,
    defaultValue: 'Default',
    options: ['Default', 'Hover', 'Pressed', 'Disabled']
  },
  defaultBackground: {
    title: 'Bg Color',
    type: ControlType.Color,
    defaultValue: Button.defaultProps.defaultBackground,
    hidden: ({variant}) => variant !== 'Default'
  },
  defaultTextColor: {
    title: 'Text Color',
    type: ControlType.Color,
    defaultValue: Button.defaultProps.defaultTextColor,
    hidden: ({variant}) => variant !== 'Default'
  },
  hoverBackground: {
    title: 'Bg Color',
    type: ControlType.Color,
    defaultValue: Button.defaultProps.hoverBackground,
    hidden: ({variant}) => variant !== 'Hover'
  },
  hoverTextColor: {
    title: 'Text Color',
    type: ControlType.Color,
    defaultValue: Button.defaultProps.hoverTextColor,
    hidden: ({variant}) => variant !== 'Hover'
  },
  pressedBackground: {
    title: 'Bg Color',
    type: ControlType.Color,
    defaultValue: Button.defaultProps.pressedBackground,
    hidden: ({variant}) => variant !== 'Pressed'
  },
  pressedTextColor: {
    title: 'Text Color',
    type: ControlType.Color,
    defaultValue: Button.defaultProps.pressedTextColor,
    hidden: ({variant}) => variant !== 'Pressed'
  },
  disabledBackground: {
    title: 'Bg Color',
    type: ControlType.Color,
    defaultValue: Button.defaultProps.disabledBackground,
    hidden: ({variant}) => variant !== 'Disabled'
  },
  disabledTextColor: {
    title: 'Text Color',
    type: ControlType.Color,
    defaultValue: Button.defaultProps.disabledTextColor,
    hidden: ({variant}) => variant !== 'Disabled'
  }, ...paddingControl, ...borderRadiusControl,
  fontSize: {...fontSizeOptions},
  whileHoverScale: {title: 'Hover Scale', type: ControlType.Number, min: 0.5, max: 1.5, step: 0.1},
  whileTapScale: {title: 'Tap Scale', type: ControlType.Number, min: 0.5, max: 1.5, step: 0.1},
  scaleTransition: {title: 'Scale Anim', type: ControlType.Transition},
  colorTransition: {title: 'Color Anim', type: ControlType.Transition}, ...defaultEvents
});
