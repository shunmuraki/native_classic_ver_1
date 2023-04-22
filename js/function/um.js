import { screen, half_left_width, blocksize } from "../base/elements.js";
import { focus_checker } from "../base/function.js";

let video_list = document.querySelector(".um_video");
let audio_list = document.querySelector(".um_audio");
let video_null = video_list.lastElementChild;
let audio_null = audio_list.lastElementChild;

// ユニバーサルマークダウンの表示位置をセンタリングしている要素へ調整する関数.
export const um_positioning = () => {
  let adjust_box = document.querySelector(".centering");
  let pointer_position_top = adjust_box.getBoundingClientRect().top;
  document.querySelector(".um_display").style.top = pointer_position_top + "px";
}

// videoゾーンにおける左右の移動を処理する関数.
export function video_street_scroll() {
  var before_choose = document.querySelector(".um_centering");
  before_choose.classList.remove("um_centering");
  var after_choose = video_list.lastElementChild.previousElementSibling;
  after_choose.classList.add("um_centering");
  video_null.style.opacity = 1;
  audio_null.style.opacity = 0;
  video_list.scrollLeft -= blocksize;
}

// null_elementを選択している状態で「右」を押した場合の処理をする関数.
export function audio_street_scroll() {
  var before_choose = document.querySelector(".um_centering");
  before_choose.classList.remove("um_centering");
  var after_choose = audio_list.lastElementChild.previousElementSibling;
  after_choose.classList.add("um_centering");
  video_null.style.opacity = 0;
  audio_null.style.opacity = 1;
  audio_list.scrollLeft += blocksize;
}

// UMレイヤーをクリアする関数.
export function clear_umdisplay() {  
  var display_will_hidden = document.querySelector(".um_layer");
  display_will_hidden.style.display = "none";
  screen.classList.remove("um");
  var native_center = document.querySelector(".centering");
  focus_checker(native_center);
}