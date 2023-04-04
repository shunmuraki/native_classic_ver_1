import { screen } from "../base/elements.js";
import { layer_resetter, wheel_seton } from "./function.js";
import { adjust_target_pos } from "../ms/function.js";
import { which_special_is } from "../base/tools.js";
import { focus_checker } from "../base/function.js";

const wheel = document.querySelector(".wheel");
const the_pointer = document.querySelector(".pointer");
const layer_base = document.querySelector(".layer_1");

document.addEventListener("keydown", (e) => {
    
    let current = document.activeElement;
    let k = e.key;
    let type_signiture;
    let centering = document.querySelector(".centering");;
    
    if (current.tagName == "TEXTAREA") {
        type_signiture = current.value;

        // ホイールを起動する処理.
        if ( type_signiture.indexOf('styl') != -1) {
          if (screen.classList.contains("ms")) {
            // 先にms調整箇所を戻しておいてそれから複製させる. 
            let target = centering;
            if (centering.classList.contains("same")) {
                target = which_special_is(centering);
            } 
            adjust_target_pos(target.lastElementChild, "off");
            document.querySelector(".ms_area").remove();
            screen.classList.add("style");
            wheel_seton();
            current.blur();
            adjust_target_pos(centering.lastElementChild, "off");
          }
        }
    }
    if (screen.classList.contains("style")) {
          if (k == "Escape") {
            e.preventDefault();
            let w_w = document.querySelector(".waiting_wheel");
            if (w_w) {
              // セカンドレイヤーが表示中の場合の処理.
              w_w.classList.remove("waiting_wheel");
              w_w.style.display = "none";
              document.querySelector(".layer_1").style.opacity = 1;
            } else {
              // ファーストレイヤーが表示中の場合の処理.
              the_pointer.animate(
                  [
                    { transform: 'scale(5)', opacity: 1 },
                    { transform: 'scale(1)', opacity: 1 },
                  ], {
                    duration: 200,
                    fill: "both",
                    delay: 100,
                  }
                );
              layer_base.animate(
                  [
                    { transform: 'rotate(360deg)', },
                    { transform: 'rotate(270deg) ' }
                  ], {
                    duration: 300,
                    fill: "both"
                  }
                );
              wheel.animate(
                  [
                    { opacity: 1, },
                    { opacity: 0, }, 
                  ], {
                    duration: 300,
                    delay: 200,
                    fill: "both"
                  }
                );
              layer_resetter();
              wheel.style.display = "none";
              screen.classList.remove("style");

              if (! centering.classList.contains("same")) {
                focus_checker(centering);
              } 
            }
          }
    }
})