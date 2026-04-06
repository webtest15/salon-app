import React from 'react'

export default function CheckItem({ label, checked, onClick, clickable, showBadge }) {
  return (
    <div
      className={`ditem ${clickable ? 'clickable' : ''}`}
      onClick={clickable ? onClick : undefined}
      style={{ padding: clickable ? '11px 1.25rem' : '7px 0' }}
    >
      <div className={`chk ${checked ? 'chkon' : ''}`} style={{ width: 20, height: 20, borderRadius: 5 }}>
        {checked && (
          <svg viewBox="0 0 10 8" fill="none" stroke="#fff" strokeWidth="2.5" width="10" height="10">
            <polyline points="1,4 4,7 9,1" />
          </svg>
        )}
      </div>
      <span className={`f1 fs13 ${checked ? 'done' : ''}`}>{label}</span>
      {showBadge && checked && <span className="donebadge">完了</span>}
    </div>
  )
}
