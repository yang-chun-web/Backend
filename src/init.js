import "./models/User";
import "./models/Board";
import "./db";
import app from "./server";

const PORT = 4000;

const handleListen = () => console.log(`✅ Server run Port:${PORT} 🚀`);
app.listen(PORT, handleListen);
