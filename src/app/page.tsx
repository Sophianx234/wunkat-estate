import CTA from "./_components/CTA";
import Discover from "./_components/Discover";
import Experts from "./_components/Experts";
import Featured from "./_components/Featured";
import Footer from "./_components/Footer";
import FooterNav from "./_components/FooterNav";
import Hero from "./_components/Hero";
import HomesForYou from "./_components/HomesForYou";
import Navbar from "./_components/Navbar";
import Testimonials from "./_components/Testimonials";
import TrustedBy from "./_components/TrustedBy";


export default function Home() {
  return (
    <div>
      

<header>
  <div
  className="flex  h-dvh flex-col  bg-cover bg-center bg-no-repeat       "
   style={{
    backgroundImage:
      "linear-gradient(to right, rgba(0,0,0, 0.3), rgba(0,0,0,.3)), url('/images/img-3.jpg')",
  }}
    >
      
<Hero/>

  </div>
</header>
<main>
  <Featured/>
  <HomesForYou/>
  <CTA/>
  <TrustedBy/>
  <Testimonials/>
  <Experts/>
  <Discover/>
  <FooterNav/>
  <Footer/>
</main>
    </div>
  );
}
