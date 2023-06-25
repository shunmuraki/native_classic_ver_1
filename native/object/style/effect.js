// * 何も実行するものがない場合に実行する「none_title()」関数。
export const none_title = (e) => {
    console.log("none_title");
}

// * <textarea> を <h1> - <h3> に.
export const literal_replace = (e, f) => {
    // * 引数に与えた文字列で直接置き換える要素の形式を指定して生成.
    let titlebox = e;
    let replacement = document.createElement(f);
    let v = titlebox.lastElementChild.value;
    replacement.textContent = v;
    titlebox.lastElementChild.remove();
    titlebox.appendChild(replacement);
}
    
// * エディター上で <textarea> に記述した YouTube動画ID を YT Iframe に変換する関数.
export const iframe_and_editor = (block) => {
    // * write_area 内に記述されたリンクからYouTubeの埋め込みを生成する。
    // * YT の Iframe Player API を使用. 
    let content = block.lastElementChild;
    let value = content.value;
    let num = content.indexOf("v=");
    let yt_id;
    // * UMから取り込まれる場合と、通常のURLペーストの場合の両方に対応。
    if (value.indexOf("v=") == -1) {
        yt_id = value;
    } else {
        yt_id = value.slice(num + 2, num + 13);
    }
    
    let new_contennt = document.createElement("div");
    new_contennt.classList.add("embed");
    // * 中身の置き換え
    content.remove();
    block.appendChild(new_contennt);
    // * API 箇所
    let player;
    const onYouTubeIframeAPIReady = () => {
        player = new YT.Player('embed', {
            videoId: yt_id,
        });
    }
}

// * 装飾ホイールによるスタイルの変更を実際に反映する関数.
export const style_changer = (block, style_data) => {
    // * 共通のジャンルですでに別の項目が適用されている可能性を加味し実行.
    style_replace(block, style_data);
    // * 本命を追加.
    let classname = number_combinate(style_data).slice(0, -2);
    block.classList.add(classname);
} 

// * style のクラスを付け替える際に、同じ階層（同じジャンル）で別の選択肢を選択されていた場合、
// * 既存の style_ クラスを削除し、新たに選んだ選択肢を含めたクラスに置き換える関数.
export const style_replace = (block, style_data) => {     
    let word = number_combinate(style_data);
    classmover(e, e, word, "remove");
}

// * current_number の番号を文字列にして クラス名 完成させて返してくれる関数。
export const number_combinate = (style_data) => {
    let classname = "style";
    for (let i = 0; i < style_data.length; i++) {
        let word = "_" + String(style_data[word]);
        classname += word;
    }
    return classname;
}