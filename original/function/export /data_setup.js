// * リニアスペース上に存在する same クラスを持たないブロックについて、
// * start_animation と end_animation を作成する関数.
export const for_ind = (e, f, g, h, m) => {
    if (! e.classList.contains("opening")) {
        if (e.previousElementSibling) {
            if (! e.previousElementSibling.classList.contains("same")) {
                startblock_around(e, g, h, m, "not");
            } else {
                if (! f) {
                    startblock_around(e, g, h, m, "not");
                } else {
                    if (! e.previousElementSibling.classList.contains(f)) {
                        startblock_around(e, g, h, m, "not");
                    }
                }
            }
        } else {
            startblock_around(e, g, h, m, "not");
        }
    }
    if (! e.classList.contains("ending")) {
        if (e.nextElementSibling) {
            if (! e.nextElementSibling.classList.contains("same")) {
                endblock_around(e, g, h, m);
            } else {
                if (! f) {
                    endblock_around(e, g, h, m);
                } else {
                    if (! e.nextElementSibling.classList.contains(f)) {
                        endblock_around(e, g, h, m);
                    }
                }
            }
        } else {
            endblock_around(e, g, h, m);
        }
    }
}

// ---------------------------------------------------------------------------------------------------------------

// * start_animationを構成して格納する関数.
export const startblock_around = (e, f, g, h, w) => {
    // * まず start_animation の土台を作成.
    let start_animation = base_setup(e, f, "start");
    // * 次に animation_generate_data を作成して取得.
    let generative_data_start = generationdata_setup(e, "start");
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
    let final_animation_start = animationdata_setup(target, start_animation, generative_data_start, "none_st");
    // * 最後に、いくつかの animation が束ねられた final_animation_start をループ処理し、
    // * data_N でそれぞれの animation に区別をつけながら大元の animation_data にそれらを適切な箇所に追加.
    for (let k = 0; k < final_animation_start.length; k++) {
        g += 1;
        set("animation_data", s => s["section_" + h]["about_anims"]["data_" + g] = final_animation_start[k]);
    }
}

// * end_animation を構成して格納する関数.
export const endblock_around = (e, f, g, h) => {
    // * まず end_animation の土台を作成.
    let end_animation = base_setup(e, f + 1, "end");
    // * 次に animation_generate_data を作成して取得.
    let generative_data_end = generationdata_setup(e, "end");
    // * Linear にて animation_generate_data を実稼働させる指揮官としての animation を生成.
    let final_animation_end = animationdata_setup(e, end_animation, generative_data_end, "non_st");
    // * 最後に、いくつかの animation が束ねられた final_animation_start をループ処理し、
    // * data_N でそれぞれの animation に区別をつけながら大元の animation_data にそれらを適切な箇所に追加.
    for (let k = 0; k < final_animation_end.length; k++) {
        g += 1;
        set("animation_data", s => s["section_" + h]["about_anims"]["data_" + g] = final_animation_end[k]);
    } 
}
