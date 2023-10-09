import { useRef, useState } from 'react'
import { useGlobalState } from './useGlobalState'
import { ACTIONS } from '../state'



export const useDraggableRows = (tableData) => {
   const { dispatch, page } = useGlobalState()
   const [draggedRowIdx, setDraggedRowIdx] = useState(null)
   const dragOverRowIdx = useRef(null)

   const handleDragStart = (e, rowIdx) => {
      setDraggedRowIdx(rowIdx)
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('text/html', e.target.parentNode)
   }

   const handleDragOver = (e, rowIdx) => {
      e.preventDefault()
      dragOverRowIdx.current = rowIdx
   }

   const handleDragEnd = () => {
      if (page !== 'sponsors' || draggedRowIdx === null || dragOverRowIdx.current === null || draggedRowIdx === dragOverRowIdx.current) return
      const updatedTableData = [...tableData]
      const [draggedRow] = updatedTableData.splice(draggedRowIdx, 1)
      updatedTableData.splice(dragOverRowIdx.current, 0, draggedRow)
      console.log(updatedTableData);
      setDraggedRowIdx(null)
      dragOverRowIdx.current = null
   }

   return {
      handleDragStart,
      handleDragOver,
      handleDragEnd,
   }
}