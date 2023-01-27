export const adjust_target_pos = (e, f) => {
    let ms_top = getComputedStyle(e).top;
    let te = ms_top.substring(0, ms_top.length - 2);
    let ms_st;
    if (f == "on") {
        ms_st = Number(te) + 30;
    } else if (f == "off") {
        ms_st = Number(te) - 30;
    }
    let ms_st_code = ms_st + "px";
    e.style.setProperty('top', ms_st_code, 'important');
}