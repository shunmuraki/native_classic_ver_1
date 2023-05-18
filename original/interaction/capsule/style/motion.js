// * arrowLeft が押された際に実行される関数.
// *  左側の選択肢を選択する.
export const keytouch_style_command_arrow_left = () => {
    let env = keytouch_setup();
    let next;
    let choose = document.getElementsByClassName("choose")[0];
    // * 移動先のブロックがあれば、なければ一番下に戻る.
    if (choose.previousElementSibling) {
      next = choose.previousElementSibling;     
    } else {
      next = choose.parentElement.lastElementChild;
    }
  
    choose.classList.remove("choose");
    next.classList.add("choose");
}
  
// * arrowRight が押された際に実行される関数.
// * 右側の選択肢を選択する.
export const keytouch_style_command_arrow_right = () => {
    let env = keytouch_setup();
    let next;
    let centering = document.querySelector(".centering");
    let choose = document.getElementsByClassName("choose")[0];
    // * 移動先のブロックがあれば、なければ一番下に戻る
    if (choose.nextElementSibling) {
        next = choose.nextElementSibling;
    } else {
        next = choose.parentElement.firstElementChild;
    }
    // * choose クラスを同期.
    choose.classList.remove("choose");
    next.classList.add("choose");
} 

// * Enter が押された際に実行される関数.
// * 選択中の選択肢を選択する.
export const keytouch_style_command_enter = () => {
  let env = keytouch_setup();
  let centering = document.querySelector(".centering");
  style_choose();
}