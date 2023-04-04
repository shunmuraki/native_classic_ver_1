import { screen } from "../base/elements.js";
import { adjust_target_pos } from "./function.js";
import { which_special_is } from "../base/tools.js";

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
              ms_adjust_target = which_special_is(centering).lastElementChild;
              ms_adjust_target.before(ms);

            } else {
              if (document.activeElement.tagName == "BODY") {
                centering.lastElementChild.before(ms);
              } else {
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

            if (k == "Escape") {
              e.preventDefault();
            }

            if (! screen.classList.contains("style")) {
              setTimeout(() => {
                if (document.querySelector(".ms_area")) {
                  document.querySelector(".ms_area").remove();
                }
              }, 10)
              
              adjust_target_pos(ms_adjust_target, "off");

              if (ms_adjust_target.tagName == "TEXTAREA") {
                ms_adjust_target.focus();
              }
  
              screen.classList.remove("ms");
            }
          }
        }
    }
})
