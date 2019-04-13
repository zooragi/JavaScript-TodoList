    let list_count = 0;
    let total_list = "";
    function add_list(value){
        total_list += "<li class = 'list-unit'>"+add_checkbox(value)+add_del_edit_button()+"</li>";
        document.getElementById("full-list").innerHTML = total_list;
        
    }
    function add_checkbox(value){
        let checkbox = '<input type="checkbox" id = "check'+list_count+'"><label for="check'+list_count+'" >'+value+'</label>';
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