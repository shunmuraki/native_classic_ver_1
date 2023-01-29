import { screen } from "../base/elements.js";
import {classmover, target_data} from "../base/tools.js";

const pointer = document.querySelector(".pointer_and_wheel");
const wheel = document.querySelector(".wheel");
const the_pointer = document.querySelector(".pointer");
const layer_base = document.querySelector(".layer_1");

// layers.
const base_1 = document.querySelector(".base_1");
const base_2 = document.querySelector(".base_2");
const base_3 = document.querySelector(".base_3");

// sub_layers.
const ly_2_1 = document.querySelector(".layer_select_1");
const ly_2_2 = document.querySelector(".layer_select_2");
const ly_2_3 = document.querySelector(".layer_select_3");

// selectors.
const sl_1_1 = document.querySelector(".select_1_1");
const sl_1_2 = document.querySelector(".select_1_2");
const sl_1_3 = document.querySelector(".select_1_3");
const sl_2_1 = document.querySelector(".select_2_1");
const sl_2_2 = document.querySelector(".select_2_2");
const sl_2_3 = document.querySelector(".select_2_3");
const sl_3_1 = document.querySelector(".select_3_1");
const sl_3_2 = document.querySelector(".select_3_2");

// 以下デフォルトの表示設定.
ly_2_1.style.display = "none";
ly_2_2.style.display = "none";
ly_2_3.style.display = "none";
wheel.style.display = "none";

// ホイールの状態をリセット（レイヤー１が表示されている状態）する関数.
export const layer_resetter = () => {
    ly_2_1.style.display = "none";
    ly_2_2.style.display = "none";
    ly_2_3.style.display = "none";
}

// ホイールをブロックやポインター（編集時）に追従させる関数.
export const wheel_positioning = () => {
  let centering;
  if (screen.classList.contains("edit")) {
    if (document.getElementsByClassName("principle_block")[0]) {
      centering = document.querySelector(".new_layer_centering");
    } else if (document.getElementsByClassName("principle_pointer")[0]) {
      centering = document.querySelector(".comesin");
    }
  } else {
    centering = document.querySelector(".centering");
  }
  let the_focus_top = centering.getBoundingClientRect().top;
  let the_focus_left = centering.getBoundingClientRect().left;
  pointer.style.top = the_focus_top - 10 + "px";
  pointer.style.left = the_focus_left - 10 + "px";

}

// ホイールの描画アニメーションの関数.
export const wheel_seton = () => {
    the_pointer.animate(
        [
          { transform: 'scale(1)' },
          { transform: 'scale(5)' },
        ], {
          duration: 300,
          fill: "both",
          easing: "ease-in-out"
        }
      );
    wheel.style.display = "block";
    layer_base.animate(
        [
          { transform: 'rotate(270)', },
          { transform: 'rotate(360deg) ' }
        ], {
          duration: 700,        
          fill: "both",
          easing: "ease-in-out",
          delay: 200,
        }
      );
    wheel.animate(
        [
          { opacity: 0, },
          { opacity: 1, }, 
        ], {
          duration: 400,
          delay: 200,
          fill: "both",
          easing: "ease-in-out"
        }
      );
}

base_1.addEventListener("click", () => {
    ly_2_1.style.display = "block";
})
base_2.addEventListener("click", () => {
    ly_2_3.style.display = "block";
})
base_3.addEventListener("click", () => {
    ly_2_2.style.display = "block";
})

// ホイールのクリックに応じて「styling_」クラスの内容を切り替える関数.
const style_num_changer = (f, g) => {
    let target;
    let centering = document.getElementsByClassName("centering")[0];

    if (centering.classList.contains("same")) {
      target = document.querySelector(".special_cov").lastElementChild;
    } else {
      target = centering.lastElementChild;
    }
    
    let current_classname = target_data(target, "styling_");
    let the_numpos = f * 2;
    
    let a = current_classname.slice(0, the_numpos);
    let c = current_classname.slice(the_numpos + 1);

    let final_name = "styling_" + a + g + c;
    classmover(target, target, "styling_", "remove");
    target.classList.add(final_name);
}

sl_1_1.addEventListener("click", () => {
    style_num_changer(0, 0);
    ly_2_1.style.display = "none";
})

sl_1_2.addEventListener("click", () => {
    style_num_changer(0, 1);
    ly_2_1.style.display = "none";
})

sl_1_3.addEventListener("click", () => {
    style_num_changer(0, 2);
    ly_2_1.style.display = "none";
})

sl_2_1.addEventListener("click", () => {
    style_num_changer(1, 0);
    ly_2_2.style.display = "none";
})

sl_2_2.addEventListener("click", () => {
    style_num_changer(1, 1);
    ly_2_2.style.display = "none";
})

sl_2_3.addEventListener("click", () => {
    style_num_changer(1, 2);
    ly_2_2.style.display = "none";
})

sl_3_1.addEventListener("click", () => {
    style_num_changer(2, 0);
    ly_2_3.style.display = "none";
})

sl_3_2.addEventListener("click", () => {
    style_num_changer(2, 1);
    ly_2_3.style.display = "none";
})