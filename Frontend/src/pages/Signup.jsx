import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    password: "",
    village: "",
    district: "",
    state: ""
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🔥 Already logged in? redirect
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/home");
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();

    for (let key in form) {
      if (!form[key]) {
        return alert(`${key} is required`);
      }
    }

    try {
      setLoading(true);

      await API.post("/auth/register", form);

      alert("Signup Successful 🔥");
      navigate("/login");

    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <form onSubmit={handleSignup} className="bg-white p-8 rounded-2xl shadow-xl w-96">

        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>

        {Object.keys(form).map((key) => (
          <input
            key={key}
            type={key === "password" ? "password" : "text"}
            placeholder={key.toUpperCase()}
            className="w-full p-2 mb-3 border rounded"
            value={form[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          />
        ))}

        <button
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          {loading ? "Creating..." : "Signup"}
        </button>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 font-semibold">
            Login
          </Link>
        </p>

      </form>
    </div>
  );
};

export default Signup;