import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { db, auth } from "../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  doc,
} from "firebase/firestore";
import CryptoJS from "crypto-js";
import defaultlogo from "../assets/default-logo.jpg";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

import { FaRegCopy } from "react-icons/fa";

const Manager = () => {
  const SECRET_KEY = import.meta.env.VITE_Secret_key;
  const [uid, setUid] = useState(null);
  const [form, setform] = useState({
    site: "",
    username: "",
    password: "",
  });

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.info(`${label} copied!`, {
        position: "top-right",
        autoClose: 1200,
        hideProgressBar: true,
        theme: "colored",
      });
    });
  };

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

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        setUid(null);
      }
    });
    return () => unsub();
  });

  useEffect(() => {
    const fetchPasswords = async () => {
      if (uid) {
        try {
          const snapshot = await getDocs(
            collection(db, "users", uid, "passwords")
          );
          const data = snapshot.docs.map((doc) => ({
            ...doc.data(),
            docId: doc.id,
          }));
          setpassarr(data);
        } catch (error) {
          console.log("Error fetching");
        }
      }
    };
    fetchPasswords();
  }, [uid]);

  const showpass = (id) => {
    setvisiblepass((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const savepass = async () => {
    if (!uid) {
      toast.error("User not loaded..wait");
      return;
    }
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      const encryptedPassword = CryptoJS.AES.encrypt(
        form.password,
        SECRET_KEY
      ).toString();
      const newEntry = {
        site: form.site,
        username: form.username,
        password: encryptedPassword,
        id: uuidv4(),
      };

      try {
        await addDoc(collection(db, "users", uid, "passwords"), newEntry);
        setpassarr([...passarr, newEntry]);
        setform({ site: "", username: "", password: "" });
        toast.success("Password Saved !", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } catch (error) {
        console.error("Erorr saving pass");
      }
    }
  };

  const deletepass = async (id, showtoast = true) => {
    try {
      const itemtodelete = passarr.find((item) => item.id === id);
      if (!itemtodelete) {
        console.error("Item not found");
        return;
      }
      await deleteDoc(doc(db, "users", uid, "passwords", itemtodelete.docId));
      const filtered = passarr.filter((item) => item.id !== id);
      setpassarr(filtered);
      if (showtoast) {
        toast.error("Password Deleted !", {
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
    } catch (error) {
      console.log("Error in delete", error);
    }
  };

  const editpass = (id) => {
    const selected = passarr.find((i) => i.id === id);

    if (selected) {
      const decrypted = {
        ...selected,
        password: getDecryptedPassword(selected.password),
      };
      setform(decrypted);
      deletepass(id, false);
    }
    toast.info("Password Edited !", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged Out !", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const sitelog = (site) => {
    return site ? `https://logo.clearbit.com/${site}` : defaultlogo;
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-xl p-6 mb-10">
            <h2 className="text-3xl font-semibold mb-6 text-center text-green-400">
              Add New Password
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm mb-1">Website</label>
                <input
                  type="text"
                  name="site"
                  value={form.site}
                  onChange={handleChange}
                  placeholder="e.g. https://example.com"
                  className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-green-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Username</label>
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Your username"
                  className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-green-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Password</label>
                <input
                  type="text"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Your password"
                  className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-green-400 outline-none"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={savepass}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 transition text-white px-6 py-2 rounded-md font-semibold cursor-pointer"
              >
                <lord-icon
                  src="https://cdn.lordicon.com/sbnjyzil.json"
                  trigger="hover"
                  colors="primary:#ffffff,secondary:#ffffff"
                  style={{ width: "25px", height: "25px" }}
                />
                Add Password
              </button>
            </div>
          </div>

          <div className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-xl rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-center text-green-400 mb-4">
              Your Passwords
            </h2>

            {passarr.length === 0 ? (
              <div className="text-center text-gray-400">
                No passwords saved yet.
              </div>
            ) : (
              <div className="overflow-x-auto rounded-lg">
                <table className="w-full table-auto text-sm ">
                  <thead className="bg-green-700 text-white">
                    <tr>
                      <th className="p-3 text-left">Site</th>
                      <th className="p-3 text-center">Username</th>
                      <th className="p-3 text-center">Password</th>
                      <th className="p-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {passarr.map((item, i) => (
                      <tr
                        key={item.id}
                        className={`${
                          i % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                        } border-t border-gray-600 `}
                      >
                        <td className="p-3 flex gap-2 ">
                          <img
                            src={sitelog(item.site)}
                            className="h-8 w-8 rounded-md"
                            alt="logo"
                          />
                          <a
                            href={`https://${item.site}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-300 hover:underline"
                          >
                            {item.site}
                          </a>
                        </td>
                        <td className="p-3 ">
                          <div className="flex justify-center gap-2">
                            <span>{item.username}</span>
                            <button
                              onClick={() =>
                                copyToClipboard(item.username, "Username")
                              }
                              className="text-green-400 hover:text-green-300"
                              title="Copy Username"
                            >
                              <FaRegCopy />
                            </button>
                          </div>
                        </td>

                        <td className="p-3">
                          <div className="flex justify-center gap-2">
                            <span>
                              {visiblepass[item.id]
                                ? getDecryptedPassword(item.password)
                                : "••••••••"}
                            </span>

                            <button
                              onClick={() =>
                                copyToClipboard(
                                  getDecryptedPassword(item.password),
                                  "Password"
                                )
                              }
                              className="text-green-400 hover:text-green-300 cursor-pointer"
                              title="Copy Password"
                            >
                              <FaRegCopy />
                            </button>

                            <button
                              onClick={() => showpass(item.id)}
                              className="text-green-300 hover:text-white transition cursor-pointer"
                            >
                              {visiblepass[item.id] ? (
                                <FaEyeSlash />
                              ) : (
                                <FaEye />
                              )}
                            </button>
                          </div>
                        </td>
                        <td className="p-3 flex gap-3 justify-center">
                          <button
                            onClick={() => editpass(item.id)}
                            className="bg-blue-600 hover:bg-blue-800 text-white px-3 py-1 rounded mr-2 cursor-pointer flex items-center gap-2"
                          >
                            <FaRegEdit />
                            Edit
                          </button>
                          <button
                            onClick={() => deletepass(item.id)}
                            className="bg-red-600 hover:bg-red-800 text-white px-3 py-1 rounded cursor-pointer flex items-center gap-1"
                          >
                            <MdOutlineDelete />
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

          <div className="mt-10 flex justify-center">
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Manager;
