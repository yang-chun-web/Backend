import express from "express";
import "./db";
import User from "./models/User";

const app = express();
const PORT = 4000;
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const signup = async(req,res) => {
    const{email, password} = req.body;
    await User.create({
        email,
        password,
    })
    return res.send("Sign Up");
}

app.post("/api/signup", signup);









const handleListen = ()=> {
    console.log(`✅ Server run Port:${PORT} 🚀`);
}
app.listen(PORT, handleListen);