export const dragNdrop = {
   handleDragStart,
   handleDragLeave,
   handleDragOver,
   handleDrop,
   handleDragEnd,
   handleOver,
   drg
}

function handleDragStart(e, draggedRowRef) {
   const elRow = e.currentTarget
   setTimeout(() => {
      elRow.classList.add('drag-start');
      draggedRowRef.current = elRow;
   }, 50);
};
function handleDragEnd(e, draggedRowRef) {
   const elRow = e.currentTarget
   elRow.classList.remove('drag-start');
   draggedRowRef.current = null;
};
// body
function handleOver(e, draggedRowRef) {
   e.preventDefault();
   const sortableList = e.currentTarget;
   // Getting all items except currently dragging and making array of them
   let siblings = [...sortableList.querySelectorAll("tr:not(.drag-start)")];
   // Finding the sibling after which the dragging item should be placed
   let nextSibling = siblings.find(sibling => {
      return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
   });
   // Inserting the dragging item before the found sibling
   sortableList.insertBefore(draggedRowRef.current, nextSibling);
};

function handleDragLeave(e, droppedRowRef) {
   droppedRowRef.current.classList.remove('drag-over');
}

function handleDragOver(e, droppedRowRef) {
   e.preventDefault()
   droppedRowRef.current = e.target.closest('tr');
   droppedRowRef.current.classList.add('drag-over');
};

function handleDrop(droppedRowRef, draggedRowRef, data) {
   droppedRowRef.current.classList.remove('drag-over');
   if (draggedRowRef.current !== null && droppedRowRef.current !== null) {
      const newData = [...data]
      const draggedObj = newData[draggedRowRef.current.dataset.row]
      newData.splice(draggedRowRef.current.dataset.row, 1)
      newData.splice(droppedRowRef.current.dataset.row, 0, draggedObj)
      draggedRowRef.current = null
      droppedRowRef.current = null
      return new Promise((resolve, reject) => {
         if (newData) {
            resolve(newData)
         } else {
            reject()
         }
      })
   }
};

// vanilla //

function drg(){
   const sortableList = document.querySelector(".draggable-list");
   const items = sortableList.querySelectorAll(".draggable-item");
   items.forEach(item => {
      item.addEventListener("dragstart", () => {
         // Adding dragging class to item after a delay
         setTimeout(() => item.classList.add("dragging"), 0);
      });
      // Removing dragging class from item on dragend event
      item.addEventListener("dragend", () => item.classList.remove("dragging"));
   });
   const initSortableList = (e) => {
      e.preventDefault();
      const draggingItem = document.querySelector(".dragging");
      // Getting all items except currently dragging and making array of them
      let siblings = [...sortableList.querySelectorAll(".draggable-item:not(.dragging)")];
      // Finding the sibling after which the dragging item should be placed
      let nextSibling = siblings.find(sibling => {
         return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
      });
      // Inserting the dragging item before the found sibling
      sortableList.insertBefore(draggingItem, nextSibling);
   }
   sortableList.addEventListener("dragover", initSortableList);
   sortableList.addEventListener("dragenter", e => e.preventDefault());
}