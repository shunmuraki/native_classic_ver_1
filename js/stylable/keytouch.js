import { screen } from "../base/elements.js";
import { layer_resetter, wheel_seton } from "./function.js";
import { adjust_target_pos } from "../ms/function.js";
import { focus_checker } from "../base/function.js";

const wheel = document.querySelector(".wheel");
const the_pointer = document.querySelector(".pointer");
const layer_base = document.querySelector(".layer_1");

document.addEventListener("keydown", (e) => {
    
    let current = document.activeElement;
    let k = e.key;
    let type_signiture;
    
    if (current.tagName == "TEXTAREA") {
        type_signiture = current.value;

        // ホイールを起動する処理.
        if ( type_signiture.indexOf('styl') != -1) {

            document.querySelector(".ms_area").remove();
            focus_checker(document.querySelector(".centering"));          
            // current.value = current.value.slice(0, -6);
            screen.classList.add("style");
            wheel_seton();
            current.blur();
            adjust_target_pos(document.querySelector(".centering").lastElementChild, "off");
        }
    }
    if (screen.classList.contains("style")) {
          if (k == "Escape") {
              the_pointer.animate(
                  [
                    { transform: 'scale(5)', },
                    { transform: 'scale(1)', }
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
              let centering = document.querySelector(".centering");
              screen.classList.remove("style");
              focus_checker(centering);
          }
    }
})