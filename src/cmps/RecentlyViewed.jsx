import { useLocalStorage } from '../hooks/useLocalStorage'
import { Post } from './Post'

export const RecentlyViewed = () => {
   const [items] = useLocalStorage('altizachen-recently-viewed', [])
   if (!items.length) return null
   return (
      <section className="recently-viewed marketplace-listings">
         <div className="section-heading"><div><span className="eyebrow">FOR YOU</span><h2>Recently viewed</h2></div></div>
         <div className="posts">{items.slice(0, 4).map(item => <Post key={item._id} post={item} />)}</div>
      </section>
   )
}
