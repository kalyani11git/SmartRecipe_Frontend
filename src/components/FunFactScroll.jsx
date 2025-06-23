import { useEffect, useRef, useState } from 'react';

import butterChicken from '../images/states/butter-chicken.jpg';
import dhokla from '../images/states/dhokla.jpg';
import vadaPav from '../images/states/vada-pav.jpg';
import dosa from '../images/states/dosa.jpg';
import rasgulla from '../images/states/rasgulla.jpg';
import dalBaati from '../images/states/dal-baati.jpg';
import appam from '../images/states/appam.jpg';
import andhraBiryani from '../images/states/andhra-biryani.jpg';
import littiChokha from '../images/states/litti-chokha.jpg';
import roganJosh from '../images/states/rogan-josh.jpg';
import dalma from '../images/states/dalma.jpg';
import bisiBeleBath from '../images/states/bisi-bele-bath.jpg';
import masorTenga from '../images/states/masor-tenga.jpg';
import tundayKabab from '../images/states/tunday-kabab.jpg';
import eromba from '../images/states/eromba.jpg';



const facts = [
  "Turmeric contains curcumin, a powerful anti-inflammatory compound.",
  "Dark chocolate is rich in antioxidants and can improve brain function.",
  "Garlic boosts immunity and helps lower blood pressure.",
  "Yogurt supports gut health with its probiotic content.",
  "Green tea increases fat burning and improves physical performance.",
  "Eating almonds can reduce hunger and promote weight loss.",
  "Tomatoes are a great source of lycopene, an antioxidant linked to heart health.",
];

const getRandomFact = () => facts[Math.floor(Math.random() * facts.length)];



const stateRecipes = [
  { state: "Punjab", name: "Butter Chicken", image: butterChicken },
  { state: "Gujarat", name: "Dhokla", image: dhokla },
  { state: "Maharashtra", name: "Vada Pav", image: vadaPav },
  { state: "Tamil Nadu", name: "Dosa", image: dosa },
  { state: "West Bengal", name: "Rasgulla", image: rasgulla },
  { state: "Rajasthan", name: "Dal Baati Churma", image: dalBaati },
  { state: "Kerala", name: "Appam with Stew", image: appam },
  { state: "Andhra Pradesh", name: "Andhra Biryani", image: andhraBiryani },
  { state: "Bihar", name: "Litti Chokha", image: littiChokha },
  { state: "Kashmir", name: "Rogan Josh", image: roganJosh },
  { state: "Odisha", name: "Dalma", image: dalma },
  { state: "Karnataka", name: "Bisi Bele Bath", image: bisiBeleBath },
  { state: "Assam", name: "Masor Tenga", image: masorTenga },
  { state: "Uttar Pradesh", name: "Tunday Kabab", image: tundayKabab },
  { state: "Manipur", name: "Eromba", image: eromba },
];




const FunFactScroll = () => {
  const scrollRef = useRef(null);

  const [funFact, setFunFact] = useState(getRandomFact());

    useEffect(() => {
    setFunFact(getRandomFact());
    }, []);


  useEffect(() => {
    const scroll = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += 1;
        if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth - scrollRef.current.clientWidth) {
          scrollRef.current.scrollLeft = 0;
        }
      }
    };
    const interval = setInterval(scroll, 30); // Adjust speed
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#F7F6BB] py-10 px-4">
      {/* Fun Fact */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-[#114232] mb-2">🥄 Did You Know?</h2>
        <p className="text-[#114232] text-lg max-w-2xl mx-auto">
          {funFact}
        </p>
      </div>

      {/* Auto-Scrolling Recipes */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-4 scrollbar-hide px-2"
        style={{ scrollBehavior: 'smooth' }}
      >
        {stateRecipes.map((recipe, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-56 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
          >
            <img src={recipe.image} alt={recipe.name} className="w-full h-36 object-cover" />
            <div className="p-3 text-center">
              <h3 className="text-[#114232] font-semibold text-lg">{recipe.name}</h3>
              <p className="text-sm text-[#87A922]">{recipe.state}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FunFactScroll;
