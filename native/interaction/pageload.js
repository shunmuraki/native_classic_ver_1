window.onload = () => {
    // * 以下 Native を開いて最初に走る処理.
    let dummy = document.createElement("div");
    dummy.classList.add("first_load_dummy");
    element(".default_display").appendChild(dummy);
    
    // * 以下Native のパーツの初期の表示位置の調整.
    element(".um_display").style.display = "none";
    $(function() {
        $('html,body').animate({ scrollTop: window_height - 200 }, {duration: 0});
        setTimeout(() => {
            wheel_positioning();
        }, 100)
    });
    
    document.getElementsByTagName("html")[0].style.overflow = "hidden";
    document.getElementsByTagName("body")[0].style.overflow = "hidden";
    
    let all_writearea = document.getElementsByClassName("write_area");
    if (! sessionStorage.getItem("output")) {
        // * 以下通常のリロードに対応する処理.
        make_fragment(dummy, "after");
        dummy.remove();
        // * 最初のcenteringを用意.
        all_writearea[0].parentElement.classList.add("centered_block");
        all_writearea[0].focus();
    }

    // ---------------------------------------------------------------------------------------------------------------

    // * UM について。
    um_setup();

    // ---------------------------------------------------------------------------------------------------------------

    // * Native のステータスバーにあるオプションすべてにインタラクティブなアニメーション機能を追加.
    let options = document.querySelectorAll(".option");
    for (let i = 0; i < options.length; i++) {
        options[i].addEventListener("click", () => {
            statusbar_animation(options[i]);
        })
    }
};