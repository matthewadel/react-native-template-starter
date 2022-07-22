import { IApp } from 'models'
import { SAVE_LANG, SET_NOTCH_HEIGHT, SET_ACTUAL_HEIGHT } from 'store/Actions'

const initialState: IApp = {
  lang: 'en',
  notch: {
    top: null,
    bottom: null,
  },
  actualHeight: 0
}

const AppReducer = (state = initialState, action: any) => {
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

export default AppReducer