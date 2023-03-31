import React, { useRef, useState } from 'react'
import { FlatList as RNFlatList } from 'react-native'
import { ActivityIndicator, Colors, ConvertStyleToObject, RFValue, View } from 'UI';
import { IFlatList } from 'models';
import { store } from 'store';

export const FlatList = React.forwardRef((props: IFlatList, ref: any) => {
  const [page, setPage] = useState<number>(1)
  const onEndReachedCalledDuringMomentum = useRef<any>()
  const [loading, setLoading] = useState(!!props.paginationRequest)
  // const [refreshing, setRefreshing] = useState(false)

  const onEndReached = () => {

    if (!!props.paginationRequest && !onEndReachedCalledDuringMomentum.current) {

      if ((props.data?.length || 1) % 10 == 0 && (props.data?.length || 1) / 10 == page) {
        props.paginationRequest(page + 1)
        setPage(prev => ++prev)
      }

      onEndReachedCalledDuringMomentum.current = true;
    }
    else
      setLoading(false)
  }

  // useEffect(() => {
  //   setLoading(true)
  // }, [page])

  // useEffect(() => {
  //   if (props.data) {
  //     setLoading(false)
  //     setRefreshing(false)
  //   }
  // }, [props.data])

  // let refreshControlProp = !!props.paginationRequest ? {
  //   refreshControl: <RefreshControl
  //     refreshing={refreshing}
  //     onRefresh={() => { props.paginationRequest && props.paginationRequest(0); setRefreshing(true) }}
  //   />
  // } : {}

  return (
    <>
      <RNFlatList
        // {...refreshControlProp}
        initialNumToRender={10}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        onMomentumScrollBegin={() => { onEndReachedCalledDuringMomentum.current = false; }}
        ref={ref}
        alwaysBounceVertical={false}
        alwaysBounceHorizontal={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        inverted={props.horizontal && store.getState().App.lang == 'ar'}
        ListFooterComponent={!!props.horizontal ? <View /> : ((!!props.paginationLoading || !!loading) && !!(props.data?.length)) ? <ActivityIndicator color={Colors().App.Dark} style={[{ marginBottom: RFValue(20), height: RFValue(30), }, props.activityIndicatorStyle]} /> : <View style={{ marginBottom: RFValue(20), height: RFValue(30), }} />}
        {...props}
        contentContainerStyle={[{ flexGrow: props.horizontal ? 0 : 1, paddingBottom: props.horizontal ? 0 : RFValue(30) }, props.contentContainerStyle]}
        style={[props.horizontal ? { flexGrow: 0, width: '100%', } : { flexGrow: 1, flex: 1 }, ConvertStyleToObject(props.style)]}
      />
      {/* {!!props.horizontal ? <View /> : (!!props.paginationLoading || !!loading) ? <ActivityIndicator color={Colors().App.Dark} style={[{ marginBottom: RFValue(30), height: RFValue(30), }, props.activityIndicatorStyle]} /> : <View />} */}
      {/* <View style={[{ height: RFValue(30) }, props.activityIndicatorStyle]} /> */}
    </>
  )
})

// transform: [{ rotateY: (i18n.store.getState().App.lang == 'ar' && props.reverseChildren) ? '180deg' : '0deg' }]