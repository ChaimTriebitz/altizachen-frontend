import { Link, useNavigate } from 'react-router-dom'
import { Carousel, ImageDisplay } from './'

export const Post = ({ post }) => {
   const navigate = useNavigate()
   const price = new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(post.price)

   return (
      <article className="post">
         <div
            className="post-media"
            role="link"
            tabIndex="0"
            onClick={() => navigate('/listing/' + post._id)}
            onKeyDown={(event) => {
               if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  navigate('/listing/' + post._id)
               }
            }}
            aria-label={'View ' + post.title}
         >
            {post.images?.length ? (
               <Carousel>{post.images.map(img => <ImageDisplay publicId={img} key={img} />)}</Carousel>
            ) : <div className="no-image"><span>⌂</span><small>No photo</small></div>}
         </div>
         <div className="post-details">
            <div className="post-meta"><span>{post.category}</span><span>{new Date(post.createdAt).toLocaleDateString()}</span></div>
            <Link to={'/listing/' + post._id}><h2>{post.title}</h2></Link>
            <strong className="post-price">{price} <small>{post.currency}</small></strong>
            <p>{post.description}</p>
            {post.user && <div className="seller-line"><span className="mini-avatar">{post.user.username?.charAt(0)?.toUpperCase()}</span> {post.user.username}</div>}
         </div>
      </article>
   )
}
