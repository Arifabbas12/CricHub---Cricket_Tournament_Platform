export const validateTeam = (teamPlayers, tournament) => {
  if (tournament.type === "village") {
    return teamPlayers.every(p => p.village === tournament.village);
  }

  if (tournament.type === "district") {
    return teamPlayers.every(p => p.district === tournament.district);
  }

  if (tournament.type === "state") {
    return teamPlayers.every(p => p.state === tournament.state);
  }

  return true;
};