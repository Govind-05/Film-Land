let mon=new Date().toLocaleString('default', { month: "short" });
let day=new Date().getDate();
let counter=0;
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
    let translate=counter*27 + 27;
    if(counter<2){
        $(".going-viral-card").css("right",translate+"rem");
        counter++;
    }
}

function shiftPrev(){
    let translate=counter*27 - 27;
    if(counter>0){
        $(".going-viral-card").css("right",+translate+"rem");
        counter--;
    }
}

$("#next-going-viral-card").on("click",()=>{
    shiftNext();
});

$("#prev-going-viral-card").on("click",()=>{
    shiftPrev();
});

