// * Escape key が押された際に実行される関数.
// * 装飾ホイールを閉じる、もしくはレイヤーをひとつ前に戻す.
export const keytouch_style_command_escape = (event) => {
    let env = keytouch_setup();
    event.preventDefault();
    // * 以下のレイヤーの切り替えは外部でオブジェクトにする.
    let waiting_wheel = document.querySelector(".waiting_wheel");
    if (waiting_wheel) {
        // * セカンドレイヤーが表示中の場合の処理.
        wheel_layer_back(env);
    } else {
        // * ファーストレイヤーが表示中の場合の処理.
        wheel_cancel(env);
    }
}

// * arrowLeft が押された際に実行される関数.
// *  左側の選択肢を選択する.
export const keytouch_style_command_arrow_left = () => {
    let env = keytouch_setup();
    let next;
    let choose = element(".choose");
    // * 移動先のブロックがあれば、なければ一番下に戻る.
    if (choose.previousElementSibling) {
      next = choose.previousElementSibling;     
    } else {
      next = choose.parentElement.lastElementChild;
    }
    // * choose クラスを同期.
    choose.classList.remove("choose");
    next.classList.add("choose");
}

// * arrowRight が押された際に実行される関数.
// * 右側の選択肢を選択する.
export const keytouch_style_command_arrow_right = () => {
    let next;
    let choose = element(".choose");
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

// ---------------------------------------------------------------------------------------------------------------

// * Enter が押された際に実行される関数.
// * 選択中の選択肢を選択する.
export const keytouch_style_command_enter = () => {  
    style_choose();
}

// * 「ジャンル」か「項目」かによらず、選択肢がクリックされた際に実行される関数.
// * 「ジャンル」なら genre_clicked() を、「項目」なら value_clicked() を実行する.
export const style_choose = () => {
    let choose = element(".choose");
    let num = choose.parentElement.children.indexOf(choose);    
    let title = String(choose.textContent);
    let object = get("current_states")[0][num];
    if (isObject(object)) {
        // * 選択したのが「ジャンル」だった場合.
        genre_clicked(object);
        // * states を同期.
        // [* ここは states 管理関数で処理させる.]
        set("current_states", s => s[0] = object);
        set("current_states", s => s[1] = title);
        set("current_states", s => s[2].push(num));
    } else {
        // * 選択したのが「項目」だった場合. 
        value_clicked(object);
        // * states を同期.
        set("current_states", s => s = get("previous_states"));
    }
}