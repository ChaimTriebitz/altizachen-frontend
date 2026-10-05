import { Carousel, ImageDisplay } from './'

export const Post = ({ post }) => {
   const price = new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(post.price)
   return (
      <article className='post'>
         <section className='images'>
            {post.images?.length ? <Carousel>{post.images.map(img => <ImageDisplay publicId={img} key={img} />)}</Carousel> : <div className='no-image'>No photo</div>}
         </section>
         <section className='details'>
            <small>{post.category}</small>
            <h2>{post.title}</h2>
            <strong>{price} {post.currency}</strong>
            <p>{post.description}</p>
            {post.user && <small>Seller: {post.user.username}</small>}
         </section>
      </article>
   )
}
