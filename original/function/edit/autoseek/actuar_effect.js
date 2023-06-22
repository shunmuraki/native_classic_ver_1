// * オートシーキングモードにおいて actuar を考慮して初期状態を設定する関数.
// [* actuar_effect_activate に変更.]
export const head_actuar_effect_activate = () => {
    let head_actuars = document.querySelectorAll(".head_actuar");
    for (let i = 0; i < head_actuars.length; i++) {
        if (head_actuars[i].lastElementChild) {
            head_actuars[i].lastElementChild.style.setProperty('opacity', 0.5, 'important');
        }
    }
}

// * オートシーキングモード終了後に actuar_st が付いたブロックの描画を現場復帰する関数.
// [* actuar_st_effect_inactivate に変更]
export const head_actuar_effect_cancel = () => {
    let head_actuars = document.querySelectorAll(".head_actuar");
    for (let i = 0; i < head_actuars.length; i++) {
        if (head_actuars[i].lastElementChild) {
            head_actuars[i].lastElementChild.style.setProperty('opacity', 1, 'important');
        }
    }
}

// * オートシーキングモード終了後に actuar_en が付いたブロックの描画を現場復帰する関数.
// [* actuar_en_effect_inactivate に変更.]
export const tale_actuar_effect_cancel = () => {
    let tale_actuars = document.querySelectorAll(".tale_actuar");
    for (let i = 0; i < tale_actuars.length; i++) {
        tale_actuars[i].style.opacity = 1;
        if (tale_actuars[i].lastElementChild) {
            tale_actuars[i].lastElementChild.style.setProperty('opacity', 1, 'important');
        }
    }
}

// ---------------------------------------------------------------------------------------------------------------

// * オートシーキングモード中のラインの YT の再生をする関数.
export const autoseek_yt_play = (player) => {
    player.pauseVideo();
    let the_time = yt_resetter();
    player.seekTo(the_time);
    player.playVideo();
}