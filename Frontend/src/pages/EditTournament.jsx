import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

 const EditTournament = () => {
  const { id } = useParams();
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

  const [loading, setLoading] = useState(false);

  // 🔥 Fetch existing data
  useEffect(() => {
    API.get(`/tournaments/${id}`)
      .then(res => {
        setForm(res.data);
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔄 Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.put(`/tournaments/${id}`, form);

      alert("Tournament Updated 🔥");

      navigate("/home");

    } catch (err) {
      console.log(err);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex justify-center items-center p-4">
      
      {/* 🔥 Poster Style Card */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl p-6">
        
        {/* Header */}
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          ✏️ Edit Tournament
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <input
            type="text"
            name="name"
            value={form.name}
            placeholder="Tournament Name"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
          />

          {/* Location */}
          <input
            type="text"
            name="location"
            value={form.location}
            placeholder="Location"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
          />

          {/* Type */}
          <select
            name="type"
            value={form.type}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
          >
            <option value="open">Open</option>
            <option value="village">Village</option>
            <option value="district">District</option>
            <option value="state">State</option>
          </select>

          {/* Entry Fee */}
          <input
            type="number"
            name="entryFee"
            value={form.entryFee}
            placeholder="Entry Fee"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
          />

          {/* Prize */}
          <input
            type="text"
            name="prize"
            value={form.prize}
            placeholder="Prize"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
          />

          {/* Total Teams */}
          <input
            type="number"
            name="totalTeams"
            value={form.totalTeams}
            placeholder="Total Teams"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
          />

          {/* Date */}
          <input
            type="date"
            name="date"
            value={form.date?.substring(0, 10)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
          />

          {/* Buttons */}
          <div className="flex gap-3 mt-4">

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              {loading ? "Updating..." : "Update Tournament"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/home")}
              className="w-full bg-gray-300 py-3 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default EditTournament;