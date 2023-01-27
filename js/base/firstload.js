import { make_fragment } from "./function.js";
import { screen } from "../base/elements.js";
import { wheel_positioning } from "../stylable/function.js";

let all_writearea = document.getElementsByClassName("write_area");

// Nativeを開いた時の最初の動作.
let damee = document.createElement("div");
damee.classList.add("first_load_dame");
screen.appendChild(damee);

(function () {
    if (sessionStorage.getItem("output")) {
        let doms = sessionStorage.getItem("output");
        screen.innerHTML = doms;
        let the_values = sessionStorage.getItem("the_values");
        // textareaの値を現状復帰.
        let write_areas = document.querySelectorAll(".write_area");
        for (let i = 0; i < write_areas.length ; i++) {
            write_areas[i].value = the_values[i];
        }        

        let hors = document.querySelectorAll(".horizontal");
        for (let i = 0; i < hors.length; i++) {
            hors[i].scrollLeft = hors[i].scrollWidth;
        }

        if (document.querySelector(".centering").lastElementChild.tagName == "TEXTAREA") {
            document.querySelector(".centering").lastElementChild.focus();
        }
        sessionStorage.clear();

    } else {
        let d = document.querySelector(".first_load_dame");
        make_fragment(d, "after");
        d.remove();
        // 最初のcenteringを用意.
        all_writearea[0].parentElement.classList.add("centering");
        all_writearea[0].focus();
        wheel_positioning(all_writearea[0].parentElement);
    }
}());