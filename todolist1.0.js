    let list_count = 0;
    let list_unit = new Array();

    let checkbox_list = document.getElementsByName(checkbox_list);
    for(let i = 0; i <checkbox_list.length ; i++){
        if(checkbox_list[i].checked==true){
            document.write(111);
        }
    }
    function add_list(value){
        let total_list = "";
        list_unit.push("<li class = 'list-unit'>"+add_checkbox(value)+add_del_edit_button()+"</li>");
        for( let i= 0; i < list_unit.length ; i++){
            total_list += list_unit[i];
        }
        document.getElementById("full-list").innerHTML = total_list;
    }
    function add_checkbox(value){
        let checkbox = '<input type="checkbox" name = "checkox_list" id = "check'+list_count+'"><label for="check'+list_count+'" >'+value+'</label>';
        return checkbox;
    }
    function add_del_edit_button(){
        let button = "<span class = 'list-button'> <input type='button' class = 'button-unit' value='Edit'> <input type='button' class = 'button-unit' value='Delete'></span>";
        return button;
    }
    function enterkey() {
        if (window.event.keyCode == 13) {
            let text_value = document.getElementById("input-text").value;
            if(text_value == "")
                alert("내용을 입력하시오.");
            else{
                add_list(text_value);
                list_count ++;
                
            }
        }
    }

