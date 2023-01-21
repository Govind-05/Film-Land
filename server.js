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

    //TRENDING TODAY STARTS HERE
    
    const trendingTodayURL="https://api.themoviedb.org/3/trending/all/day?api_key="+process.env.API_KEY+"&language=en-US";
    const trendingTodayResponse=await axios.get(trendingTodayURL);

    const trendingToday=[];
    for(let i=0;i<10;i++){
        trendingToday.push(trendingTodayResponse.data.results[i]);
    }

    //TRENDING TODAY ENDS HERE

    //GENRE 1 STARTS HERE

    const genreURL="https://api.themoviedb.org/3/genre/movie/list?api_key="+process.env.API_KEY+"&language=en-US";
    const randomGenre1=Math.floor(Math.random()*19);

    const genreResponse1=await axios.get(genreURL);

    const genre_1=genreResponse1.data.genres[randomGenre1];
    console.log(randomGenre1);
    const showsList_1_URL="https://api.themoviedb.org/3/discover/movie?api_key="+process.env.API_KEY+"&with_genres="+genre_1.id;

    const genre1Response=await axios.get(showsList_1_URL);

    const genre1Shows=[];
    for(let i=0;i<10;i++){
        genre1Shows.push(genre1Response.data.results[i]);
    }

    //GENRE 2 STARTS HERE

    const randomGenre2=Math.floor(Math.random()*19);

    const genreResponse2=await axios.get(genreURL);

    const genre_2=genreResponse2.data.genres[randomGenre2];
    console.log(randomGenre2);
    const showsList_2_URL="https://api.themoviedb.org/3/discover/movie?api_key="+process.env.API_KEY+"&with_genres="+genre_2.id;

    const genre2Response=await axios.get(showsList_2_URL);

    const genre2Shows=[];
    for(let i=0;i<10;i++){
        genre2Shows.push(genre2Response.data.results[i]);
    }

    res.render("home",{
        popularMovies:popularMovies,
        popularTvShows:popularTvShows,
        trendingToday:trendingToday,
        genre1:genre_1.name,
        genre1Shows:genre1Shows,
        genre2:genre_2.name,
        genre2Shows:genre2Shows
    });
});

app.get("/movies/movie",async (req,res)=>{
    res.render("moviePage");
});

app.listen(3000,()=>{
    console.log("Server is listening on port 3000.");
});
