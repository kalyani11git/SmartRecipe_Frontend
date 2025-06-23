import { Link } from 'react-router-dom';
import ladyCooking from '../images/lady-cooking-1.png';
import { useEffect } from 'react';
import FunFactScroll from '../components/FunFactScroll';
import Footer from '../components/Footer';

const Home = () => {
  // Hide scrollbar when on home


  return (
    <>
    <div className="bg-[#F7F6BB] min-h-screen flex items-center justify-center px-4">
      <section className="bg-white rounded-3xl shadow-xl max-w-6xl w-full flex flex-col md:flex-row items-center justify-between p-8 md:p-16 gap-10 overflow-hidden">
        {/* Left Text Section */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#114232] mb-6 leading-snug">
            Smart Cooking with AI<br />and What’s in Your Kitchen
          </h1>
          <p className="text-lg text-[#114232] mb-8">
            Discover recipes or let AI surprise you with delicious ideas — all based on what you already have.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              to="/recipes"
              className="bg-[#87A922] hover:bg-[#6f8c1b] text-white px-6 py-3 rounded-full font-semibold transition"
            >
              Find Recipes
            </Link>
            <Link
              to="/ai-recipe"
              className="bg-[#FCDC2A] hover:bg-yellow-400 text-[#114232] px-6 py-3 rounded-full font-semibold transition"
            >
              Try AI Recipe
            </Link>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="md:w-1/2">
          <img
            src={ladyCooking}
            alt="Lady cooking"
            className="w-full rounded-3xl object-cover"
          />
        </div>
      </section>
    </div>

    <FunFactScroll/>
    <Footer/>
   </> 
  );
};

export default Home;
