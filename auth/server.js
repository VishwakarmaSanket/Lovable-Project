import app from "./src/app";
import { connectDB } from "./src/config/db";

connectDB();

app.listen(3000, () => {
  console.log("✅ Auth server is running on http://localhost:3000");
});
