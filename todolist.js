(function(){
    "use strict"

    const qs = select => document.querySelector(select);
    let listCount = 0;
    const BTN_KIND_SAVE = "save";
    const BTN_KIND_EDIT = "edit";
    let listData = [];
    let data = {
        id : "",
        value : "",
        btnKind : "",
        check : false
    };
    let totalListHtml = "";

    function todoListApp(){

        function init(){
            rendering();
            enterkey();
            listClickEvent();
            entireCheck();
            entireCheckClear();
            entireDelete();
        }

        // EnterKey
        function enterkey() {
            qs("#input-text").addEventListener("keyup",e=>{
                let textValue = qs("#input-text").value;
                if (window.event.keyCode === 13) {
                    if(textValue === "")
                        alert("내용을 입력하시오.");
                    else{
                        data.id = listCount;
                        data.value = textValue;
                        data.btnKind = BTN_KIND_EDIT;
                        listData.push({...data});
                        listCount ++;
                        qs("#input-text").value="";
                        rendering();
                    }
                }
            });
            

        }
        
        function liInnerCheckBox(value,listId,btnKind,checkedState){
            let liInnerHtml = "<li class='list-unit'>"+addCheckbox(value,listId,checkedState)+addDelEditButton(btnKind,listId)+"</li>";
            return liInnerHtml;
        }

        function liInnerCheckBoxText(value,listId,btnKind,checkedState){
            let liInnerHtml = "<li class='list-unit'>"+addCheckBoxAndText(value,listId,checkedState)+addDelEditButton(btnKind,listId)+"</li>";
            return liInnerHtml;
        }

        function listHtmlCombine(){
            totalListHtml = "";
            for( let i = 0 ; i < listData.length ; i++ ){
                if (listData[i].btnKind === BTN_KIND_SAVE ){
                    totalListHtml +=liInnerCheckBoxText(listData[i].value, listData[i].id, listData[i].btnKind, listData[i].check );
                    continue;
                }
                totalListHtml += liInnerCheckBox(listData[i].value, listData[i].id, listData[i].btnKind, listData[i].check );

            }
            return totalListHtml;
        }
        //list refresh
        function rendering(){
            localStorageSetting();
            listHtmlCombine();
            qs("#full-list").innerHTML = totalListHtml;
        }

        function localStorageSetting(){
            if(listData.length <= 0 && localStorage.getItem("data") === "null"){
                return;
            } else if ( listData.length <= 0 ){
                listData = JSON.parse(localStorage.getItem("data"));
            } else { 
                localStorage.setItem("data",JSON.stringify(listData));
                listData = JSON.parse(localStorage.getItem("data"));
            }

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
                if (e.target.id === `del${targetId}`){
                    listData.splice(idFindIndex(targetId),1);
                    rendering();
                } else if (e.target.id === `edit${targetId}`){
                    listData[idFindIndex(targetId)].btnKind = BTN_KIND_SAVE;
                    rendering();
                } else if (e.target.id === `save${targetId}`){
                    let editText = qs("#input-checkbox-text").value;
                    listData[idFindIndex(targetId)].value = editText;
                    listData[idFindIndex(targetId)].btnKind = BTN_KIND_EDIT;
                    rendering();
                }  
                else if (e.target.parentNode.children[0].className ==="chk"){
                    let index = idFindIndex(targetId);
                    listData[index].check === true ? listData[index].check = false : listData[index].check = true;
                }

            });
        }

        function entireCheck(){
            qs("#entire-checked").addEventListener("click",e=>{
                listData.forEach(item=>{
                    item.check = true;
                });
                rendering();
            });
        }
        function entireCheckClear(){
            qs("#entire-checked-clear").addEventListener("click",e=>{
                listData.forEach(item=>{
                    item.check = false;
                });
                rendering();
            });
        }
        function entireDelete(){
            qs("#entire-delete").addEventListener("click",e=>{
                listData = [];
                rendering();
            });
        }

        function idFindIndex(id){
            let Idindex; 
            listData.forEach((item,index)=>{
                if(item.id === Number(id)){
                    Idindex = index;
                }
            });
            return Idindex;
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










