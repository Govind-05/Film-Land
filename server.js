import * as dotenv from 'dotenv';
dotenv.config()
import express  from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import path from 'path';
import { fileURLToPath } from 'url';
import axios from "axios";

const app=express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.set("view engine","ejs")

app.get("/",async(req,res)=>{

    const popularMoviesURL="https://api.themoviedb.org/3/movie/popular?api_key="+process.env.API_KEY+"&language=en-US&page=1";

    const movieResponse=await axios.get(popularMoviesURL);

    const popularMovies=[];
    for(let i=0;i<3;i++){
        popularMovies.push(movieResponse.data.results[i]);
    }

    const popularTvShowsURL="https://api.themoviedb.org/3/tv/popular?api_key="+process.env.API_KEY+"&language=en-US&page=1"
    const tvResponse=await axios.get(popularTvShowsURL);

    const popularTvShows=[];
    for(let i=0;i<3;i++){
        popularTvShows.push(tvResponse.data.results[i]);
    }

    

    res.render("home",{
        popularMovies:popularMovies,
        popularTvShows:popularTvShows
    });
});

app.listen(3000,()=>{
    console.log("Server is listening on port 3000.");
});
