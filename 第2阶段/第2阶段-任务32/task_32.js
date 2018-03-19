function Form(){
    this.inputType = "";
}
Form.prototype.init =function(){
    var that = this;
    var form_radio = document.getElementById('form_radio');
    var configure = document.getElementById('configure');
    var input_type = document.getElementById('input_type');
    var length_control = document.getElementById('length_control');
    var choose = document.getElementById('choose');
    var form_name = document.getElementById('form_name');
    document.getElementById('text').checked= "checked";
    document.getElementById('text').addEventListener("focus",function(){
        input_type.style.display = "block";
        length_control.style.display = "block";
        choose.style.display = "none";
        form_name.value = "文本框";
        that.inputType = "text";
    },false);
    document.getElementById('radio').addEventListener("focus",function(){
        input_type.style.display = "none";
        length_control.style.display = "none";
        choose.style.display = "block";
        form_name.value = "单选框";
        that.inputType = "radio";
    },false);
    document.getElementById('checkbox').addEventListener("focus",function(){
        input_type.style.display = "none";
        length_control.style.display = "none";
        choose.style.display = "block";
        form_name.value = "多选框";
        that.inputType = "checkbox";
    },false);
    document.getElementById('select').addEventListener("focus",function(){
        input_type.style.display = "none";
        length_control.style.display = "none";
        choose.style.display = "block";
        form_name.value = "下拉框";
        that.inputType = "select";
    },false);
    document.getElementById('textarea').addEventListener("focus",function(){
        input_type.style.display = "none";
        length_control.style.display = "block";
        choose.style.display = "none";
        form_name.value = "文本域";
        that.inputType = "textarea";
    },false);
};
Form.prototype.generateForm = function(){
    var that = this;
    var i;
    var addButton = document.getElementById('add');
    addButton.addEventListener("click",function(){
        console.log(that.inputType);
        var article = document.getElementById('article');
        var divNode = document.createElement("div");
        // var inputNode = document.createElemnet(inputType);
        if(that.inputType == "text"){
            var form_name = document.getElementById('form_name').value.trim();
            divNode.innerHTML = "";
            divNode.setAttribute('class',"form");
            divNode.innerHTML ='<h3 class="formName">'+form_name+'：</h3><input type="text" class="input"/><p class="tips">提示：</p>';
            article.appendChild(divNode);
        }
        if(that.inputType == "radio"){
            if( document.getElementById('tag').value.trim().length > 0){
                form_name = document.getElementById('form_name').value.trim();
                var radioArray = document.getElementById('tag').value.trim().split(/ |,|，|、|\n/);
                console.log(form_name.length);

                divNode.setAttribute('class',"form");
                divNode.innerHTML = "";
                divNode.innerHTML ='<h3 class="formName">'+form_name+'：</h3>';
                for(i=0;i<radioArray.length;i++){
                    if(radioArray[i].length != 0){
                        divNode.innerHTML +='<input type="radio" name="radioName"/>'+radioArray[i];
                    }
                }
                divNode.innerHTML += '<p class="tips">提示：</p>';
                article.appendChild(divNode);
            }
            else{
                alert("选项栏不能为空");
            }
        }
        if(that.inputType == "checkbox"){
            if( document.getElementById('tag').value.trim().length > 0) {
                form_name = document.getElementById('form_name').value.trim();
                radioArray = document.getElementById('tag').value.trim().split(/ |,|，|、|\n/);
                console.log(radioArray);
                divNode.setAttribute('class', "form");
                divNode.innerHTML = "";
                HTML = '<h3 class="formName">' + form_name + '：</h3>';
                for (i = 0; i < radioArray.length; i++) {
                    if (radioArray[i].length != 0) {
                        HTML += '<input type="checkbox" name="radioName"/>' + radioArray[i];
                    }
                }
                HTML += '<p class="tips">提示：</p>';
                divNode.innerHTML = HTML;
                article.appendChild(divNode);
            }
            else{
                alert("选项栏不能为空");
            }
        }
        if(that.inputType == "select"){
            if( document.getElementById('tag').value.trim().length > 0) {
                form_name = document.getElementById('form_name').value.trim();
                radioArray = document.getElementById('tag').value.trim().split(/ |,|，|、|\n/);
                console.log(radioArray);
                divNode.setAttribute('class',"form");
                divNode.innerHTML = "";
                HTML ='<h3 class="formName">'+form_name+'：</h3><select>';
                for(i=0;i<radioArray.length;i++){
                    if(radioArray[i].length != 0){
                        HTML +='<option value="'+radioArray[i]+'">'+radioArray[i]+'</option>';
                    }
                }
                HTML += '</select><p class="tips">提示：</p>';
                divNode.innerHTML = HTML;
                article.appendChild(divNode);
            }
            else{
                alert("选项栏不能为空");
            }
        }
        if(that.inputType == "textarea"){
            form_name = document.getElementById('form_name').value.trim();
            divNode.setAttribute('class',"form");
            divNode.innerHTML = "";
            HTML = '<h3 class="formName">'+form_name+'：</h3><textarea class="textArea"></textarea><p class="tips">提示：</p>';
            divNode.innerHTML = HTML;
            article.appendChild(divNode);
        }
        that.addEvent();
    });

};
Form.prototype.addEvent = function(){
    var forms = document.getElementById('article').getElementsByTagName('div');
    for(var i=0;i<forms.length;i++){
        forms[i].addEventListener("mouseover",function(){
            this.lastElementChild.style.display = "inline-block";
        });
        forms[i].addEventListener("mouseout",function(){
            this.lastElementChild.style.display = "none";
        });
    }
};
window.onload = function(){
    var form = new Form();
    form.init();
    form.generateForm();
};