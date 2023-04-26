import { focus_checker, adjust_target_pos, wheel_seton, focus_checker } from "../function/general.js";
import { which_special_is } from "../function/tool.js";
import { running_root, style_initial } from "../function/style.js";
import { screen, wheel, the_pointer, layer_base } from "../data/constant.js";

document.addEventListener("keydown", (e) => {
    
    let current = document.activeElement;
    let k = e.key;
    let type_signiture;
    let centering = document.querySelector(".centering");
    
    if (current.tagName == "TEXTAREA") {
        type_signiture = current.value;
        // ホイールを起動する処理.
        if ( type_signiture.indexOf('styl') != -1) {
          if (screen.classList.contains("ms")) {
            // 先にms調整箇所を戻しておいてそれから複製させる. 
            let target = centering;
            if (centering.classList.contains("same")) {
                target = which_special_is(centering);
            } 
            adjust_target_pos(target.lastElementChild, "off");
            document.querySelector(".ms_area").remove();
            screen.classList.add("style");
            wheel_seton();
            current.blur();
            adjust_target_pos(centering.lastElementChild, "off");
            style_initial();
          }
        }
    }
    
    if (screen.classList.contains("style")) {

      // ここに通常の左右の移動を実現する処理について書こうかしら。
      // 実行毎に choose クラスから選択項目の検索をかける。
      if (k == "ArrowLeft") {
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

      if (k == "ArrowRight") {
        let next;
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

      // 候補が１つしかなくて、previous も next も存在しない、みたいなケースだって全然ありえる。これをどうするか。
      if (k == "Enter") {
        // 名前だけでリレーしたい。
        running_root();
      }


      // ここだけ頑張ってほしいんだよね.....
      if (k == "Escape") {
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
          the_pointer.animate(
              [
                { transform: 'scale(5)', opacity: 1 },
                { transform: 'scale(1)', opacity: 1 },
              ], {
                duration: 200,
                fill: "both",
                delay: 100,
              }
            );
          layer_base.animate(
              [
                { transform: 'rotate(360deg)', },
                { transform: 'rotate(270deg) ' }
              ], {
                duration: 300,
                fill: "both"
              }
            );
          wheel.animate(
              [
                { opacity: 1, },
                { opacity: 0, }, 
              ], {
                duration: 300,
                delay: 200,
                fill: "both"
              }
            );

          wheel.style.display = "none";
          screen.classList.remove("style");
          if (! centering.classList.contains("same")) {
            focus_checker(centering);
          } 
        }
      }
    }
})