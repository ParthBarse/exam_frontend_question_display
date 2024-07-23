import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../../utils/domain";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Login button clicked");
        console.log("Username:", username);
        console.log("Password:", password);
    
        try {
          const response = await axios.post(`https://${baseurl}/loginStudent`, { username, password });
          console.log("API response:", response);
          // Handle successful login, e.g., save token, redirect, etc.
          if(response.data.success){
            console.log("API - OK")
            const seid = response.data.seid
            const exam_id = response.data.exam_id
            localStorage.setItem("token",response.data.token)
            localStorage.setItem("seid",seid)
            localStorage.setItem("exam_id",exam_id)
            navigate(`/screening?id=${exam_id}&seid=${seid}`);
          }
        } catch (error) {
          console.error("Login failed", error);
          // Handle login failure
        }
      };

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                <main>
                    <div className="flex h-screen items-center justify-center overflow-hidden">
                        <div className="px-4 sm:px-6 lg:px-8 py-4 w-full max-w-md mx-auto mb-32">
                            <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
                                <header
                                    className="px-5 py-4 border-b border-slate-100 dark:border-slate-700"
                                    style={{ display: "flex", justifyContent: "center" }}
                                >
                                    <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                                        Login
                                    </h2>
                                </header>
                                <div className="px-5 py-4">
                                    <form onSubmit={handleLogin}>
                                        <div>
                                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">User ID</label>
                                            <input
                                                type="text"
                                                id="username"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                required
                                            />
                                        </div>
                                        <div className="mt-4">
                                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                            <input
                                                type="password"
                                                id="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                required
                                            />
                                        </div>
                                        <div className="mt-6">
                                            <button
                                                type="submit"
                                                onSubmit={handleLogin}
                                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            >
                                                Login
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default LoginPage;
