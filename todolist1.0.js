let listCount = 0;
let listUnit = new Array();
let listMap = new Map();

function addList(value){
    mapSetting("<li class='list-unit'>"+addCheckbox(value)+addDelEditButton()+"</li>")
    rendering();
}
function mapSetting(value){
    listMap.set(String(listCount),value);
}
function rendering(){
    let totalList = "";
    for( let value of listMap.values()){
        totalList += value;
    }
    document.getElementById("full-list").innerHTML = totalList;
}
function addCheckbox(value){
    let checkbox = '<input type="checkbox" name="checkBoxList" id="check'+listCount+'" >\
    <label for="check'+listCount+'" >'+value+'</label>';
    return checkbox;
}
function addDelEditButton(){
    let button = "<span class='list-button'> \
    <input type='button' class='button-unit' value='Edit'  onclick = 'editButtonClick(this.id);' id='button"+listCount+"'> \
    <input type='button' class='button-unit' value='Delete' onclick='delButtonClick(this.id);' id='button"+listCount+"'></span>";
    return button;
}
function editButtonClick(btnId){
    
}
function delButtonClick(btnId){
    let btnIdTemp = btnId;
    let delId;
    for(let i = 0 ; i < btnIdTemp.length ; i++){
        if(isNaN(btnIdTemp[i]) == false){
            delId = btnIdTemp[i];
            let a = listMap.delete(String(delId));
            rendering();
            listCount--;
        }
    }
}
function enterkey() {
    if (window.event.keyCode == 13) {
        let textValue = document.getElementById("input-text").value;
        if(textValue == "")
            alert("내용을 입력하시오.");
        else{
            addList(textValue);
            listCount ++;
            document.getElementById("input-text").value="";
            
        }
    }
}