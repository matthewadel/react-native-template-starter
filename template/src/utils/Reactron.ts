import Reactotron, { asyncStorage, overlay, trackGlobalErrors, openInEditor, networking, } from 'reactotron-react-native';

const reactotron =
  Reactotron
    .configure()
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
