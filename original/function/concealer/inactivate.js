// [* 名前変える.]
function same_concealer_inactivation_setup(e) {
    let same_concealer = get_correspond_same_concealer(e);
    let content = null;   
    // * 削除する前に same_start が右隣の場合にコンテントを一時的に same_startへ移してあげる.
    // * そして再度 same_start が centering した時にその中身を取り除くようにする.
    if (same_concealer) {
        if (same_concealer.lastElementChild) {
            content = same_concealer.lastElementChild.cloneNode(true);
            set("same_start_content", s => s = content);
        }
        same_concealer.remove();
    }
}

// [* 名前変える.]
function player_setup(e) {
    if (e.lastElementChild) {
        player = get_yt_player(e.lastElementChild);
    }
}   