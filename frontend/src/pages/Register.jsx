import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import api from '../services/api';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const username = email.split('@')[0].replace(/[^a-zA-Z0-9_]/g, '_');
      const response = await api.post('/api/auth/register', { firstName, lastName, email, password, username });
      console.log('Registration response:', response.data);
      toast.success("Registered Successfully", { position: "top-center", autoClose: 1500 });
      setTimeout(() => navigate('/'), 1200);
    } catch (err) {
      console.error('Registration error:', err.response?.data);
      console.error('Validation errors:', err.response?.data?.errors);
      const msg = err?.response?.data?.message || 'Registration failed';
      toast.error(msg, { position: 'top-center' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 px-4">
      <ToastContainer />
      <form onSubmit={handleRegister} className="bg-white p-6 md:p-8 shadow-lg w-full max-w-md md:max-w-lg rounded-2xl border border-gray-200">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-6">Create Account</h2>
        <div className="flex justify-center mb-6">
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
            <img src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7965.jpg" alt="Register illustration" className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-xl mx-auto"/>
          </div>
        </div>
        <label className="block text-gray-700 mb-1 font-extrabold text-sm sm:text-base">First name</label>
        <input required className="bg-gray-100 mb-4 rounded-lg px-4 py-2 border border-gray-300 w-full" type="text" placeholder="Enter First Name" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
        <label className="block text-gray-700 mb-1 font-extrabold text-sm sm:text-base">Last name</label>
        <input className="bg-gray-100 mb-4 rounded-lg px-4 py-2 border border-gray-300 w-full" type="text" placeholder="Enter Last Name" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
        <label className="block text-gray-700 mb-1 font-extrabold text-sm sm:text-base">Email</label>
        <input required value={email} onChange={(e)=>setEmail(e.target.value)} className="bg-gray-100 mb-5 rounded-lg px-4 py-2 border border-gray-300 w-full" type="email" placeholder="email@example.com"/>
        <label className="block text-gray-700 mb-1 font-extrabold text-sm sm:text-base">Password</label>
        <input className="bg-gray-100 mb-6 rounded-lg px-4 py-2 border border-gray-300 w-full" value={password} onChange={(e)=>setPassword(e.target.value)} required type="password" placeholder="Password"/>
        <button disabled={loading} className="bg-black hover:bg-gray-800 transition text-white font-semibold mb-4 rounded-lg px-4 py-2 w-full">{loading ? 'Creating...' : 'Create Account'}</button>
        <p className="text-center text-sm text-gray-600 mb-4">Already have an account? <Link to="/" className="text-blue-600 hover:underline">Login here</Link></p>
        <p className="text-[10px] text-gray-500 leading-tight text-center">This site is protected by reCAPTCHA and the <span className="underline">Google Privacy Policy</span> and <span className="underline">Terms of Service</span> apply.</p>
      </form>
    </div>
  );
};

export default Register;
