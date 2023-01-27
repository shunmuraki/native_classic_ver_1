import { make_fragment } from "./function.js";
import { screen } from "../base/elements.js";
import { wheel_positioning } from "../stylable/function.js";

let all_writearea = document.getElementsByClassName("write_area");

// Nativeを開いた時の最初の動作.
let damee = document.createElement("div");
damee.classList.add("first_load_dame");
screen.appendChild(damee);

(function () {
    let d = document.querySelector(".first_load_dame");
    make_fragment(d, "after");
    d.remove();
    // 最初のcenteringを用意.
    all_writearea[0].parentElement.classList.add("centering");
    all_writearea[0].focus();
    wheel_positioning(all_writearea[0].parentElement);
}());