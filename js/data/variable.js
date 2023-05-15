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
    "section_deletable_list": []
}

// * 上記 native_values の値を取得して返す関数.
const get = (e) => {
    return native_object[e];
}

// * native_values の値を外部から変更する際に使用する関数.
const set = (e, f) => {
    let b = get(e);
    f(b);
    native_object[e] = b;
}