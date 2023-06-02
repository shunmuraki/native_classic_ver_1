// [* どうしてこの２つを分けているのかがわからない.]
// * しかもやってることって switch じゃん.
// * UM において 左 に移動する関数.
// [* video_street_scroll, audio_street_scroll は統一できるでしょう.]
export const um_switch_to_videozone = () => {
  var before_choose = document.querySelector(".um_centered_block");
  before_choose.classList.remove("um_centered_block");
  var after_choose = element(".video_list").lastElementChild.previousElementSibling;
  after_choose.classList.add("um_centered_block");
  element(".um_video_edge_block").style.opacity = 1;
  element(".um_audio_edge_block").style.opacity = 0;
  element(".video_list").scrollLeft -= blocksize;
}

// UM において 右 に移動する関数.
// [* video_street_scroll, audio_street_scroll は統一できる.]
export const um_switch_to_audiozone = () => {
  var before_choose = document.querySelector(".um_centering");
  before_choose.classList.remove("um_centering");
  var after_choose = element(".audio_list").lastElementChild.previousElementSibling;
  after_choose.classList.add("um_centering");
  element(".video_edge").style.opacity = 0;
  element(".audio_edge").style.opacity = 1;
  element(".audio_list").scrollLeft += blocksize;
}

// * ユニバーサルマークダウンの表示位置を調整する関数.
export const um_positioning = () => {
  let env = keytouch_setup();
  let pointer_position_top = env.block.getBoundingClientRect().top;
  element(".um_display").style.top = pointer_position_top + "px";
}

// * UM を削除する関数.
export const clear_umdisplay = () => {
  var display_will_hidden = document.querySelector(".um_display");
  display_will_hidden.style.display = "none";
  element(".default_display").classList.remove("um");
  focus_checker(element(".centered_block"));
}