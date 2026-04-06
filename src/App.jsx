import React, { useState } from 'react'
import Dashboard from './pages/Dashboard.jsx'
import Curriculum from './pages/Curriculum.jsx'
import Trainees from './pages/Trainees.jsx'
import MyProgress from './pages/MyProgress.jsx'
import { useStore } from './store.js'
import './styles.css'

const NAV = [
  { id: 'dashboard',   icon: '📊', label: 'ダッシュボード' },
  { id: 'curriculum',  icon: '📋', label: 'カリキュラム' },
  { id: 'trainees',    icon: '👥', label: '新人一覧' },
  { id: 'my-progress', icon: '✅', label: '自分の進捗' },
]

export default function App() {
  const [page, setPage] = useState('dashboard')
  const store = useStore()

  const pageProps = { store, setPage }

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">✂</div>
          <div>
            <div className="logo-title">Salon Training</div>
            <div className="logo-sub">研修管理システム</div>
          </div>
        </div>
        <nav className="nav">
          {NAV.map(n => (
            <button
              key={n.id}
              className={`nav-item ${page === n.id ? 'active' : ''}`}
              onClick={() => setPage(n.id)}
            >
              <span className="nav-icon">{n.icon}</span>
              <span className="nav-label">{n.label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-foot">
          <span className="role-badge">管理者</span>
        </div>
      </aside>
      <main className="main">
        <div className="inner">
          {page === 'dashboard'   && <Dashboard   {...pageProps} />}
          {page === 'curriculum'  && <Curriculum  {...pageProps} />}
          {page === 'trainees'    && <Trainees    {...pageProps} />}
          {page === 'my-progress' && <MyProgress  {...pageProps} />}
        </div>
      </main>
    </div>
  )
}
