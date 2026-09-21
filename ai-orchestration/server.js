import "dotenv/config";
import app from "./src/app.js";

app.listen(PORT, () => {
  console.log(`✅ AI Orchestration server is running on port ${PORT}`);
});
