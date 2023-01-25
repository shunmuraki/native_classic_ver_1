import { layer_resetter, wheel_seton } from "./function.js";

// * これは別のイベントにする必要があるやろ。
const pointer = document.querySelector(".pointer_and_wheel");
const wheel = document.querySelector(".wheel");
const the_pointer = document.querySelector(".pointer");
const layer_base = document.querySelector(".layer_1");

// * etc → （そもそもの編集モードを止める)　wheelを消す。
document.addEventListener("keydown", (e) => {
    
    let current = document.activeElement;
    let k = e.key;
    let type_signiture;
    
    if (current.tagName == "TEXTAREA") {
        type_signiture = current.value;

        if ( type_signiture.indexOf('style') != -1) {

            document.querySelector(".ms_area").remove();
            if (document.querySelector(".centering").lastElementChild == "TEXTAREA") {
                document.querySelector(".centering").lastElementChild.focus();
            }
            
            wheel_seton();
            current.value = current.value.slice(0, -6);
            current.blur();
        }
    }

    if (k == "Escape") {
        the_pointer.animate(
            [
              { transform: 'scale(5)', },
              { transform: 'scale(1)', },
            ], {
              duration: 300,
              fill: "both"
            }
          );

        layer_base.animate(
            [
              { transform: 'rotate(360deg)', },
              { transform: 'rotate(270deg) ' }
            ], {
              duration: 800,
              fill: "both"
            }
          );
        wheel.animate(
            [
              { opacity: 1, },
              { opacity: 0, }, 
            ], {
              duration: 500,
              delay: 200,
              fill: "both"
            }
          );
        layer_resetter();
        wheel.style.display = "none";
        // * focusを返す
        let centering = document.querySelector(".centering");
        centering.lastElementChild.focus();
    }
})