// * デフォルトレイヤーで "/connect" が押された際に実行されるキータッチ関数.

// * 現在のラインを上のラインに結合する.
export const keytouch_connect = () => {

    let env = keytouch_setup();
    // * 先にms調整箇所を戻しておいてそれから複製させる. 
    let target = env.block;
    if (env.block.classList.contains("same")) {
        target = get_correspond_same_concealer(env.block);
    } 
    
    ms_mode_inactivate(target, "off");
    same_concealer_trace_essential(element(".centered_block")); 
    blur_checker(element(".centered_block"));

    // * 移動先の wrapper_index
    let previous_wrapper_index = env.wrapper_index.previousElementSibling;

    // * 移動先にブロックたちを移動するために配列にブロックを格納.
    if (previous_wrapper_index) {

        // * 移動先のブロック数を満たす.
        complete_list_wrapper(previous_wrapper_index);
    
        // * あとは複製をしてライン同士を同期.
        let will_add_list_wrapper = list_wrapper_with_enough_block(get_block_num(previous_wrapper_index));
        let children_block = will_add_list_wrapper.lastElementChild.children;
        let the_this_loop_endpoint = the_triumph_tops - the_centering_num + env.current_horizontal.childElementCount - 1;
        
        // * 適切な箇所から適切な箇所まで、ブロックの中身やクラスを移す.
        trace_block_to_empties(env.list_wrapper, will_add_list_wrapper, 0, the_triumph_tops, get_block_num(env.wrapper_index));
    
        // * ここで複製したラインを実際に sp_cover へ挿入.
        previous_wrapper_index.appendChild(will_add_list_wrapper);
        // * sp_cover 内のスタイリングのために追加.
        previous_wrapper_index.classList.add("connected");

        // * sp_num 関係の跡地
        let the_default_leng = env.block_list.scrollLeft;
        
        // * 最後に移動元の sp_cover を削除.
        env.wrapper_index.remove();
        
        // * センタリングを本来の場所へ戻す.
        let centered_block = element(".centered_block");
        let latest_block_list = get_block_list(centered_block);
        
        // * もっと綺麗に取得できるようにしてよーーーーーーーーーーーーーーーーーーーー.
        // * 変数名もなんか意味なさげだしwwwwwwwwーーーーーーーーーーーーーーーーーーーー.
        let the_center_num = [].slice.call(latest_block_list.children).indexOf(centered_block) + 1;
        let the_center_num_b = [].slice.call(env.block_list.children).indexOf(env.block) + 1;
        
        let the_b_a_gap = the_center_num - the_center_num_b;
        let the_redefault_scroll = the_b_a_gap * blocksize;

        // * scrollLeft の調整. これって all_view_changer じゃダメなんすか？？
        all_view_changer(previous_wrapper_index, the_redefault_scroll);
        let final_block = previous_wrapper_index.lastElementChild.lastElementChild.children[the_center_num - 1];
        
        // * connect の場合は この sp の special_cov だけ削除しているので、それを再起させるだけでいい.
        same_concealer_management(final_block);
        
        // * フォーカスを当てる.
        let if_textarea = focus_checker(final_block);
        if (if_textarea) {
            setTimeout(() => {
                final_block.lastElementChild.value = final_block.lastElementChild.value.slice(0, -1);
            }, 10)
        }

        default_display.classList.remove("ms");
    }
}