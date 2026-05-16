import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      className="mb-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded text-sm"
    >
      ⬅ Back
    </button>
  );
};

export default BackButton;