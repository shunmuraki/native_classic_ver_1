// * animation_generate_list と animation を紐付けながら、後者を animations に束ねて返す関数.
export const animation_front_end_back_push = (block, back_data, front_data, h) => {
    let animations = [];
    for (let i = 0; i < front_data.length; i++) {
        // * gene_datas の中の genedata ごとに animation を複製し、
        // * N: animation_generation_list の length
        // * animation の 「anim_name」 に N を、
        // * block へ anim_num_N を classList に追加.
        let new_back_data = JSON.parse(JSON.stringify(back_data));
        let new_front_data = JSON.parse(JSON.stringify(front_data));
        let key_num = get("animation_generate_list").length;
        new_back_data["anim_name"] = key_num;
        let classname = "anim_num_" + key_num;
        block.classList.add(classname);
        let final_animation = animation_backend_shapeup(block, new_back_data, h);
        let value = new_front_data[i];
        set("animation_generate_list", s => s.push(value));
        animations.push(final_animation);
    }
    return animations;
}

// * animation について actuar を考慮して trigger_when | finish_when | video_startpoint を更新する関数.
export const animation_back_end_shapeup = (block, animation, e) => { 
    let classlist = e.classList; 
    if (block.classList.contains("same_end")) {
        // * 秒数に変換. (blocksize = 360)
        let actuar_time = 5 * (Math.floor(Number(target_data(block, "actuar_time_"))) / 360);
        // [* floor → trunc にした方が正しいか.]
        actuar_time = Math.floor(actuar_time);
        for (let i = 0; i < classlist.length; i++) {
            let classname = classlist[i];
            // * actuar を video_startpoint に反映.
            if (classname.indexOf("this_video_st_") != -1) {
                if (e == "active_st") {
                    animation["video_startpoint"] = Math.floor(Number(value(block, "this_video_st_")));
                }
            }
            // * acutuar を finish_when に反映.
            if (classname.indexOf("actuar_time_") != -1) {
                animation["finish_when"] = animation["finish_when"] - actuar_time + 5; 
            } 
        }
    }
    if (block.classList.contains("same_start")) {
        // * 秒数に変換. (blocksize = 360)
        let actuar_time = 5 * (Math.floor(Number(value(e, "actuar_time_"))) / 360);
        // [* floor → trunc にした方が正しいか.]
        actuar_time = Math.floor(actuar_time);
        for (let i = 0; i < classlist.length; i++) {
            let classname = classlist[i];
            if (classname.indexOf("actuar_st") != -1) {
                // * actuar を trigger_when に反映.
                animation["trigger_when"] = animation["trigger_when"] + actuar_time;
                if (e == "active_st") {
                    // * actuar を video_startpoint にも反映.
                    animation["video_startpoint"] = animation["video_startpoint"] + actuar_time;
                }
            } 
        }
    }
    return animation;
}