import { useNavigation, CommonActions } from '@react-navigation/native';
import React from 'react';

export const useNavigationHook = () => {
  const Navigation = useNavigation()

  const resetNavigation = (screenName: string, params?: any) => {
    return Navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: screenName, params },
        ],
      })
    );
  }

  return { resetNavigation }
}

export const navigationRef = React.createRef<any>();
export function navigate(name: string, params?: any) {
  navigationRef.current?.navigate(name, params);
}

export function push(name: string, params?: any) {
  navigationRef.current?.push(name, params);
}

export function pop() {
  navigationRef.current?.goBack();
}