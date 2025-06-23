import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // icon library

const Navbar = () => {
  const isLoggedIn = localStorage.getItem('token');
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="w-full bg-[#F7F6BB] shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-3xl font-extrabold text-[#114232] tracking-tight">
          Smart<span className="text-[#87A922]">Recipe</span>
        </Link>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-[#114232] focus:outline-none">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/" className="text-[#114232] hover:text-[#87A922] font-medium transition">
            Home
          </Link>
          <Link to="/recipes" className="text-[#114232] hover:text-[#87A922] font-medium transition">
            Recipes
          </Link>
          <Link to="/ai-recipe" className="text-[#114232] hover:text-[#87A922] font-medium transition whitespace-nowrap">
            AI Suggestion
          </Link>
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="bg-[#FCDC2A] text-[#114232] hover:bg-[#ffe83b] px-4 py-2 rounded-full font-semibold transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="border-2 border-[#87A922] text-[#114232] hover:bg-[#87A922] hover:text-white px-4 py-2 rounded-full font-semibold transition"
              >
                Register
              </Link>
            </>
          ) : (
            <>
            <Link to="/saved" className="text-[#114232] hover:text-[#87A922] font-medium transition whitespace-nowrap">Saved Recipes</Link>

            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="block w-full text-white bg-[#87A922] hover:bg-[#6f8c1b] px-4 py-2 rounded-full font-semibold"
            >
              Logout
            </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-x pb-4 space-y-2 bg-[#F7F6BB]">
          <Link to="/" onClick={toggleMenu} className="block text-[#114232] font-medium hover:text-[#87A922]">
            Home
          </Link>
          <Link to="/recipes" onClick={toggleMenu} className="block text-[#114232] font-medium hover:text-[#87A922]">
            Recipes
          </Link>
          <Link to="/ai-recipe" onClick={toggleMenu} className="block text-[#114232] font-medium hover:text-[#87A922] whitespace-nowrap">
            AI Suggestion
          </Link>
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                onClick={toggleMenu}
                className="block bg-[#FCDC2A] text-[#114232] hover:bg-[#ffe83b] px-4 py-2 rounded-full font-semibold"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={toggleMenu}
                className="block border-2 border-[#87A922] text-[#114232] hover:bg-[#87A922] hover:text-white px-4 py-2 rounded-full font-semibold"
              >
                Register
              </Link>
            </>
          ) : (
            <>
            <Link to="/saved" className="text-[#114232] hover:text-[#87A922] font-medium transition whitespace-nowrap">Saved Recipes</Link>

            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="block w-full text-white bg-[#87A922] hover:bg-[#6f8c1b] px-4 py-2 rounded-full font-semibold"
            >
              Logout
            </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
