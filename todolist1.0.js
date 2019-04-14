let listCount = 0;
let listUnit = new Array();
let listMap = new Map();

//map stting
function addList(value,buttonId){
    mapSetting(String(listCount),"<li class='list-unit'>"+addCheckbox(value,buttonId)+addDelEditButton("edit","Edit",buttonId)+"</li>")
    rendering();
}
function mapSetting(key,value){
    listMap.set(key,value);
}

//list refresh
function rendering(){
    let totalList = "";
    for( let value of listMap.values()){
        totalList += value;
    }
    document.getElementById("full-list").innerHTML = totalList;
}

//Add checkbox add
function addCheckbox(value,checkId){
    let checkbox = '<input type="checkbox" name="checkBoxList" id="check'+checkId+'" >\
    <label for="check'+checkId+'" >'+value+'</label>';
    return checkbox;
}

//Add checkbox and input text
function addCheckBoxAndText(checkId){
    let checkbox = '<input type="checkbox" name="checkBoxList" id="check'+checkId+'" >\
    <label for="check'+checkId+'" ></label> \
    <input type="text" id = "input-checkbox-text">';
    return checkbox;
}

//Add Delete,Edit Button
function addDelEditButton(buttonKind,value,buttonId){
    let button = "<span class='list-button'> \
    <input type='button' class='button-unit' value='"+value+"'  onclick = '"+buttonKind+"ButtonClick(this.id);' id='button"+buttonId+"'> \
    <input type='button' class='button-unit' value='Delete' onclick='delButtonClick(this.id);' id='button"+buttonId+"'></span>";
    return button;
}

//buttonId search
function buttonIdSearch(btnId){
    let btnIdTemp = btnId;
    let buttonNumber = "";
    for(let i = 0 ; i < btnIdTemp.length ; i++){
        if(isNaN(btnIdTemp[i]) == false){
            buttonNumber += btnIdTemp[i];
        }
    }
    return buttonNumber;
}

// Click Event
function editButtonClick(btnId){
    let btnNum = buttonIdSearch(btnId);
    mapSetting(btnNum,"<li class='list-unit'>"+addCheckBoxAndText(btnNum)
    +addDelEditButton("save","Save",btnNum)+"</li>");
    rendering();
}

function saveButtonClick(btnId){
    let btnNum = buttonIdSearch(btnId);
    let editText = document.getElementById("input-checkbox-text").value;
    mapSetting(btnNum,"<li class='list-unit'>"+addCheckbox(editText,btnNum)
    +addDelEditButton("edit","Edit",btnNum)+"</li>");
    rendering();
}

function delButtonClick(btnId){
    let btnNum = buttonIdSearch(btnId);
    let a = listMap.delete(btnNum);
    rendering();
}

// EnterKey
function enterkey() {
    if (window.event.keyCode == 13) {
        let textValue = document.getElementById("input-text").value;
        if(textValue == "")
            alert("내용을 입력하시오.");
        else{
            addList(textValue,String(listCount));
            listCount ++;
            document.getElementById("input-text").value="";
            
        }
    }
}