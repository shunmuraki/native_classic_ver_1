let default_pos;

// styling_ クラスを取り外すことで content の位置を ms のスペースに対応させる関数.
export const adjust_target_pos = (e, f) => {
    let ms_top = getComputedStyle(e).top;
    console.log(ms_top);
    let ms_st;
    if (f == "on") {
        default_pos = Number(ms_top.substring(0, ms_top.length - 2));
        if (default_pos > 60) {
            ms_st = 60 + default_pos;
        } else {
            ms_st = 60;
        }
        let ms_st_code = ms_st + "px";
        e.style.setProperty('top', ms_st_code, 'important');
    } else if (f == "off") {
        ms_st = default_pos;
    }
    if (f == "off") {
        e.style.top = '';
        default_pos  = 0;
    }
}