import { get_the_block_index_num } from "./tool";

export const complete_list_wrapper = () => {            
    let block_less_num = get_less_block_num();
    let less_of_head = block_less_num[0];
    let less_of_tale = block_less_num[1];

    for (let i = 0; i < previous_wrapper_index.children.length; i++) {
        if (i >= 0) {
            for (let o = 0; o < the_top_less; o++) {
                const first_block = previous_wrapper_index.children[i].lastElementChild.children[1];
                // * 先頭より小さかったら
                make_ver_fragment(first_block, "before");
            }
            for (let o = 0; o < the_bottom_less; o++) {
                let last_block = previous_wrapper_index.children[i].lastElementChild.lastElementChild;
                // * お尻より大きかったら実行.
                make_ver_fragment(last_block, "after");
            }
        }
    }
}

export const get_less_block_num = () => {

    // * 多分 centering_num と original_centering_num が同じ場所に来るから、
    // * それで位置の調整が図れると考えた.
    
    // * 移動を終えた上でスクロール位置が調整できるように centering の番号を控えておく.
    // * num _ 222222
    let the_centering_num = get_the_block_index_num(env.block_liist, ".centered_block");
    
    // * original_centering を結合地点として全体のブロック数を算出するために 何番目 かを控える.
    let the_current_tops = the_centering_num;
    let the_current_bottoms = env.block_list.childElementCount - the_centering_num;
    
    let inc_last_children = previous_wrapper_index.lastElementChild.lastElementChild;
    // * num _ 222222
    let original_centering_num = get_the_block_index_num(inc_last_children, ".centered_block");
    
    let the_original_tops = original_centering_num;
    let the_original_bottoms = previous_wrapper_index.lastElementChild.lastElementChild.childElementCount - original_centering_num;
    
    // * ブロック数の最大値を算出するための一連の計算処理.
    // [* ここもっと、圧倒的に短くできるはず。できないなら一連の処理をオブジェクトにして外部化するべき.]
    let the_triumph_tops = 0;
    let the_triumph_bottoms = 0;
    
    if (the_current_tops > the_original_tops) {
        the_triumph_tops = the_current_tops;
    } else {
        the_triumph_tops = the_original_tops;
    }
    
    if (the_current_bottoms > the_original_bottoms) {
        the_triumph_bottoms = the_current_bottoms;
    } else {
        the_triumph_bottoms = the_original_bottoms;
    }
    
    //* 先頭の足りないブロックの数
    let the_top_less = the_triumph_tops - the_original_tops;
    // * 後ろ側の足りないブロックの数
    let the_bottom_less = the_triumph_bottoms - the_original_bottoms;

    return [the_top_less, the_bottom_less];
}