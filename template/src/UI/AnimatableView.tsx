import React, { useEffect, useState } from 'react'
import * as Animatable from 'react-native-animatable';

const AnimatableView = (props: { animation?: boolean, style: any, children?: any, isButtonPressed?: number }) => {
  const [dontShake, setDontShake] = useState(false)

  useEffect(() => {
    setDontShake(false)
    if (props.isButtonPressed)
      setTimeout(() => {
        setDontShake(true)
      }, 500);
  }, [props.isButtonPressed])

  return (
    <Animatable.View
      animation={(props.animation && !dontShake) ? 'shake' : ''}
      style={props.style}
      children={props.children} />
  )
}

export { AnimatableView }