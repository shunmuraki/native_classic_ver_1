// * video_animation
// * e = v_duration

// * 引数の当て方がおかしい。それだけかな。淡々と。
export const video_animation_back_data_make = (video_duration) => {
    data_num += 1;
    let video_animation = {};
    // * j が未定義
    video_animation["finish_when"] = (j * 5) + 5;
    video_animation["trigger_when"] = video_animation["finish_when"] - video_duration;
    video_animation = animation_backend_shapeup(block, video_animation, "active_st");
    // * same_startの方に付与されているactuarも反映.
    video_animation = animation_backend_shapeup(the_start_elems, video_animation, "active_st");
    video_animation["anim_name"] = get("animation_generate_list").length;
    video_animation["video_startpoint"] -= video_duration;
    return video_animation;
}

// * 基本的な animation を作成して返す関数.
export const animation_back_data_make = (e, f, g) => {
    let new_animation = {};
    new_animation["trigger_when"] = f * 5;
    // [* すでに change の使用はしないことにしているため、この条件分岐は簡素化できる.]
    if (e.classList.contains("change") && g == "start") {
        new_animation["trigger_when"] = new_animation["trigger_when"] + 1;
        new_animation["finish_when"] = new_animation["trigger_when"];
    } else {
        new_animation["finish_when"] = new_animation["trigger_when"] + 1;
    }
    new_animation["video_startpoint"] = 0;
    return new_animation;
}

// * animation_generate_data を生成して返す関数.
export const animation_front_data_make = (block, e) => {
    let final_data = new Array();
    let anim_blockhas = [];
    if (e == "start") {
        anim_blockhas = 1;
        if (block.classList.contains("change")) {
            // * finish_when = trigger_when とすることで、duration なしで要素を表示.
            final_data = [anim_blockhas, 0];
        } else {
            final_data = [anim_blockhas, 1];
        }
    } else if (e == "end") {
        final_data = [0, 1];
    } 
    return final_data;
}