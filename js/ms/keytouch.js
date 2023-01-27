import { screen } from "../base/elements.js";
import { adjust_target_pos } from "./function.js";

let ms_adjust_target;

window.addEventListener("keydown", (e)=>{
  
    let k = e.key;
    let current;

    if (screen.classList.contains("um") == false) {
        current = document.activeElement;

        // マークダウンスペースの軌道処理.
        if (k == "/") {
          if (! screen.classList.contains("ms")) {

            screen.classList.add("ms");
            let centering = document.querySelector(".centering");

            // ms の生成.
            let ms = document.createElement("textarea");
            ms.classList.add("ms_area");
            ms.style.opacity = 0;

            // msの挿入先について条件分岐.「same」クラスがついている場合はカバーが被さっているので、対象を special_cov とする.
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
            
            adjust_target_pos(ms_adjust_target, "on");

            ms.style.opacity = 1;
            ms.focus();
            setTimeout(() => {
              ms.value = "";
            }, 10)
          }
        }

        if (screen.classList.contains("ms")) {
          // ms の終了処理.
          if (k == "Escape" || k == "Enter") {
            setTimeout(() => {
              if (document.querySelector(".ms_area")) {
                document.querySelector(".ms_area").remove();
              }
            }, 10)
            // connect の場合を考慮し再取得.
            if (document.querySelector(".centering").classList.contains("same")) {
              ms_adjust_target = document.querySelector(".special_cov").lastElementChild;
            } else {
              ms_adjust_target = document.querySelector(".centering").lastElementChild;
            }
            
            console.log(ms_adjust_target);
            adjust_target_pos(ms_adjust_target, "off");
            screen.classList.remove("ms");
          }
        }
    }
  
})
