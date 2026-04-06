import React, { useState } from 'react'
import { progressColor } from '../store.js'
import Avatar from '../components/Avatar.jsx'
import ProgressBar from '../components/ProgressBar.jsx'
import CheckItem from '../components/CheckItem.jsx'
import Modal from '../components/Modal.jsx'

export default function Trainees({ store }) {
  const { curriculum, trainees, progress, addTrainee, deleteTrainee, toggleProgress, getProgressPct, getCategories } = store
  const [showAdd, setShowAdd] = useState(false)
  const [editId, setEditId] = useState(null)
  const [newName, setNewName] = useState('')
  const [newDate, setNewDate] = useState(new Date().toISOString().slice(0, 10))
  const categories = getCategories()

  function handleAdd() {
    if (!newName.trim()) return
    addTrainee(newName.trim(), newDate)
    setNewName(''); setNewDate(new Date().toISOString().slice(0, 10)); setShowAdd(false)
  }

  function handleDelete(id) {
    if (window.confirm('この新人を削除しますか？')) {
      if (editId === id) setEditId(null)
      deleteTrainee(id)
    }
  }

  return (
    <div>
      <div className="ph">
        <div>
          <h1 className="pt">新人一覧</h1>
          <p className="ps">新人の追加・進捗管理</p>
        </div>
        <button className="pbtn" onClick={() => setShowAdd(true)}>＋ 新人を追加</button>
      </div>

      {trainees.map(t => {
        const pct = getProgressPct(t.id)
        const done = curriculum.filter(c => progress[t.id]?.[c.id]).length
        const col = progressColor(pct)
        const isOpen = editId === t.id
        return (
          <div key={t.id} className={`card ${isOpen ? 'cardsel' : ''}`}>
            <div className="row gap12" style={{ marginBottom: 10 }}>
              <Avatar name={t.name} colorIdx={t.colorIdx} />
              <div className="f1">
                <div className="fw5 fs15">{t.name}</div>
                <div className="muted fs12">入社：{t.joinDate}</div>
              </div>
              <div className="row gap6">
                <span className="fw5 fs14" style={{ color: col }}>{pct}%</span>
                <button className="ibtn editbtn" onClick={() => setEditId(isOpen ? null : t.id)}>
                  {isOpen ? '閉じる' : '編集'}
                </button>
                <button className="ibtn delbtn2" onClick={() => handleDelete(t.id)}>削除</button>
              </div>
            </div>
            <ProgressBar pct={pct} done={done} total={curriculum.length} />
            <div className="chips" style={{ marginTop: 10 }}>
              {categories.map(cat => {
                const cd = curriculum.filter(c => c.category === cat && progress[t.id]?.[c.id]).length
                const ct = curriculum.filter(c => c.category === cat).length
                return <div key={cat} className={`chip ${cd === ct ? 'chip-done' : ''}`}>{cat} {cd}/{ct}</div>
              })}
            </div>
            {isOpen && (
              <div className="epanel">
                {categories.map(cat => (
                  <div key={cat}>
                    <div className="dcat">{cat}</div>
                    {curriculum.filter(c => c.category === cat).map(item => (
                      <CheckItem
                        key={item.id}
                        label={item.name}
                        checked={!!progress[t.id]?.[item.id]}
                        onClick={() => toggleProgress(t.id, item.id)}
                        clickable
                      />
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}

      {trainees.length === 0 && <div className="empty">新人がいません。</div>}

      {showAdd && (
        <Modal title="新人を追加" onClose={() => setShowAdd(false)}>
          <div className="fg">
            <label className="fl" htmlFor="tname">名前</label>
            <input id="tname" className="fi" value={newName} onChange={e => setNewName(e.target.value)}
              placeholder="例：田中 さくら" />
          </div>
          <div className="fg">
            <label className="fl" htmlFor="tdate">入社日</label>
            <input id="tdate" className="fi" type="date" value={newDate} onChange={e => setNewDate(e.target.value)} />
          </div>
          <p className="muted fs12" style={{ marginTop: -4 }}>
            追加するとカリキュラム（{curriculum.length}項目）が自動割り当てされます。
          </p>
          <div className="mact">
            <button className="gbtn" onClick={() => setShowAdd(false)}>キャンセル</button>
            <button className="pbtn" onClick={handleAdd}>追加する</button>
          </div>
        </Modal>
      )}
    </div>
  )
}
