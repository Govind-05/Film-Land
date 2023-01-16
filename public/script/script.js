let mon=new Date().toLocaleString('default', { month: "short" });
let day=new Date().getDate();
let counterMovie=0;
let counterShow=0;
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
