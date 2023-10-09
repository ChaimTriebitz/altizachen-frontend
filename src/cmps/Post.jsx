import { Carousel, ImageDisplay } from './'


export const Post = ({ post }) => {
   return (
      <article  className='post'>
         <section>
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
         <section>
            <div>
               <strong>seller</strong>
               <span>:</span>
               <h1>{post.user.username}</h1>
            </div>
            <div>
               <strong>title</strong>
               <span>:</span>
               <h2>{post.title}</h2>
            </div>
            <div>
               <strong>item</strong>
               <span>:</span>
               <h3>{post.description}</h3>
            </div>
         </section>

      </article>
   )
}
