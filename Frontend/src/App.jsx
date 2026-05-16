import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateTournament from "./pages/CreateTournament";
import RegisterTeam from "./pages/RegisterTeam";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EditTournament from "./pages/EditTournament";
import TournamentDetail from "./pages/TournamentDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import EditTeam from "./pages/EditTeam"
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import MyTournaments from "./pages/MyTournaments";
import MyTeams from "./pages/MyTeams";
import LandingPage from "./pages/LandingPage";
import MatchList from "./pages/MatchList";
import MatchDetail from "./pages/MatchDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>

  {/* <Route path="/signup" element={<Signup />} /> */}
  <Route path="/login" element={<Login />} />
   <Route path="/" element={<LandingPage />} />
  <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>

  <Route
    path="/home"
    element={
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    }
  />

  <Route
    path="/create"
    element={
      <ProtectedRoute>
        <CreateTournament />
      </ProtectedRoute>
    }
  />

  <Route
    path="/register-team/:id"
    element={
      <ProtectedRoute>
        <RegisterTeam />
      </ProtectedRoute>
    }
  />

  {/* 🔥 fallback */}
  <Route path="*" element={<Signup />} />
  <Route
  path="/edit/:id"
  element={
    <ProtectedRoute>
      <EditTournament />
    </ProtectedRoute>
  }
/>

<Route
  path="/tournament/:id"
  element={
    <ProtectedRoute>
      <TournamentDetail />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin"
  element={
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/my-tournaments"
  element={
    <ProtectedRoute>
      <MyTournaments />
    </ProtectedRoute>
  }
/>

<Route 
  path="/my-teams" 
  element={ 
    <ProtectedRoute> 
    <MyTeams /> 
    </ProtectedRoute>
  } 

/>

<Route path="/edit-team/:id" element={<EditTeam />} />

<Route path="/matches" element={<MatchList />} />

<Route path="/match/:id" element={<MatchDetail />} />

</Routes>
    </BrowserRouter>
  );
}

export default App;