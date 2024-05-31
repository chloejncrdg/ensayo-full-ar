import { useState } from "react";
import axios from "axios"

import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault()
    dispatch(loginStart)
    try {
      const res = await axios.post("/auth/signin", {username, password})
      dispatch(loginSuccess(res.data))
      navigate('/dashboard');
    } catch(err) {
      dispatch(loginFailure())

    }

  }

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-100 pt-20 px-4">
      <div className="w-full max-w-xl bg-white px-16 py-10 rounded-2xl shadow-custom-dark">
        <h2 className="text-3xl font-sf-bold text-blue-800 mb-6 text-center">Sign in to E-NSAYO</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600 font-sf-regular mb-2">Username</label>
            <input
              type="text"
              id="username"
              className="w-full p-2 border border-gray-400 rounded-md font-sf-regular"
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-600 font-sf-regular mb-2">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border border-gray-400 rounded-md font-sf-regular"
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-800 hover:bg-blue-700 text-white font-sf-light py-2 px-8 rounded-full focus:outline-none focus:shadow-outline"
              onClick={handleLogin}
            >
              Log in
            </button>
          </div>
          <div className="text-center mt-5">
            <a href="/register" className="text-blue-800 hover:text-blue-600 font-sf-regular">No account yet? Create new account ↗</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

