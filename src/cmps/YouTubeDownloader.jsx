import axios from 'axios';
import { useState } from 'react';

export const YouTubeDownloader = () => {
   const [url, setUrl] = useState('')
   const tok = localStorage.getItem('authToken')
   const config = {
      headers: {
         "Content-Type": "application/json",
         "Authorization": `Bearer ${tok}`
      },
   }
   const handleSubmit = async (e) => {
      e.preventDefault()
      try {
         const { data } = await axios.post(`http://localhost:5000/api/private`, { url }, config)
      } catch (error) {
         console.log(error);
      }
   }
   return (
      <div>
         <form onSubmit={handleSubmit}>
            <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
            <button>Download</button>
         </form>
      </div>
   )
}
