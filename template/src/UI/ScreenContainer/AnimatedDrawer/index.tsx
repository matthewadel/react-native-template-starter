import React, { forwardRef, useImperativeHandle, useRef, useEffect, useState } from 'react'
import { DrawerContent, RFValue } from 'UI'
import Drawer from "react-native-drawer";
import { store } from 'store';
import { useLanguage } from 'lang/useLanguage'

interface IAnimatedDrawer {
  children: any
  isDrawerOpen: boolean
  onDrawerStatusChange: (x: boolean) => void
}

const AnimatedDrawer = forwardRef((props: IAnimatedDrawer, ref) => {

  const DrawerRef = useRef<any>(null)
  const [isLanguageChanged, setIsLanguageChanged] = useState(false)

  useImperativeHandle(ref, () => ({
    openDrawer,
    closeDrawer,
  }));

  const openDrawer = () => DrawerRef.current.open()

  const closeDrawer = () => DrawerRef.current.close()

  const { locale } = useLanguage()

  useEffect(() => {
    setIsLanguageChanged(state => !state)
  }, [locale])

  return (
    <Drawer
      key={isLanguageChanged}
      ref={DrawerRef}
      type="static"
      tapToClose={true}
      openDrawerOffset={RFValue(250)}
      side={store.getState().App.lang == 'ar' ? 'right' : 'left'}
      tweenHandler={(ratio) => ({
        main: {
          transform: [
            { scaleX: (1 - (0.25 * ratio)) },
            { scaleY: (1 - (0.25 * ratio)) }
          ],
        }
      })}
      onOpenStart={() => props.onDrawerStatusChange(true)}
      onCloseStart={() => props.onDrawerStatusChange(false)}
      content={(<DrawerContent isDrawerOpen={props.isDrawerOpen} openDrawer={openDrawer} closeDrawer={closeDrawer} />)}
    >
      {props.children}
    </Drawer>
  )
})

export { AnimatedDrawer }