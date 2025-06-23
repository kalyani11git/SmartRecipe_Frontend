import { useState } from 'react';
import { useNavigate } from 'react-router';
import spice1 from '../images/spice1.jfif';
import spice2 from '../images/spice2.jfif';
import spice3 from '../images/spice3.jfif';
import spice4 from '../images/spice4.jfif';
import spice5 from '../images/spice5.jfif';
import spice6 from '../images/spice6.jfif';
import { toast } from 'react-toastify';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;


const Login = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
  });


  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
      try {
         let response = await axios.post(`${BASE_URL+'/api/public/login'}`,form)
         
         if (response.data) {
          localStorage.setItem('token', response.data);
          toast.success("Login Successful !!");
          navigate('/');
          
         }else{
          toast.error("Login Failed !!");
         }

     
    } catch (error) {
      console.error(error);
      
    }
  };




 

  return (
    <div className="min-h-screen bg-[#F7F6BB] flex items-center justify-center px-4 py-10">
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-6xl flex flex-col md:flex-row overflow-hidden">
        {/* Left Side - Half Circle of Images */}
        {/* Left Side - Spice Layout */}
<div className="md:w-1/2 flex flex-col items-center justify-center bg-[#FCDC2A] p-6 relative">
  {/* Top spice image */}


  {/* Horizontal spice row */}
  <div className="flex space-x-4 flex-wrap justify-center ">
    {[spice2, spice3, spice4, spice5, spice6, spice1].map((src, index) => (
      <div
        key={index}
        className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md bg-white"
      >
        <img src={src} alt={`spice-${index}`} className="w-full h-full object-cover" />
      </div>
    ))}
  </div>

  {/* Optional caption below */}
  <p className="text-[#114232] mt-6 text-center text-sm font-semibold">
    Spice up your login with flavor! 🌶️
  </p>
</div>


        {/* Right Side - Login Form */}
        <div className="md:w-1/2 p-10">
          <h2 className="text-3xl font-bold text-[#114232] mb-2 text-center">Welcome Back, Chef! 👩‍🍳</h2>
          <p className="text-center text-sm text-[#114232] mb-6">Ready to spice things up?</p>
          <form onSubmit={handleSubmit} className="space-y-6">
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
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
