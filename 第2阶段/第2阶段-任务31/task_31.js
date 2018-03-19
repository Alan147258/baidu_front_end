function init(){
    var city = document.getElementById('city');
    city.selectedIndex = 0;
    var radio = document.getElementById('radio');
    radio.children[0].checked = true;
}
function radioSelect(){
    var radio = document.getElementById('radio');
    radio.addEventListener("change",function(){
        if(this.children[0].checked == true){
            document.getElementById('student').style.display = "block";
            document.getElementById('employment').style.display = "none";
            employment.style.display = "none";
        }
        else{
            document.getElementById('student').style.display = "none";
            document.getElementById('employment').style.display = "block";
        }
    });
    radio = null;
}
function selectCity(schoolArray){
    var city = document.getElementById('city');
    var school = document.getElementById('school');
    city.addEventListener("change",function(){
        var citySelected = city.options[city.selectedIndex].value;
        console.log(citySelected);
        school.innerHTML = "";
        for(var opt in schoolArray[citySelected]){
            var optionNode = document.createElement('option');
            optionNode.value = schoolArray[citySelected][opt];
            optionNode.innerText = schoolArray[citySelected][opt];
            school.appendChild(optionNode);
        }
    });
}
function showSelectInformation(){
    var radio = document.getElementById('radio');
    var city = document.getElementById('city');
    var showInformation = document.getElementById('showInformation');
    var button = document.getElementById('button');
    button.addEventListener("click",function(){
        console.log("click");
        var citySelect = city.options[city.selectedIndex].value;
        var schoolSelect = document.getElementById('school').options[school.selectedIndex].value;
        var employment_unit = document.getElementById('employment_unit');
        var employment = employment_unit.value.trim();
        if(radio.children[0].checked){
            showInformation.innerText="您是位于 "+citySelect+"  "+schoolSelect+" 的一名学生";
        }
        else{
            if(employment.replace(/\s|\xA0/g,"").length >0 ){
                showInformation.innerText="您是位于 "+citySelect+"  "+employment+" 的一名员工";
            }
            else{
                showInformation.innerText="就业单位不能为空";
                employment_unit.style.border = "2px solid red";
            }
        }
    });

}
window.onload= function(){
    var schoolArray = {
        "南京": ["南京邮电大学", "南京大学", "南京航空航天大学","南京财经大学","南京师范大学"],
        "北京": ["北京大学", "清华大学", "北京航空航天大学","北京财经大学","北京师范大学"],
        "杭州": ["浙江大学", "杭州电子科技大学", "浙江工业大学"],
        "上海": ["上海大学", "复旦大学", "上海交通大学","同济大学"],
        "深圳": ["深圳大学", "深圳南方科技大学", "深圳香港中文大学","深圳广播电视大学"]
    };
    init();
    radioSelect();
    selectCity(schoolArray);
    showSelectInformation();
};