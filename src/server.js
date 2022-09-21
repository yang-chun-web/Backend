import express from "express";

const PORT = 4000;
const app = express();
const handleListen = ()=> {
    console.log(`✅ Server run Port:${PORT} 🚀`);
}
app.listen(PORT, handleListen);