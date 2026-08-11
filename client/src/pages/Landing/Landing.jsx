import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import Features from "../../components/Features/Features";
function Landing(){
    return (
        <div className="min-h-screen bg-[#060B17] text-white">
            <Navbar/>
            <main className="space-y-0">
              <Hero/>
              <Features/>
            </main>
            <Footer/>
        </div>
    );
}

export default Landing;