import { useState } from "react";
import { auth, provider } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";
import test from "../assets/test.jpg";

function AuthPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async () => {
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success("Signed Up Successfully.", {
          theme: "colored",
          autoClose: 1500,
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Logged in Successfully.", {
          theme: "colored",
          autoClose: 1500,
        });
      }
    } catch (err) {
      toast.info("User already exists!", {
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
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      toast.success("Google Sign-In Successful", {
        theme: "colored",
        autoClose: 1500,
      });
    } catch (err) {
      toast.info("Something went wrong ! Try Again", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div
      className="min-h-screen grid grid-cols-1 md:grid-cols-2 text-gray-900"
      style={{
        backgroundImage: `url(${test})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex justify-center items-center px-4">
        <ToastContainer />
        <div className="backdrop-blur-md bg-white/70 border border-gray-300 shadow-2xl rounded-xl p-8 w-full max-w-sm">
          <h2 className="text-3xl font-bold text-center text-green-600 mb-6">
            {isSignup ? "Create Account" : "Welcome Back"}
          </h2>

          <div className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-900 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-900 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <button
              onClick={handleAuth}
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200 cursor-pointer"
            >
              {isSignup ? "Sign Up" : "Login"}
            </button>

            <button
              onClick={handleGoogleSignIn}
              className="flex items-center justify-center gap-3 w-full bg-white text-black py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition duration-200 cursor-pointer"
            >
              <FcGoogle size={24} /> Sign in with Google
            </button>
          </div>

          <p className="mt-6 text-xs text-center text-gray-600">
            Demo Email & Password: <br />
            <span className="text-black font-semibold">user@mail.com</span>
          </p>

          <p
            onClick={() => setIsSignup(!isSignup)}
            className="mt-4 text-sm text-center text-green-600 hover:text-green-500 cursor-pointer transition"
          >
            {isSignup
              ? "Already have an account? Log In"
              : "Don't have an account? Sign Up"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
