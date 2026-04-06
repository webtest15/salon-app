import React from 'react'
import { AVATAR_COLORS, initials } from '../store.js'

export default function Avatar({ name, colorIdx, size = 36 }) {
  const c = AVATAR_COLORS[colorIdx % AVATAR_COLORS.length]
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: c.bg, color: c.text,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontWeight: 500, fontSize: Math.round(size * 0.36),
      flexShrink: 0
    }}>
      {initials(name)}
    </div>
  )
}
