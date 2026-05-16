import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import BackButton from "../components/BackButton";
const CreateTournament = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    location: "",
    type: "open",
    entryFee: "",
    prize: "",
    totalTeams: "",
    date: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔥 Simple validation
    for (let key in form) {
      if (!form[key]) {
        return alert(`${key} is required`);
      }
    }

    try {
      await API.post("/tournaments", form);

      alert("Tournament Created! 🔥");

      navigate("/home"); // redirect

    } catch (err) {
      console.log(err);
      alert("Error creating tournament");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
          {/* 🔥 Back Button - Top Left */}
      <div className="absolute top-4 left-4 ">
        <BackButton />
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          Create Tournament 🏏
        </h2>

        {/* 🏏 Name */}
        <input
          type="text"
          name="name"
          placeholder="Tournament Name"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
        />

        {/* 📍 Location */}
        <input
          type="text"
          name="location"
          placeholder="Location"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
        />

        {/* 🔖 Type */}
        <select
          name="type"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
        >
          <option value="open">Open</option>
          <option value="village">Village</option>
          <option value="district">District</option>
          <option value="state">State</option>
        </select>

        {/* 💰 Entry Fee */}
        <input
          type="number"
          name="entryFee"
          placeholder="Entry Fee"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
        />

        {/* 🏆 Prize */}
        <input
          type="text"
          name="prize"
          placeholder="Prize (e.g. 10000 + Trophy)"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
        />

        {/* 👥 Total Teams */}
        <input
          type="number"
          name="totalTeams"
          placeholder="Total Teams"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
        />

        {/* 📅 Date */}
        <input
          type="date"
          name="date"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
        />

        {/* 🚀 Submit */}
        <button className="bg-green-500 text-white w-full py-2 rounded hover:bg-green-600">
          Create Tournament
        </button>
      </form>
    </div>
  );
};

export default CreateTournament;