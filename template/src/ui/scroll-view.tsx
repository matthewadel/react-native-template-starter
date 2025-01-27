import React from 'react';
import {
  ScrollView as RNScrollView,
  ScrollViewProps,
  StyleSheet,
  ViewStyle,
} from 'react-native';

import { ChangeDirectionStyle } from '@/ui';

interface IScrollViewProps extends ScrollViewProps {
  children?: any;
  noDirectionChange?: boolean;
  showStyle?: boolean;
}
export const ScrollView = React.forwardRef(
  (props: IScrollViewProps, ref: any) => {
    let dynamicStyle: ViewStyle = {
      height: props.horizontal ? 'auto' : '100%',
    };
    return (
      <RNScrollView
        ref={ref}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        alwaysBounceVertical={false}
        alwaysBounceHorizontal={false}
        {...props}
        style={[
          styles.scrollviewStyle,
          dynamicStyle,

          StyleSheet.flatten(props.style),
        ]}
        contentContainerStyle={[
          !props.horizontal
            ? styles.horizontalContentContainerStyle
            : styles.verticalContentContainerStyle,
          ChangeDirectionStyle(
            props.contentContainerStyle,
            props.noDirectionChange,
            props.showStyle,
          ),
        ]}
      >
        {props.children}
      </RNScrollView>
    );
  },
);

const styles = StyleSheet.create({
  scrollviewStyle: {
    width: '100%',
    flexGrow: 0,
  },
  horizontalContentContainerStyle: {
    flexGrow: 1,
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  verticalContentContainerStyle: { flexGrow: 0 },
});
