import { store } from 'store';

// english fonts
const Bold = 'Poppins-Bold'
const Medium = 'Poppins-Medium'
const SemiBold = 'Poppins-SemiBold'
const Regular = 'Poppins-Regular'

// arabic fonts
const ARBold = 'Cairo-Bold'
const ARMedium = 'Cairo-Medium'
const ARSemiBold = 'Cairo-SemiBold'
const ARRegular = 'Cairo-Regular'

enum IFONT_FAMILY {
  "BOLD", "MEDIUM", "SEMIBOLD", "REGULAR"
}

export function FONT_FAMILY(fontType?: IFONT_FAMILY) {

  // english fonts
  if (store.getState().App.lang == 'ar') {
    if (fontType === IFONT_FAMILY.MEDIUM)
      return Medium
    else if (fontType === IFONT_FAMILY.BOLD)
      return Bold
    else if (fontType === IFONT_FAMILY.SEMIBOLD)
      return SemiBold
    else
      return Regular
  }
  // arabic fonts
  else {
    if (fontType === IFONT_FAMILY.MEDIUM)
      return ARMedium
    else if (fontType === IFONT_FAMILY.BOLD)
      return ARBold
    else if (fontType === IFONT_FAMILY.SEMIBOLD)
      return ARSemiBold
    else
      return ARRegular
  }
}