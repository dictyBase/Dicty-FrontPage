// @flow
import {
  CHANGE_FONT_SELECT,
  CHANGE_FONT_SIZE,
  SHOW_HELP_MODAL,
  SHOW_COLOR_PICKER,
} from "constants/types"

const initialState = {
  currentFont: 0,
  currentFontSize: 2,
  showHelpModal: false,
  showColorPicker: false,
}

const editorToolbarReducer = (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case CHANGE_FONT_SELECT:
      return {
        ...state,
        currentFont: action.payload.font,
      }
    case CHANGE_FONT_SIZE:
      return {
        ...state,
        currentFontSize: action.payload.fontSize,
      }
    case SHOW_HELP_MODAL:
      return {
        ...state,
        showHelpModal: action.payload.bool,
      }
    case SHOW_COLOR_PICKER:
      return {
        ...state,
        showColorPicker: action.payload.bool,
      }
    default:
      return state
  }
}

export default editorToolbarReducer