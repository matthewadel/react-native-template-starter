import { SAVE_LANG, SET_NOTCH_HEIGHT } from 'store/Actions'

export interface IApp {
  lang?: string
  notch?:  {
    top: number | null
    bottom: number | null
  }
}

const initialState: IApp = {
  lang: 'en',
  notch:  {
    top: number | null
    bottom: number | null
  },
}

const TextReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SAVE_LANG: {
      return {
        ...state,
        lang: action.lang,
      }
    }

    case SET_NOTCH_HEIGHT: {
      return {
        ...state,
        notch: action.notch,
      }
    }

    default:
      return state
  }
}

export default TextReducer
