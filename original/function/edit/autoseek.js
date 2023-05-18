// * オートシーキングモードにおいて actuar を考慮して初期状態を設定する関数.
export const actuar_st_allon = () => {
    let sts = document.querySelectorAll(".actuar_st");
    for (let i = 0; i < sts.length; i++) {
        if (sts[i].lastElementChild) {
            sts[i].lastElementChild.style.setProperty('opacity', 0.5, 'important');
        }
    }
}

// * オートシーキングモード終了後に actuar_st が付いたブロックの描画を現場復帰する関数.
export const actuar_st_alloff = () => {
    let sts = document.querySelectorAll(".actuar_st");
    for (let i = 0; i < sts.length; i++) {
        if (sts[i].lastElementChild) {
            sts[i].lastElementChild.style.setProperty('opacity', 1, 'important');
        }
    }
}

// * オートシーキングモード終了後に actuar_en が付いたブロックの描画を現場復帰する関数.
export const actuar_en_alloff = () => {
    let ens = document.querySelectorAll(".actuar_en");
    for (let i = 0; i < ens.length; i++) {
        ens[i].style.opacity = 1;
        if (ens[i].lastElementChild) {
            ens[i].lastElementChild.style.setProperty('opacity', 1, 'important');
        }
    }
}