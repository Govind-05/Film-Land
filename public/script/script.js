let mon=new Date().toLocaleString('default', { month: "short" });
let day=new Date().getDate();

$(".month span").text(mon);
$(".date span").text(day);

$("#menu-logo-id").click(()=>{
    $("#menu-info-id").css("display","block");
});

$("#menu-info-id").click(()=>{
    $("#menu-info-id").css("display","none");
});