import React, { useState } from 'react'
import Modal from '../components/Modal.jsx'

export default function Curriculum({ store }) {
  const { curriculum, addCurriculumItem, deleteCurriculumItem, getCategories } = store
  const [tab, setTab] = useState('すべて')
  const [showAdd, setShowAdd] = useState(false)
  const [newCat, setNewCat] = useState('')
  const [newName, setNewName] = useState('')

  const categories = getCategories()
  const tabs = ['すべて', ...categories]
  const dispCats = tab === 'すべて' ? categories : [tab]

  function handleAdd() {
    if (!newCat.trim() || !newName.trim()) return
    addCurriculumItem(newCat.trim(), newName.trim())
    setNewCat(''); setNewName(''); setShowAdd(false)
  }

  return (
    <div>
      <div className="ph">
        <div>
          <h1 className="pt">カリキュラム管理</h1>
          <p className="ps">研修項目のベースを管理します</p>
        </div>
        <button className="pbtn" onClick={() => setShowAdd(true)}>＋ 項目を追加</button>
      </div>

      <div className="tabs">
        {tabs.map(t => (
          <button key={t} className={`tab ${tab === t ? 'tabon' : ''}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>

      {dispCats.map(cat => (
        <div key={cat} className="gcard">
          <div className="ghdr">
            <span className="fw5 fs14">{cat}</span>
            <span className="muted fs12">{curriculum.filter(c => c.category === cat).length}項目</span>
          </div>
          {curriculum.filter(c => c.category === cat).map(item => (
            <div key={item.id} className="irow">
              <div className="idot" />
              <span className="f1 fs13">{item.name}</span>
              <button
                className="delbtn"
                onClick={() => { if (window.confirm('削除しますか？')) deleteCurriculumItem(item.id) }}
              >削除</button>
            </div>
          ))}
        </div>
      ))}

      {curriculum.length === 0 && <div className="empty">カリキュラムがありません。</div>}

      {showAdd && (
        <Modal title="カリキュラム項目を追加" onClose={() => setShowAdd(false)}>
          <div className="fg">
            <label className="fl" htmlFor="icat">カテゴリ</label>
            <input id="icat" className="fi" value={newCat} onChange={e => setNewCat(e.target.value)}
              list="catlist" placeholder="例：接客、技術" />
            <datalist id="catlist">
              {categories.map(c => <option key={c} value={c} />)}
            </datalist>
          </div>
          <div className="fg">
            <label className="fl" htmlFor="iname">項目名</label>
            <input id="iname" className="fi" value={newName} onChange={e => setNewName(e.target.value)}
              placeholder="例：シャンプー基本手順" />
          </div>
          <div className="mact">
            <button className="gbtn" onClick={() => setShowAdd(false)}>キャンセル</button>
            <button className="pbtn" onClick={handleAdd}>追加する</button>
          </div>
        </Modal>
      )}
    </div>
  )
}
