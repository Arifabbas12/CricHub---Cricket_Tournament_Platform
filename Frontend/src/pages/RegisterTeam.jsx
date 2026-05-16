import { useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

const RegisterTeam = () => {
  const { id } = useParams();

  const [teamName, setTeamName] = useState("");
  const [players, setPlayers] = useState([
    { name: "", village: "", district: "", state: "" }
  ]);

  // ➕ Add Player
  const addPlayer = () => {
    setPlayers([
      ...players,
      { name: "", village: "", district: "", state: "" }
    ]);
  };

  // ✏️ Handle change
  const handleChange = (index, field, value) => {
    const newPlayers = [...players];
    newPlayers[index][field] = value;
    setPlayers(newPlayers);
  };

  // 🚀 Submit Team
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/teams", {
        name: teamName,
        players,
        tournamentId: id
      });

      alert("Team Registered Successfully 🔥");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message);
    }
  };

  const handlePayment = async () => {
  try {
    // 🔥 1. Create Order
    const { data } = await API.post("/payment/create-order", {
      amount: 500 // 👉 later dynamic karenge
    });

    const options = {
      key: "rzp_test_SnkdgSL6ffaaUJ",
      amount: data.amount,
      currency: data.currency,
      order_id: data.id,

      // 🔐 2. PAYMENT SUCCESS HANDLER
      handler: async function (response) {
        try {
          // 🔐 VERIFY PAYMENT
          const verifyRes = await API.post("/payment/verify", response);

          if (verifyRes.data.success) {
            alert("Payment Verified ✅");

            // ✅ TEAM REGISTER (FIXED 🔥)
            await API.post("/teams", {
              name: teamName,
              players,
              tournamentId: id
            });

            alert("Team Registered 🎉");

          } else {
            alert("Payment verification failed ❌");
          }

        } catch (err) {
          console.log(err);
          alert("Error verifying payment");
        }
      },

      theme: {
        color: "#3399cc"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (err) {
    console.log(err);
    alert("Payment failed");
  }
};

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Register Team</h2>

      <form onSubmit={handleSubmit}>
        
        <input
          type="text"
          placeholder="Team Name"
          className="w-full p-2 mb-3 border rounded"
          onChange={(e) => setTeamName(e.target.value)}
        />

        <h3 className="font-semibold mb-2">Players</h3>

        {players.map((player, i) => (
          <div key={i} className="mb-3 border p-3 rounded">
            
            <input
              placeholder="Name"
              className="w-full mb-2 p-2 border rounded"
              onChange={(e) => handleChange(i, "name", e.target.value)}
            />

            <input
              placeholder="Village"
              className="w-full mb-2 p-2 border rounded"
              onChange={(e) => handleChange(i, "village", e.target.value)}
            />

            <input
              placeholder="District"
              className="w-full mb-2 p-2 border rounded"
              onChange={(e) => handleChange(i, "district", e.target.value)}
            />

            <input
              placeholder="State"
              className="w-full mb-2 p-2 border rounded"
              onChange={(e) => handleChange(i, "state", e.target.value)}
            />

          </div>
        ))}

        <button
          type="button"
          onClick={addPlayer}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-3"
        >
          + Add Player
        </button>


           <button
            onClick={handlePayment}
            className="w-full bg-green-600 text-white py-2 rounded mt-2"
        >
            Pay & Join 💰
         </button>

      </form>
    </div>
  );
};

export default RegisterTeam;