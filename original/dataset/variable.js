// ---------------------------------------------------------------------------------------------------------------

// * Native においてブロックを判別する際に扱う記号的な役割のクラス名の集合.
// * Native の環境設定.
let the_classname_list = ['stable', 'stable_end', 'same_start', 'same_end', 'same_num_', 'same', 'actuar_time_', 'actuar_st', 'actuar_en', 'this_video_st', 'this_video_en', "video", "img", "id_is_"];

let blocksize = 360;
let linesize = 24;
let blocktime = 5;

// ---------------------------------------------------------------------------------------------------------------

// * width 関連
let default_block_length = blocksize * linesize;
let default_length = default_block_length + window.innerWidth;

// ---------------------------------------------------------------------------------------------------------------

let half_left_width = (window.innerWidth - blocksize) / 2;
let half_right_width = half_left_width + blocksize;
let full_start_scrollwidth = window.innerWidth - half_left_width;
let full_end_scrollwidth = default_length - half_right_width + blocksize;
let window_height = window.innerHeight;
let the_middline = window_height * 0.5;
let the_sunsetline = window_height * 0.3;
let custom_end_scrollwidth = e.scrollWidth - window.innerWidth - half_left_width - blocksize;

// ---------------------------------------------------------------------------------------------------------------

// * 上記 native_values の値を取得して返す関数.
export const get = (e) => {
    return native_object[e];
}

// * native_values の値を外部から変更する際に使用する関数.
export const set = (e, f) => {
    let b = get(e);
    f(b);
    native_object[e] = b;
}

// ---------------------------------------------------------------------------------------------------------------

// * Native で使用しているグローバル変数たち.
let native_values = {
    "magic_elems": [],
    "ms_adjust_target": 0,
    "default_pos": 0,
    "players_list": {},
    "yt_loop": [],
    "special_playerlist": {},
    "s_s_num": 100,
    "same_start_content": null,
    "orange_data": {},
    "timeoutArray": [],
    "intervalArray": [],
    "the_scrolled_distance": 0,
    "current_states": [null, null, []],
    "previous_states": [null, null, []],
    "the_html": "",
    "the_js": "",
    "the_img_blob_list": {},
    "images": [],
    "animation_data": {},
    "animation_generate_list": {},
    "yt_id_list": [],
    "section_deletable_list": [],
    "the_classname_list": the_classname_list,
    "blocksize": blocksize,
    "linesize": linesize,
    "blocksize": blocksize,
    "half_left_width": half_left_width,
    "half_right_width": half_right_width,
    "full_start_scrollwidth": full_start_scrollwidth,
    "full_end_scrollwidth": full_end_scrollwidth,
    "width_height": width_height,
    "the_middleline": the_middline,
    "the_sunsetline": the_sunsetline,
    "custom_end_scrollwidth": custom_end_scrollwidth,
}