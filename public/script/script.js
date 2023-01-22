let mon=new Date().toLocaleString('default', { month: "short" });
let day=new Date().getDate();
let counterMovie=0;
let counterShow=0;
let counterTrending=0;
let counterGenre1=0;
let counterGenre2=0;

$(".month span").text(mon);
$(".date span").text(day);

$("#menu-logo-id").click(()=>{
    $("#menu-info-id").css("display","block");
});

$("#menu-info-id").click(()=>{
    $("#menu-info-id").css("display","none");
});

$(".going-viral-container").on("mouseenter",()=>{
    $("#prev-going-viral-card").css("opacity","0.85");
    $("#next-going-viral-card").css("opacity","0.85");
});

$(".going-viral-container").on("mouseleave",()=>{
    $("#prev-going-viral-card").css("opacity","0");
    $("#next-going-viral-card").css("opacity","0");
});

function shiftNext(){
    let translate=counterMovie*27 + 27;
    if(counterMovie<2){
        $(".going-viral-card").css("right",translate+"rem");
        counterMovie++;
    }
}

function shiftPrev(){
    let translate=counterMovie*27 - 27;
    if(counterMovie>0){
        $(".going-viral-card").css("right",+translate+"rem");
        counterMovie--;
    }
}

$("#next-going-viral-card").on("click",()=>{
    shiftNext();
});

$("#prev-going-viral-card").on("click",()=>{
    shiftPrev();
});

$(".going-viral-show-container").on("mouseenter",()=>{
    $("#prev-going-viral-show-card").css("opacity","0.85");
    $("#next-going-viral-show-card").css("opacity","0.85");
});

$(".going-viral-show-container").on("mouseleave",()=>{
    $("#prev-going-viral-show-card").css("opacity","0");
    $("#next-going-viral-show-card").css("opacity","0");
});

function shiftNextShow(){
    let translate=counterShow*27 + 27;
    if(counterShow<2){
        $(".going-viral-show-card").css("right",translate+"rem");
        counterShow++;
    }
}

function shiftPrevShow(){
    let translate=counterShow*27 - 27;
    if(counterShow>0){
        $(".going-viral-show-card").css("right",+translate+"rem");
        counterShow--;
    }
}

$("#next-going-viral-show-card").on("click",()=>{
    shiftNextShow();
});

$("#prev-going-viral-show-card").on("click",()=>{
    shiftPrevShow();
});

// TRENDING TODAY STARTS HERE

$(".trending-today-container").on("mouseenter",()=>{
    $("#prev-trending-today-card").css("opacity","0.85");
    $("#next-trending-today-card").css("opacity","0.85");
});

$(".trending-today-container").on("mouseleave",()=>{
    $("#prev-trending-today-card").css("opacity","0");
    $("#next-trending-today-card").css("opacity","0");
});

function shiftNextTrend(){
    let translate=counterTrending*55 + 55;
    if(counterTrending<4){
        $(".trending-today-card").css("right",translate+"rem");
        counterTrending++;
    }
}

function shiftPrevTrend(){
    let translate=counterTrending*55 - 55;
    if(counterTrending>0){
        $(".trending-today-card").css("right",+translate+"rem");
        counterTrending--;
    }
}

$("#next-trending-today-card").on("click",()=>{
    shiftNextTrend();
});

$("#prev-trending-today-card").on("click",()=>{
    shiftPrevTrend();
});

// TRENDING TODAY STARTS HERE

//GENRE-1 CARDS STARTS HERE

$(".genre-1-container").on("mouseenter",()=>{
    $("#prev-genre-1-card").css("opacity","0.85");
    $("#next-genre-1-card").css("opacity","0.85");
});

$(".genre-1-container").on("mouseleave",()=>{
    $("#prev-genre-1-card").css("opacity","0");
    $("#next-genre-1-card").css("opacity","0");
});

function shiftNextGenre1(){
    let translate=counterGenre1*50 + 50;
    if(counterGenre1<3){
        $(".genre-1-poster").css("right",translate+"rem");
        counterGenre1++;
    }
}

function shiftPrevGenre1(){
    let translate=counterGenre1*50 - 50;
    if(counterGenre1>0){
        $(".genre-1-poster").css("right",translate+"rem");
        counterGenre1--;
    }
}

$("#next-genre-1-card").on("click",()=>{
    shiftNextGenre1();
});

$("#prev-genre-1-card").on("click",()=>{
    shiftPrevGenre1();
});

//GENRE-2 CARDS STARTS HERE

$(".genre-2-container").on("mouseenter",()=>{
    $("#prev-genre-2-card").css("opacity","0.85");
    $("#next-genre-2-card").css("opacity","0.85");
});

$(".genre-2-container").on("mouseleave",()=>{
    $("#prev-genre-2-card").css("opacity","0");
    $("#next-genre-2-card").css("opacity","0");
});

function shiftNextGenre2(){
    let translate=counterGenre2*50 + 50;
    if(counterGenre2<3){
        $(".genre-2-poster").css("right",translate+"rem");
        counterGenre2++;
    }
}

function shiftPrevGenre2(){
    let translate=counterGenre2*50 - 50;
    if(counterGenre2>0){
        $(".genre-2-poster").css("right",translate+"rem");
        counterGenre2--;
    }
}

$("#next-genre-2-card").on("click",()=>{
    shiftNextGenre2();
});

$("#prev-genre-2-card").on("click",()=>{
    shiftPrevGenre2();
});

function submit1(index){
    document.getElementById("genre1Form-"+index).submit();
}
function submit2(index){
    document.getElementById("genre2Form-"+index).submit();
}