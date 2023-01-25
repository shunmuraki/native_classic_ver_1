// * / が押されたら。Change イベントより.
let screen = document.querySelector(".screen"); 
let ms_adjust_target;

window.addEventListener("keydown", (e)=>{
  
    let k = e.key;
    let current;

    if (screen.classList.contains("um") == false) {
        current = document.activeElement;

        if (k == "/") {

          if (! screen.classList.contains("ms")) {

            // まずcenteringのあるverticalを取得
            // その中の一番下の要素をとれ。 
            screen.classList.add("ms");
            let centering = document.querySelector(".centering");
            let ms = document.createElement("textarea");
            ms.classList.add("ms_area");
            ms.style.opacity = 0;

            // * ここで条件分岐します。「same」クラスがついている場合はカバーが被さっているので、対象を special_cov にします.
            if (centering.classList.contains("same")) {

              ms_adjust_target = document.querySelector(".special_cov").lastElementChild;
              ms_adjust_target.before(ms);

            } else {

              if (document.activeElement.tagName == "BODY") {
                centering.lastElementChild.before(ms);
              } else {
                current.value = current.value.slice(0, -1);
                current.blur();
                current.before(ms);
              }

              ms_adjust_target = centering.lastElementChild;
            }
            
            ms_adjust_target.style.setProperty('top', '20%', 'important');

            ms.style.opacity = 1;
            ms.focus();
            setTimeout(() => {
              ms.value = "";
            }, 10)
          }
        }

        if (screen.classList.contains("ms")) {
          if (k == "Escape" || k == "Enter") {

            setTimeout(() => {
              if (document.querySelector(".ms_area")) {
                document.querySelector(".ms_area").remove();
              }
            }, 10)
            
            // ms_adjust_target.focus();
            // connect の場合を考慮し再取得.
            if (document.querySelector(".centering").classList.contains("same")) {
              ms_adjust_target = document.querySelector(".special_cov").lastElementChild;
            } else {
              ms_adjust_target = document.querySelector(".centering").lastElementChild;
            }
            ms_adjust_target.style.top = ''; 
            screen.classList.remove("ms");
          }
        }
    }
  
})
