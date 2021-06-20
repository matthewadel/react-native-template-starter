import { useNavigation, CommonActions } from '@react-navigation/native';

export const useNavigationHook = () => {
  const Navigation = useNavigation()

  const resetNavigation = (screenName: string) => {
    return Navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: screenName },
        ],
      })
    );
  }

  return { resetNavigation }
}
