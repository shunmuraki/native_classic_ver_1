// 何も実行するものがない場合に実行する「none_title()」関数。
export const none_title = (e) => {
    console.log("none_title");
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
