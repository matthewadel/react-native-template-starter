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

export function FONT_FAMILY(fontType?: "BOLD" | "MEDIUM" | "SEMIBOLD" | "REGULAR") {

  // english fonts
  if (store.getState().App.lang == 'ar') {
    if (fontType === "MEDIUM")
      return ARMedium
    else if (fontType === "BOLD")
      return ARBold
    else if (fontType === "SEMIBOLD")
      return ARSemiBold
    else
      return ARRegular
  }
  // arabic fonts
  else {
    if (fontType === "MEDIUM")
      return Medium
    else if (fontType === "BOLD")
      return Bold
    else if (fontType === "SEMIBOLD")
      return SemiBold
    else
      return Regular
  }
}