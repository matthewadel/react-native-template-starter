import { FlatListProps } from "react-native";

export interface IFlatList extends FlatListProps<any> {
  paginationRequest?: Function
  renderAccordion?: boolean
  paginationLoading?: boolean
  sections?: any
  renderHeader?: any
  activityIndicatorStyle?: any
  renderContent?: any
  renderItem: any
}