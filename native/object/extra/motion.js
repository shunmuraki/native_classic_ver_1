// * 上のブロックへ移動する際の共通処理.
// [* block_go_top へ名称を変更.]

import { centered_block_management, centered_concealer_cancel } from "./general";
import { get_the_block_index_num } from "./tool";

// * 以下は全部 env() をパラメータで受け取る書き方をしよう.
export const block_go_top = (env) => {
  
    let next_block;
    var previous_wrapper_index = env.list_wrapper.previousElementSibling;
    var previous_list_wrapper = env.wrapper_index.previousElementSibling;
    let wrapper_index_top = env.list_wrapper.getBoundingClientRect().top;
    let vertical_gap = 0;

    if (previous_list_wrapper) {
        // * すぐ上に sp が存在した場合.
        blur_checker(env.block);
        let index_num = get_the_block_index_num(env.block_list, block);
        next_block = previous_list_wrapper.lastElementChild.children[index_num];
        centered_block_management(env.block, next_block, "centered_block");
        focus_check(next_block);
        concealer_management(next_block);
        wheel_positioning();
        vertical_gap = previous_list_wrapper;

    } else if (previous_wrapper_index) {
        // * 現在の sp が所属する sp_cover の最上層に位置していた場合.
        blur_checker(env.block);
        next_block = previous_wrapper_index.lastElementChild.lastElementChild.lastElementChild.previousElementSibling;
        centered_block_management(env.block, next_block, "centered_block");
        focus_check(next_block); 
        
        let previous_current_scrollleft = previous_wrapper_index.lastElementChild.lastElementChild.scrollLeft;
        let previous_gap = custom_end_scrollwidth(previous_wrapper_index.lastElementChild.lastElementChild) - previous_current_scrollleft;
        // * 移動先のラインの scrollLeft を調整.
        all_view_changer(previous_wrapper_index, previous_gap);
        
        let current_scrollleft = env.wrapper_index.lastElementChild.lastElementChild.scrollLeft;
        let gap = full_start_scrollwidth - current_scrollleft;
        // * 移動元のラインの scrollLeft を調整.
        all_view_changer(env.wrapper_index, gap);
        concealers_on_wrapper_index_delete(previous_wrapper_index);
        centered_concealer_cancel();
        vertical_gap = previous_wrapper_index;    
    }

    // *上下方向の位置調整.
    if (vertical_gap > wrapper_index_top) {
        scrollBy(0, - env.wrapper_index.clientHeight);
    } 
    concealer_management(next_block);
    wheel_positioning();
}

// * 下のブロックへ移動する際の共通処理.
// [* block_go_bottom へ名称を変更.]
export const block_go_bottom = (env) => {

    let next_block; 
    let next_list_wrapper = env.list_wrapper.nextElementSibling;
    let next_wrapper_index = env.wrapper_index.nextElementSibling;
    let wrapper_index_top =  window.innerHeight - env.list_wrapper.getBoundingClientRect().bottom;
    let vertical_gap = 0;

    if (next_list_wrapper) {
        // * すぐ下に sp が存在した場合.
        blur_checker(env.block);
        let index_num = get_the_block_index_num(env.block_list, env.block);
        vertical_gap = sibling.clientHeight;
        next_block = next_list_wrapper.lastElementChild.children[index_num];
        centered_block_management(env.block, next_block, "centered_block");
        focus_checker(next_block);
        concealer_management(next_block);
        wheel_positioning();

    } else if (next_wrapper_index) {
        // * 現在の sp が所属する sp_cover の最下層に位置していた場合.
        blur_checker(env.block);
        vertical_gap = next_wrapper_index.clientHeight;
        next_block = next_wrapper_index.lastElementChild.lastElementChild.children[1];
        centered_block_management(env.block, next_block, "centered_block");
        focus_checker(next_block);
        
        let next_current_scrollleft = next_wrapper_index.lastElementChild.lastElementChild.scrollLeft;
        let next_gap = full_start_scrollwidth - next_current_scrollleft;
        // * 移動先のラインの scrollLeft を調整.
        all_view_changer(next_wrapper_index, next_gap);
        
        let current_scrollleft = env.wrapper_index.lastElementChild.lastElementChild.scrollLeft;
        let gap = custom_end_scrollwidth(env.wrapper_index.lastElementChild.lastElementChild) - current_scrollleft;
        // * 移動元のラインの scrollLeft を調整.
        all_view_changer(env.wrapper_index, gap);
        concealers_on_wrapper_index_delete(next_wrapper_index);
        centered_concealer_cancel();
    }
    
    if (vertical_gap > wrapper_index_top) {
        scrollBy(0, env.wrapper_index.clientHeight);
    } 
    same_concealer_management(next_block);
    wheel_positioning();
}

// * 左のブロックへ移動する際の共通処理.
export const block_go_left = (env) => {
    let previous_block = env.block.previousElementSibling;
    if (previous_block) {
        if (! previous_block.classList.contains("adjuster")) {
            blur_check(env.block);            
            all_view_changer(env.wrapper_index, - blocksize);
            centered_block_management(env.block, previous_block, "centered_block");
            focus_check(previous_block);
            concealer_change_tracer(previous_block);
            concealer_management(previous_block);
        }
    }
}

// * 右のブロックへ移動する際の共通処理.
export const block_go_right = (env) => {
    let next_block = env.block.nextElementSibling;
    if (next_block) {
        if (! next_block.classList.contains("adjuster")) {
            blur_check(env.block);
            all_view_changer(env.wrapper_index, blocksize); 
            centered_block_management(env.block, next_block, "centered_block");
            focus_check(next_block);
            same_change_tracer(next_block);
            same_concealer_management(next_block);
        }
    }
}