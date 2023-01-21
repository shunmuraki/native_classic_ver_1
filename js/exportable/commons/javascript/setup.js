// touch * ここは最終的にはループで処理するようになる。sectionタグによる全取得で。
// document.querySelector("#section_1").classList.add("iwatchyou");
// document.querySelector("#section_2").classList.add("iwatchyou");
// document.querySelector("#section_3").classList.add("iwatchyou");
// document.querySelector("#section_4").classList.add("iwatchyou");
import { pragm_stylies, style_data_trace } from "./parts.js";

// * STYlE from Native.
let sections = document.querySelectorAll(".section");
for (let i = 0; i < sections.length; i++) {
    let objects = sections[i].children;
    for (let o = 0; o < objects.length; o++) {
        let object = objects[o];
        let style_data = pragm_stylies(o);
        // * デフォルトの適応.
        style_data_trace(object, style_data);
    }
}

let section_elms = document.querySelectorAll(".linear");
for (let i = 0; i < section_elms.length; i++) {
    section_elms[i].classList.add("iwatchyou");
    section_elms[i].classList.add("ikuneko");

    let the_next_section = section_elms[i].nextElementSibling;
    if (the_next_section) {
        the_next_section.style.opacity = 0;
        console.log(the_next_section);
    }
}
// * video, Animation などについて管理をするデータリスト
// ** 仮置きのsampleデータをここに書いてみますね！（本番と同じ形式）
// export const sections = {"section_1": {"about_time": {"section_current_time": 0, "section_now_time": 0, "section_duration": 50}, "about_doms": {"ani_0": {"trigger_when": 4, "animate_duration": 2}, "ani_1": {"trigger_when": 20, "animate_duration": 2}}}};

// ** 要はこっちは手書きしろってことね.