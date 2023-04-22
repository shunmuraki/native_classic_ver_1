// グローバル変数たち
let magic_elms = new Array();

// ms
let default_pos;
let ms_adjust_target;

// multiable - extends(deleted already)
let players_list = {};
let yt_loop = new Array();
let same_data = 0;

// multiable - keytouch
let special_playerlist = {};
let s_n = 100;
let same_start_content = null;

// from / editable
let orange_data = {};
let timeoutArray = new Array();
let intervalArray = new Array();
let the_scrolled_distance = 0;
let orange_block_counter = 0;

// exportable / export_connect JS
let the_values = new Array();

// stylable / function
// - * - 項目選択関数を記述する
// !!!! 常に native_styles の current_zone を管理するようにしませんか !!!!!
// content: [zone, title, number]
let current_states = [null, null, []];
let previous_states = [null, null, []];

let the_html = "";
let the_js = "";
let the_img_blob_list = {};
let images = [];

let data_num = -1;
let animation_data = {};
let animation_generate_list = [];
let yt_id_list = [];
let section_deletable_list = [];


// Native 緩衝材
let values = {
    "magic_elms": magic_elms,
    "default_pos": default_pos,
    "ms_adjust_target": ms_adjust_target,
    "players_list": players_list,
    "yt_loop": yt_loop,
    "same_data": same_data,
    "special_playerlist": special_playerlist,
    "s_n": s_n,
    "same_start_content": same_start_content,
    "orange_data": orange_data,
    "timeoutArray": timeoutArray,
    "intervalArray": intervalArray,
    "the_scrolled_distance": the_scrolled_distance,
    "orange_block_counter": orange_block_counter,
    "the_values": the_values,
    "current_states": current_states,
    "previous_states": previous_states,
    "the_html": the_html,
    "the_js": the_js,
    "the_img_blob_list": the_img_blob_list,
    "the_images": the_images,
    "data_num": data_num,
    "animation_data": animation_data,
    "animation_generate_list": animation_generate_list,
    "yt_id_list": yt_id_list,
    "section_deletable_list": section_deletable_list,
}


// global.js の引き渡し関数
// e = 変数名
// f= 代入して更新する値
export const native_value = (e, f) => {
    let value = values[e];
    if (f) {
        value = f;   
    }
    return value;
}