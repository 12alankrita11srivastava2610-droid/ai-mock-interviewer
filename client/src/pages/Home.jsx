import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import About from "../components/About";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="bg-black text-white">

      <Navbar />

      <Hero />

      <Features />

      <About />

      <Footer />

    </div>
  );
};

export default Home;