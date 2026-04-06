import { useState, useCallback } from 'react'

const INIT_CURRICULUM = [
  { id: 1,  category: '接客',     name: '挨拶・お出迎え' },
  { id: 2,  category: '接客',     name: '電話応対' },
  { id: 3,  category: '接客',     name: 'ドリンク提供' },
  { id: 4,  category: '技術',     name: 'シャンプー基本手順' },
  { id: 5,  category: '技術',     name: 'ブロー基本' },
  { id: 6,  category: '技術',     name: 'カラー塗布補助' },
  { id: 7,  category: '技術',     name: 'トリートメント施術' },
  { id: 8,  category: '衛生管理', name: '器具消毒手順' },
  { id: 9,  category: '衛生管理', name: '店内清掃チェック' },
  { id: 10, category: '業務',     name: 'レジ・会計操作' },
  { id: 11, category: '業務',     name: '予約管理システム操作' },
]

const INIT_TRAINEES = [
  { id: 1, name: '田中 さくら', joinDate: '2025-04-01', colorIdx: 0 },
  { id: 2, name: '鈴木 はな',   joinDate: '2025-04-01', colorIdx: 1 },
  { id: 3, name: '山田 ゆい',   joinDate: '2025-06-01', colorIdx: 2 },
]

const INIT_PROGRESS = {
  1: { 1:true,  2:true,  3:true,  4:true,  5:false, 6:false, 7:false, 8:true,  9:true,  10:false, 11:false },
  2: { 1:true,  2:true,  3:false, 4:true,  5:true,  6:true,  7:false, 8:true,  9:false, 10:true,  11:false },
  3: { 1:true,  2:false, 3:false, 4:false, 5:false, 6:false, 7:false, 8:false, 9:false, 10:false, 11:false },
}

let nextItemId = 12
let nextTraineeId = 4

export function useStore() {
  const [curriculum, setCurriculum] = useState(INIT_CURRICULUM)
  const [trainees, setTrainees] = useState(INIT_TRAINEES)
  const [progress, setProgress] = useState(INIT_PROGRESS)

  const addCurriculumItem = useCallback((category, name) => {
    setCurriculum(prev => [...prev, { id: nextItemId++, category, name }])
  }, [])

  const deleteCurriculumItem = useCallback((id) => {
    setCurriculum(prev => prev.filter(i => i.id !== id))
  }, [])

  const addTrainee = useCallback((name, joinDate) => {
    setTrainees(prev => {
      const colorIdx = prev.length % 4
      return [...prev, { id: nextTraineeId++, name, joinDate, colorIdx }]
    })
  }, [])

  const deleteTrainee = useCallback((id) => {
    setTrainees(prev => prev.filter(t => t.id !== id))
    setProgress(prev => { const c = { ...prev }; delete c[id]; return c })
  }, [])

  const toggleProgress = useCallback((traineeId, itemId) => {
    setProgress(prev => ({
      ...prev,
      [traineeId]: {
        ...prev[traineeId],
        [itemId]: !prev[traineeId]?.[itemId]
      }
    }))
  }, [])

  const getProgressPct = useCallback((traineeId) => {
    if (!curriculum.length) return 0
    const done = curriculum.filter(c => progress[traineeId]?.[c.id]).length
    return Math.round(done / curriculum.length * 100)
  }, [curriculum, progress])

  const getCategories = useCallback(() => {
    return [...new Set(curriculum.map(c => c.category))]
  }, [curriculum])

  return {
    curriculum, trainees, progress,
    addCurriculumItem, deleteCurriculumItem,
    addTrainee, deleteTrainee,
    toggleProgress, getProgressPct, getCategories,
  }
}

export const AVATAR_COLORS = [
  { bg: '#FBEAF0', text: '#72243E' },
  { bg: '#E1F5EE', text: '#085041' },
  { bg: '#E6F1FB', text: '#0C447C' },
  { bg: '#FAEEDA', text: '#633806' },
]

export const progressColor = (pct) =>
  pct >= 80 ? '#1D9E75' : pct >= 40 ? '#D4537E' : '#EF9F27'

export const initials = (name) =>
  name.split(/\s+/).map(n => n[0] || '').join('').slice(0, 2).toUpperCase() || '??'
