import { NativeModules } from 'react-native';
import Reactotron, { asyncStorage, overlay, trackGlobalErrors, openInEditor, networking, } from 'reactotron-react-native';

let scriptHostname;
if (__DEV__) {
  const scriptURL = NativeModules.SourceCode.scriptURL;
  scriptHostname = scriptURL.split('://')[1].split(':')[0];
}

const reactotron =
  Reactotron
    .configure(__DEV__ ? { host: scriptHostname } : undefined)
    .useReactNative()
    .use(trackGlobalErrors({
      veto: frame => frame.fileName.indexOf('/node_modules/react-native/') >= 0
    }))
    .use(overlay())
    .use(openInEditor())
    .use(asyncStorage({}))
    .use(networking())
    .connect()

export default reactotron
