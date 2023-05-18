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

// * 「ジャンル」がクリックされたと分かった際に実行される関数.
const genre_clicked = (e) => {
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
        let origin = document.getElementsByClassName("choose")[0];
        origin.classList.remove("choose");
        // * レイヤーをひとつ前に戻れるように印をつけておく.
        origin.classList.add("origin");
        // * 次の階層の最後の要素に対して選択させる。
        container.lastElementChild.firstElementChild.classList.add("choose");
    }
}

// * 「項目」がクリックされたと分かった際に実行される関数.
const value_clicked = (e) => { 
    let current_s_layer = document.getElementsByClassName("current_s_layer")[0]; 
    let position = target_data(e, "style_");
    let nums = position.split("_");
    let you;
    for (let i = 0; i < nums.length - 3; i++) {
        // * １つ飛ばしで実行することで階層を下げていく.
        if (i % 2 == 0) {
            data_layer_shift(you, i);
        }
    }
    // * この時点で you は末端に至っている。
    you = Object.keys(you)[0];
    // * 装飾ホイールの実利的な影響(func(): 項目ごとの実行関数を取得.)
    let func = native_style_funcs[you];
    let target = who_is_target();
    func(target);
    // * 同時にスタイリングを付け替え。
    style_changer(target, get("current_states")[2]);
    let previous_layer = current_s_layer.previousElementSibling;
    previous_layer.classList.add("current_s_layer");
    document.querySelector(".origin").classList.add("choose");
    // * 項目を選択したので、前の選択肢のレイヤーに戻る.
    current_s_layer.remove();
}

// * 「ジャンル」か「項目」かによらず、選択肢がクリックされた際に実行される関数.
// * 「ジャンル」なら genre_clicked() を、「項目」なら value_clicked() を実行する.
export const style_choose = () => {
    let choose = document.getElementsByClassName("choose")[0];
    let order = choose.parentElement.children.indexOf(choose);    
    let title = String(choose.textContent);
    let v = current_states[0][order];
    if (isObject(v)) {
        // * 選択したのが「ジャンル」だった場合.
        genre_clicked(v);
        // * states を同期.
        set("current_states", s => s[0] = v);
        set("current_states", s => s[1] = title);
        set("current_states", s => s[2].push(order));
    } else {
        // * 選択したのが「項目」だった場合. 
        value_clicked(v);
        // * states を同期.
        set("current_states", s => s = get("previous_states"));
    }
}  
