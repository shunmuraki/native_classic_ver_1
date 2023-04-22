import { full_end_scrollwidth, full_start_scrollwidth, screen, window_height } from "../base/elements.js";
import { focus_checker, blur_checker, make_fragment } from "./function.js";
import { wheel_positioning } from "../stylable/style.js";

let all_writearea = document.getElementsByClassName("write_area");

// 以下Nativeを開いた時の最初の動作.
let dummy = document.createElement("div");
dummy.classList.add("first_load_dummy");
screen.appendChild(dummy);
// um 
um.style.display = "none";

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
        let d = document.querySelector(".first_load_dummy");
        make_fragment(d, "after");
        d.remove();
        // 最初のcenteringを用意.
        all_writearea[0].parentElement.classList.add("centering");
        all_writearea[0].focus();
    }
}());


// これもさ、通常のページと export.html　で分けた方が絶対いいよね。

// export の場合

// いやもっと調整必要だけどな！！！！！！！

// < --------------------------------------------------------------------------------------------------- >

// ページ遷移アニメーション.
let button = document.querySelector(".download_button");
let contents = document.querySelector(".contents");

let rc = document.querySelector(".redirect_cover");
rc.style.top = 0 + "%";

contents.animate(
    [
      { opacity: 0, },
      { opacity: 1 }
    ], {
      duration: 800,
      fill: "both"
    }
);

// < --------------------------------------------------------------------------------------------------- >

// DOMのインポート.
let the_values = JSON.parse(sessionStorage.getItem("the_values"));
let the_output = sessionStorage.getItem("output");
screen.innerHTML = the_output;

// textareaの値を現状復帰.
let write_areas = document.querySelectorAll(".write_area");
for (let i = 0; i < write_areas.length ; i++) {
    write_areas[i].value = the_values[i];
}
