import * as dotenv from 'dotenv';
dotenv.config()
import express  from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import path from 'path';
import { fileURLToPath } from 'url';
import axios from "axios";
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import passportLocalMongoose from "passport-local-mongoose";

const app=express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.set("view engine","ejs")

app.set('trust proxy', 1); // trust first proxy
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI,() => {
    console.log("Mongo connected");
});

const userSchema=new mongoose.Schema({
    username:String,
    email:String,
    film:[{
        media:String,
        filmId:String
    }]
});

userSchema.plugin(passportLocalMongoose);

const User=new mongoose.model("User",userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, {
            id: user.id,
            username: user.username,
            picture: user.picture
        });
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});

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

    let auth=false;
    if(req.isAuthenticated()){
        auth=true;
    }else{
        auth=false;
    }

    res.render("home",{
        popularMovies:popularMovies,
        popularTvShows:popularTvShows,
        trendingToday:trendingToday,
        genre1:genre_1.name,
        genre1Shows:genre1Shows,
        genre2:genre_2.name,
        genre2Shows:genre2Shows,
        auth:auth
    });
});

app.get("/movie/:movieId",async (req,res)=>{
    const movieId=req.params.movieId;
    const movieURL="https://api.themoviedb.org/3/movie/"+movieId+"?api_key="+process.env.API_KEY+"&language=en-US&append_to_response=videos,recommendations";
    
    const movieResponse=await axios.get(movieURL);

    let auth=false;
    if(req.isAuthenticated()){
        auth=true;
    }else{
        auth=false;
    }

    res.render("moviePage",{
        movie:movieResponse.data,
        media:"movie",
        auth:auth
    });
});


app.get("/show/:showId",async (req,res)=>{
    const showId=req.params.showId;
    const showURL="https://api.themoviedb.org/3/tv/"+showId+"?api_key="+process.env.API_KEY+"&language=en-US&append_to_response=videos,recommendations";
    
    const showResponse=await axios.get(showURL);

    let auth=false;
    if(req.isAuthenticated()){
        auth=true;
    }else{
        auth=false;
    }

    res.render("moviePage",{
        movie:showResponse.data,
        media:"tv",
        auth:auth
    });
});

app.get("/search/:showQuery",async (req,res)=>{

    const query=req.params.showQuery;
    console.log(query);
    const searchURL="https://api.themoviedb.org/3/search/multi?api_key="+process.env.API_KEY+"&language=en-US&query="+query+"&page=1&include_adult=true";

    const searchResponse=await axios.get(searchURL);

    const searchResult=[];
    if(searchResponse.data.results.length!=0){
        let incrementValue;
        if(searchResponse.data.results.length<=10){
            incrementValue=searchResponse.data.results.length;
            for(let i=0;i<incrementValue;i++){
                if(searchResponse.data.results[i].poster_path===null || searchResponse.data.results[i].poster_path===undefined ){
                    continue;
                }
                searchResult.push(searchResponse.data.results[i]);
            }
        }else{
            for(let i=0;i<10;i++){
                if(searchResponse.data.results[i].poster_path===null || searchResponse.data.results[i].poster_path===undefined){
                    continue;
                }
                searchResult.push(searchResponse.data.results[i]);
            }
        }
    }

    console.log(searchResult)

    let auth=false;
    if(req.isAuthenticated()){
        auth=true;
    }else{
        auth=false;
    }

    res.render("search",{
        searchShows:searchResult,
        auth:auth
    });
});

app.get("/signIn",(req,res)=>{

    let auth=false;
    if(req.isAuthenticated()){
        auth=true;
    }else{
        auth=false;
    }

    res.render("register",{
        auth:auth
    });
});

app.get("/done",(req,res)=>{
    if(req.isAuthenticated()){
        res.render("done");
    }else{
        res.redirect("/signIn");
    }
});

app.get("/favourite", async (req,res)=>{
    if(req.isAuthenticated()){

        let favouriteFilms=[];
        const poster=[];
        const media=[];
        const id=[];
        const title=[];

        const search=await User.find({"_id":req.user.id});
        
        favouriteFilms = [...search[0].film];

        for(let i=0;i<favouriteFilms.length;i++){
            media.push(favouriteFilms[i].media);
            id.push(favouriteFilms[i].filmId);
            const url = "https://api.themoviedb.org/3/" + favouriteFilms[i].media + "/" + favouriteFilms[i].filmId + "?api_key=" + process.env.API_KEY + "&language=en-US"
            const favouriteResponse = await axios.get(url);
            poster.push(favouriteResponse.data.poster_path);
            let name;
            if (favouriteFilms[i].media === "movie") {
                name = favouriteResponse.data.original_title;
            } else {
                name = favouriteResponse.data.original_name;
            }
            title.push(name);
        }
        
        res.render("favourite",{
            auth:true,
            poster:poster,
            media:media,
            id:id,
            title:title
        });

    }else{
        res.redirect("/signIn");
    }
});

app.post("/movie/:movieId",(req,res)=>{
    res.redirect("/movie/"+req.params.movieId);
});

app.post("/show/:showId",(req,res)=>{
    res.redirect("/show/"+req.params.showId);
});

app.post("/",(req,res)=>{
    res.redirect("/");
});

app.post("/search",(req,res)=>{
    res.redirect("/search/"+req.body.search);
});

app.post("/favourite",(req,res)=>{
    console.log(req.body);
    console.log(req.user.id);
    let filmObj={
        media:req.body.media,
        filmId:req.body.filmId
    }

    User.find({"film.filmId":req.body.filmId,"_id":req.user.id},(err,user)=>{
        if(err){
            console.log(err);
        }else{
            if(user){
                if(user.length===0){
                    User.findOneAndUpdate({_id:req.user.id},
                        {$push:{ film: filmObj} },(err)=>{
                        if(err){
                            console.log(err);
                        }
                    });
                }
            }else{
                console.log("No user Found");
            }
        }
    });
    
    if(req.body.media==="movie"){
        res.redirect("/movie/"+req.body.filmId);
    }else{
        res.redirect("/show/"+req.body.filmId);
    }



});

app.post("/signIn",(req,res)=>{
    res.redirect("/signIn");
});

app.post("/register",(req,res)=>{

    User.register({username:req.body.username,email:req.body.email}, req.body.password, (err,user)=>{
        if(err){
            console.log(err);
            res.redirect("/signIn");
        }else{
            passport.authenticate("local")(req,res,()=>{
                res.redirect("/");
            });
        }
    });

});

app.post("/login",(req,res)=>{

    const user=new User({
        username:req.body.username,
        password:req.body.password
    });

    req.login(user,err=>{
        if(err){
            console.log(err);
            res.redirect("/signIn");
        }else{
            passport.authenticate("local", { failureRedirect: '/signIn', failureMessage: true })(req,res,()=>{
                res.redirect("/");
            });
        }
    });

});

app.post("/logOut",(req,res)=>{
    req.logout(err=>{
        if(err){
            console.log(err);
        }else{
            res.redirect("/");
        }
    });
});

app.post("/delete",(req,res)=>{
    console.log(req.body);

    User.update({_id:req.user.id},{"$pull":{"film":{"media":req.body.media, "filmId":req.body.id}}}, { safe: true, multi:true },(err, obj)=>{
        if(err){
            console.log(err);
        }
    });

    res.redirect("/favourite");

});

const PORT=process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log("Server is listening on port 3000.");
});
