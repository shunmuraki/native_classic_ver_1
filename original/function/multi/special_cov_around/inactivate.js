// [* 名前変える.]
function the_state(e) {
    let the_special_cov = which_special_is(e);
    let content = null;   
    // * 削除する前に same_start が右隣の場合にコンテントを一時的に same_startへ移してあげる.
    // * そして再度 same_start が centering した時にその中身を取り除くようにする.
    if (the_special_cov) {
        if (the_special_cov.lastElementChild) {
            content = the_special_cov.lastElementChild.cloneNode(true);
            set("same_start_content", s => s = content);
        }
        the_special_cov.remove();
    }
}

// [* 名前変える.]
function player_setup(e) {
    if (e.lastElementChild) {
        player = yt_player_getter(e.lastElementChild);
    }
}   