interface LeaderboardEntry {
  name: string;
  score: number;
}

let leaderboard: LeaderboardEntry[] = [];

export default defineEventHandler(async (event) => {
  if (event.req.method === "POST") {
    const body = (await readBody(event)) as LeaderboardEntry;
    leaderboard.push(body);
    leaderboard.sort((a, b) => b.score - a.score);
    return "Entry added";
  } else if (event.req.method === "GET") {
    return leaderboard;
  }
});
