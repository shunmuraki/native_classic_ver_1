import { target_data } from "./base/tools.js";

// TDの生成.
export function transition_animation_start(e) {
    let effect = new KeyframeEffect(
    e,
    [
        { transform: 'scale(1)' },
    ], 
    {
        duration: 400, 
        easing: "ease-in-out"
    },
    );  
    let td = new Animation(effect);
    td.play();
    td.effect.updateTiming({ fill: 'forwards' }); 
    td.persist();
}

// TDの生成.
export function transition_animation_end(e) {
    let effect = new KeyframeEffect(
        e,
        [
            { transform: 'scale(0.5)' },
        ], 
        {
            duration: 400,
            easing: "ease-in-out"
        },
    );  
    let td = new Animation(effect);
    td.play();
    td.effect.updateTiming({ fill: 'forwards' }); 
    td.persist();
}

// スクロールを禁止する関数.
export function on_preventer(e){
    document.querySelector("body").style.overflow = "hidden";
    document.querySelector("html").style.overflow = "hidden";
    statusbar_management("on");
}

// スクロールを解除する関数.
export function off_preventer(e) {
    document.querySelector("body").style.overflow = "visible";
    document.querySelector("html").style.overflow = "visible";
    statusbar_management("off");
}

// 中のiframeの全部の再生を開始する関数
export function all_player(e, f) {
    for (var i = 0; i < e.children.length; i++) {
        let content = e.children[i].lastElementChild;
        if (content.tagName == "IFRAME") {
            let object_content = f[target_data(e.children[i], "yt_num_")];
            object_content.playVideo();
         } 
    }
}

// 中のiframeの全部の再生を止める関数.
export function all_pauser(e, f) {
    for (var i = 0; i < e.children.length; i++) {
        let content = e.children[i].lastElementChild;
        if (content.tagName == "IFRAME") {
            let object_content = f[target_data(e.children[i], "yt_num_")];
            object_content.pauseVideo();
        } 
    }
}

// Date モジュールから now_current_time（min） を返す関数
export function date_getter() {
    let d = new Date();
    let minute = d.getMinutes();
    let second = d.getSeconds() * 60;
    let millisecond = d.getMilliseconds() / 1000;
    let the_occur_t = minute + second + millisecond;
    return the_occur_t;
}

let timer = null;

// wheel イベントの大量発生を包む関数.
export const suppression = (callback, interval) => {
  if (timer) clearTimeout(timer);
  timer = window.setTimeout(callback, interval);
}

// section の中の object(iframe) のシーキングをうまくいかせるための初期設定をする関数.
export const sr_assign = (e) => {
    let objects = e.children;
    for (let i = 0; i < objects.length; i++) {
        objects[i].classList.add("seekto_ready");
    }
}

// 各 section が有する ステータスバー のサイズ（height） を更新する関数.
let statusbar_outer = document.querySelector(".statusbar_outer");
let statusbar = document.querySelector(".statusbar");
let wheel_cover = document.querySelector(".wheel_cover");

// 各 リニア製のsection に対して 動的に ステータスバー を表示する関数.
// また同時に linear の上に被せる wheel_cover についてもここでマネジメント.
export const statusbar_management = (e) => {
    if (e == "on") {
        statusbar_outer.animate(
            [
                {left: "10px"},
            ],
            {
                duration: 300,
                easing: "ease-in-out",
                fill: "forwards"
            }
        )
        wheel_cover.style.display = "block";
    } else if (e == "off") {
        wheel_cover.style.display = "none";
        statusbar_outer.animate(
            [
                {left: "-20px"},
            ],
            {
                duration: 300,
                easing: "ease-in-out",
                fill: "forwards"
            }
        )
    }
}

// statusbar のアップデートをする関数.
export const status_update = (e, f) => {
    let animation_data = f;
    let ct = animation_data[String(e)]["about_time"]["section_current_time"];
    let duration = animation_data[String(e)]["about_time"]["section_duration"];
    let hpx = window.innerHeight * 0.92;
    let the_length = (hpx / duration) * ct;
    // 動的に追加しているので最後の要素がstatusbarのはず.
    statusbar.style.height = the_length + "px";
}

// pragm_stles
// pragm_stles
// pragm_stles

// style_data_trace の跡地
// style_data_trace の跡地
// style_data_trace の跡地