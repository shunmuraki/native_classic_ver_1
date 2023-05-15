// 階層から階層へ経由させる関数
// e = 今の階層
// f = 次の番号（次の階層を決定しそうな番号 * なんだそれw）
const data_layer_shift = (e, f) => {
    let in_process = Object.keys(e)[0];
    let v = in_process[f];
    return v;
}

// あとは円の回転処理
const compute_action = (e, f) => {
    // カスタムプロパティを取得
    const currentProperty = getComputedStyle(e).getPropertyValue("--rotate");
    // カスタムプロパティから数値部分のみ取得
    const currentPropertyNum = parseFloat(currentProperty);
    // カスタムプロパティから単位部分のみ取得
    let currentPropertyString = currentProperty.match(/[a-z]/g); // 正規表現で文字列のみ取得
    // 正規表現で取得された文字の配列を1つに結合
    currentPropertyString = currentPropertyString.join("");
    // 取得した数値に希望の数値を増減
    const newPropertyNum = currentPropertyNum + f;
    // 算出した数値と取得した単位を結合
    const newProperty = newPropertyNum + currentPropertyString;
    // 算出した値をカスタムプロパティにセット
    e.style.setProperty("--rotate", newProperty);
}

// 左右の移動に伴って。その子要素の数と引数に渡した「neg」「pos」でどっち回しかを決定して該当するChart（Chartbox最後の子要素）に対してtransform - rotate をかける。（ひと項目の半分の角度だけ回転させる）
// e = left, right.
export const chart_rotater = (e) => {
  let c = chartbox.lastElementChild;
  // 移動距離（角度）
  let n = target_data(c, "c_num_") / 2;
  let outcome;

  if (e == "left") {
    outcome = -n;
  } else if (e == "right") {
    outcome = n;
  }

  // まず現時点でのチャートのrotateを取得する必要がある（computeStyle）
  compute_action(c, outcome);
}