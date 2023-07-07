// * デフォルトレイヤーで "/connect" が押された際に実行されるキータッチ関数.
// * 現在のラインを上のラインに結合する.
export const keytouch_connect = () => {

    let env = keytouch_setup();
    // * 先にms調整箇所を戻しておいてそれから複製させる. 
    let target = get_target(env.block);

    ms_mode_inactivate(target, "off");
    same_concealer_trace_essential(element(".centered_block")); 
    blur_check(element(".centered_block"));

    // * 移動先の wrapper_index
    let previous_wrapper_index = env.wrapper_index.previousElementSibling;
    // * 移動先にブロックたちを移動するために配列にブロックを格納.
    if (previous_wrapper_index) {
        // * 移動先のブロック数を満たす.
        complete_list_wrapper(previous_wrapper_index);
        // * あとは複製をしてライン同士を同期.
        let new_list_wrapper = list_wrapper_with_enough_block(get_block_num(previous_wrapper_index));
        
        // * このあたり正してください。 -  - - - - -
        let children_block = new__list_wrapper.lastElementChild.children;
        let the_this_loop_endpoint = the_triumph_tops - the_centering_num + env.current_horizontal.childElementCount - 1;
        
        // * このあたり正してください。 -  - - - - -
        // * 適切な箇所から適切な箇所まで、ブロックの中身やクラスを移す.
        trace_block_to_empties(env.list_wrapper, new_list_wrapper, 0, the_triumph_tops, get_block_num(env.wrapper_index));
        // * ここで複製したラインを実際に sp_cover へ挿入.
        previous_wrapper_index.appendChild(new__list_wrapper);
        // * sp_cover 内のスタイリングのために追加.
        previous_wrapper_index.classList.add("connected");
        // * 最後に移動元の sp_cover を削除.
        env.wrapper_index.remove();
        
        // * センタリングを本来の場所へ戻す.
        let centered_block = element(".centered_block");
        let latest_block_list = get_block_list(centered_block);
        // * もっと綺麗に取得できるようにしてよーーーーーーーーーーーーーーーーーーーー.
        // * 変数名もなんか意味なさげだしwwwwwwwwーーーーーーーーーーーーーーーーーーーー.
        let default_scrollleft_num = get_block_index_num(env.block_list, env.block);
        let final_scrollleft_num = get_block_index_num(lates_block_list, centered_block);
        let gap_num = final_centered_block - default_scrollleft_num;
        let gap = gap_num * blocksize;
        // * scrollLeft の調整. これって all_view_changer じゃダメなんすか？？
        all_view_changer(previous_wrapper_index, gap);
        let final_centered_block = previous_wrapper_index.lastElementChild.lastElementChild.children[the_center_num - 1];
        // * connect の場合は この sp の special_cov だけ削除しているので、それを再起させるだけでいい.
        concealer_management(final_centered_block);
        // * フォーカスを当てる.
        let if_textarea = focus_check(final_block);
        if (if_textarea) {
            setTimeout(() => {
                final_centered_block.lastElementChild.value = final_centered_block.lastElementChild.value.slice(0, -1);
            }, 10)
        }

        element(".default_display").classList.remove("ms");
    }
}