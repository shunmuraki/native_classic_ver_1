// * 円を回転させる関数.
const compute_action = (e, f) => {
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
  compute_action(c, outcome);
}