export const video_animation_datasetup_from_end_block = () => {
    // [ *trigger_when finish_when が違うだけでしょ？]
    // * 同じ same_num_を持つ　same_start を取得し、
    // * ペアのブロックの位置関係を比較することで、 この video の duration(v_duration) を算出している.
    // * video_duration は animation における 「duration」 に該当.
    let the_start_elems = document.getElementsByClassName(the_same_name)[0];
    let v_start_when = Math.floor(Number(target_data(the_start_elems, "this_video_st_")));
    let v_end_when = Math.floor(Number(target_data(block, "this_video_st_"))) + 5;
    let v_duration = Number(v_end_when - v_start_when);
    let video_animation = video_animation_backend_make(v_duration);
}

export const video_animation_datasetup_from_individual = () => {
    let video_animation = video_animation_backend_make(5);
    set("animation_generate_list", s => s.push([]));
    set("animation_data", s => s["section_" + i]["about_anims"]["data_" + data_num] = video_animation);
}

// ---------------------------------------------------------------------------------------------------------------

// * start_animationを構成して格納する関数.
export const animation_datasetup_from_start_block = (e, f, g, h, w) => {
    // * まず start_animation の土台を作成.
    let start_animation = animation_backend_make(e, f, "start");
    // * 次に animation_generate_data を作成して取得.
    let generative_data_start = animation_frontend_make(e, "start");
    let the_same_name = "same_num_" + target_data(e, "same_num_");                         
    // * ペアの same_end を取得して target とする. 
    // [* 例えば w をこちらで取得して、本関数の引数を減らすことはできないだろうか.]
    let target;
    if (w == "video") {
        target = document.getElementsByClassName(the_same_name)[document.getElementsByClassName(the_same_name).length - 1];
    } else {
        target = e;
    }
    // * 標的が判ったら、あとは Linear にて animation_generate_data を実稼働させる指揮官としての animation を生成.
    let final_animation_start = animation_frontend_backend_push(target, start_animation, generative_data_start, "none_st");
    // * 最後に、いくつかの animation が束ねられた final_animation_start をループ処理し、
    // * data_N でそれぞれの animation に区別をつけながら大元の animation_data にそれらを適切な箇所に追加.
    for (let k = 0; k < final_animation_start.length; k++) {
        g += 1;
        set("animation_data", s => s["section_" + h]["about_anims"]["data_" + g] = final_animation_start[k]);
    }
}

// * end_animation を構成して格納する関数.
export const animation_datasetup_from_end_block = (e, f, g, h) => {
    // * まず end_animation の土台を作成.
    let end_animation = animation_backend_make(e, f + 1, "end");
    // * 次に animation_generate_data を作成して取得.
    let generative_data_end = animation_frontend_make(e, "end");
    // * Linear にて animation_generate_data を実稼働させる指揮官としての animation を生成.
    let final_animation_end = animation_frontend_backend_push(e, end_animation, generative_data_end, "non_st");
    // * 最後に、いくつかの animation が束ねられた final_animation_start をループ処理し、
    // * data_N でそれぞれの animation に区別をつけながら大元の animation_data にそれらを適切な箇所に追加.
    for (let k = 0; k < final_animation_end.length; k++) {
        g += 1;
        set("animation_data", s => s["section_" + h]["about_anims"]["data_" + g] = final_animation_end[k]);
    } 
}

// ---------------------------------------------------------------------------------------------------------------

// * リニアスペース上に存在する same クラスを持たないブロックについて、
// * start_animation と end_animation を作成する関数.
export const animation_datasetup_from_individual_block = (e, f, g, h, m) => {
    if (! e.classList.contains("opening")) {
        if (e.previousElementSibling) {
            if (! e.previousElementSibling.classList.contains("same")) {
                animation_datasetup_from_start_block(e, g, h, m, "not");
            } else {
                if (! f) {
                    animation_datasetup_from_start_block(e, g, h, m, "not");
                } else {
                    if (! e.previousElementSibling.classList.contains(f)) {
                        animation_datasetup_from_start_block(e, g, h, m, "not");
                    }
                }
            }
        } else {
            animation_datasetup_from_start_block(e, g, h, m, "not");
        }
    }
    if (! e.classList.contains("ending")) {
        if (e.nextElementSibling) {
            if (! e.nextElementSibling.classList.contains("same")) {
                animation_datasetup_from_end_block(e, g, h, m);
            } else {
                if (! f) {
                    animation_datasetup_from_end_block(e, g, h, m);
                } else {
                    if (! e.nextElementSibling.classList.contains(f)) {
                        animation_datasetup_from_end_block(e, g, h, m);
                    }
                }
            }
        } else {
            animation_datasetup_from_end_block(e, g, h, m);
        }
    }
}