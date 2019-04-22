(function(){
    "use strict"

    //위치가 정확히 헷갈렸음 내생각은 일단 즉
    const qs = select => document.querySelector(select);
    //제일 처음 보여줄 이미지 번호
    let numberInit = 0;

    //Image 가져오기
    function imgGallery(){
        const imgList= ["aaa.jpg","bbb.jpg","ccc.jpg","ddd.jpg"];
        const imgBox = qs(".img-box");
        const radioPage = qs(".page-radio-bundle");
        

        function init(){
            bindEvents();
            radioEvents();
            rendering(numberInit);
        }

        function imageView(img){
            return `
                <img class="image-list" src="${img}" alt="image">
            `;
        }
        function makeRadio(){
            let radioHtml = "";
            for(let i = 0; i < imgList.length ; i++){
                radioHtml += `<input type="radio" name="p-Radio" class="page-radio ">`;
            } 
            return radioHtml;  
        }
        function rendering(a){
            imgBox.innerHTML = imageView(imgList[a]);
            radioPage.innerHTML = makeRadio();
        }

        function bindEvents(){
            qs("#image-button-left").addEventListener("click",e=>{
                numberInit = (numberInit-1+imgList.length) % imgList.length
                rendering(numberInit);
            });
            qs("#image-button-right").addEventListener("click",e=>{
                numberInit = (numberInit + 1) % imgList.length;
                rendering(numberInit);
            });
        }

        function radioEvents(){
            let $radioClass = document.querySelectorAll(".page-radio");
            for(let i = 0; i < $radioClass.length ; i++){
                $radioClass[i].onclick()
            }
        }

        init();
    }
    imgGallery();
})();