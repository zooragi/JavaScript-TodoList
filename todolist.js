(function(){
    "use strict"

    const qs = select => document.querySelector(select);
    let listCount = 0;
    const BTN_KIND_SAVE = "save";
    const BTN_KIND_EDIT = "edit";
    let listData = [];
    let localStorageData;
    let totalListHtml = "";

    function todoListApp(){

        function init(){
            if(JSON.parse(localStorage.getItem("data")) !== null){
                listData = JSON.parse(localStorage.getItem("data"));
            }

            rendering();
            enterkey();
            listClickEvent();
            listAllCheck();
            listAllCheckClear();
            listAlleDelete();
        }

        // EnterKey
        function enterkey() {
            qs("#input-text").addEventListener("keyup",e=>{
                let textValue = qs("#input-text").value;
                if (window.event.keyCode === 13) {
                    if(textValue === "")
                        alert("내용을 입력하시오.");
                    else {
                        listData.push({
                            id : listCount,
                            value : textValue,
                            btnKind : BTN_KIND_EDIT,
                            check : false
                        });
                        listCount ++;
                        qs("#input-text").value="";
                        rendering();
                    }
                }
            });
            

        }
        
        function liTagHtml(value,listId,btnKind,checkedState){
            if(btnKind === BTN_KIND_SAVE){
                return `<li class='list-unit'>${addCheckBoxAndText(value,listId,checkedState)}${addDelEditButton(btnKind,listId)}</li>`;
            }
            return `<li class='list-unit'>${addCheckbox(value,listId,checkedState)}${addDelEditButton(btnKind,listId)}</li>`;

        }

        function listHtmlCombine(){
            totalListHtml = "";
            listData.forEach(item=>{
                totalListHtml +=liTagHtml(item.value, item.id, item.btnKind, item.check );
            });
            return totalListHtml;
        }

        //list refresh
        function rendering(){
            localStorage.setItem("data",JSON.stringify(listData));
            listHtmlCombine();
            qs("#full-list").innerHTML = totalListHtml;
        }

        //Add checkbox add
        function addCheckbox(value,chkId,checkedState){
            return `<label class="check-label" >
            <input type="checkbox" name="checkBoxList" class="chk" ${checkedState === true ? "checked" : ""}>
            <span class="checkbox-circle" id=${chkId}>${value}</span></label>`;
        }

        //Add checkbox and input text
        function addCheckBoxAndText(text,chkId){
            return `<label class="check-label">
            <input type="checkbox" name="checkBoxList" >
            <span class="checkbox-circle" id=${chkId}></span>
            </label> 
            <input type="text" id="input-checkbox-text" value=${text} autofocus>`;

        }
            //Add Delete,Edit Button
        function addDelEditButton(buttonKind,buttonId){
            return `<span class='list-button'> 
            <input type='button' class='button-unit' value=${buttonKind} id='${buttonKind}${buttonId}'> 
            <input type='button' class='button-unit' value='delete' id='del${buttonId}'></span>`;
        }

        function listClickEvent(){
            let ulItem = qs("#full-list");
            ulItem.addEventListener("click",e=>{
                let targetId = idSearch(e.target.id);
                let indexId = listData.map(x => x.id).indexOf(Number(targetId));
                if (e.target.id === `del${targetId}`){
                    listData.splice(indexId,1);
                    rendering();
                } else if (e.target.id === `edit${targetId}`){
                    listData[indexId].btnKind = BTN_KIND_SAVE;
                    rendering();
                } else if (e.target.id === `save${targetId}`){
                    let editText = qs("#input-checkbox-text").value;
                    listData[indexId].value = editText;
                    listData[indexId].btnKind = BTN_KIND_EDIT;
                    rendering();
                }  
                else if (e.target.parentNode.children[0].className ==="chk"){
                    listData[indexId].check === true ? listData[indexId].check = false : listData[indexId].check = true;
                }
                //eventFactory(e.target.id,targetId,indexId);
                //console.log(e.target.className);

            });
        }

        function eventFactory(eTargetId,targetId,indexId){

        }

        function listAllCheck(){
            qs("#entire-checked").addEventListener("click",e=>{
                listData.forEach(item => {
                    item.check = true;
                });
                rendering();
            });
        }
        function listAllCheckClear(){
            qs("#entire-checked-clear").addEventListener("click",e=>{
                listData.forEach(item=>{
                    item.check = false;
                });
                rendering();
            });
        }
        function listAlleDelete(){
            qs("#entire-delete").addEventListener("click",e=>{
                listData = [];
                rendering();
            });
        }

        //buttonId search
        function idSearch(btnId){
            let btnIdTemp = btnId;
            let buttonNumber = "";
            for(let i = 0 ; i < btnIdTemp.length ; i++){
                if(isNaN(btnIdTemp[i]) == false){
                    buttonNumber += btnIdTemp[i];
                }
            }
            return buttonNumber;
        }
        function objClone(obj){
            if (obj === null || typeof(obj) !=="object") return obj;
            let copy = obj.constructor();

            for(let attr in obj){
                if(obj.hasOwnProperty(attr)){
                    copy[attr] = objClone(obj[attr]);
                }
            }
            return copy;
        }
        init();
    }
    todoListApp();
})();










