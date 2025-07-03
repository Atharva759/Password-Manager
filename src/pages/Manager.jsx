import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { onAuthStateChanged, signOut } from "firebase/auth";
import {db,auth} from "../firebase";
import { addDoc, collection, deleteDoc, getDocs, where, query, doc } from "firebase/firestore";
import CryptoJS from "crypto-js";



const Manager = () => {
  const SECRET_KEY = import.meta.env.VITE_Secret_key;
  const [uid,setUid] = useState(null); 
  const [form, setform] = useState({
    site: "",
    username: "",
    password: "",
  });

  const [passarr, setpassarr] = useState([]);
  const [visiblepass, setvisiblepass] = useState({});

  const getDecryptedPassword = (encrypted) => {

    
    try {
      const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
      const res = bytes.toString(CryptoJS.enc.Utf8);
      return res || "ERROR";
    } catch (err) {
      return "Decryption failed";
    }
    

};


  useEffect(()=>{
    const unsub = onAuthStateChanged(auth,(user)=>{
        if(user){
            setUid(user.uid);
        }else{
            setUid(null);
        }
    });
    return () => unsub();
  })

  useEffect(() => {

    const fetchPasswords = async() => {
    if(uid){
      try {
        const snapshot = await getDocs(collection(db,"users",uid,"passwords"));
        const data = snapshot.docs.map(doc=>
        ({
          ...doc.data(),
          docId:doc.id,
        }));
        setpassarr(data);
      }catch(error){
        console.log("Error fetching");
      }
    }
  };
  fetchPasswords();
    
  }, [uid]);

  const showpass = (id) =>{
    setvisiblepass((prev)=>({
      ...prev,
      [id]:!prev[id],
    }));
  }
  

  const savepass = async() => {
    if(!uid){
        toast.error("User not loaded..wait");
        return;
    }
    if(form.site.length > 3 && form.username.length >3 &&form.password.length >3) {
      const encryptedPassword = CryptoJS.AES.encrypt(form.password, SECRET_KEY).toString();
      const newEntry = {
        site: form.site,
        username: form.username,
        password: encryptedPassword,
        id: uuidv4(),
      };


    try{
      await addDoc(collection(db , "users",uid,"passwords"),newEntry);
      setpassarr([...passarr,newEntry]);
      setform({site:"",username:"",password:""});
      toast.success('Password Saved !', {
                  position: "top-right",
                  autoClose: 1000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                  });
    }catch(error){
      console.error("Erorr saving pass");
    }
  }
}

  const deletepass = async (id) =>{
    try{
      const itemtodelete = passarr.find(item=>item.id===id);
      if(!itemtodelete){
        console.error("Item not found");
        return;
      }
      await deleteDoc(doc(db,"users",uid,"passwords",itemtodelete.docId));
      const filtered = passarr.filter((item)=>item.id!==id);
      setpassarr(filtered);
      toast.error('Password Deleted !', {
                  position: "top-right",
                  autoClose: 1500,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
    });
    }catch(error){
      console.log("Error in delete",error);
    }
  }

  const editpass = (id) => {
    const selected = passarr.find((i)=>i.id===id);
    if(selected){
        setform(selected);
        deletepass(id);
      }
        toast.info('Password Edited !', {
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

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogout = async () => {
    try{
        await signOut(auth);
        toast.success('Logged Out !', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
    }catch(error){
        console.log(error);
    }

  }

  return (
  <>
    <ToastContainer />
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 text-black">
      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* FORM SECTION */}
        <div className="bg-white border border-gray-300 shadow-md rounded-xl p-6 mb-10">
          <h2 className="text-2xl font-semibold mb-6 text-center">Password Manager</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Website</label>
              <input
                type="text"
                name="site"
                value={form.site}
                onChange={handleChange}
                placeholder="e.g. https://example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Your username"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="text"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={savepass}
              className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-900 transition cursor-pointer"
            >
              <lord-icon
                src="https://cdn.lordicon.com/sbnjyzil.json"
                trigger="hover"
                colors="primary:#ffffff,secondary:#ffffff"
              ></lord-icon>
              Add Password
            </button>
          </div>
        </div>

        {/* PASSWORD LIST SECTION */}
        <div className="bg-white border border-gray-300 shadow-sm rounded-xl p-6">
          <h2 className="text-xl font-semibold text-center mb-4">Your Passwords</h2>

          {passarr.length === 0 ? (
            <div className="text-center text-gray-500">No passwords to show.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table-auto w-full text-left">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="p-3">URL</th>
                    <th className="p-3">Username</th>
                    <th className="p-3">Password</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {passarr.map((item) => (
                    <tr key={item.id} className="border-t border-gray-100">
                      <td className="p-3">
                        <a href={item.site} target="_blank" className="text-blue-600 hover:underline">{item.site}</a>
                      </td>
                      <td className="p-3">{item.username}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <span>{visiblepass[item.id] ? getDecryptedPassword(item.password) : "••••••"}</span>
                          <button onClick={() => showpass(item.id)} className="text-gray-600 hover:text-black cursor-pointer">
                            {visiblepass[item.id] ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => editpass(item.id)}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-900 mr-2 cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={()=>deletepass(item.id)}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* LOGOUT */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={handleLogout}
            className="text-sm bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </>
);

}

export default Manager;
