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
        
        function init(){
            bindEvents();
            rendering(imgList[numberInit]);
        }

        function imageView(img){
            return `
                <img class="image-list" src="${img}" alt="image">
            `;
        }
        function rendering(){
            imgBox.innerHTML = imageView(imgList[numberInit]);
        }

        function bindEvents(){
            qs("#image-button-left").addEventListener("click",e=>{
                numberInit = (numberInit-1+imgList.length) % imgList.length
                rendering();
            });
            qs("#image-button-right").addEventListener("click",e=>{
                numberInit = (numberInit + 1) % imgList.length;
                rendering();
            });
        }

        init();
    }
    imgGallery();
})();