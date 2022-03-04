import * as Font from "expo-font";

export default useFonts = async () =>
  await Font.loadAsync({
    'Inter-Regular': require('./assets/fonts/Inter-Regular.otf'),
    'Inter-Bold': require('./assets/fonts/Inter-Bold.otf'),
    'Inter-Light': require('./assets/fonts/Inter-Light.otf'),
    'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.otf'),
  });
