// * command + D でブロックの複製を要求された際に実行される処理のクロージャ.
export const keytouch_duplicate = () => {
  let env = keytouch_setup();
  pointer_anim();
  // * 複製されるのが画像かもしれないので条件分岐を噛ませる.
  if (env.current.tagName == "TEXTAREA") {
    env.current.blur();
  }

  // ---------------------------------------------------------------------------------------------------------------

  // * 具体的な複製の処理.
  let sps = env.current_sp_cover.children;
  let c_v_num = [].slice.call(env.current_horizontal.children).indexOf(env.current_vertical);
  let scrollleft_b = env.current_horizontal.scrollLeft;
  let balanc = 0;

  // * connected されたラインであれば、すでに隣にブロックが存在するため、
  // * same_dup_fragment() を実行する必要がない.
  if (sps.length > 1) {
    same_around(env.current_vertical, "connected");
  } else {
    // * command + U の代わりに command + D が実行された場合.
    // * 現在のブロックを same_end として、その前に要素を追加しながら移動.
    make_dup_fragment(env.current_vertical, "before");
    same_around(env.current_vertical, "default");
  }

  // ---------------------------------------------------------------------------------------------------------------

  // * ブロック挿入以降の処理.
  // * ブロックの位置をセンタリング. （基本的な処理）
  let center = document.querySelector(".centering");
  let the_center_num_b = [].slice.call(vertical_to_hor(center).children).indexOf(center);
  balanc = the_center_num_b - c_v_num;
  for (let i = 0; i < sps.length; i++) {
      sps[i].lastElementChild.scrollLeft = balanc * blocksize + scrollleft_b;
  }
  original_centering_checker(env.current_sp_cover, center);
  is_it_same_series(center);
}