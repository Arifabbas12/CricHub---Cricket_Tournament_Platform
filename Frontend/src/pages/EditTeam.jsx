import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

const EditTeam = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [teamName, setTeamName] = useState("");
  const [players, setPlayers] = useState([]);
  const [captainIndex, setCaptainIndex] = useState(0);

  // 🔥 Fetch Team
  useEffect(() => {
    API.get(`/teams/${id}`)
      .then(res => {
        const team = res.data;
        setTeamName(team.name);
        setPlayers(team.players || []);

        // captain find index
        const index = team.players.findIndex(
          p => p._id === team.captain
        );
        setCaptainIndex(index >= 0 ? index : 0);
      })
      .catch(err => console.log(err));
  }, [id]);

  // ➕ Add Player
  const addPlayer = () => {
    setPlayers([...players, { name: "", village: "" }]);
  };

  // ❌ Remove Player
  const removePlayer = (index) => {
    const updated = players.filter((_, i) => i !== index);
    setPlayers(updated);

    if (captainIndex === index) setCaptainIndex(0);
  };

  // ✏️ Update Player
  const updatePlayer = (index, field, value) => {
    const updated = [...players];
    updated[index][field] = value;
    setPlayers(updated);
  };

  // 💾 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/teams/${id}`, {
        name: teamName,
        players,
        captain: players[captainIndex]?._id // 👑 selected captain
      });

      alert("Team Updated 🔥");
      navigate(-1);

    } catch (err) {
      console.log(err);
      alert("Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex justify-center items-center p-4">
      
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          ✏️ Edit Team
        </h2>

        {/* 🏏 Team Name */}
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Team Name"
          className="w-full p-2 mb-3 border rounded"
        />

        {/* 👥 Players */}
        <div className="space-y-3">
          {players.map((player, index) => (
            <div key={index} className="bg-gray-100 p-3 rounded">

              <input
                type="text"
                value={player.name}
                placeholder="Player Name"
                onChange={(e) =>
                  updatePlayer(index, "name", e.target.value)
                }
                className="w-full mb-2 p-1 border rounded"
              />

              <input
                type="text"
                value={player.village}
                placeholder="Village"
                onChange={(e) =>
                  updatePlayer(index, "village", e.target.value)
                }
                className="w-full mb-2 p-1 border rounded"
              />

              {/* 👑 Captain Select */}
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  checked={captainIndex === index}
                  onChange={() => setCaptainIndex(index)}
                />
                Make Captain 👑
              </label>

              <button
                type="button"
                onClick={() => removePlayer(index)}
                className="text-red-500 text-sm mt-1"
              >
                Remove ❌
              </button>

            </div>
          ))}
        </div>

        {/* ➕ Add Player */}
        <button
          type="button"
          onClick={addPlayer}
          className="w-full bg-green-500 text-white py-2 mt-3 rounded"
        >
          + Add Player
        </button>

        {/* 💾 Save */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 mt-3 rounded"
        >
          Update Team
        </button>

      </form>
    </div>
  );
};

export default EditTeam;