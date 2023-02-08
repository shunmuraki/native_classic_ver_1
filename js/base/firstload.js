import { screen, window_height } from "../base/elements.js";
import { focus_checker, make_fragment } from "./function.js";
import { wheel_positioning } from "../stylable/function.js";

let all_writearea = document.getElementsByClassName("write_area");

// Nativeを開いた時の最初の動作.
let damee = document.createElement("div");
damee.classList.add("first_load_dame");
screen.appendChild(damee);

window.onload = () => {
    // scrollTo の代替.
    $(function() {
        $('html,body').animate({ scrollTop: window_height - 200 }, {duration: 0});
        setTimeout(() => {
            wheel_positioning();
        }, 100)
    });
    document.getElementsByTagName("html")[0].style.overflow = "hidden";
    document.getElementsByTagName("body")[0].style.overflow = "hidden";
};     

(function () {
    // 以下 export.html から回帰したケースへの対応.
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

        focus_checker(document.querySelector(".centering"));
        sessionStorage.clear();

    } else {
        // 以下通常のリロードへの対応.
        let d = document.querySelector(".first_load_dame");
        make_fragment(d, "after");
        d.remove();
        // 最初のcenteringを用意.
        all_writearea[0].parentElement.classList.add("centering");
        all_writearea[0].focus();
    }
}());