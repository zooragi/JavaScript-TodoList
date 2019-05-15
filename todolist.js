(function(){
    "use strict"

    const qs = select => document.querySelector(select);
    let listCount = 0;
    const BTN_KIND_DEL = "del";
    const BTN_KIND_SAVE = "save";
    const BTN_KIND_EDIT = "edit";
    const CHECKBOX_CLASS = "chkbox";
    let listData = [];
    let localStorageData;
    let totalListHtml = "";


    function todoListApp(){

        const targetClick = {
            "del" : targetDelete,
            "edit" : targetEdit,
            "save" : targetSave,
            "chkbox" : targetChecked
        };
        
        function init(){
            if(JSON.parse(localStorage.getItem("data")) !== null){
                listData = JSON.parse(localStorage.getItem("data"));
                listCount = Number(JSON.parse(localStorage.getItem("id")));
            }

            rendering(listData);
            enterkey();
            listClickEvent();
            footerButton();
        }

        // EnterKey
        function enterkey() {
            const ENTER_KEY = 13
            const $input = qs('#input-text');
            $input.addEventListener("keyup",e => {
                if (window.event.keyCode !== ENTER_KEY) return;
                if(!$input.value) return alert();
                
                listData.push({
                    id : listCount,
                    value : $input.value,
                    btnKind : BTN_KIND_EDIT,
                    check : false
                });
                listCount ++;
                $input.value ="";
                rendering(listData);
            });

        }
        
        function liTagHtml(item){
            if(item.btnKind === BTN_KIND_SAVE){
                return `
                <li class='list-unit'>${addCheckBoxAndText(item.value,item.id,item.check)}${addDelEditButton(item.btnKind,item.id)}</li>`;
            }
            return `
            <li class='list-unit'>${addCheckbox(item.value,item.id,item.check)}${addDelEditButton(item.btnKind,item.id)}</li>`;

        }

        function listHtmlCombine(array){
            totalListHtml = "";
            array.forEach(item=>{
                totalListHtml +=liTagHtml(item);
            });
            return totalListHtml;
        }

        //list refresh
        function rendering(array){
            localStorage.setItem("data",JSON.stringify(listData));
            localStorage.setItem("id",JSON.stringify(listCount));
            listHtmlCombine(array);
            qs("#full-list").innerHTML = totalListHtml;
        }

        //Add checkbox add
        function addCheckbox(value,chkId,checkedState){
            return `
            <label class="check-label" >
            <input type="checkbox" name="checkBoxList" class="chk" ${checkedState === true ? "checked" : ""}>
            <span class="checkbox-circle chkbox" id=${chkId}>${value}</span></label>`;
        }

        //Add checkbox and input text
        function addCheckBoxAndText(text,chkId){
            return`
            <label class="check-label">
            <input type="checkbox" name="checkBoxList" class="chk">
            <span class="checkbox-circle chkbox" id=${chkId}></span>
            </label> 
            <input type="text" id="input-checkbox-text" value=${text} autofocus>`;

        }
            //Add Delete,Edit Button
        function addDelEditButton(buttonKind,buttonId){
            return `
            <span class='list-button'> 
            <input type='button' class='button-unit ${buttonKind}' value=${buttonKind} id='${buttonKind}${buttonId}'> 
            <input type='button' class='button-unit del' value='delete' id='del${buttonId}'>
            </span>`;
        }

        function listClickEvent(){
            const $ulItem = qs("#full-list");
            $ulItem.addEventListener("click",e=>{
                let targetId = idSearch(e.target.id);
                let idx = listData.map(x => x.id).indexOf(Number(targetId));
                if ( targetClick.hasOwnProperty(e.target.classList[1]) ){
                    targetClick[e.target.classList[1]](idx);
                }
            });
        }

        function targetDelete(idx){
            listData.splice(idx,1);
            rendering(listData);
        }

        function targetEdit(idx){
            listData[idx].btnKind = BTN_KIND_SAVE;
            rendering(listData);
        }
        function targetSave(idx){
            const $editText = qs("#input-checkbox-text");
            listData[idx].value = $editText.value;
            listData[idx].btnKind = BTN_KIND_EDIT;
            rendering(listData);
        }
        function targetChecked(idx){
            listData[idx].check = !listData[idx].check;
            localStorage.setItem("data",JSON.stringify(listData));
        }

        function footerButton(){
            qs("#entire-checked").addEventListener("click",e=>{
                listData.forEach(item => {
                    item.check = true;
                });
                rendering(listData);
            });

            qs("#entire-checked-clear").addEventListener("click",e=>{
                listData.forEach(item=>{
                    item.check = false;
                });
                rendering(listData);
            });

            qs("#entire-delete").addEventListener("click",e=>{
                listData = [];
                rendering(listData);
            });

            qs("#checked-list").addEventListener("click",e=>{
                let tmp = [];
                tmp = listData.filter(item=>{
                    return item.check === true;
                });
                rendering(tmp);
            });

            qs("#not-checked").addEventListener("click",e=>{
                let tmp = [];
                tmp = listData.filter(item=>{
                    return item.check === false;
                });
                rendering(tmp);
            });

            qs("#all-list").addEventListener("click",e=>{
                rendering(listData);
            });
        }

        //buttonId search
        function idSearch(btnId){
            let buttonNumber = "";
            for(let i = 0 ; i < btnId.length ; i++){
                buttonNumber += isNumber(btnId[i]);
            }
            return buttonNumber;
        }

        function isNumber(btnId){
            if(isNaN(btnId) === false){
                return btnId;
            }
            return "";
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










