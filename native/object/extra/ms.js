export const ms_cancel = (block) => {
    ms_close(block.lastElementChild);
    element(".ms").remove();
}

// * "/" コマンドに伴tってブロックの中の要素の位置を調整する関数.
export const ms_close = (content, f) => {
    if (content) {
        let ms_top = getComputedStyle(content).top;
        let ms_new_top;
        if (f == "on") {
            set("ms_position", s => s = Number(ms_top.substring(0, ms_top.length - 2)));
            if (ms_top > 60) {
                ms_new_top = 60 + ms_top;
            } else {
                ms_new_top = 60;
            }
            let ms_value = ms_new_top + "px";
            content.style.setProperty('top', ms_value, 'important');
        } else if (f == "off") {
            content.style.top = '';
            set("ms_position", s => s = 0);
        }
    }
}