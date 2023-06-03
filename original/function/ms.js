export const ms_cancel = (e) => {
    ms_close(e.lastElementChild);
    document.querySelector(".ms_area").remove();
}

// * "/" コマンドに伴tってブロックの中の要素の位置を調整する関数.
export const ms_close = (e, f) => {
    if (e) {
        let ms_top = getComputedStyle(e).top;
        let ms_st;
        if (f == "on") {
            set("default_pos", s => s = Number(ms_top.substring(0, ms_top.length - 2)));
            if (default_pos > 60) {
                ms_st = 60 + default_pos;
            } else {
                ms_st = 60;
            }
            let ms_st_code = ms_st + "px";
            e.style.setProperty('top', ms_st_code, 'important');
        } else if (f == "off") {
            e.style.top = '';
            set("default_pos", s => s = 0);
        }
    }
}