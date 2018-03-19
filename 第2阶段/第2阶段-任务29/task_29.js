/*
*Created by Alan on 2018.1.10.
*/

window.onload = function(){
    //用户名检验
    var username_button = document.getElementById('username_button');
        username_button.addEventListener('click',function(){
        var username_input = document.getElementById('username_input');
        var username = username_input.value.replace(/\s|\xA0/g,"");
        var username_length = 0;
        re =/[\u4E00-\u9FA5]/g;
        if(username.match(re) == null){
            username_length = username.length;
        }
        else{
            username_length = username.length + username.match(re).length;
        }
        var username_tips = document.getElementById('username_tips');
        username_input.style.boxShadow = "none";
        if(username_length >=4 && username_length<=16){
            username_input.style.border = "2px solid #32CD32";
            username_tips.style.color = "#32CD32";
            username_tips.innerText = "用户名格式正确";
        }
        else{
            username_input.style.border = "2px solid red";
            username_tips.style.color = "red";
            username_tips.innerText = "必填，长度为4~16个字符";
            if(username_length == 0){
                username_input.style.border = "2px solid red";
                username_tips.style.color = "red";
                username_tips.innerText = "用户名不能为空";
            }
        }
    },false);
    username_button=null;
    //名称检验
    var name_button = document.getElementById('name_button');
        name_button.addEventListener('click',function(){
        var name_input = document.getElementById('name_input');
        var name = name_input.value.replace(/\s|\xA0/g,"");
        var name_length = 0;
        re =/[\u4E00-\u9FA5]/g;
        if(name.match(re) == null){
            name_length = name.length;
        }
        else{
            name_length = name.length + name.match(re).length;
        }
        var name_tips = document.getElementById('name_tips');
        name_input.style.boxShadow = "none";
        if(name_length >=4 && name_length<=16){
            name_input.style.border = "2px solid #32CD32";
            name_tips.style.color = "#32CD32";
            name_tips.innerText = "姓名格式正确";
        }
        else{
            name_input.style.border = "2px solid red";
            name_tips.style.color = "red";
            name_tips.innerText = "必填，长度为4~16个字符";
            if(name_length == 0){
                name_input.style.border = "2px solid red";
                name_tips.style.color = "red";
                name_tips.innerText = "姓名不能为空";
            }
        }
    },false);
    name_button = null;
    //邮箱检验
    var email_button = document.getElementById('email_button');
    email_button.addEventListener('click',function(){
        var email_input = document.getElementById('email_input');
        var email = email_input.value.replace(/\s|\xA0/g,"");
        var email_tips = document.getElementById('email_tips');
        re = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if(email.match(re)){
            email_input.style.boxShadow = "none";
            email_input.style.border = "2px solid #32CD32";
            email_tips.style.color = "#32CD32";
            email_tips.innerText = "邮箱格式正确";
        }
        else if(email.length){
            email_input.style.boxShadow = "none";
            email_input.style.border = "2px solid red";
            email_tips.style.color = "red";
            email_tips.innerText = "填写正确的邮箱地址";
        }
    },false);
    email_button = null;
};

