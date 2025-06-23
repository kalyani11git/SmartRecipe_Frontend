import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#114232] text-[#F7F6BB] py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-extrabold mb-2">
            Smart<span className="text-[#FCDC2A]">Recipe</span>
          </h2>
          <p className="text-sm text-[#F7F6BB]">
            Cook smart. Eat healthy. Discover flavors from every state.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-[#FCDC2A]">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-[#87A922]">Home</Link></li>
            <li><Link to="/recipes" className="hover:text-[#87A922]">Recipes</Link></li>
            <li><Link to="/ai-recipe" className="hover:text-[#87A922]">AI Suggestions</Link></li>
            <li><Link to="/register" className="hover:text-[#87A922]">Register</Link></li>
            <li><Link to="/login" className="hover:text-[#87A922]">Login</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-[#FCDC2A]">Get In Touch</h3>
          <p className="text-sm">Email: support@smartrecipe.in</p>
          <p className="text-sm">Instagram: @smartrecipe.in</p>
          <p className="text-sm">© {new Date().getFullYear()} SmartRecipe. All rights reserved.</p>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center mt-8 text-sm text-[#F7F6BB] opacity-70">
        Designed with ❤️ to celebrate India's rich food culture.
      </div>
    </footer>
  );
};

export default Footer;
