import { pragm_stylies, style_data_trace } from "./parts.js";
import { block_multiable } from "./ytp.js";

// yt-iframe の読み込み
let yt_elem_list = new Array();
// let yt_id_list = []; *Nativeから追加.
let bo = document.getElementsByTagName("body")[0];
let section_elms = document.querySelectorAll(".linear");
let the_pathes = ["anim.js", "states.js", "base/tools.js", "main.js"];

// HTMLファイル にて動的に JSファイル群　を読み込む際に使う関数.
export const script_load = () => {
    for (let i = 0; i < the_pathes.length; i++) {
        let the_sctag = document.createElement("script");
        the_sctag.src = String("javascript/" + String(the_pathes[i]));
        the_sctag.type = "module";
        bo.appendChild(the_sctag);
    }
}

// 各　section に対する初期セットアップ.
for (let i = 0; i < section_elms.length; i++) {
    section_elms[i].classList.add("iwatchyou");
    section_elms[i].classList.add("ikuneko");

    let the_next_section = section_elms[i].nextElementSibling;
    if (the_next_section) {
        the_next_section.style.opacity = 0;
    }
}

function yt_load() {
    for (let i = 0; i < yt_id_list.length; i++) {
        // * id と 親（<object>）を紐付ける.
        let the_name = String("yt_" + i);
        let pl = block_multiable(the_name, yt_id_list[i], i);
        // * ここで挿入！！（昇華）.
        yt_elem_list.push(pl);
    }
}

// yt_elm_list を外部ファイルへ共有する関数.
export const ytelemlist_getter = () => {
    return yt_elem_list;
}

// 最初の section が non 属性だったら margin を 50vh とって場所を戻してあげるようにする.
let the_first = document.querySelector(".inner").firstElementChild;
if (the_first.classList.contains("non")) {
    the_first.style.marginTop = window.innerHeight / 50 + "px";
}

// ローディングスピナーの infinite アニメーション
let loader = document.querySelector(".loader");
loader.animate(
    [
        {transform: "rotate(0deg)", opacity: 0},
        {transform: "rotate(180deg)", opacity: 1},
        {transform: "rotate(360deg)", opacity: 0},
    ],
    {
        iterations: 8,
        duration: 1000,
        easing: "ease-in-out",
        offset: 500
    }
)

let loading_screen = document.querySelector(".native_load_cover");

window.onload = () => {
    // scrollTo がうまくいかないので仕方なく利用.
    $(function() {
        $('html,body').animate({ scrollTop: 0 }, '1');
    });
};

// DOMへのスタイリングのトレース.
for (let i = 0; i < section_elms.length; i++) {
    let objects = section_elms[i].children;
    for (let o = 0; o < objects.length; o++) {
        let object = objects[o];
        let style_data = pragm_stylies(object);
        style_data_trace(object, style_data);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        yt_load();
    }, 1000)

    setTimeout(() => {
        loading_screen.animate(
        [
            {opacity: 1},
            {opacity: 0}
        ],
        {
            duration: 1000,
            easing: "linear", 
        }
        )

        setTimeout(() => {
            // その他の JS の動的な読み込み.
            // 加えて yt のセットアップ（YT.playerが準備できた頃.）
            script_load(); 
            loading_screen.style.display = "none";
        }, 1000)
    }, 6000)
})