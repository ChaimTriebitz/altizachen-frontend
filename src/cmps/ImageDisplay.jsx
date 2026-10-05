import React, { useState } from 'react'
import { AdvancedImage, lazyload, placeholder } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen'
import { thumbnail } from '@cloudinary/url-gen/actions/resize'
import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity'
import { FocusOn } from '@cloudinary/url-gen/qualifiers/focusOn'

const ImageDisplay = ({ publicId, isAvatar = false }) => {
   const [failed, setFailed] = useState(false)

   if (!publicId || failed) {
      return isAvatar && !failed ? <span className="avatar-fallback" aria-hidden="true">?</span> : null
   }

   const handleError = () => setFailed(true)

   // Local development listings may store compressed data URLs when Cloudinary is not configured.
   if (publicId.startsWith('data:image/') || publicId.startsWith('http://') || publicId.startsWith('https://')) {
      return <img className={isAvatar ? 'image-avatar' : undefined} src={publicId} alt="" onError={handleError} />
   }

   const cld = new Cloudinary({ cloud: { cloudName: 'dlyxlzh2y' } })
   const myImage = cld.image(publicId)

   if (isAvatar) myImage.resize(thumbnail().width(50).height(50).gravity(focusOn(FocusOn.face())))

   return <AdvancedImage onError={handleError} cldImg={myImage} plugins={[lazyload(), placeholder({ mode: 'predominant-color' })]} />
}

export default React.memo(ImageDisplay)