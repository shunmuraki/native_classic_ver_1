// 他はざっくり書けた。ここが長くなりそう。
// choose が選択された時に実行される、根幹となる関数。
// まずは choose クラスを持つ要素を取得することから始めましょう。
export const running_root = () => {
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
        set("current_states", s => s[0] = v);
        set("current_states", s => s[1] = title);
        set("current_states", s => s[2].push(order));
    } else {
        // --- 中身がなかったら
        // ---- B を実行する
        running_b(v);
        // 最新の回想を保存
        set("current_states", s => s = get("previous_states"));
    }
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
    style_changer(target, get("current_states")[2]);

    let previous_layer = current_s_layer.previousElementSibling;
    previous_layer.classList.add("current_s_layer");
    document.querySelector(".origin").classList.add("choose");
    // ここでも current_zone とか title を更新する必要があるのでは？
    // あと回帰するケースがああるなら previous_title がずれていきそうで怖いなぁ。
    current_s_layer.remove();
}