import { classmover, target_data } from "./tool.js"
import { chartbox, titlebox } from "../data/constant.js";
import { native_value } from "../data/variable.js";

// before: stylefuncs
// ********* style_ 系列の関数たち *********
// 本当はここに関数はまとめるべきなのかもしれない。
// e = 要素
// f = 名前
export const style_and_editor = (e, f) => {
  classmover(e, e, f, "remove");
}

// before: style.js

// [まだ必要な関数]
// classmover, target_data

// ターゲットを返してくれる関数
const who_is_target = (e) => {
  let centering = document.querySelector(".centering");
  // special_cov 持ちだったら。
  if (centering.classList.contains("same")) {
    target = document.querySelector(".special_cov").lastElementChild;
  } else {
    target = centering.lastElementChild;
  }
  return target;
}

// - * - object かどうかを判定する関数を書く（さっきの）
const isObject = (val) =>  {
  if( val !== null
    && typeof(val) === 'object'
    && val.constructor === Object ) {
    return true;
  }
  return false;
}