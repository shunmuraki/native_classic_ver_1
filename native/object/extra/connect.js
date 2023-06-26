import { get_the_block_index_num } from "./tool";

export const complete_list_wrapper = (env) => {            
    let num = get_less_block_num(env.wrapper_index);
    let previous_wrapper_index = env.wrapper_index.previousElementSibling;
    let head_less_num = num[0];
    let tale_less_num = num[1];
    for (let i = 0; i < previous_wrapper_index.children.length; i++) {
        if (i >= 0) {
            for (let o = 0; o < head_less_num; o++) {
                let key_block = previous_wrapper_index.children[i].lastElementChild.children[1];
                // * 先頭より小さかったら
                make_ver_fragment(key_block, "before");
            }
            for (let o = 0; o < tale_less_num; o++) {
                let key_block = previous_wrapper_index.children[i].lastElementChild.lastElementChild;
                // * お尻より大きかったら実行.
                make_ver_fragment(key_block, "after");
            }
        }
    }
}

export const get_less_block_num = (env) => {
    // * 多分 centering_num と original_centering_num が同じ場所に来るから、
    // * それで位置の調整が図れると考えた.
    // * 移動を終えた上でスクロール位置が調整できるように centering の番号を控えておく.
    // * num _ 222222
    let index_num = get_the_block_index_num(env.block_liist, ".centered_block");
    // * original_centering を結合地点として全体のブロック数を算出するために 何番目 かを控える.
    let head_position = index_num;
    let tale_position = env.block_list.childElementCount - index_num;
    let previous_block_list = previous_wrapper_index.lastElementChild.lastElementChild;
    // * num _ 222222
    let previous_index_num = get_the_block_index_num(previous_block_list, ".last_centered_block");
    let previous_head_position = previous_index_num;
    let previous_tale_position = previous_block_list.childElementCount - previous_index_num;
    // * ブロック数の最大値を算出するための一連の計算処理.
    // [* ここもっと、圧倒的に短くできるはず。できないなら一連の処理をオブジェクトにして外部化するべき.]
    let head_larger_num = 0;
    let tale_larger_num = 0;

    if (head_position > previous_head_position) {
        head_larger_num = head_position;
    } else {
        head_larger_num = previous_head_position;
    }
    
    if (tale_position > previous_tale_position) {
        tale_larger_num = tale_position;
    } else {
        tale_larger_num = previous_tale_position;
    }
    
    //* 先頭の足りないブロックの数
    let head_less = head_larger_num - head_position;
    // * 後ろ側の足りないブロックの数
    let tale_less = tale_larger_num - tale_position;
    return [head_less, tale_less];
}