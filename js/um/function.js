import { half_left_width } from "../base/elements.js";
import { block_multiable } from "../multiable/function.js";

var adjust_box = document.querySelector(".centering");
let pointer_position_top = adjust_box.getBoundingClientRect().top;

var video_list = document.querySelector(".um_video");
var audio_list = document.querySelector(".um_audio");
var video_null = video_list.lastElementChild;
var audio_null = audio_list.lastElementChild;

video_list.style.top = pointer_position_top + "px";
audio_list.style.top = pointer_position_top + "px";

var the_video_width = 400 * 10;
video_list.scrollLeft = the_video_width;

var the_audio_width = - 400 * 10;
audio_list.scrollLeft = the_audio_width;

// videoゾーンにおける左右の移動を処理する関数.
export function video_street_scroll() {
  var before_choose = document.querySelector(".um_centering");
  before_choose.classList.remove("um_centering");
  var after_choose = video_list.lastElementChild.previousElementSibling;
  after_choose.classList.add("um_centering");

  video_null.style.opacity = 1;
  audio_null.style.opacity = 0;
  video_list.scrollLeft -= 400;
}

// null_elementを選択している状態で「右」を押した場合の処理をする関数.
export function audio_street_scroll() {
  var before_choose = document.querySelector(".um_centering");
  before_choose.classList.remove("um_centering");
  var after_choose = audio_list.lastElementChild.previousElementSibling;
  after_choose.classList.add("um_centering");
  video_null.style.opacity = 0;
  audio_null.style.opacity = 1;
  audio_list.scrollLeft += 400;
}

// UMレイヤーをクリアする関数.
export function clear_umdisplay() {  
  var display_will_hidden = document.querySelector(".um_layer");
  display_will_hidden.style.display = "none";
  screen.classList.remove("um");
  var native_center = document.querySelector(".centering");
  native_center.lastElementChild.focus();
}

// * 仮で儲けている "TED" に関する動画のyt-ID のリスト. α版ならでは.
let yt_videolist_ted = ["ddJvVf1eqwM", "O0CsyfiQr34", "ZHhmi2bS0hU", "iLc27nj8KrU", "hVclObff6fc", "H-vvS1zonI0", "ESAaz9v4mSU", "CrGpipgcfi4", "oQ1FDFMdYjM", "9OLxBvLvCoM", "441nwncPN28", "YddEiDSuOrY", "OlgcaYAO5VM", "5cbCYwgQkTE", "j-rw3x8VZxA", "abF_EfprTIE", "9XGm_uHit5g", "uEATpbQ9md4", "KYK6Tfb0snQ", "mYS2CcIdW1M"];

// UMレイヤーに yt iframe を流し込む.
for (let i = 0; i < 20; i++) {
  let the_id = String(yt_videolist_ted[i]);
  let container = document.createElement("div");
  container.classList.add("box");
  let inner = document.createElement("div");
  inner.setAttribute("id", String("um_yt_" + i));
  container.appendChild(inner);
  container.classList.add("this_yt_id_" + yt_videolist_ted[i]);
  let video_panc = document.querySelector(".video_panc");
  video_panc.after(container);
  let pl = block_multiable(String("um_yt_" + i), the_id);
}

// UMレイヤーに画像を流し込む.
for (let i = 0; i < 10; i++) {
  let container = document.createElement("div");
  container.classList.add("box");
  let inner = document.createElement("img");
  inner.src = "img/ted_" + i + ".png";
  container.appendChild(inner);
  let audio_panc = document.querySelector(".audio_panc");
  audio_panc.after(container);
}

// * デフォルトの設定.
audio_list.lastElementChild.classList.add("um_centering");

// ** 以下デフォルトのスクロール位置の調整。
let video_list_scrollwidth = video_list.scrollWidth;
let audio_list_scrollwidth = audio_list.scrollWidth;
video_list.scrollLeft = video_list_scrollwidth - half_left_width;
audio_list.scrollLeft = - audio_list_scrollwidth;