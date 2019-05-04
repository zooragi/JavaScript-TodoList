(function(){
    "use strict"

    const qs = select => document.querySelector(select);
    let listMap = new Map();    
    let listCount = 0;
    const BTN_KIND_SAVE = "save";
    const BTN_KIND_EDIT = "edit";

    function todoListApp(){

        function init(){
            enterkey();
            listClickEvent();
        }

        // EnterKey
        function enterkey() {
            qs("#input-text").addEventListener("keyup",e=>{
                let textValue = qs("#input-text").value;
                if (window.event.keyCode === 13) {
                    if(textValue === "")
                        alert("내용을 입력하시오.");
                    else{
                        mapSetting(textValue,String(listCount));
                        listCount ++;
                        qs("#input-text").value="";
                        rendering();
                    }
                }
            });
            

        }
        //map stting
        function mapSetting(value,listId){
            let liInnerHtml = "<li class='list-unit'>"+addCheckbox(value,listId)+addDelEditButton("edit",listId)+"</li>";
            listMap.set(listId,liInnerHtml);
        }
        //list refresh
        function rendering(){
            let totalList = "";
            for( let value of listMap.values()){
                totalList += value;
            }
            qs("#full-list").innerHTML = totalList;
        }
        //Add checkbox add
        function addCheckbox(value,chkId){
            return `<label class="check-label" >
            <input type="checkbox" name="checkBoxList" class="chk" id=${chkId}>
            <span class="checkbox-circle">${value}</span></label>`;
        }
        function addCheckedbox(value,chkId){
            return `<label class="check-label" >
            <input type="checkbox" name="checkBoxList" class="chk" id=${chkId} checked>
            <span class="checkbox-circle">${value}</span></label>`;
        }

        //Add checkbox and input text
        function addCheckBoxAndText(text,chkId){
            return `<label class="check-label">
            <input type="checkbox" name="checkBoxList" id=${chkId}>
            <span class="checkbox-circle"></span>
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
                    listMap.delete(targetId);
                    rendering();
                } else if (e.target.id === `edit${targetId}`){
                    let preText = e.target.parentNode.parentNode.children[0].children[1].textContent;
                    listMap.set(targetId,`<li class='list-unit'>${addCheckBoxAndText(preText,targetId)}
                    ${addDelEditButton(BTN_KIND_SAVE,targetId)}</li>`);
                    rendering();
                } else if (e.target.id === `save${targetId}`){
                    let editText = qs("#input-checkbox-text").value;
                    listMap.set(targetId,`<li class='list-unit'>${addCheckbox(editText,targetId)}
                    ${addDelEditButton(BTN_KIND_EDIT,targetId)}</li>`);
                    rendering();
                }  else if (e.target.parentNode.className ==="check-label"){
                    let textValue = e.target.parentNode.children[1].textContent;
                    let chkItem = document.getElementById(targetId);
                    if(chkItem.checked){
                        listMap.set(targetId,`<li class='list-unit'>${addCheckedbox(textValue,targetId)}
                        ${addDelEditButton(BTN_KIND_EDIT,targetId)}</li>`);
                    } else{
                        listMap.set(targetId,`<li class='list-unit'>${addCheckbox(textValue,targetId)}
                        ${addDelEditButton(BTN_KIND_EDIT,targetId)}</li>`);
                    }
                
                }
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
        init();
    }
    todoListApp();
})();










