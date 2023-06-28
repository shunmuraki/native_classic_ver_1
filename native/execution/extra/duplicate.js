// * command + D でブロックの複製を要求された際に実行される処理のクロージャ.
export const keytouch_duplicate = () => {

  let env = keytouch_setup();
  pointer_animate();
  blur_check(env.block);

  // ---------------------------------------------------------------------------------------------------------------

  // * 具体的な複製の処理.
  let list_wrappers = env.wrapper_index.children;
  // * connected されたラインであれば、すでに隣にブロックが存在するため、
  // * same_dup_fragment() を実行する必要がない.
  if (list_wrappers.length > 1) {
    duplicate_in_the_middle_of_same_group(env.block, "connected");
  } else {
    // * command + U の代わりに command + D が実行された場合.
    // * 現在のブロックを same_end として、その前に要素を追加しながら移動.
    make_dup_fragment(env.block, "before");
    duplicate_in_the_middle_of_same_group(env.block, "default");
  }

  // ---------------------------------------------------------------------------------------------------------------

  let index_num = get_the_block_index_num(env.block_list, ".centered_block");
  let gap_num = 0;
  // * ブロック挿入以降の処理.
  // * ブロックの位置をセンタリング. （基本的な処理）
  let centered_block = document.querySelector(".centered_block");
  let final_index_num = get_the_block_index_num(env.block_list, centered_block);
  gap_num = final_index_num - index_num;
  all_view_changer(env.wrapper_index, gap_num * blocksize);
  last_centered_block_management(env.wrapper_index, centered_block);
  concealer_management(centered_block);
}