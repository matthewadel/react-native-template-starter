import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { TouchableOpacity, Colors, ConvertStyleToObject, RFValue, View } from 'UI';
import RNSwiper from 'react-native-swiper';
import { useLanguage } from 'lang/useLanguage';
import { IView } from 'models';
import { ViewStyle } from 'react-native';

interface SwiperProps extends IView {
  paginationContainerStyle?: ViewStyle | ViewStyle[];
  onIndexChanged?: (x: number) => void;
  showPagination?: boolean;
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
      var offset = swiper.current.state.width * i;
      swiper.current.scrollView.scrollTo(0, offset);
    } else swiper.current.scrollBy(1, true);
  };

  const renderPagination = () => {
    let pages = [];
    for (let i = 0; i < props.children.length; i++) {
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
      <RNSwiper
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
      </RNSwiper>

      {/* pagination */}
      {!!props.showPagination && (
        <View
          style={[
            {
              width: RFValue(25) * props.children.length,
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
