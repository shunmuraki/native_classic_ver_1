// * statusbar にある same_on がクリックされた際のアイコンのアニメーション
export const statusbar_animation = (e) => {
    // 一度クリックされているかどうか did クラスで判別する.
    if (e.classList.contains("did")) {
        // * 戻る.
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
        // * 実行する.
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

// ---------------------------------------------------------------------------------------------------------------

// * チートシートを出し入れるアニメーション.
// * 引数に /setup/cheetsheet.js の cs を与える.
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

// ---------------------------------------------------------------------------------------------------------------

// * 装飾ホイールのアニメーション

// * 常駐のポインターが装飾ホイールに変形するアニメーション.
// * もしくはその反対.
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

// * 装飾ホイール上で選択肢を表示するレイヤー「layer_base」を回転させるアニメーション.
// * 上記の pointer_switch と同時に実行される.
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

// * ポインターの上に重ねる ホイールを表示したり、隠したりするアニメーション.
// * 上記 layerbase_switch と同時に実行される.
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

// ---------------------------------------------------------------------------------------------------------------

// * エディター上での動作に連動した、常駐しているポインターの装飾的なアニメーション.
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