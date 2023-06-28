let cb = document.querySelector(".cs_button");
// * CS を出し入れするイベント.
cb.addEventListener("click", () => {
    let centered_block = element(".centering");
    if (cb.classList.contains("on")) {
        cheetsheet_animation("on");
        focus_check(centered_block);
    } else if (cb.classList.contains("off")) {
        blur_check(centered_block);
        cheetsheet_animation("off");
    }
    cb.classList.toggle("on");
    cb.classList.toggle("off");
})

// ---------------------------------------------------------------------------------------------------------------

// 「編集に戻る」ボタンがクリックされた場合の処理.
let getback = document.querySelector(".additional");
getback.addEventListener("click", () => { 
    // * 未記載..
    element(".export_space").remove();
    focus_check(element(".centered_block"));
})