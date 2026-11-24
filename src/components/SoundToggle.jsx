import { useEffect, useState } from 'react'
import { IconButton } from './Button.jsx'
import { isMuted, onMuteChange, setMuted, sound } from '../lib/sound.js'

export default function SoundToggle() {
  const [muted, setLocal] = useState(isMuted())
  useEffect(() => onMuteChange(setLocal), [])
  return (
    <IconButton
      icon={muted ? 'soundOff' : 'soundOn'}
      label={muted ? 'Ligar sons' : 'Desligar sons'}
      silent
      onClick={() => {
        setMuted(!muted)
        if (muted) setTimeout(sound.tap, 0)
      }}
    />
  )
}
