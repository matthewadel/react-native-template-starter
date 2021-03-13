import { SAVE_LANG, SET_NOTCH_HEIGHT } from 'store/Actions'

export const SaveLang = (lang: string) => {

  return {
    type: SAVE_LANG,
    lang: lang,
  }
}

export const SetNotchHeight = (notch: number) => {
  return {
    type: SET_NOTCH_HEIGHT,
    notch: notch,
  }
}