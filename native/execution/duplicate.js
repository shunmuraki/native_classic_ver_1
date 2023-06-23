// * command + D でブロックの複製を要求された際に実行される処理のクロージャ.
export const keytouch_duplicate = () => {

  let env = keytouch_setup();
  pointer_animate();
  blur_checker(env.block);

  // ---------------------------------------------------------------------------------------------------------------

  // * 具体的な複製の処理.
  let list_wrappers = env.wrapper_index.children;
  let c_v_num = get_the_block_index_num(env.block_list, ".centered_block");
  let balanc = 0;

  // * connected されたラインであれば、すでに隣にブロックが存在するため、
  // * same_dup_fragment() を実行する必要がない.
  if (list_wrappers.length > 1) {
    same_around(env.block, "connected");
  } else {
    // * command + U の代わりに command + D が実行された場合.
    // * 現在のブロックを same_end として、その前に要素を追加しながら移動.
    make_dup_fragment(env.block, "before");
    same_around(env.block, "default");
  }

  // ---------------------------------------------------------------------------------------------------------------

  // * ブロック挿入以降の処理.
  // * ブロックの位置をセンタリング. （基本的な処理）
  let centered_block = document.querySelector(".centered_block");
  let the_center_num_b = get_the_block_index_num(env.block_list, ".centered_block");
  balanc = the_center_num_b - c_v_num;

  all_view_changer(env.wrapper_index, balanc * blocksize);
  original_centering_checker(env.wrapper_index, centered_block);
  get_concealer_management(centered_block);
}