import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AuthPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = async () => {
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success('Signed Up Successfully.', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success('Logged in Successfully.', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
      }
    } catch (err) {
      alert(err.message);
    }
  };

return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-white to-gray-200 px-4">
    <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-sm">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        {isSignup ? 'Sign Up' : 'Login'}
      </h2>

      <div className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
        />

        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
        />

        <button
          onClick={handleAuth}
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition duration-200 cursor-pointer"
        >
          {isSignup ? 'Sign Up' : 'Login'}
        </button>
      </div>
      <p className='mt-4 text-sm text-center text-gray-600 '>Demo Username & Password : user@mail.com</p>
      <p
        onClick={() => setIsSignup(!isSignup)}
        className="mt-4 text-sm text-center text-gray-600 hover:text-black cursor-pointer transition"
      >
        {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
      </p>
    </div>
  </div>
);
}

export default AuthPage;
