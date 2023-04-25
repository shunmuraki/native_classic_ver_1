import { classmover, target_data } from "./tool.js"
import { chartbox, titlebox } from "../data/constant.js";
import { native_value } from "../data/variable.js";

let current_states = native_value("current_states");
let previous_states = native_value("previous_states");

// before: stylefuncs
// ********* style_ 系列の関数たち *********
// 本当はここに関数はまとめるべきなのかもしれない。
// 何も実行するものがない場合に実行する「none_title()」関数。
export const none_title = (e) => {
    console.log("none_title");
  }
  
// e = 要素
// f = 名前
export const style_and_editor = (e, f) => {
  classmover(e, e, f, "remove");
}

// h1 - h3 を担当します。
// e = 要素
// f = 上記のうちどれか (ex: "h1")
export const literal_replace = (e, f) => {
  let replacement = document.createElement(f);
  let v = e.lastElementChild.value;
  replacement.textContent = v;
  e.lastElementChild.remove();
  e.appendChild(replacement);
}
  
// iframe_adaptation() とはまったくの別物なので注意。
// iframe_adaptation() では ln 側で yt-iframe を読み込ませるための処理をしているが、
// こっちでは id 付きの div 要素を挿入した直後に変換を行っている。
export const iframe_and_editor = (e) => {
  // .write_area 内に記述されたリンクからYouTubeの埋め込みを生成する。
  // * YT の Iframe Player API
  // まず中身から YT のコードを取得する必要があるよね。
  let you = e.lastElementChild;
  let content = you.value;    
  let spl = content.indexOf("v=");
  let the_code;
  // UMから取り込まれる場合と、通常のURLペーストの場合に対応。
  if (content.indexOf("v=") == -1) {
      the_code = content;
  } else {
      the_code = content.slice(spl + 2, spl + 13);
  }
  let node = document.createElement("div");
  node.classList.add("embed");
  // 中身の置き換え
  you.remove();
  e.appendChild(node);
  // API 箇所
  let player; // 変数を用意
  function onYouTubeIframeAPIReady() {
      player = new YT.Player('embed', { // 'movie'はSTEP1で生成したdivタグのid名を指定
          videoId: the_code // 埋め込む動画のID
      });
  }
}
  
// yt-IDからyt-iframeを生成するための仮置きのdiv要素をセットする関数.
export const iframe_adaptation = (e) => {
  let the_content = e.lastElementChild;
  let value_id = target_data(e, "id_is_");
  yt_id_list.push(value_id);
  let the_name = "yt_" + String(yt_id_list.length - 1);  
  // same_end 同士見つけあってDOMを節約するために発見用のidをクラスに付与する.
  e.classList.add("iframe");
  e.classList.add("same_deletable");
  e.classList.add("same_id_" + value_id);
  let newElement = document.createElement("div");
  newElement.setAttribute("id", the_name); 
  the_content.remove();
  e.appendChild(newElement);
  return e;
}

// before: style.js

// [まだ必要な関数]
// classmover, target_data

// ターゲットを返してくれる関数
const who_is_target = (e) => {
  let centering = document.querySelector(".centering");
  // special_cov 持ちだったら。
  if (centering.classList.contains("same")) {
    target = document.querySelector(".special_cov").lastElementChild;
  } else {
    target = centering.lastElementChild;
  }
  return target;
}

// 中身まで入れ替える必要がある場合はどうしたらいい？
// そういう処理内容を分ける必要があるってことか。

// current_number の番号を文字列にして完成させて返してくれる関数。
const number_combinate = (e) => {
  let output = "style";
  for (let i = 0; i < e.length; i++) {
    let p = "_" + String(e[i]);
    output += p;
  }
  return output;
}

// あと 同じ階層の他の style_ を classremove する必要があるから頑張ってね。
const onlyone_style = (e, f) => {
  // 別階層だったら許可するように書いてね。
  // 同じ階層にあるタイトルかどうかを判定するためにはどうするのが賢いと思う？
  // １つは、親のタイトルまで centering (or special_cov)に残しておくこと。
  // ******* ここをさ、配列の値をひとつずつ取り出して文字列に束ねていくようにしてよ。
  let word = number_combinate(f);
  classmover(e, e, word, "remove");
}

// ここに処理をまとめていく。俺の今の考えでは、選択された項目名を style__ に指定したらいいんじゃないかと。
// - * (例) style_h1
const style_changer = (e, f) => {
  // e | target（要素）
  // f | style_number
  // 共通の階層までの番号を取得して被るやつから消していく。
  let w = number_combinate(f).slice(0, -2);
  // ここで最終的には onlyone_style() に f をそのまま渡すようにする。
  onlyone_style(e, f);
  e.classList.add(w);
}

