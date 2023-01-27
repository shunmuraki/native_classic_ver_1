import { layer_resetter, wheel_seton } from "./function.js";

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
              { transform: 'scale(5)', backgroundColor: "#3e3e3e", border: "0px solid #3c3c3c" },
              { transform: 'scale(1)', backgroundColor: "#121212", border: "2px solid #3c3c3c" }
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
        if (centering.lastElementChild.tagName == "TEXTAREA") {
          centering.lastElementChild.focus();
        }
    }
})