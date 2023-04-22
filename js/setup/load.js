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

// 以下チートシートの表示関連
// チートシートをJSONから動的に読み込むようにする。

// 今のチートシートをJSON形式にする.
async function getCheetsheet() {
    const response = await fetch(
      "../cheetsheet.json"
    );
    const data = await response.json();
    return data;
}

// box を作って、中に引数に渡した文字列を配置する、ブロックの生成関数
let cs_flex = document.querySelector(".cs_flex");

// e = key
// f = value
const cheetsheet_block_maker = (e, f) => {
    // box
    let box = document.createElement("div");
    // h4
    let title = document.createElement("h4");
    title.textContent = String(e);
    // p
    let desc = document.createElement("p");
    desc.textContent = String(f);
    box.classList.add("box");
    box.appendChild(title);
    box.appendChild(desc);
    
    // 挿入
    cs_flex.appendChild(box);
}

// json からループで ブロック生成関数にデータを渡すループ処理
const native_usages = getCheetsheet;
for (let key in native_usages) {
    let v = native_usages[key];
    cheetsheet_block_maker(key, v);
}

let cs = document.querySelector(".cheet_sheet");
if (cs) {
    cs.style.top = 100 + "%";
}
let csb = document.querySelector(".usage_button");

// デフォルトのセットアップ
csb.classList.add("off");
csb.addEventListener("click", () => {
    let centering = document.querySelector(".centering");
    if (csb.classList.contains("on")) {
        cs.animate(
            [
                { top: '0%' },
                { top: '100%' }
            ], {
            duration: 500,
            fill: "forwards",
            easing: "ease-in-out"
            }
        );
        focus_checker(centering);
    } else if (csb.classList.contains("off")) {
        blur_checker(centering);
        cs.animate(
            [
            { top: '100%' },
            { top: '0%' }
            ], {
            duration: 600,
            fill: "forwards",
            easing: "ease-in-out"
        }
        );
    }
    csb.classList.toggle("on");
    csb.classList.toggle("off");
})

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
