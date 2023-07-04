import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { TouchableOpacity, Colors, ConvertStyleToObject, RFValue, View, WIDTH } from 'UI';
import Carousel from 'react-native-snap-carousel';
import { useLanguage } from 'lang/useLanguage';
import { IView } from 'models';
import { ViewStyle } from 'react-native';

interface SwiperProps extends IView {
  paginationContainerStyle?: ViewStyle | ViewStyle[];
  onIndexChanged?: (x: number) => void;
  showPagination?: boolean;
  initialIndex?: number
  loop?: boolean
  data: any
  renderItem: Function
  activeSlideAlignment?: 'center' | 'start' | 'end'
}

export const Swiper = forwardRef((props: SwiperProps, ref) => {
  let [index, setIndex] = useState(0);
  const swiper = useRef<any>(null);

  const { locale } = useLanguage()
  useImperativeHandle(ref, () => ({
    swipe,
  }));

  const swipe = (i: number | undefined) => {
    if (i !== undefined) {
      swiper.current.snapToItem(i, true);
    } else swiper.current?.snapToNext()
  };

  const renderPagination = () => {
    let pages = [];
    for (let i = 0; i < props.data.length; i++) {
      pages.push(
        <TouchableOpacity
          onPress={() => {
            setIndex(i);
            swipe(i);
          }}
          key={i}
          style={{
            width: RFValue(9),
            height: RFValue(9),
            borderRadius: RFValue(4),
            backgroundColor:
              i === index ? Colors().App.Primary : Colors().App.Secondary,
          }}
        />,
      );
    }

    return pages;
  };

  return (
    <View
      {...props}
      style={[{ width: '100%', flex: 1 }, ConvertStyleToObject(props.style)]}>
      <Carousel
        layoutCardOffset={0}
        keyboardShouldPersistTaps={'always'}
        inverted={locale == 'ar'}
        activeSlideAlignment={props.activeSlideAlignment || 'center'}
        onSnapToItem={(i: number) => {
          if (props.showPagination)
            setIndex(i);
          !!props.onIndexChanged && props.onIndexChanged(i);
        }}
        loop={props.loop}
        inactiveSlideScale={1}
        lockScrollWhileSnapping
        ref={swiper}
        itemWidth={WIDTH()}
        sliderWidth={WIDTH()}
        firstItem={props.initialIndex || 0}
        containerCustomStyle={{ flex: 1 }}
        data={props.data}
        renderItem={({ item, index: it }: { item: any, index: number }) => {
          return props.renderItem({ item, index: it })
        }}
      />
      {/* <RNSwiper
        showsButtons={false}
        loop={false}
        removeClippedSubviews={false}
        showsPagination={false}
        ref={swiper}
        onIndexChanged={(i) => {
          setIndex(i);
          !!props.onIndexChanged && props.onIndexChanged(i);
        }}>
        {props.children}
      </RNSwiper> */}

      {/* pagination */}
      {!!props.showPagination && (
        <View
          style={[
            {
              width: RFValue(25) * props.data.length,
              marginTop: RFValue(10),
              marginBottom: RFValue(30),
              height: RFValue(30),
              paddingHorizontal: 5,
              flexDirection: locale === 'ar' ? 'row-reverse' : 'row',
              justifyContent: 'space-around',
              alignSelf: 'center',
              alignItems: 'center',
              backgroundColor: '#E5E5E7',
              borderRadius: RFValue(20),
            },
            ConvertStyleToObject(props.paginationContainerStyle),
          ]}>
          {renderPagination()}
        </View>
      )}
    </View>
  );
});
