// ---------------------------------------------------------------------------------------------------------------

// * Native においてブロックを判別する際に扱う記号的な役割のクラス名の集合.
let the_classname_list = ['stable', 'stable_end', 'same_start', 'same_end', 'same_num_', 'same', 'actuar_time_', 'actuar_st', 'actuar_en', 'this_video_st', 'this_video_en', "video", "img", "id_is_"];

// ---------------------------------------------------------------------------------------------------------------

let linesize = 24;
let block_width = 360;
let block_duration = 5;

// ---------------------------------------------------------------------------------------------------------------

let edit_block_list_length = block_width * edit_block_list_size;
let edit_list_wrapper_length = edit_block_list_length + window.innerWidth;

// ---------------------------------------------------------------------------------------------------------------

let window_height = window.innerHeight;
let window_left_width = (window.innerWidth - block_width) / 2;
let window_right_width = half_left_width + block_width;

let list_wrapper_scrollwidth_at_start = window.innerWidth - window_left_width;
let list_wrapper_scrollwidth_at_end = edit_list_wrapper_length - window_right_width + blocksize;

let window_middle_height = window_height * 0.5;
let window_medium_height = window_height * 0.3;

// ---------------------------------------------------------------------------------------------------------------

// * 上記 native_values の値を取得して返す関数.
export const get = (e) => {
    return native_variables[e];
}

// * native_values の値を外部から変更する際に使用する関数.
export const set = (e, f) => {
    let b = get(e);
    f(b);
    native_variables[e] = b;
}

// ---------------------------------------------------------------------------------------------------------------

// * Native で使用しているグローバル変数たち.
let native_variables = {
    // * Nativeの状態を管理するもの.
    "native_mode": [],
    "magic_elements": [],
    "ms_target": 0,
    "ms_position": 0,
    "playerlist": {},
    "yt_loop_list": [],
    "same_concealer_playerlist": {},
    "same_num_counter": 100,
    "same_concealer_same_num_counter": 100,
    "same_concealer_content": null,
    "orange_data": {},
    "timeoutArray": [],
    "intervalArray": [],
    "autoseeked_distance": 0,
    "current_states": [null, null, []],
    "previous_states": [null, null, []],
    "output_html": "",
    "output_js": "",
    "the_img_blob_list": {},
    "output_images": [],
    "animation_backend_list": {},
    "animation_frontend_list": {},
    "yt_id_list": [],
    "section_deletable_list": [],
    "the_classname_list": the_classname_list,
    "block_width": block_width,
    "edit_wrapper_index_size": edit_wrapper_index_size,
    "block_duration": block_duration,
    "window_left_width": window_left_width,
    "window_right_width": window_right_width,
    "list_wrapper_scroll_width_at_start": list_wrapper_scrollwidth_at_start,
    "list_wrapper_scroll_width_at_end": list_wrapper_scrollwidth_at_end,
    "width_height": width_height,
    "window_middle_height": window_middle_height,
    "window_medium_height": window_medium_height,
}