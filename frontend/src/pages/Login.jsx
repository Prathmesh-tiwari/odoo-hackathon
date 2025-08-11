import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async(e) => {
    e.preventDefault();
    try{
      setLoading(true);
      await api.post('/api/auth/login', { email, password });
      toast.success('Login successful', { position: 'top-center' });
      setTimeout(() => navigate('/main'), 600);
    } catch(err) {
      const msg = err?.response?.data?.message || 'Login failed';
      toast.error(msg, { position: 'top-center' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
    <ToastContainer />
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="login-form bg-white p-8 shadow-md w-full max-w-md rounded-2xl" style={{ minHeight: '500px' }}>
        <h2 className="text-3xl font-bold mb-4 flex justify-center">Login Now</h2>
        <div className="flex justify-center mb-6">
          <img src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png" alt="Login" className="w-15 h-15"/>
        </div>
        <h3 className='text-xl font-bold mb-2'>Email</h3>
        <input required value={email} onChange={(e)=>setEmail(e.target.value)} className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-3 w-full text-lg placeholder:text-base' type="email" placeholder='email@example.com'/>
        <h3 className='text-xl font-bold mb-2'>Enter Password</h3>
        <input required className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-3 w-full text-lg placeholder:text-base' value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='password'/>
        <button disabled={loading} className='bg-green-600 hover:bg-green-700 text-white font-semibold mb-4 rounded-lg px-4 py-3 w-full text-lg transition'>{loading ? 'Logging in...' : 'Login'}</button>
        
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="mx-3 text-gray-500 font-medium">or</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>
        
        <button type="button" className='bg-white border border-gray-300 text-gray-700 font-semibold mb-3 rounded-lg px-4 py-3 w-full text-base flex items-center justify-center gap-2 hover:bg-gray-50 transition'>
          <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="w-5 h-5"/>
          Sign in with Google
        </button>
        
        <button type="button" className='bg-black text-white font-semibold mb-4 rounded-lg px-4 py-3 w-full text-base flex items-center justify-center gap-2 hover:bg-gray-800 transition'>
          <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" className="w-5 h-5"/>
          Sign in with Apple
        </button>
        
        <p className='text-center mb-4'>Don't have an account? <Link to='/register' className='text-blue-600 hover:underline'>Register here</Link></p>
        <div>
          <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
        </div>
      </form>
    </div>
    </>
  )
}

export default Login

