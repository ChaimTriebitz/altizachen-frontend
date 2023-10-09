export const ls = {
   checkForItem
}

function checkForItem(itemName) {
   const item = localStorage.getItem(itemName)
   if (item || item !== 'undefined') {
      return item
   } else {
      return null
   }
}