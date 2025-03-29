import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
  const [form, setform] = useState({
    site: "",
    username: "",
    password: "",
  });
  const [passarr, setpassarr] = useState([]);
  useEffect(() => {
    let pass = localStorage.getItem("pass");
    if (pass) {
      setpassarr(JSON.parse(pass));
    }
  }, []);

  const [visiblepass,setvisiblepass] = useState({});
  const showpass = (id) =>{
    setvisiblepass((prev)=>({
      ...prev,
      [id]:!prev[id],
    }));
  }
  

  const savepass = () => {
    if(form.site.length > 3 && form.username.length >3 &&form.password.length >3) {
    setpassarr([...passarr, {...form, id:uuidv4()}]);
    localStorage.setItem("pass", JSON.stringify([...passarr, {...form, id:uuidv4()}]));
    setform({site:"",username:"",password:""});
    toast.success('Password Saved !', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
      setTimeout(()=>{
        toast.dismiss();
      },3000);
    }else{
      toast('Error : Password Not Saved')
    }
  };

  const deletepass = (id) =>{
    setpassarr(passarr.filter(item=>item.id!==id));
    localStorage.setItem("pass",JSON.stringify(passarr.filter(item=>item.id!==id)))
    toast.error('Password Deleted', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }
  const editpass = (id) => {
    setform(passarr.filter(i=>i.id===id)[0]);
    setpassarr(passarr.filter(item=>item.id!==id));
  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return ( <>
    <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* Same as */}
            <ToastContainer />
    <div className="bg-[#F8EDE3] border-b-6 border-[#8D493A] ">
      <div className="flex p-4 justify-center items-center">
        <label htmlFor="" className="p-2 text-[20px]">
          Website
        </label>
        <input
          className="border p-2 rounded-full bg-white w-xl"
          placeholder="Enter website URL"
          type="text"
          value={form.site}
          onChange={handleChange}
          name="site"
        />
        <div className="p-4 gap-2">
          <label className="p-2 " htmlFor="">
            Username
          </label>
          <input
            className="p-2 border rounded-full bg-white"
            placeholder="Enter the Username"
            type="text"
            value={form.username}
            onChange={handleChange}
            name="username"
          />
          <label className="p-2" htmlFor="">
            Password
          </label>
          <input
            className="p-2 border rounded-full bg-white"
            placeholder="Enter the password"
            type="text"
            value={form.password}
            onChange={handleChange}
            name="password"
          />
        </div>
        <button
          onClick={savepass}
          className=" flex justify-center items-center gap-2 w-fit bg-[#8D493A] text-white rounded-full p-3 cursor-pointer"
        >
          <lord-icon
            src="https://cdn.lordicon.com/sbnjyzil.json"
            trigger="hover"
            colors="primary:#ffffff,secondary:#ffffff"
          ></lord-icon>
          Add Password
        </button>
      </div>
      <div className="passwords h-[600px]">
        <h2 className="text-center font-bold text-2xl text-[#8D493A]">Your Passwords</h2>
        {passarr.length === 0 && <div className="text-center">No passwords to show.</div>}
        {passarr.length !=0 && (
          <div className="overflow-x-auto w-full max-w-4xl m-auto">
        <table className="table-auto w-full max-w-4xl m-auto ">
          <thead className="bg-[#D0B8A8]">
            <tr>
              <th className="p-3">URL</th>
              <th className="p-3">Username</th>
              <th className="p-3">Password</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            { passarr.map((item)=>{

             return ( <tr key={item.id}>
              <td className="text-center p-3"><a href={item.site} target="_blank">{item.site}</a></td>
              <td className="text-center p-3">{item.username}</td>
              <td className="text-center p-3">
                <div className="flex items-center justify-center gap-2">
                  <span>{visiblepass[item.id]?item.password : "••••••"}</span>
                  <button onClick={()=> showpass(item.id)} className="p-2">
                    {visiblepass[item.id] ? (
                      <FaEyeSlash size={20}/>    
                    ) : (
                      <FaEye size={20}/>
                    )}
                  </button>
                </div>
                </td>
              <td className="text-center">
                <button onClick={()=>{editpass(item.id)}} className="p-3 border rounded-md m-1 cursor-pointer bg-green-400 text-white">Edit</button>
                <button onClick={()=>{deletepass(item.id)}} className="p-3 border rounded-md cursor-pointer bg-red-500 text-white">Delete</button>
              </td>
            </tr>
             )
})
}
          </tbody>
        </table>
        </div>)}
      </div>
    </div>
    </>
  )
}

export default Manager;
