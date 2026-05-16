import { useState, useEffect } from "react";
import API from "../services/api";

const CreateMatch = () => {
  const [teams, setTeams] = useState([]);
  const [form, setForm] = useState({
    teamA: "",
    teamB: "",
    date: ""
  });

  useEffect(() => {
    API.get("/teams").then(res => setTeams(res.data));
  }, []);

  const handleSubmit = async () => {
    await API.post("/matches", form);
    alert("Match Created 🔥");
  };

  return (
    <div className="p-6 text-white">
      <h2>Create Match</h2>

      <select onChange={e => setForm({...form, teamA: e.target.value})}>
        {teams.map(t => <option value={t._id}>{t.name}</option>)}
      </select>

      <select onChange={e => setForm({...form, teamB: e.target.value})}>
        {teams.map(t => <option value={t._id}>{t.name}</option>)}
      </select>

      <input type="datetime-local"
        onChange={e => setForm({...form, date: e.target.value})}
      />

      <button onClick={handleSubmit}>Create</button>
    </div>
  );
};

export default CreateMatch;