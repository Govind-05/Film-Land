let counterRecommended=0;

$(".recommendation-container").on("mouseenter",()=>{
    $("#next-recommended-card").css("opacity","0.85");
    $("#prev-recommended-card").css("opacity","0.85");
});

$(".recommendation-container").on("mouseleave",()=>{
    $("#next-recommended-card").css("opacity","0");
    $("#prev-recommended-card").css("opacity","0");
});

function shiftNextRecommendation(){
    let translate=counterRecommended*45 + 45;
    if(counterRecommended<2){
        $(".recommendation-poster").css("right",translate+"rem");
        counterRecommended++;
    }
}

function shiftPrevRecommendation(){
    let translate=counterRecommended*45 - 45;
    if(counterRecommended>0){
        $(".recommendation-poster").css("right",translate+"rem");
        counterRecommended--;
    }
}

$("#next-recommended-card").on("click",()=>{
    shiftNextRecommendation();
});

$("#prev-recommended-card").on("click",()=>{
    shiftPrevRecommendation();
});