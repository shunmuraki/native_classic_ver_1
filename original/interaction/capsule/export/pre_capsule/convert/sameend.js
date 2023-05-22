export const case_sameend = () => {
    if (! block.classList.contains("ending")) {
        if (block.nextElementSibling) {
            if (! block.nextElementSibling.classList.contains("same")) {
                endblock_around(block, j, data_num, i);
            } else {
                if (! the_imp_id) {
                    endblock_around(block, j, data_num, i);
                } else {
                    if (! block.nextElementSibling.classList.contains(the_imp_id)) {
                        endblock_around(block, j, data_num, i);
                    }
                }
            }
        } else {
            endblock_around(block, j, data_num, i);
        }
    }

    // ---------------------------------------------------------------------------------------------------------------
    // * video属性の場合は、それ用の video_animation を併せて作成.
    
    if (block.classList.contains("video")) {
        data_num += 1;
        let video_animation = {};
        // * 同じ same_num_を持つ　same_start を取得し、
        // * ペアのブロックの位置関係を比較することで、 この video の duration(v_duration) を算出している.
        // * video_duration は animation における 「duration」 に該当.
        let the_start_elems = document.getElementsByClassName(the_same_name)[0];
        let v_start_when = Math.floor(Number(target_data(the_start_elems, "this_video_st_")));
        let v_end_when = Math.floor(Number(target_data(block, "this_video_st_"))) + 5;
        let v_duration = Number(v_end_when - v_start_when);
    
        video_animation["finish_when"] = (j * 5) + 5;
        video_animation["trigger_when"] = video_animation["finish_when"] - v_duration;
        video_animation = ac_vi_adaptation(block, video_animation, "active_st");

        // * same_startの方に付与されているactuarも反映.
        video_animation = ac_vi_adaptation(the_start_elems, video_animation, "active_st");
        video_animation["anim_name"] = get("animation_generate_list").length;
        video_animation["video_startpoint"] -= v_duration;
        set("animation_generate_list", s => s.push([]));
        set("animation_data", s => s["section_" + i]["about_anims"]["data_" + data_num] = video_animation);
        block.classList.add("anim_num_" + video_animation["anim_name"]);
        
        // * iframe自身 の YouTubeの 動画id を取得し、リストに加える.
        // * またそのリストの長さを測り、その数字を yt_N というidに持ったdiv要素に置換.
        iframe_adaptation(block);

    } else if (block.lastElementChild.tagName == "TEXTAREA") {
        textarea_adaptation(block);
    }
    block.classList.add(the_classname);            
    object_setter(block, the_big_section);
}