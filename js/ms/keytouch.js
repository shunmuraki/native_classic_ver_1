// * / が押されたら。Change イベントより.
let screen = document.querySelector(".screen"); 

window.addEventListener("keydown", (e)=>{
  
    let k = e.key;
    let current;

    if (screen.classList.contains("um") == false) {
        current = document.activeElement;

        if (k == "/") {
          // まずcenteringのあるverticalを取得
          // その中の一番下の要素をとれ。 
          screen.classList.add("ms");
          let centering = document.querySelector(".centering");
          let ms = document.createElement("textarea");
          ms.classList.add("ms_area");
          ms.style.opacity = 0;

          if (document.activeElement.tagName == "BODY") {
            centering.lastElementChild.before(ms);
          } else {
           
            current.value = current.value.slice(0, -1);
            current.blur();
            current.before(ms);
          }
          
          // centering.lastElementChild.style.top = 30 + "%";
          centering.lastElementChild.style.setProperty('top', '20%', 'important');
          ms.style.opacity = 1;
          ms.focus();
          setTimeout(() => {
            ms.value = "";
          }, 10)
        }

        if (screen.classList.contains("ms")) {
          if (k == "Escape" || k == "Enter") {
            // document.querySelector(".ms_area").remove();
            document.querySelector(".centering").lastElementChild.style.top = '';
            // document.querySelector(".centering").lastElementChild.focus();
            screen.classList.remove("ms");
          }
        }
    }
  
})
