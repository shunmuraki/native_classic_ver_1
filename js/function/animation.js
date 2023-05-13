// same_on (in status_bar) のマーク間のアニメーション

// e には親の onsame を与える。
export const statusbar_animation = (e) => {
    // クリックが実行された形跡として「did」クラスを親要素に付与する場合。
    // アニメーションの上下まで親要素（onsame）のクラスで判断できたら賢いね、確かに。
    if (e.classList.contains("did")) {
        // 戻るパターン.
        e.animate(
            [
                { top: '0%' },
                { top: '50%' }
            ], {
            duration: 500,
            fill: "forwards",
            easing: "ease-in-out"
            }
        ); 
    } else {
        // 実行されるパターン.
        e.animate(
            [
            { top: '50%' },
            { top: '0%' }
            ], {
            duration: 500,
            fill: "forwards",
            easing: "ease-in-out"
        }
        );
    }
}

// 引数に /setup/cheetsheet.js の cs を与える。
// f = on or off
export const cheetsheet_animation = (e, f) => {
    if (f == "on") {
        e.animate(
            [
                { top: '0%' },
                { top: '100%' }
            ], {
            duration: 500,
            fill: "forwards",
            easing: "ease-in-out"
            }
        );
    } else {
        e.animate(
            [
            { top: '100%' },
            { top: '0%' }
            ], {
                duration: 600,
                fill: "forwards",
                easing: "ease-in-out"
            }
        );
    }
}

// style (/function/general) 周辺
export const pointer_switch = (e, f) => {

    if (f == "on") {
        e.animate(
            [
            { transform: 'scale(1)', opacity: 1, },
            { transform: 'scale(5)', opacity: 1 },
            ], {
                duration: 300,
                fill: "both",
                easing: "ease-in-out"
            }
        )
    } else {
        e.animate(
        [
          { transform: 'scale(5)', opacity: 1 },
          { transform: 'scale(1)', opacity: 1 },
        ], {
          duration: 200,
          fill: "both",
          delay: 100,
        }
      );
    }
}

export const layerbase_switch = (e, f) => {
    if (f == "on") {
        e.animate(
            [
            { transform: 'rotate(270)', },
            { transform: 'rotate(360deg) ' }
            ], {
                duration: 700,        
                fill: "both",
                easing: "ease-in-out",
                delay: 200,
            }
        );
    } else {
        e.animate(
        [
          { transform: 'rotate(360deg)', },
          { transform: 'rotate(270deg) ' }
        ], {
          duration: 300,
          fill: "both"
        }
      );
    }
}

export const wheel_switch = (e, f) => {
    if (f == "on") {
        e.animate(
            [
            { opacity: 0, },
            { opacity: 1, }, 
            ], {
            duration: 400,
            delay: 200,
            fill: "both",
            easing: "ease-in-out"
            }
        );
    } else {
        e.animate(
        [
          { opacity: 1, },
          { opacity: 0, }, 
        ], {
          duration: 300,
          delay: 200,
          fill: "both"
        }
      );
    }
}


// pointer effect
export const pointer_effect = (e) => {
    e.animate(
        [
            { scale: 1 },
            { scale: 0.8 }
        ], {
            duration: 300,
            fill: "both",
        }
    );
    e.animate(
        [
            { scale: 0.8 },
            { scale: 1,  }
        ], {
            duration: 300,
            fill: "both",
            delay: 300,
        }
    );
}