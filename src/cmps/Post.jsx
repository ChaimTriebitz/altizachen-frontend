import { Carousel, ImageDisplay } from './'


export const Post = ({ post }) => {
   return (
      <article className='post'>
         <section className='images'>
            {
               post.images.length &&
               <Carousel>
                  {
                     post.images.map(img =>
                        <ImageDisplay publicId={img} key={img} />
                     )
                  }
               </Carousel>
            }
         </section>
         <section className='details'>
            <h1>{post.category}</h1>
            <h2>{post.title}</h2>
            <h3>{post.description}</h3>
         </section>


      </article>
   )
}
