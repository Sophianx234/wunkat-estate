import Featured from "./_components/Featured";
import Hero from "./_components/Hero";
import Navbar from "./_components/Navbar";


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
</main>
    </div>
  );
}
