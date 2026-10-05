import { Posts, RecentlyViewed } from '../cmps'

export const Home = () => (
   <div className="page home">
      <section className="home-hero">
         <div className="hero-copy">
            <span className="eyebrow">ALTIZACHEN MARKETPLACE</span>
            <h1>Find it. Sell it. <span>Move on.</span></h1>
            <p>Buy and sell second-hand items from people in your community.</p>
         </div>
      </section>
      <Posts />
      <RecentlyViewed />
   </div>
)
