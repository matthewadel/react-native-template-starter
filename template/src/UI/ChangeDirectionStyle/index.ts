// general rules:
// 1- take care of alignSelf, right and left values if the parent component has flexDirection
// 2- if the item takes flexDirection: row, it will reverse margin and padding also

// 1- flexDirection
// 2- margin (start - end / right - left)
// 3- padding (start - end / right - left)
// 4- borderTopRadius (right - left)
// 5- borderBottomRadius (right - left)
// 6- borderRight and borderLeft (width - color)
// 7- alignSelf (flex-start - flex-end)
// 8- textAlign (left - right)

import { ConvertStyleToObject } from 'UI';
import { store } from 'store';

export const ChangeDirectionStyle = (style: any, noDirectionChange = false, showStyle = false) => {

  // checking for the language
  const storeData = {
    lang: store.getState().App.lang,
  };

  //converting the style to an object
  let originalStyle = ConvertStyleToObject(style);

  // converting the style if the language is arabic 
  if (style && storeData.lang === 'ar' && !noDirectionChange) {

    // 0-output style
    let outputStyle = ConvertStyleToObject(style);

    // 1-changing flexDirection, justifyContent and AlignItems
    if (originalStyle.flexDirection) {
      if (originalStyle.flexDirection === 'row')
        outputStyle.flexDirection = 'row-reverse';
      else if (originalStyle.flexDirection === 'row-reverse')
        outputStyle.flexDirection = 'row';
    } else {
      if (originalStyle.alignItems === 'flex-start') {
        outputStyle.alignItems = 'flex-end';
      } else if (originalStyle.alignItems === 'flex-end') {
        outputStyle.alignItems = 'flex-start';
      }

      // 2-change depends on margin
      if (
        originalStyle.marginStart !== undefined &&
        originalStyle.marginEnd !== undefined
      ) {
        outputStyle.marginEnd = originalStyle.marginStart;
        outputStyle.marginStart = originalStyle.marginEnd;
      } else {
        if (originalStyle.marginStart !== undefined) {
          outputStyle.marginEnd = originalStyle.marginStart;
          outputStyle.marginStart = 0;
        }
        if (originalStyle.marginEnd !== undefined) {
          outputStyle.marginStart = originalStyle.marginEnd;
          outputStyle.marginEnd = 0;
        }
      }

      if (
        originalStyle.marginLeft !== undefined &&
        originalStyle.marginRight !== undefined
      ) {
        outputStyle.marginRight = originalStyle.marginLeft;
        outputStyle.marginLeft = originalStyle.marginRight;
      } else {
        if (originalStyle.marginLeft !== undefined) {
          outputStyle.marginRight = originalStyle.marginLeft;
          outputStyle.marginLeft = 0;
        }
        if (originalStyle.marginRight !== undefined) {
          outputStyle.marginLeft = originalStyle.marginRight;
          outputStyle.marginRight = 0;
        }
      }

      // 3-change depends on padding
      if (
        originalStyle.paddingStart !== undefined &&
        originalStyle.paddingEnd !== undefined
      ) {
        outputStyle.paddingEnd = originalStyle.paddingStart;
        outputStyle.paddingStart = originalStyle.paddingEnd;
      } else {
        if (originalStyle.paddingStart !== undefined) {
          outputStyle.paddingEnd = originalStyle.paddingStart;
          outputStyle.paddingStart = 0;
        }
        if (originalStyle.paddingEnd !== undefined) {
          outputStyle.paddingStart = originalStyle.paddingEnd;
          outputStyle.paddingEnd = 0;
        }
      }

      if (
        originalStyle.paddingLeft !== undefined &&
        originalStyle.paddingRight !== undefined
      ) {
        outputStyle.paddingLeft = originalStyle.paddingRight;
        outputStyle.paddingRight = originalStyle.paddingLeft;
      } else {
        if (originalStyle.paddingLeft !== undefined) {
          outputStyle.paddingRight = originalStyle.paddingLeft;
          outputStyle.paddingLeft = 0;
        }
        if (originalStyle.paddingRight !== undefined) {
          outputStyle.paddingLeft = originalStyle.paddingRight;
          outputStyle.paddingRight = 0;
        }
      }
    }

    // 4-changing borderTopRadius
    if (
      originalStyle.borderTopLeftRadius !== undefined &&
      originalStyle.borderTopRightRadius !== undefined
    ) {
      outputStyle.borderTopLeftRadius = originalStyle.borderTopRightRadius;
      outputStyle.borderTopRightRadius = originalStyle.borderTopLeftRadius;
    } else {
      if (originalStyle.borderTopLeftRadius !== undefined) {
        outputStyle.borderTopRightRadius = originalStyle.borderTopLeftRadius;
        outputStyle.borderTopLeftRadius = originalStyle.borderTopRightRadius;
      } else if (originalStyle.borderTopRightRadius !== undefined) {
        outputStyle.borderTopLeftRadius = originalStyle.borderTopRightRadius;
        outputStyle.borderTopRightRadius = originalStyle.borderTopLeftRadius;
      }
    }

    // 5-changing borderBottomRadius
    if (
      originalStyle.borderBottomLeftRadius !== undefined &&
      originalStyle.borderBottomRightRadius !== undefined
    ) {
      outputStyle.borderBottomRightRadius =
        originalStyle.borderBottomLeftRadius;
      outputStyle.borderBottomLeftRadius =
        originalStyle.borderBottomRightRadius;
    } else {
      if (originalStyle.borderBottomLeftRadius !== undefined) {
        outputStyle.borderBottomRightRadius =
          originalStyle.borderBottomLeftRadius;
        outputStyle.borderBottomLeftRadius =
          originalStyle.borderBottomRightRadius;
      } else if (originalStyle.borderBottomRightRadius !== undefined) {
        outputStyle.borderBottomLeftRadius =
          originalStyle.borderBottomRightRadius;
        outputStyle.borderBottomRightRadius =
          originalStyle.borderBottomLeftRadius;
      }
    }

    // 6-changing borderRight and borderLeftWidth
    if (
      originalStyle.borderLeftWidth !== undefined &&
      originalStyle.borderRightWidth !== undefined
    ) {
      outputStyle.borderLeftWidth = originalStyle.borderRightWidth;
      outputStyle.borderRightWidth = originalStyle.borderLeftWidth;
      outputStyle.borderRightColor = originalStyle.borderLeftColor;
      outputStyle.borderLeftColor = originalStyle.borderRightColor;
    } else {
      if (originalStyle.borderLeftWidth !== undefined) {
        outputStyle.borderRightWidth = originalStyle.borderLeftWidth;
        outputStyle.borderLeftWidth = 0;
        outputStyle.borderRightColor = originalStyle.borderLeftColor;
      }
      if (originalStyle.borderRightWidth !== undefined) {
        outputStyle.borderLeftWidth = originalStyle.borderRightWidth;
        outputStyle.borderRightWidth = 0;
        outputStyle.borderLeftColor = originalStyle.borderRightColor;
      }
    }

    // 7- changing alignSelf
    if (originalStyle.alignSelf === 'flex-start')
      outputStyle.alignSelf = 'flex-end';
    else if (originalStyle.alignSelf === 'flex-end')
      outputStyle.alignSelf = 'flex-start';

    // 8- textAlign (left - right)
    if (originalStyle.textAlign === 'left') outputStyle.textAlign = 'right';
    else if (originalStyle.textAlign === 'right')
      outputStyle.textAlign = 'left';

    if (showStyle) {
      console.log(originalStyle);
      console.log(outputStyle);
    }

    return outputStyle;
  }

  else return originalStyle;
};