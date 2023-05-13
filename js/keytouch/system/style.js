import { focus_checker, adjust_target_pos, wheel_seton, focus_checker } from "../function/general.js";
import { which_special_is } from "../function/tool.js";
import { running_root, style_initial } from "../function/style.js";
import { screen, wheel, the_pointer, layer_base } from "../data/constant.js";
import { keytouch_setup } from "../../function/make.js";
import { layerbase_switch, pointer_switch, wheel_switch } from "../../function/animation.js";

export const keytouch_style_setup = () => {
  if (screen.classList.contains("ms")) {
    let env = keytouch_setup();
    let centering = document.querySelector(".centering");
    // 先にms調整箇所を戻しておいてそれから複製させる. 
    let target = centering;
    if (centering.classList.contains("same")) {
        target = which_special_is(centering);
    } 
    adjust_target_pos(target.lastElementChild, "off");
    document.querySelector(".ms_area").remove();
    screen.classList.add("style");
    wheel_seton();
    env.current.blur();
    adjust_target_pos(centering.lastElementChild, "off");
    style_initial();
  }
}

export const keytouch_style_command_arrow_left = () => {
  let env = keytouch_setup();
  let next;
  let choose = document.getElementsByClassName("choose")[0];
  // 移動先のブロックがあれば、なければ一番下に戻る
  if (choose.previousElementSibling) {
    next = choose.previousElementSibling;     
  } else {
    next = choose.parentElement.lastElementChild;
  }

  choose.classList.remove("choose");
  next.classList.add("choose");
}

export const keytouch_style_command_arrow_right = () => {
  let env = keytouch_setup();
  let next;
  let centering = document.querySelector(".centering");
  let choose = document.getElementsByClassName("choose")[0];
  // 移動先のブロックがあれば、なければ一番下に戻る
  if (choose.nextElementSibling) {
    next = choose.nextElementSibling;
  } else {
    next = choose.parentElement.firstElementChild;
  }

  choose.classList.remove("choose");
  next.classList.add("choose");
}


export const keytouch_style_command_enter = () => {
  let env = keytouch_setup();
  let centering = document.querySelector(".centering");
  // 名前だけでリレーしたい。
  running_root();
}

export const keytouch_style_command_escape = () => {
  let env = keytouch_setup();
  let centering = document.querySelector(".centering");
  e.preventDefault();

  // この waiting_wheel についても指定の仕方を改めた方がいいかもね。
  // 一番下のレイヤーが「old layer」なので、その指定の仕方に変えてあげた方が適切かもね。
  let w_w = document.querySelector(".waiting_wheel");
  if (w_w) {
    // セカンドレイヤーが表示中の場合の処理.
    w_w.classList.remove("waiting_wheel");
    w_w.style.display = "none";
    layer_base.style.opacity = 1;
  } else {
    // ファーストレイヤーが表示中の場合の処理.
    pointer_switch(the_pointer, "off");
    layerbase_switch(layer_base, "off");
    wheel_switch(wheel, "off");

    wheel.style.display = "none";
    screen.classList.remove("style");
    if (! centering.classList.contains("same")) {
      focus_checker(centering);
    } 
  }
}