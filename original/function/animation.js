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
export const pointer_switch_animation = (e, f) => {

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
export const layerbase_switch_animation = (e, f) => {
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
export const wheel_switch_animation = (e, f) => {
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
export const pointer_animation = (e) => {
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

// ---------------------------------------------------------------------------------------------------------------

// * 円を回転させる関数.
const chart_rotation_make = (e, f) => {
    // * カスタムプロパティを取得
    const currentProperty = getComputedStyle(e).getPropertyValue("--rotate");
    // * カスタムプロパティから数値部分のみ取得
    const currentPropertyNum = parseFloat(currentProperty);
    // * カスタムプロパティから単位部分のみ取得
    let currentPropertyString = currentProperty.match(/[a-z]/g); // 正規表現で文字列のみ取得
    // * 正規表現で取得された文字の配列を1つに結合
    currentPropertyString = currentPropertyString.join("");
    // * 取得した数値に希望の数値を増減
    const newPropertyNum = currentPropertyNum + f;
    // * 算出した数値と取得した単位を結合
    const newProperty = newPropertyNum + currentPropertyString;
    // * 算出した値をカスタムプロパティにセット
    e.style.setProperty("--rotate", newProperty);
}

// ---------------------------------------------------------------------------------------------------------------

// * 左右のキー入力で選択肢間を移動する際に実行される関数.
export const chart_rotater = (e) => {
  let c = chartbox.lastElementChild;
  // * 移動距離（角度）.
  let n = target_data(c, "c_num_") / 2;
  let outcome;
  if (e == "left") {
    outcome = -n;
  } else if (e == "right") {
    outcome = n;
  }
  // * 円の回転処理.
  chart_rotation_make(c, outcome);
}