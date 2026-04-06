import React from 'react'

export default function Modal({ title, onClose, children }) {
  return (
    <div className="overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="mhdr">
          <div className="fw5 fs16">{title}</div>
          <button className="xbtn" onClick={onClose}>✕</button>
        </div>
        {children}
      </div>
    </div>
  )
}
