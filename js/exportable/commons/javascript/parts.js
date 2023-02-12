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
    for (var i = 0; i < e.length; i++) {
        let content = e[i].lastElementChild;
        if (content.tagName == "IFRAME") {
            let object_content = f[target_data(the_object, "yt_num_")];
            object_content.playVideo();
         } 
    }
}

// 中のiframeの全部の再生を止める関数.
export function all_pauser(e, f) {
    for (var i = 0; i < e.length; i++) {
        let content = e[i].lastElementChild;
        if (content.tagName == "IFRAME") {
            let object_content = f[target_data(the_object, "yt_num_")];
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

// 各 リニア製のsection に対して 動的に ステータスバー を表示する関数.
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
    } else if (e == "off") {
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
    let hpx = window.innerHeight * 0.95;
    let the_length = (hpx / duration) * ct;
    // 動的に追加しているので最後の要素がstatusbarのはず.
    statusbar.style.height = the_length + "px";
}

// スタイル計算用の関数.
export const pragm_stylies = (e) => {

    let style_data;
    let object_classlist = e.classList;
    let px_width = window.innerWidth;
    let px_height = window.innerHeight;
    let whole_num;
    let this_num;
    let class_name;
    let client_width = e.clientWidth;
    let client_height = e.lastElementChild.clientHeight;

    // テキストだけずれがあるからこれを調整。
    if (e.lastElementChild.tagName == "P") {
        style_data = { vertical: [], horizontal: [], scale: [1, 2], opacity: [0, 1], size: []};
    } else {
        style_data = { vertical: [], horizontal: [], scale: [0.5, 1], opacity: [0, 1], size: []};
    }

    for (let j = 0; j < object_classlist.length; j++) {
        class_name = object_classlist[j]; 
        if (class_name.indexOf("outerstyle_") !== -1) {
            whole_num = class_name.slice(11, 12);
            this_num = class_name.slice(13, 14);   
        } 
    }

    let whole_space_height = px_height / whole_num;
    let top_pos = whole_space_height * (this_num - 1);
    let the_top_1;
    let the_top_2;
    
    // vertical
    if (whole_space_height > client_height) {
        the_top_1 = ((whole_space_height - client_height) / 2) + top_pos;
        the_top_2 = whole_space_height - client_height + top_pos;
    } else {
        the_top_1 = top_pos;
        the_top_2 = top_pos;
    }

    style_data["vertical"].push(0);
    style_data["vertical"].push(the_top_1);
    style_data["vertical"].push(the_top_2);

    // horizontal
    // scaleを知ってからセッティングする必要がある.
    let the_left_1 = (px_width - client_width) / 2;
    let the_left_2 = px_width - (client_width * 2);    
    style_data["horizontal"].push(0);
    style_data["horizontal"].push(Math.floor(the_left_1));
    style_data["horizontal"].push(Math.floor(the_left_2));

    // 画像や動画のサイズに調整をかけるためにセット.
    style_data["size"].push(whole_space_height);
    return style_data;
}

// デフォルトのスタイリング（「styling____」）を反映する関数.
export const style_data_trace = (e, f) => {

    let object_classlist = e.classList;
    let v_num;
    let h_num;
    let s_num;
    let o_num;
    let class_name;

    for (let i = 0; i < object_classlist.length; i++) {
        class_name = object_classlist[i];
        if (class_name.indexOf("styling_") !== -1) {
            v_num = class_name.slice(8, 9);
            h_num = class_name.slice(10, 11);
            s_num = class_name.slice(12, 13);
            o_num = class_name.slice(14, 15);
        }
    }

    // vertical
    e.style.top = f["vertical"][v_num] + "px";
    // horizontal
    e.style.left = f["horizontal"][h_num] + "px";
    // scale
    e.style.transform = "scale(" + f["scale"][s_num] + ")";
    // 初期値はこれでいい.
    if (! e.classList.contains("fire")) {
        e.style.opacity = 0;
    }
}