// preventer
export function on_preventer(){
    console.log("ON PREVENTER !!!!!");
    document.querySelector("body").style.overflow = "hidden";
    document.querySelector("html").style.overflow = "hidden";
}
export function off_preventer() {
    console.log("OFF PREVENTER !!!!!");
    document.querySelector("body").style.overflow = "visible";
    document.querySelector("html").style.overflow = "visible";
}

// transition animation.
export function transition_animation_start(e) {
    e.style.transform = "scale(1.02)";
}

export function transition_animation_end(e) {
    e.style.transform = "scale(1)";
}

export function all_player(e, f) {
    for (var i = 0; i < e.length; i++) {
        let content = e[i].lastElementChild;
        if (content.tagName == "IFRAME") {
            let object_content = f[target_data(the_object, "yt_num_")];
            object_content.playVideo();
         } 
    }
}

export function all_pauser(e, f) {
    for (var i = 0; i < e.length; i++) {
        let content = e[i].lastElementChild;
        if (content.tagName == "IFRAME") {
            let object_content = f[target_data(the_object, "yt_num_")];
            object_content.pauseVideo();
        } 
    }
}

// * Date モジュールから now_current_time（min） を返す関数
export function date_getter() {
    let d = new Date();
    let minute = d.getMinutes();
    let second = d.getSeconds() * 60;
    let millisecond = d.getMilliseconds() / 1000;
    let the_occur_t = minute + second + millisecond;
    return the_occur_t;
}

let timer = null;
export const suppression = (callback, interval) => {
  if (timer) clearTimeout(timer);
  timer = window.setTimeout(callback, interval);
}


// ** スタイル計算用の関数.
export const pragm_stylies = (e) => {

    let style_data = {scale: [0.5, 1, 2], opacity: [0, 1, 1]};

    let object_classlist = e.classList;

    let px_width = window.innerWidth;
    let px_height = window.innerHeight;
    let whole_num;
    let this_num;

    let client_width = object.clientWidth;
    let client_height = object.clientHeight;

    for (let j = 0; j < object_classlist.length; j++) {
        let class_name = object_classlist[j]; 
        if (class_name.indexOf("outerstyle_") !== -1) {
            whole_num = class_name.slice(11, 1);
            console.log(whole_num);
            this_num = class_name.slice(13, 1);   
        } 
    }

    let whole_space_height = px_height / whole_num;
    let top_pos = whole_space_height * this_num;
    
    // vertical
    let the_top_1 = ((whole_space_height - client_height) / 2) + top_pos;
    let the_top_2 = whole_space_height - client_height + top_pos;
    style_data["vertical"].push(0);
    style_data["vertical"].push(the_top_1);
    style_data["vertical"].push(the_top_2);

    // horizontal
    let the_left_1 = (px_width - client_width) / 2;
    let the_left_2 = px_width - client_width;
    style_data["vertical"].push(0);
    style_data["vertical"].push(the_left_1);
    style_data["vertical"].push(the_left_2);

    return style_data;
}

export const style_data_trace = (e, f) => {
    // e に <object>
    // f に style_data を.
    let object_classlist = e.classList;

    for (let i = 0; i < object_classlist.length; i++) {
        if (class_name.indexOf("styling_") !== -1) {
            h_num = class_name.slice(8, 1);
            v_num = class_name.slice(10, 1);
            s_num = class_name.slice(12, 1);
            o_num = class_name.slice(14, 1);
        }
    }
    
    // vertical
    e.style.top = f["vertical"][h_num];

    // horizontal
    e.style.left = f["horizontal"][v_num];

    // scale
    e.style.transform = "scale(" + f["scale"][s_num] + ")";

    // opacity
    e.style.opacity = f["opacity"][o_num];
}