import {tracer_basis} from "../function/tool.js";
import { focus_checker } from "../function/general.js";

// * index.html → export.html のリダイレクト時に sessionStorage に保存した innerHTML には入らない <textarea> の value たちを重ねて保存しておく変数.
let button = document.querySelector(".sb_export");

// 「書き出します」ボタンがクリックされたら
button.addEventListener("click", () => {
    // スタイリング等充てた直後にexportされるケースに対応.
    tracer_basis(document.querySelector(".centering"));
    let pied = screen.cloneNode(true);
    screen.after(pied);
    
    let you = screen.nextElementSibling;
    you.classList.remove("screen");
    you.classList.add("exporter");

    you.style.display = "none";
});