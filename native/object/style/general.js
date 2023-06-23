export const wheel_layer_back = () => {
    // * セカンドレイヤーが表示中の場合の処理.
    let waiting_wheel = element(".waiting_wheel");
    waiting_wheel.classList.remove("waiting_wheel");
    waiting_wheel.style.display = "none";
    element(".style_wheel_baselayer").style.opacity = 1;
}

export const wheel_cancel = () => {
    let env = e;
    let wheel = element(".style_wheel");
    let default_display = element(".default_display");

    pointer_switch(the_pointer, "off");
    layerbase_switch(layer_base, "off");
    wheel_switch(wheel, "off");
   
    wheel.style.display = "none";
    default_display.classList.remove("style");
    if (! env.block.classList.contains("same")) {
        focus_checker(env.block);
    }
}

// * 「ジャンル」がクリックされたと分かった際に実行される関数.
export const genre_clicked = (e) => {
    let titles = new Array();
    for (let i = 0; i < e.length; i++) {
        let election = e[i];
        let title;
        if (isObject(election)) {
            // * object だった場合はその key 名を取得する.
            title = Object.keys(election)[0];
        } else {
            // * それ以外はそのまま名前をもらってしまってください。
            title = String(election);
        }
        titles.push(title);
        // * 束ねたこの階層のタイトル名の集合からレイヤーを構成する.
        layer_maker(titles);
        // * 以下次の選択肢へ choose を移す処理.
        // [* 装飾ホイールの起動時は choose クラスを持つ要素が存在しないと思うが.]
        let origin = document.getElementsByClassName("choose")[0];
        origin.classList.remove("choose");
        // * レイヤーをひとつ前に戻れるように印をつけておく.
        origin.classList.add("origin");
        // * 次の階層の最後の要素に対して選択させる。
        // [* container が定義されていない.]
        container.lastElementChild.firstElementChild.classList.add("choose");
    }
}

// * 「項目」がクリックされたと分かった際に実行される関数.
export const value_clicked = (e) => {
 
    let current_wheel_layer = document.getElementsByClassName("current_s_layer")[0]; 
    let position = target_data(e, "style_");
    let nums = position.split("_");
    let you;

    // [* ここは what_is_the_title()] に置き換える.
    for (let i = 0; i < nums.length - 3; i++) {
        // * １つ飛ばしで実行することで階層を下げていく.
        // [* １つ飛ばしすることが正しい処理なのだろうか.]
        if (i % 2 == 0) {
            data_layer_shift(you, i);
        }
    }
    
    // * この時点で you は末端に至っている。
    you = Object.keys(you)[0];
    
    // ---

    // * 装飾ホイールの実利的な影響(func(): 項目ごとの実行関数を取得.)
    let the_function = native_style_funcs[you];
    let target = who_is_target();
    the_function(target);
    // * 同時にスタイリングを付け替え。
    style_changer(target, get("current_states")[2]);

    // ---------------------------------------------------------------------------------------------------------------

    // * 項目を選択したので、前の選択肢のレイヤーに戻る.
    let previous_layer = current_wheel_layer.previousElementSibling;
    previous_layer.classList.add("current_s_layer");
    element(".origin").classList.add("choose");
    current_wheel_layer.remove();
}

// ---------------------------------------------------------------------------------------------------------------

// * クリックされた「ジャンル」に対応する階層のデータを返す関数.
// * 下記 the_process() で実行される.
export const data_layer_shift = (e, f) => {
  let in_process = Object.keys(e)[0];
  let v = in_process[f];
  return v;
}

// * style_ にある番号のリストを用いて最後まで階層を掘る関数.
// * 下記 what_is_the_title() で実行される.
export const the_process = (e) => {
    let title;
    let nums = e.split("_");
    for (let i = 0; i < nums.length - 3; i++) {
        if (i % 2 == 0) {
            data_layer_shift(title, i);
        }
    }
    title = Object.keys(you)[0];
    return title;
}


// * style クラスから、その要素について最後に選択した「項目」をたどって返す関数.
export const what_is_the_title = (e) => {
    let the_dev = "style";
    let classies = e.classList;
    let titles = new Array();
    for (let i = 0; i < classies.length; i++) {
        let yourname = classies[i];
        if (yourname.indexOf(the_dev) != -1) {
            yourname = yourname.replace(the_dev, '');
            let title = the_process(yourname);
            titles.push(title);
        }
    }
    return titles;
}

// ---------------------------------------------------------------------------------------------------------------

// * object かどうかを判定する関数. 
// * そのレイヤーが「ジャンル」なのか「選択項目」なのかを判別する目的.
const isObject = (val) =>  {
    if( val !== null
      && typeof(val) === 'object'
      && val.constructor === Object ) {
      return true;
    }
    return false;
}
