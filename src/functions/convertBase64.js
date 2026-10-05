export const convertBase64 = (file) => {
   return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = () => {
         const image = new Image()
         image.onload = () => {
            const maxSize = 1400
            const scale = Math.min(1, maxSize / Math.max(image.width, image.height))
            const canvas = document.createElement('canvas')
            canvas.width = Math.max(1, Math.round(image.width * scale))
            canvas.height = Math.max(1, Math.round(image.height * scale))

            const context = canvas.getContext('2d')
            context.drawImage(image, 0, 0, canvas.width, canvas.height)

            resolve(canvas.toDataURL('image/jpeg', 0.78))
         }
         image.onerror = reject
         image.src = reader.result
      }

      reader.onerror = reject
      reader.readAsDataURL(file)
   })
}