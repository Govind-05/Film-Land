import express  from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import path from 'path';
import { fileURLToPath } from 'url';

const app=express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.set("view engine","ejs")

app.get("/",(req,res)=>{
    res.render("home");
});

app.listen(3000,()=>{
    console.log("Server is listening on port 3000.");
});
