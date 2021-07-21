import { SAVE_LANG, SET_NOTCH_HEIGHT } from 'store/Actions'

export interface IApp {
  lang?: string
  notch?:  {
    top: number | null
    bottom: number | null
  }
  actualHeight: number
}

const initialState: IApp = {
  lang: 'en',
  notch:  {
    top: number | null
    bottom: number | null
  },
  actualHeight: 0
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
      
    case SET_ACTUAL_HEIGHT: {
      return {
        ...state,
        actualHeight: action.actualHeight,
      }
    }

    default:
      return state
  }
}

export default TextReducer
