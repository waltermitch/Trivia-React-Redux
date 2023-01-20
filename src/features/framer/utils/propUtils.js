import { useMemo } from 'react';
import { ControlType } from 'framer';

export function useRadius(props) {
  const {
    borderRadius,
    isMixedBorderRadius,
    topLeftRadius,
    topRightRadius,
    bottomRightRadius,
    bottomLeftRadius,
  } = props;
  return useMemo(() => isMixedBorderRadius ? `${topLeftRadius}px ${topRightRadius}px ${bottomRightRadius}px ${bottomLeftRadius}px` : `${borderRadius}px`
    , [
      borderRadius,
      isMixedBorderRadius,
      topLeftRadius,
      topRightRadius,
      bottomRightRadius,
      bottomLeftRadius,
    ]);
}

export const borderRadiusControl = {
  borderRadius: {
    title: 'Radius',
    type: ControlType.FusedNumber,
    toggleKey: 'isMixedBorderRadius',
    toggleTitles: [
      'Radius',
      'Radius per corner'
    ],
    valueKeys: [
      'topLeftRadius',
      'topRightRadius',
      'bottomRightRadius',
      'bottomLeftRadius',
    ],
    valueLabels: [
      'TL',
      'TR',
      'BR',
      'BL'
    ],
    min: 0
  }
};

export function usePadding(props) {
  const { padding, paddingPerSide, paddingTop, paddingRight, paddingBottom, paddingLeft, } = props;
  return useMemo(() => paddingPerSide ? `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px` : padding
    , [
      padding,
      paddingPerSide,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
    ]);
}

export const paddingControl = {
  padding: {
    type: ControlType.FusedNumber,
    toggleKey: 'paddingPerSide',
    toggleTitles: [
      'Padding',
      'Padding per side'
    ],
    valueKeys: [
      'paddingTop',
      'paddingRight',
      'paddingBottom',
      'paddingLeft',
    ],
    valueLabels: [
      'T',
      'R',
      'B',
      'L'
    ],
    min: 0,
    title: 'Padding'
  }
};

export const generateDefultSlotsList = (adsKeys, pushedSlots) => {

  let generateSlots = {
    home: {},
    question: {},
    result: {}
  };

  // generating model the default slots
  adsKeys.forEach((slot) => {
    console.log(pushedSlots && pushedSlots.question && pushedSlots.question[slot])
    generateSlots = {
      ...generateSlots,
      home: {
        ...generateSlots.home,
        [slot]: pushedSlots && pushedSlots.home && pushedSlots.home[slot] || false
      },
      question: {
        ...generateSlots.question,
        [slot]: pushedSlots && pushedSlots.question && pushedSlots.question[slot] || false
      },
      result: {
        ...generateSlots.result,
        [slot]: pushedSlots && pushedSlots.result && pushedSlots.result[slot] || false
      }
    }
  })
  return generateSlots;
}


export const returnLoadedResultAd = (pushedSlots, slot) => {
  if (Object.keys(pushedSlots).length === 0) {
    return {
      [slot.pathName]: [{
        slot_name: slot.slot_name,
        pathName: slot.pathName,

      }]
    }
  } else {

    let cloneObject = { ...pushedSlots }
    // @ts-ignore
    let list = cloneObject[slot.pathName] !== undefined ? [...cloneObject[slot.pathName]] : [];

    if (slot.pathName in cloneObject) {
      let secondLastRoute = Object.keys(cloneObject)[Object.keys(cloneObject).length - 2]
      // @ts-ignore
      const previousLoadedSlot = secondLastRoute !== undefined ? cloneObject[secondLastRoute] : [];
      cloneObject = {
        ...cloneObject, // @ts-ignore 
        [slot.pathName]: [...list,
        {
          slot_name: slot.slot_name,
          pathName: slot.pathName,

        }]
      }
    } else {
      let firstLastRoute = Object.keys(cloneObject)[Object.keys(cloneObject).length - 1]
      // @ts-ignore
      const previousLoadedSlot_first = firstLastRoute !== undefined ? cloneObject[firstLastRoute] : [];
      cloneObject = {
        ...cloneObject, // @ts-ignore 
        [slot.pathName]: [...list,
        {
          slot_name: slot.slot_name,
          pathName: slot.pathName,

        }]
      }
    }


    const cloneSlots = { ...cloneObject }
    let keysLength = Object.keys(cloneSlots).length;
    if (keysLength >= 3) {
      for (var i in cloneSlots) {
        delete cloneSlots[i];
        break;
      }
    }
    return cloneSlots;

  }
}

export const updateAdSlot = (pushedSlots, slot) => {

  let cloneSlot = { ...pushedSlots };

  Object.keys(cloneSlot).forEach(key => {
    if (key === slot.pathName) {
      Object.keys(cloneSlot[key]).forEach(child => {
        let childObject = { ...cloneSlot[key] };
        // @ts-ignore
        if (child === slot.slot_name) {
          cloneSlot = {
            ...cloneSlot,
            [key]: {
              ...childObject,
              [child]: child === slot.slot_name
            }
          }
        }
      })

    }
  })
  return cloneSlot
}