// - * - object かどうかを判定する関数を書く（さっきの）
const isObject = (val) =>  {
  if( val !== null
    && typeof(val) === 'object'
    && val.constructor === Object ) {
    return true;
  }
  return false;
}

// - * - [A]を書く
// - JSONの値たちを取得するのは外でやった方がいいんじゃないかと、つまり running_b 側で実行してくれってこと。
// それで、配列をまとめて running_a に流し込むようにする。(running_a は中身があった時に実行される関数です)
const layer_maker = (e) => {
  // e にはタイトルたちを渡す。
  let container = document.querySelector(".container");
  let layer = document.createElement("div");
  layer.classList.add("style_layer");

  // -- 最新のレイヤーにのみ「current_layer」クラスをつけるようにする（つけ外しが必要）
  if (document.getElementsByClassName("current_s_layer")[0]) {
    document.getElementsByClassName("current_s_layer")[0].classList.remove("current_s_layer");
  }
  layer.classList.add("current_s_layer");

  // 選択項目の挿入
  for (let i = 0; i < e.length; i++) {
    let title = e[i];
    let election = document.createElement("div");
    election.textContent = String(title);
    layer.appendChild(election);
  } 
  // 最後に新しいレイヤーを実際に表示しましょう。
  container.appendChild(layer);
}

// style_initial の中で実行する。
const all_setup = (e) => {
  // まずはデフォルトの選択項目を決めて、クラスを振ってあげる必要がある。
  // ひとまずは layer_1 (0枚目) が来るから、この最初のブロックに対して choose クラスをつけるようにしよう。
  // sl_1_1　←この子がそれ。
  let title = String(document.querySelector(".choose").textContent);
  current_states[1] = title;
  previous_states[1] = title;
  // 移動先のブロックがあれば、なければ一番下に戻る、といった条件分岐を中に記述する。
}

// 引数に中身を渡す
const running_a = (e) => {
  // -- それらをループさせて、レイヤーを生成する（型の関数があってもいい。配列を引数に渡すとレイヤーを生成してくれるような）
  // 引数で渡されるのは必ず「正真正銘の"配列"」なので、深いことは考えずに書きましょう。
  let titles = new Array();

  // あくまでレイヤーを作るだけ。
  for (let i = 0; i < e.length; i++) {
    let election = e[i];
    let title;

    if (isObject(election)) {
      // object だった場合はその key 名を取得する。
      // その唯一のojbect のキーを取得するためには？
      title = Object.keys(election)[0];
    } else {
      // それ以外はそのまま名前をもらってしまってください。
      title = String(election);
    }
    titles.push(title);

    // 束ねたこの階層のタイトルたちで、レイヤーを構成する。
    layer_maker(titles);

    // 最後の要素について choose クラスを自動的に付与するようにする。
    let origin = document.getElementsByClassName("choose")[0];
    origin.classList.remove("choose");
    
    // comeback に備えて。
    origin.classList.add("origin");
    // 次の階層の最後の要素に対して選択させる。
    container.lastElementChild.firstElementChild.classList.add("choose");
  }
}

export const style_initial = (e) => {  
  // 中身の条件分岐
  // current_zone のセット
  // running_a の実行.
  let target = who_is_target();
  if (target.lastElementChild) {
    let tag = target.lastElementChild.tagName;
    if (tag == "TEXTAREA") {
      current_states[0] = native_allstyles[0];
      current_states[2].push(0);
      previous_states[0] = native_allstyles[0];
      previous_states[2].push(0);
    } else if (tag == "IMG") {
      current_states[0] = native_allstyles[1];
      current_states[2].push(1);
      previous_states[0] = native_allstyles[1];
      previous_states[2].push(1);
    } else if (tag == "IFRAME") {
      current_states[0] = native_allstyles[2];
      current_states[2].push(2);
      previous_states[0] = native_allstyles[2];
      previous_states[2].push(2);
    }
  }
  running_a();
  // ↕︎ この間に choose は生じている。
  all_setup();
}

// - * - [B]を書く

// 階層から階層へ経由させる関数
// e = 今の階層
// f = 次の番号（次の階層を決定しそうな番号 * なんだそれw）
const data_layer_shift = (e, f) => {
  let in_process = Object.keys(e)[0];
  let v = in_process[f];
  return v;
}

