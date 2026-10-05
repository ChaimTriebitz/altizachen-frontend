import React from 'react'
import { AdvancedImage, lazyload, placeholder } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen'
import { thumbnail } from '@cloudinary/url-gen/actions/resize'
import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity'
import { FocusOn } from '@cloudinary/url-gen/qualifiers/focusOn'

const ImageDisplay = ({ publicId, isAvatar = false }) => {
   if (!publicId) {
      return isAvatar ? <span className="avatar-fallback" aria-hidden="true">?</span> : null
   }

   const cld = new Cloudinary({ cloud: { cloudName: 'dlyxlzh2y' } })
   const myImage = cld.image(publicId)

   if (isAvatar) myImage.resize(thumbnail().width(50).height(50).gravity(focusOn(FocusOn.face())))

   return <AdvancedImage cldImg={myImage} plugins={[lazyload(), placeholder({ mode: 'predominant-color' })]} />
}

export default React.memo(ImageDisplay)
