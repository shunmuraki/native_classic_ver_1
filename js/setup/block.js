window.onload = () => {
    // 以下Nativeを開いた時の最初の動作.
    let dummy = document.createElement("div");
    dummy.classList.add("first_load_dummy");
    screen.appendChild(dummy);
    // um 
    um.style.display = "none";

    // scrollTo の代替.
    $(function() {
        $('html,body').animate({ scrollTop: window_height - 200 }, {duration: 0});
        setTimeout(() => {
            wheel_positioning();
        }, 100)
    });
    document.getElementsByTagName("html")[0].style.overflow = "hidden";
    document.getElementsByTagName("body")[0].style.overflow = "hidden";
};

(function () {
    let all_writearea = document.getElementsByClassName("write_area");
    // 以下 export.html から回帰したケースへの対応.
    if (! sessionStorage.getItem("output")) {
        // 以下通常のリロードへの対応.
        let d = document.querySelector(".first_load_dummy");
        make_fragment(d, "after");
        d.remove();
        // 最初のcenteringを用意.
        all_writearea[0].parentElement.classList.add("centering");
        all_writearea[0].focus();
    }
}());