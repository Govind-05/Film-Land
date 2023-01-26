$(".login-btn").on("click",()=>{
    $("#register-box").css("display","none");
    $("#login-box").css("display","flex");
});

$(".register-btn").on("click",()=>{
    $("#register-box").css("display","flex");
    $("#login-box").css("display","none");
});

function submitRegisterForm(){
    if($("#password").val()===$("#confirm-password").val()){
        $("#register-form").submit();
    }
}

function submitLoginForm(){
    $("#login-form").submit();
}