import { useState } from 'react';
import dish1 from '../images/dish1.jpg';
import dish2 from '../images/dish2.jpg';
import dish3 from '../images/dish3.jpg';
import dish4 from '../images/dish4.jpg';
import dish5 from '../images/dish5.jfif';
import axios from 'axios';
import {toast} from 'react-toastify';


const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;


const Register = () => {
  const [form, setForm] = useState({
    name: '',
    username: '',
    password: '',
  });



  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
         let response = await axios.post(`${BASE_URL+'/api/public/Register'}`,form)
         
         if (response) {
          toast.success("Registration Successful !!");
         }else{
          toast.error("Registration Failed !!");
         }

    } catch (error) {
      console.error(error);
      
    }
     

  
  };

  const images = [dish1, dish2, dish3, dish4,dish5];

  return (
    <div className="min-h-screen bg-[#F7F6BB] flex items-center justify-center px-4 py-10">
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-6xl flex flex-col md:flex-row overflow-hidden">
        {/* Left Side - Image Circle */}
        <div className="md:w-1/2 flex items-center justify-center p-6 relative bg-[#FCDC2A]">
          <div className="relative w-80 h-80"> {/* was w-72 h-72 */}

            {images.map((src, index) => {
              const angle = (360 / images.length) * index;
              const radius = 140; // or 150 if still tight

              const x = radius * Math.cos((angle * Math.PI) / 180);
              const y = radius * Math.sin((angle * Math.PI) / 180);
              return (
                <div
                  key={index}
                  className="absolute"
                  style={{
                    top: `calc(50% + ${y}px - 32px)`,
                    left: `calc(50% + ${x}px - 32px)`,
                  }}
                >
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white shadow-lg bg-white">
                        <img
                          src={src}
                          alt={`dish-${index}`}
                          className="w-full h-full object-cover"
                        />
                      </div>


                </div>
              );
            })}
            {/* Center Text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center px-4">
              <p className="text-[#114232] font-bold text-sm sm:text-base leading-tight">
                Over <span className="text-[#87A922]">10,000+</span><br />
                Recipes Cooked!
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="md:w-1/2 p-10">
          <h2 className="text-3xl font-bold text-[#114232] mb-6 text-center">Create Your Account</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[#114232] font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#87A922]"
              />
            </div>

            <div>
              <label className="block text-[#114232] font-medium mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#87A922]"
              />
            </div>

            <div>
              <label className="block text-[#114232] font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#87A922]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#87A922] text-white hover:bg-[#6f8c1b] font-semibold py-2 rounded-full transition"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
