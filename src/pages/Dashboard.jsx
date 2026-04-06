import React, { useState } from 'react'
import { AVATAR_COLORS, progressColor, initials } from '../store.js'
import ProgressBar from '../components/ProgressBar.jsx'
import Avatar from '../components/Avatar.jsx'
import Modal from '../components/Modal.jsx'
import CheckItem from '../components/CheckItem.jsx'

export default function Dashboard({ store, setPage }) {
  const { curriculum, trainees, progress, getProgressPct, getCategories } = store
  const [detail, setDetail] = useState(null)
  const categories = getCategories()

  const avg = trainees.length
    ? Math.round(trainees.reduce((a, t) => a + getProgressPct(t.id), 0) / trainees.length)
    : 0

  return (
    <div>
      <div className="ph">
        <div>
          <h1 className="pt">ダッシュボード</h1>
          <p className="ps">全新人の研修進捗を一括確認</p>
        </div>
      </div>

      <div className="metrics">
        <div className="metric-card">
          <div className="metric-label">新人数</div>
          <div className="metric-value">{trainees.length}<span className="mu">名</span></div>
        </div>
        <div className="metric-card">
          <div className="metric-label">カリキュラム</div>
          <div className="metric-value">{curriculum.length}<span className="mu">項目</span></div>
        </div>
        <div className="metric-card">
          <div className="metric-label">平均進捗率</div>
          <div className="metric-value" style={{ color: progressColor(avg) }}>{avg}<span className="mu">%</span></div>
        </div>
      </div>

      <div className="sec-label">新人別進捗</div>

      {trainees.map(t => {
        const pct = getProgressPct(t.id)
        const done = curriculum.filter(c => progress[t.id]?.[c.id]).length
        const col = progressColor(pct)
        return (
          <div key={t.id} className="card clickable" onClick={() => setDetail(t)}>
            <div className="row gap12" style={{ marginBottom: 10 }}>
              <Avatar name={t.name} colorIdx={t.colorIdx} />
              <div className="f1">
                <div className="fw5 fs15">{t.name}</div>
                <div className="muted fs12">入社：{t.joinDate}</div>
              </div>
              <div className="fw5 fs18" style={{ color: col }}>{pct}%</div>
              <span className="hint">詳細 →</span>
            </div>
            <ProgressBar pct={pct} done={done} total={curriculum.length} />
            <div className="chips" style={{ marginTop: 10 }}>
              {categories.map(cat => {
                const cd = curriculum.filter(c => c.category === cat && progress[t.id]?.[c.id]).length
                const ct = curriculum.filter(c => c.category === cat).length
                return (
                  <div key={cat} className={`chip ${cd === ct ? 'chip-done' : ''}`}>
                    {cat} {cd}/{ct}
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}

      {trainees.length === 0 && (
        <div className="empty">
          新人がいません。
          <button className="lbtn" onClick={() => setPage('trainees')}>新人一覧</button>
          から追加してください。
        </div>
      )}

      {detail && (
        <Modal title={detail.name + ' の進捗'} onClose={() => setDetail(null)}>
          {(() => {
            const pct = getProgressPct(detail.id)
            const done = curriculum.filter(c => progress[detail.id]?.[c.id]).length
            const col = progressColor(pct)
            return (
              <>
                <div className="row gap12" style={{ marginBottom: 12 }}>
                  <Avatar name={detail.name} colorIdx={detail.colorIdx} size={44} />
                  <div>
                    <div className="fw5 fs16">{detail.name}</div>
                    <div className="muted fs12">入社日：{detail.joinDate}</div>
                  </div>
                </div>
                <div className="fw5 fs24" style={{ color: col, marginBottom: 8 }}>{pct}%</div>
                <ProgressBar pct={pct} done={done} total={curriculum.length} />
                <div style={{ marginTop: 16 }}>
                  {categories.map(cat => (
                    <div key={cat}>
                      <div className="dcat">{cat}</div>
                      {curriculum.filter(c => c.category === cat).map(item => (
                        <CheckItem
                          key={item.id}
                          label={item.name}
                          checked={!!progress[detail.id]?.[item.id]}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </>
            )
          })()}
        </Modal>
      )}
    </div>
  )
}
