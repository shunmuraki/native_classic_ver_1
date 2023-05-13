import { keytouch_basic, original_centering_checker, pointer_anim } from "../function/general.js";
import { vertical_to_hor, is_it_same_series, vertical_to_hor } from "../function/tool.js";
import { same_around } from "../function/duplicate.js";
import { is_it_same_series } from "../function/multi.js";
import { blocksize } from "../data/constant.js";


export const keytouch_duplicate = () => {

  let env = keytouch_setup();
  
  pointer_anim();
  // 複製されるのが画像かもしれないので、command + U では必要なかったが配慮.
  if (env.current.tagName == "TEXTAREA") {
    env.current.blur();
  }
    
  // 具体的な複製の処理.
  let sps = env.current_sp_cover.children;
  let c_v_num = [].slice.call(env.current_horizontal.children).indexOf(env.current_vertical);
  let scrollleft_b = env.current_horizontal.scrollLeft;
  let balanc = 0;
  // connnected
  if (sps.length > 1) {
  same_around(env.current_vertical, "connected");
  } else {
  // 通常の処理.
  // 現在のブロックを same_end として、その前に要素を追加しながら移動していく.
  make_dup_fragment(env.current_vertical, "before");
  same_around(env.current_vertical, "default");
  }

  // ブロック挿入が終わって sp_cover が満たされた以降の処理. このあたりも大枠が command + u と同様.
  let center = document.querySelector(".centering");
  let the_center_num_b = [].slice.call(vertical_to_hor(center).children).indexOf(center);

  balanc = the_center_num_b - c_v_num;
  for (let i = 0; i < sps.length; i++) {
      sps[i].lastElementChild.scrollLeft = balanc * blocksize + scrollleft_b;
  }

  original_centering_checker(env.current_sp_cover, center);
  is_it_same_series(center);
}