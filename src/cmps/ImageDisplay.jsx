import React, { useState } from 'react'
import { AdvancedImage, lazyload, placeholder } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen'
import { thumbnail } from '@cloudinary/url-gen/actions/resize'
import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity'
import { FocusOn } from '@cloudinary/url-gen/qualifiers/focusOn'

const ImageDisplay = ({ publicId, isAvatar = false, onImageError }) => {
   const [failed, setFailed] = useState(false)

   if (!publicId || failed) {
      if (failed && !isAvatar) return null;
      return isAvatar
         ? <span className="avatar-fallback" aria-hidden="true">?</span>
         : <div className="image-fallback" role="img" aria-label="No photo available"><span>◌</span><small>No photo</small></div>
   }

   const handleError = () => {
      setFailed(true)
      onImageError?.()
   }

   if (publicId.startsWith('data:image/') || publicId.startsWith('http://') || publicId.startsWith('https://')) {
      return (
         <img
            className={isAvatar ? 'image-avatar' : 'listing-image'}
            src={publicId}
            alt=""
            loading="lazy"
            onError={handleError}
         />
      )
   }

   const cld = new Cloudinary({ cloud: { cloudName: 'dlyxlzh2y' } })
   const myImage = cld.image(publicId)

   if (isAvatar) {
      myImage.resize(thumbnail().width(50).height(50).gravity(focusOn(FocusOn.face())))
   }

   return (
      <AdvancedImage
         className={isAvatar ? 'image-avatar' : 'listing-image'}
         onError={handleError}
         cldImg={myImage}
         plugins={[lazyload(), placeholder({ mode: 'predominant-color' })]}
      />
   )
}

export default React.memo(ImageDisplay)
