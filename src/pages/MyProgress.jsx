import React, { useState } from 'react'
import { progressColor } from '../store.js'
import Avatar from '../components/Avatar.jsx'
import ProgressBar from '../components/ProgressBar.jsx'
import CheckItem from '../components/CheckItem.jsx'

export default function MyProgress({ store }) {
  const { curriculum, trainees, progress, toggleProgress, getProgressPct, getCategories } = store
  const [myId, setMyId] = useState(trainees[0]?.id ?? null)
  const categories = getCategories()
  const me = trainees.find(t => t.id === myId) ?? null

  if (trainees.length === 0) return <div className="empty">新人がいません。</div>

  const pct = myId ? getProgressPct(myId) : 0
  const done = myId ? curriculum.filter(c => progress[myId]?.[c.id]).length : 0
  const col = progressColor(pct)

  return (
    <div>
      <div className="ph">
        <div>
          <h1 className="pt">自分の進捗</h1>
          <p className="ps">研修の進捗を確認・更新できます</p>
        </div>
      </div>

      <div className="selrow">
        {trainees.map(t => (
          <button key={t.id} className={`selbtn ${myId === t.id ? 'selon' : ''}`} onClick={() => setMyId(t.id)}>
            <Avatar name={t.name} colorIdx={t.colorIdx} size={28} />
            <span>{t.name}</span>
          </button>
        ))}
      </div>

      {me && (
        <>
          <div className="card" style={{ marginBottom: 12 }}>
            <div className="row gap14" style={{ marginBottom: 12 }}>
              <Avatar name={me.name} colorIdx={me.colorIdx} size={52} />
              <div className="f1">
                <div className="fw5 fs18">{me.name}</div>
                <div className="muted fs12">入社日：{me.joinDate}</div>
              </div>
              <div className="fw5 fs36" style={{ color: col }}>{pct}%</div>
            </div>
            <ProgressBar pct={pct} done={done} total={curriculum.length} />
          </div>

          <div className="catov">
            {categories.map(cat => {
              const cd = curriculum.filter(c => c.category === cat && progress[myId]?.[c.id]).length
              const ct = curriculum.filter(c => c.category === cat).length
              const cp = ct ? Math.round(cd / ct * 100) : 0
              const cc = progressColor(cp)
              return (
                <div key={cat} className="catcard">
                  <div className="muted fs12" style={{ marginBottom: 4 }}>{cat}</div>
                  <div className="fw5 fs20" style={{ color: cc, marginBottom: 8 }}>{cd}/{ct}</div>
                  <div className="minibar">
                    <div className="minifill" style={{ width: `${cp}%`, background: cc }} />
                  </div>
                </div>
              )
            })}
          </div>

          {categories.map(cat => (
            <div key={cat} className="gcard" style={{ marginBottom: 12 }}>
              <div className="ghdr">
                <span className="fw5 fs14">{cat}</span>
                <span className="muted fs12">
                  {curriculum.filter(c => c.category === cat && progress[myId]?.[c.id]).length}/
                  {curriculum.filter(c => c.category === cat).length}
                </span>
              </div>
              {curriculum.filter(c => c.category === cat).map(item => (
                <CheckItem
                  key={item.id}
                  label={item.name}
                  checked={!!progress[myId]?.[item.id]}
                  onClick={() => toggleProgress(myId, item.id)}
                  clickable
                  showBadge
                />
              ))}
            </div>
          ))}
        </>
      )}
    </div>
  )
}
