/*
*Created by Alan on 2018.1.10.
*/
function check_username(input){
    var username = input.value.replace(/\s|\xA0/g,"");
    var username_tips = document.getElementById('username_tips');
    var username_check = false;
    username_tips.style.display = "inline";
    var username_length = 0;
    var re =/[\u4E00-\u9FA5]/g;
    if(username.match(re) == null){
        username_length = username.length;
    }
    else{
        username_length = username.length + username.match(re).length;
    }
    input.style.boxShadow = "none";
    if(username_length >=4 && username_length<=16){
        input.style.border = "2px solid #32CD32";
        username_tips.style.color = "#32CD32";
        username_tips.innerText = "用户名格式正确";
        username_check = true;
    }
    else{
        username_check = false;
        input.style.border = "2px solid red";
        username_tips.style.color = "red";
        username_tips.innerText = "必填，长度为4~16个字符";
        if(username_length == 0){
            input.style.border = "2px solid red";
            username_tips.style.color = "red";
            username_tips.innerText = "用户名不能为空";
        }
    }
    return username_check;
}
function check_password(input){
    var password = input.value.replace(/\s|\xA0/g, "");
    var password_tips = document.getElementById('password_tips');
    password_tips.style.display = "inline";
    var re = /^[0-9A-Za-z_]{6,15}$/;
    if (password.match(re)) {
        input.style.boxShadow = "none";
        input.style.border = "2px solid #32CD32";
        password_tips.style.color = "#32CD32";
        password_tips.innerText = "密码可用";
        var password_string = password;
    }
    else if (password.length) {
        input.style.boxShadow = "none";
        input.style.border = "2px solid red";
        password_tips.style.color = "red";
        password_tips.innerText = "密码不可用";
    }
    else if (!password.length) {
        input.style.boxShadow = "none";
        input.style.border = "2px solid red";
        password_tips.style.color = "red";
        password_tips.innerText = "密码不能为空";
    }
    //console.log("password_string: "+password_string+"   confirm_password:");
    return password_string;
}
function check_confirm_password(input,password_string){
    var confirm_password = input.value.replace(/\s|\xA0/g, "");
    var confirm_password_tips = document.getElementById('confirm_password_tips');
    var password_check = false;
    confirm_password_tips.style.display = "inline";
    if (password_string == confirm_password && confirm_password.length) {
        input.style.boxShadow = "none";
        input.style.border = "2px solid #32CD32";
        confirm_password_tips.style.color = "#32CD32";
        confirm_password_tips.innerText = "密码输入一致";
        password_check = true;
    }
    else {
        input.style.boxShadow = "none";
        input.style.border = "2px solid red";
        confirm_password_tips.style.color = "red";
        confirm_password_tips.innerText = "密码输入不一致";
        password_check = false;
    }
   // console.log("password_string: "+password_string+"   confirm_password:"+confirm_password);
    return password_check;
}
function check_telephone(input){
    var telephone = input.value.replace(/\s|\xA0/g, "");
    var telephone_tips = document.getElementById('telephone_tips');
    var telephone_check = false;
    telephone_tips.style.display = "inline";
    re = /^1[3|4|5|7|8][0-9]{9}$/;
    if (telephone.match(re)) {
        input.style.boxShadow = "none";
        input.style.border = "2px solid #32CD32";
        telephone_tips.style.color = "#32CD32";
        telephone_tips.innerText = "手机号码格式正确";
        telephone_check = true;
    }
    else if (telephone.length) {
        input.style.boxShadow = "none";
        input.style.border = "2px solid red";
        telephone_tips.style.color = "red";
        telephone_tips.innerText = "手机号码格式不正确";
        telephone_check = false;
    }
    else if (!telephone.length) {
        input.style.boxShadow = "none";
        input.style.border = "2px solid red";
        telephone_tips.style.color = "red";
        telephone_tips.innerText = "手机号码不能为空";
        telephone_check = false;
    }
    return telephone_check;
}
function check_email(input){
    var email = input.value.replace(/\s|\xA0/g, "");
    var email_tips = document.getElementById('email_tips');
    var email_check = false;
    email_tips.style.display = "inline";
    var re = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
    if (email.match(re)) {
        input.style.boxShadow = "none";
        input.style.border = "2px solid #32CD32";
        email_tips.style.color = "#32CD32";
        email_tips.innerText = "邮箱格式正确";
        email_check = true;
    }
    else if (email.length) {
        input.style.boxShadow = "none";
        input.style.border = "2px solid red";
        email_tips.style.color = "red";
        email_tips.innerText = "邮箱格式不正确";
        email_check = false;
    }
    else if (!email.length) {
        input.style.boxShadow = "none";
        input.style.border = "2px solid red";
        email_tips.style.color = "red";
        email_tips.innerText = "邮箱不能为空";
        email_check = false;
    }
    return email_check;
}
window.onload = function() {
    //用户名检验
    var username_input = document.getElementById('username_input');
    username_input.addEventListener("focus", function () {
        document.getElementById('username_tips').style.display = "inline";
        var username_tips = document.getElementById('username_tips');
        username_tips.innerText = "必填，长度为4~16个字符";
        username_tips.style.color = "#aaa";
        this.style.border = "none";
        this.style.boxShadow = "0 0 4px #32CD32 ";
    }, false);
    username_input.addEventListener("blur", function () {
        check_username(this);
    }, false);
   // username_input = null;
    //密码检验
    var password_input = document.getElementById('password_input');
    password_input.addEventListener("focus", function () {
        document.getElementById('password_tips').style.display = "inline";
        var password_tips = document.getElementById('password_tips');
        password_tips.innerText = "必填，由字母、数字和下划线组成，长度为6~15";
        password_tips.style.color = "#aaa";
        this.style.border = "none";
        this.style.boxShadow = "0 0 4px #32CD32 ";
    }, false);
    password_input.addEventListener('blur', function () {
        var btn=document.getElementById("btn");
        btn.onmousedown=function(){
            password_input.type="text";
            btn.src = "images/invisible.png";
        };
        btn.onmouseup=btn.onmouseout=function(){
            password_input.type="password";
            btn.src = "images/visible.png";
        };
        check_password(this);
    }, false);
    //password_input = null;
    //密码确认
    var confirm_password_input = document.getElementById('confirm_password_input');
    confirm_password_input.addEventListener("focus", function () {
        var confirm_password_tips = document.getElementById('confirm_password_tips');
        confirm_password_tips.style.display = "inline";
        confirm_password_tips.innerText = "确认密码";
        confirm_password_tips.style.color = "#aaa";
        this.style.border = "none";
        this.style.boxShadow = "0 0 4px #32CD32 ";
    }, false);
    confirm_password_input.addEventListener('blur', function () {
        var btn_confirm=document.getElementById("btn_confirm");
        btn_confirm.onmousedown=function(){
            confirm_password_input.type="text";
            btn_confirm.src = "images/invisible.png";
        };
        btn_confirm.onmouseup=btn.onmouseout=function(){
            confirm_password_input.type="password";
            btn_confirm.src = "images/visible.png";
        };
        check_confirm_password(this,check_password(password_input));
    }, false);
    //confirm_password_input = null;
    //手机检验
    var telephone_input = document.getElementById('telephone_input');
    telephone_input.addEventListener("focus", function () {
        var telephone_tips = document.getElementById('telephone_tips');
        telephone_tips.style.display = "inline";
        telephone_tips.innerText = "手机号码必填";
        telephone_tips.style.color = "#aaa";
        this.style.border = "none";
        this.style.boxShadow = "0 0 4px #32CD32 ";
    }, false);
    telephone_input.addEventListener('blur', function () {
        check_telephone(this);
    }, false);
    //telephone_input = null;

    //邮箱检验
    var email_input = document.getElementById('email_input');
    email_input.addEventListener("focus", function () {
        var email_tips = document.getElementById('email_tips');
        email_tips.style.display = "inline";
        email_tips.innerText = "邮箱必填";
        email_tips.style.color = "#aaa";
        this.style.border = "none";
        this.style.boxShadow = "0 0 4px #32CD32 ";
    }, false);
    email_input.addEventListener('blur', function () {
        check_email(this);
    }, false);
    //email_input = null;

    var check_button = document.getElementById('check_button');
    check_button.addEventListener("click",function(){
        if(check_username(username_input) && check_confirm_password(confirm_password_input,check_password(password_input))
            && check_telephone(telephone_input) && check_email(email_input)){
            alert("输入正确");
        }
        else{
            alert("输入有误");
        }
    },false);

};