import { make_fragment } from "./function.js";
import { screen } from "../base/elements.js";

let all_writearea = document.getElementsByClassName("write_area");

// -----------------------------------------------------------------------------------------
// Nativeを開いた時の最初の動作
let dameee = document.createElement("div");
dameee.classList.add("first_load_dame");
screen.appendChild(dameee);

(function () {
    let d = document.querySelector(".first_load_dame");
    make_fragment(d, "after");
    d.remove();
    // 最初のcenteringを用意します。
    all_writearea[0].parentElement.classList.add("centering");
    all_writearea[0].focus();
}());