//Importing ENV variable
require ("dotenv").config();

//Libraries
import express from "express";  
import cors from "cors"; //Server allowing request from other servres
import helmet from "helmet";

//Microservice routes
import Auth from "./API/Auth";

//Database Connection
import ConnectDB from "./database/connection";

const zomato = express();

//Middle wares 
zomato.use(express.json());
zomato.use(express.urlencoded({extended: false}));
zomato.use( helmet());
zomato.use( cors());

zomato.get("/", (req,res) => res.json({
    message: "Setup Success "
}));

zomato.listen(4000, () => {
    ConnectDB()
    .then(() => console.log("Server is running in http://localhost:4000 🚀🚀🚀"))
    .catch(() => console.log("Server is running but database connection failed..."))
});