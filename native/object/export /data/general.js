export const video_animation_datasetup_from_end_block = (data_num) => {
    // [ *trigger_when finish_when が違うだけでしょ？]
    // * 同じ same_num_を持つ　same_start を取得し、
    // * ペアのブロックの位置関係を比較することで、 この video の duration(v_duration) を算出している.
    // * video_duration は animation における 「duration」 に該当.
    let the_start_elems = document.getElementsByClassName(the_same_name)[0];
    let v_start_when = Math.floor(Number(target_data(the_start_elems, "this_video_st_")));
    let v_end_when = Math.floor(Number(target_data(block, "this_video_st_"))) + 5;
    let video_duration = Number(v_end_when - v_start_when);
    let video_animation = video_animation_backend_make(video_duration);
    // * video_animation を別の関数に引き渡す必要がある？それとも return したらいい？
    set("animation_data", s => s["section_" + i]["about_anims"]["data_" + data_num] = video_animation);
}

export const video_animation_datasetup_from_individual = (data_num) => {
    let video_animation = video_animation_backend_make(5);
    set("animation_generate_list", s => s.push([]));
    set("animation_data", s => s["section_" + i]["about_anims"]["data_" + data_num] = video_animation);
}

// ---------------------------------------------------------------------------------------------------------------

// * start_animationを構成して格納する関数.
export const animation_datasetup_from_start_block = (e, f, g, h, w) => {
    // * まず start_animation の土台を作成.
    let back_data = animation_back_data_make(e, f, "start");
    // * 次に animation_generate_data を作成して取得.
    let front_data = animation_front_data_make(e, "start");
    let same_classname = "same_num_" + value(e, "same_num_");
    // * ペアの same_end を取得して target とする. 
    // [* 例えば w をこちらで取得して、本関数の引数を減らすことはできないだろうか.]
    let target;
    if (w == "video") {
        target = document.getElementsByClassName(same_classname)[document.getElementsByClassName(same_classname).length - 1];
    } else {
        target = e;
    }
    // * 標的が判ったら、あとは Linear にて animation_generate_data を実稼働させる指揮官としての animation を生成.
    let final_data = animation_front_back_push(target, back_data, front_data, "none_st");
    // * 最後に、いくつかの animation が束ねられた final_animation_start をループ処理し、
    // * data_N でそれぞれの animation に区別をつけながら大元の animation_data にそれらを適切な箇所に追加.
    for (let k = 0; k < final_data.length; k++) {
        g += 1;
        set("animation_data", s => s["section_" + h]["about_anims"]["data_" + g] = final_data[k]);
    }
}

// * end_animation を構成して格納する関数.
export const animation_datasetup_from_end_block = (e, f, g, h) => {
    // * まず end_animation の土台を作成.
    let back_data = animation_back_end_make(e, f + 1, "end");
    // * 次に animation_generate_data を作成して取得.
    let front_data = animation_frontend_make(e, "end");
    // * Linear にて animation_generate_data を実稼働させる指揮官としての animation を生成.
    let final_data = animation_front_back_push(e, back_data, front_data, "non_st");
    // * 最後に、いくつかの animation が束ねられた final_animation_start をループ処理し、
    // * data_N でそれぞれの animation に区別をつけながら大元の animation_data にそれらを適切な箇所に追加.
    for (let k = 0; k < final_data.length; k++) {
        g += 1;
        set("animation_data", s => s["section_" + h]["about_anims"]["data_" + g] = final_data[k]);
    } 
}

// ---------------------------------------------------------------------------------------------------------------

// * リニアスペース上に存在する same クラスを持たないブロックについて、
// * start_animation と end_animation を作成する関数.
export const animation_datasetup_from_individual_block = (e, f, g, h, m) => {
    if (! e.classList.contains("opening")) {
        let previous_block = e.previousElementSibling;
        if (previous_block) {
            if (! previous_block.classList.contains("same")) {
                animation_datasetup_from_start_block(e, g, h, m, "not");
            } else {
                if (! f) {
                    animation_datasetup_from_start_block(e, g, h, m, "not");
                } else {
                    if (! previous_block.classList.contains(f)) {
                        animation_datasetup_from_start_block(e, g, h, m, "not");
                    }
                }
            }
        } else {
            animation_datasetup_from_start_block(e, g, h, m, "not");
        }
    }
    if (! e.classList.contains("ending")) {
        let next_block = e.nextElementSibling;
        if (next_block) {
            if (! next_block.classList.contains("same")) {
                animation_datasetup_from_end_block(e, g, h, m);
            } else {
                if (! f) {
                    animation_datasetup_from_end_block(e, g, h, m);
                } else {
                    if (! next_block.classList.contains(f)) {
                        animation_datasetup_from_end_block(e, g, h, m);
                    }
                }
            }
        } else {
            animation_datasetup_from_end_block(e, g, h, m);
        }
    }
}