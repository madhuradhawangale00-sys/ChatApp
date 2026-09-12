import express from  "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";

//cretae express app and http server
const app = express();
const server = http.createServer(app);

//middleware setup
app.use(express.json({limit: "4mb"}));
app.use(cors());

app.get("/api/status", (req, res) => {
    res.send("Server is running");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=>console.log(`Server is runnig at ${PORT}`));