// e = 選択した要素
const running_b = (e) => {
  // まず選択項目の名前を取得しましょう。
  let current_s_layer = document.getElementsByClassName("current_s_layer")[0];

  // まずタイトルを取得したいなって思ってます！
  // あーーーーでもそれだったら意味ないなぁw
  // タイトルを取得すること自体は悪いことじゃないし最終的にその必要はあるが、
  // これを数字で表してほしいってことなんですよねーーーーー。
  let position = target_data(e, "style_");
  // _1_1 みたいなのが取れるはず。
  // 続いて、これを「_」で区切って配列にする「split」メソッドで展開し、これをループさせることで項目名にたどり着けるはず。
  let nums = position.split("_");
  // テスト用
  console.log(nums);
  let you;
  
  for (let i = 0; i < nums.length - 3; i++) {
    // 最初の key の value を取得するためには？？
      // e[i] = 階層番号 でしかないので、まず
      // e[i] で階層を指定して、
      // 続けてその中の「Object.keys(その階層)」の [0] と指定する必要がある。
      // ここまで降りてこれると、おおもとの「階層」に戻ってくることができる。というか次の階層に移ることができる。
      // 従って、階層（flo）が決まってから次の番号で次の階層（flo）に続くように処理を書く必要がある。
      // 階層から次の階層へ移す関数と、ひとつ飛ばしで実行する包む関数を書くといい。
      // １つ飛ばしで実行することで着実に階層を下げていく。
      if (i % 2 == 0) {
        data_layer_shift(you, i);
      }
  }

  // この時点で you は末端に辿り着くことができているはず。
  you = Object.keys(you)[0];

  let func = native_style_funcs[you];
  let target = who_is_target();
  func(target);

  // 同時にこの要素に対してスタイリングを付け替え。
  style_changer(target, current_states[2]);

  let previous_layer = current_s_layer.previousElementSibling;
  previous_layer.classList.add("current_s_layer");
  document.querySelector(".origin").classList.add("choose");
  // ここでも current_zone とか title を更新する必要があるのでは？
  // あと回帰するケースがああるなら previous_title がずれていきそうで怖いなぁ。
  current_s_layer.remove();
}

// 他はざっくり書けた。ここが長くなりそう。
// choose が選択された時に実行される、根幹となる関数。
// まずは choose クラスを持つ要素を取得することから始めましょう。
export const running_root = (e) => {
  let choose = document.getElementsByClassName("choose")[0];
  let order = choose.parentElement.children.indexOf(choose);
  // この子要素が何番目かを知ることから。
  // いやだったら予めレイヤー生成時点で分かるようなクラスを付与しておけ、と？
  let title = String(choose.textContent);
  let v = current_states[0][order];

  // title 名じゃなくて、ここも番号で管理するようにする。

  if (isObject(v)) {
    // --- もし中身があったら
    // ---- A を実行する
    running_a(v);
    // 最新の回想を保存
    current_states[0] = v;
    current_states[1] = title;
    current_states[2].push(order);
  } else {
    // --- 中身がなかったら
    // ---- B を実行する
    running_b(v);
    // 最新の回想を保存
    current_states[0] = previous_states[0];
    current_states[1] = previous_states[1];
    current_states[2] = previous_states[2];
  }
}

// ********* Charts スタイリングホイールの担い手たち *********

// e = running_a の titles
export const chart_maker = (e) => {
  // chart.js
  // 1. node を作る（<canvas id="sushi_circle" width="500" height="500"></canvas>）
  let c = document.createElement("div");
  c.classList.add("chart");  

  // 2. これを 2d の canvas に変えて、ここに chart.js で円グラフを描画する。
  let n = e.length;
  let per = 360 / n;
  // chart_rotator にて要素数を得る必要があるので、これをクラスに置いてしまうと楽かと。
  let the_class = "c_num_" + per;
  c.classList.add(the_class);
  
  let d = new Array();
  for (let i = 0; i < n; i++) {
    d.push(per);
  }
  // 最新のチャートを取得（= さっき作った要素）
  let context = c.getContext('2d');
  new Chart(context, {
    type: 'doughnut',
    data: {
      labels: titles,
      datasets: [{
        data: d
      }]
    },
    options: {
      responsive: false,
    }
  });

  // 追加（描画）
  chartbox.appendChild(c);
}

// ***** choose が切り替わるごとにチャートの上にタイトルを描画する関
// 切り替える時には毎回前のタイトルを削除しましょう。
// e = title
export const title_drawer = (e) => {
  let t = document.createElement("span");
  t.classList.add("title");
  t.textContent = e;
  titlebox.appendChild(t);
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