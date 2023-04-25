import {tracer_basis} from "../function/tool.js";
import { focus_checker } from "../function/general.js";

// * index.html → export.html のリダイレクト時に sessionStorage に保存した innerHTML には入らない <textarea> の value たちを重ねて保存しておく変数.
let the_values = new Array();
let button = document.querySelector(".export_button");

button.addEventListener("click", () => {
    // スタイリング等充てた直後にexportされるケースに対応.
    tracer_basis(document.querySelector(".centering"));
    // textarea が innerHTMLではコピーされないため別に配列を用意して export.html側で再度同じ状況を再現.
    let write_areas = document.querySelectorAll(".write_area");
    for (let i = 0; i < write_areas.length; i++) {
        let the_value = write_areas[i].value;
        the_values.push(the_value);
    }

    let output_doms = screen.innerHTML;
    sessionStorage.setItem("output", output_doms);
    sessionStorage.setItem("the_values", JSON.stringify(the_values));

    // ここに一枚カバーが入る.
    let redirect_cover = document.createElement("div");
    redirect_cover.classList.add("redirect_cover");
    screen.after(redirect_cover);

    // ページ遷移のアニメーション.
    let rc = document.querySelector(".redirect_cover");
    rc.style.top = 0 + "%";
    rc.animate(
        [
        { opacity: 0, },
        { opacity: 1 }
        ], {
        duration: 800,
        fill: "forwards",
        easing: "ease-in-out"
        }
    );

    // ボタンが押されたら、sessionStorageにDOMを保存して into.html へ遷移.
    setTimeout(() => {
        window.location.href = "export.html";
        focus_checker(document.querySelector(".centering"));
    }, 1000) 

    // エディターに戻った際にカバーを取り外す.
    setTimeout(() => {
        rc.remove();
    }, 3000)
});