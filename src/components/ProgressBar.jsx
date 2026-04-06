import React from 'react'
import { progressColor } from '../store.js'

export default function ProgressBar({ pct, done, total }) {
  const col = progressColor(pct)
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ flex: 1, height: 6, background: 'var(--bg2)', borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: col, borderRadius: 10, transition: 'width .4s' }} />
      </div>
      <span style={{ fontSize: 12, fontWeight: 500, minWidth: 40, textAlign: 'right', color: col }}>
        {done}/{total}
      </span>
    </div>
  )
}
