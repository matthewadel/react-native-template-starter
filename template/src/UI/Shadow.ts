import { Platform } from "react-native"
import { Colors } from "UI"

export const shadowStyle: any = {
  backgroundColor: '#fff',
  overflow: "visible",
  shadowColor: Platform.OS == "ios" ? Colors().App.Grey : "#000",
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 4.58,
  shadowRadius: (10),
  elevation: 19,

}