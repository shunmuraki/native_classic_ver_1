// ---------------------------------- * - * - * - * Editable シリーズ * - * - * - * ----------------------------------
import { half_left_width, half_right_width, full_start_scrollwidth, full_end_scrollwidth } from "../base/elements.js";
import { grab_auto, sorter, target_data } from "../base/tools.js";
 

// call the relatest element
// * そのscrollLeft(f)と、対象となる「scrap」(e)を与えるようにする。
// * g で対象が pointer なのか block なのかを知るようにする.
// * h には orange_data を渡す。
export const best_related_element = (e, f, g, h) => {

    let the_elem = null;
    let the_left = 0;
    let scrap = e;
    let orange = scrap.firstElementChild;
    let orange_pointer_list = orange.firstElementChild.firstElementChild;
    let orange_data = h;

    if (g == "block") {

        // scrapの 一番上の sp の中の hor を渡して、その中をループしてあげる。
        let vers = scrap.firstElementChild.nextElementSibling.lastElementChild.children;
    
        // でも pointer が打ててるってことは。その近くにblockは必ず存在するわけだから、
        // 実は引数なんて必要ないのかもしれないよね。
        // * 具体的には、 - 100vw した上で、残りの数を400で割った上での切り捨て番号が、そのchildになるはず。
        // * でもこの時に注意したいのは、 scrollLeftと実際の表示には乖離があるってこと。
        // * 正しいやり方は、おそらく先に scrollLeft に対して + half_left_width をしてあげた上で 残ったのを 400 で破る方法だろうね.        
        let exact_distance = f + half_left_width - window.innerWidth;
        let the_num = Math.round(exact_distance / 400);
        
        // ここで代入.
        the_elem = vers[the_num + 1];

        let boxes_width = 400 * the_num;

        let the_final_num = window.innerWidth + boxes_width - half_left_width;
        the_left = the_final_num;

    } else if (g == "pointer") {
        
        // scrapの orange_space の pointer を調べるようにする
        // orange_data を活用することができたら一番いいんだけどねぇ...
        // * orange_data も渡すか....
        // * 今の scrap の orange_space が持つ orange_num_ を取得後、
        // * orange_data[orange_num_]["left"] で　そのscrapの pointer のscrollLeft 値の集合体が取れる。
        let the_key_num = target_data(orange, "orange_num_");
        let dataset = orange_data[the_key_num]["left"];

        let exact_distance = f;

        // それより小さいものの最大値のやつをとりましょう。
        let original_dataset_min = [];
        for (let i = 0; i < dataset.length; i++) {
            if (dataset[i] <= exact_distance) {
                original_dataset_min.push(dataset[i]);
            }
        }
        let original_dataset_max = [];
        for (let i = 0; i < dataset.length; i++) {
            if (dataset[i] > exact_distance) {
                original_dataset_max.push(dataset[i]);
            }
        }

        let nearly_left = 0;

        if (original_dataset_min.length > 0) {
            nearly_left = Math.max(...original_dataset_min);
        } else if (original_dataset_min.length <= 0) { 
            nearly_left = Math.min(...original_dataset_max);
        }

        let the_name = "scroll_left_" + nearly_left;

        // このクラスを持つpointerを返しましょう。
        the_left = nearly_left;
        // ついでに scrollLeftも。
        let the_pointers = orange_pointer_list.children;
        for (let i = 0; i < the_pointers.length; i++) {
            if (the_pointers[i].classList.contains(the_name)) {
                the_elem = the_pointers[i];
            }
        }
    }

    let final_data = [the_elem, the_left];
    return final_data;
};

// ------------------------------------------------------------------------------------------    

// principle management.
export const principle_management = (e, f) => {
    let scrap = e;
    if (scrap.classList.contains("principle_block")) {
        if ("principle_block" != f) {
            scrap.classList.remove("principle_block");
            scrap.classList.add(f);
        }
    } else if (scrap.classList.contains("principle_pointer")) {
        if ("principle_pointer" != f) {
            scrap.classList.remove("principle_pointer");
            scrap.classList.add(f);
        }
    } 
}

// ------------------------------------------------------------------------------------------    

// バイバイン
export const all_view_changer = (e, f) => {

    if (e.children[0].classList.contains("orange_space")) {
        // 400px 分、orange_line_po, orange_line_st, すべての scrap に所属する hor を等しく動かす。
        let orange = e.firstElementChild;
        let orange_pointer_space = orange.firstElementChild;
        let orange_stripe_space = orange.lastElementChild;
    
        let po_de = orange_pointer_space.scrollLeft;
        orange_pointer_space.scrollLeft = po_de + f;
        
        let st_de = orange_stripe_space.scrollLeft;
        orange_stripe_space.scrollLeft = st_de + f;
    
        // ** 多分これで戦闘がうまく行っていないのでは？？
        for (let i = 0; i < e.children.length; i++) {
            if (i > 0) {
                let hor_de = e.children[i].lastElementChild.scrollLeft;
                e.children[i].lastElementChild.scrollLeft = hor_de + f;
            }
        }
    } else {    
        // ** 多分これで戦闘がうまく行っていないのでは？？
        for (let i = 0; i < e.children.length; i++) {
            let hor_de = e.children[i].lastElementChild.scrollLeft;
            e.children[i].lastElementChild.scrollLeft = hor_de + f;
        }
    }
};

// ------------------------------------------------------------------------------------------    

export function add_orange_space_for_everyone(e) {
    // * たぶんここから間違えてるんだろうね。 sp_cover の先頭につくろうと思ってるの。
    // [ optional 規格の「see」 ], でもどうせ sp_cover で一回全部の規格がぶち壊れるw
    let orange_space = document.createElement("div");
    orange_space.classList.add("orange_space");

    // default for orange_pointer func,
    orange_space.classList.add("now_pointer_s");

    let orange_pointer_zone = document.createElement("div");
    orange_pointer_zone.classList.add("orange_pointer_zone");

    let orange_pointer_line = document.createElement("div");
    orange_pointer_line.classList.add("orange_line");

    orange_pointer_zone.appendChild(orange_pointer_line);
    orange_space.appendChild(orange_pointer_zone);

    let orange_stripe_zone = document.createElement("div");
    orange_stripe_zone.classList.add("orange_stripe_zone");

    let orange_stripe_line = document.createElement("div");
    orange_stripe_line.classList.add("orange_line");

    orange_stripe_zone.appendChild(orange_stripe_line);
    orange_space.appendChild(orange_stripe_zone);

    let fragment = document.createDocumentFragment();

    fragment.appendChild(orange_space);
    // e = (sp_cover) type. なので ...
    e.prepend(fragment);
}

export const pre_pointing_in = (e, f) => {
    // ----------- * --------- SETUP 関連 ----------- * --------- 
    // * とりあえずお尻に pointer_f を設置してあげて、 now_pointer_s に変えた上で　pre_pointer_s も付与する
    // * 基本的にはこれだけでいいはずだよ。    
    let orange_num = target_data(e.firstElementChild, "orange_num_");
    let orange_data = f;
    let orange = e.firstElementChild;
    let orange_pointer_space = orange.firstElementChild;
    let orange_stripe_space = orange.lastElementChild;
    let orange_pointer_space_store = orange_pointer_space.lastElementChild;
    let orange_stripe_space_store = orange_stripe_space.lastElementChild;
       
    if (orange.classList.contains("now_pointer_f")) {

        // *** 一番最後のpointerのクラスが s　なら以下を実行。
        // ** それ以外の場合は、comesinのついている（？）ポインターがさっき追加したやつなんで、それをremoveするし、
        // ** それをデータにも反映させるよ。
        // ** てかそもそもプログラムが走ってない。なぜなら最後が fだから。
        if (orange_pointer_space_store.lastElementChild.classList.contains("orange_pointer_s")) {

            // ----------- * --------- POSITION 関連 ----------- * --------- 
            // * もしよかったら使ってね.
            // let the_position = target_data(orange_pointer_space_store.lastElementChild, "scroll_left_");
        
            // * 全部の横幅を取るためにはどう書くのが正しい？？
            // scrollWidth自体はそこまで間違ってないと思うんだけど（要するに中の要素ってことじゃないのかな？？） 
        
            // ----------- * --------- STRIPE 関連 ----------- * --------- 
            // * 多分前の場面で正しく描画されなかったのは、scrollWidth　という取り方がまずかったからだと思う。
        
            // * ここが間違っているから一番端まで引かれちゃうのかな？？
            // * あとちゃんと線を複製せずに伸ばせているかどうかも確認する必要があるね.

            let start_point = Number(target_data(orange_pointer_space_store.lastElementChild, "scroll_left_"));
            let re_stripe_width = full_end_scrollwidth - start_point;
            orange_stripe_space_store.lastElementChild.style.width = re_stripe_width + "px";
        
            // ----------- * --------- POINTER 関連 ----------- * --------- 
            // ** ここで　orange_pointer 作っちゃう
            let orange_pointer = document.createElement("div");
            orange_pointer.classList.add("orange_pointer");
            orange_pointer.classList.add("orange_pointer_f");
            
            orange_pointer.style.left = full_end_scrollwidth + half_left_width + "px";
            // pointer に num_, scroll_left_
            // * 対応するやつ持ってこないと
            orange_pointer.classList.add("num_" + orange_data[orange_num]["s_count"]);
            // * ここも違う.
            orange_pointer.classList.add("scroll_left_" + full_end_scrollwidth);
            orange_data[orange_num]["left"].push(full_end_scrollwidth);
            // 最初の時点で先頭にいる point の scrollleft をもらえたらそれでいいのかも。
            orange_pointer_space_store.appendChild(orange_pointer);

        } else {
            // **** 今夜の大本命　↓↓↓↓↓
            let the_name = "num_" + orange_data[orange_num]["s_count"];

            for (let i = 0; i < orange_pointer_space_store.children.length; i++) {
                if (orange_pointer_space_store.children[i].classList.contains(the_name)) {
                    orange_pointer_space_store.children[i].remove();
                    let the_remover_keydata = target_data(orange_pointer_space_store.children[i], "scroll_left_");
                    orange_data[orange_num]["left"].splice(orange_data[orange_num]["left"].indexOf(the_remover_keydata), 1);
                }
            }

            for (let i = 0; i < orange_stripe_space_store.children.length; i++) {
                if (orange_stripe_space_store.children[i].classList.contains(the_name)) {
                    orange_stripe_space_store.children[i].remove();
                }
            }
        }

        // ----------- * --------- STATUS 関連 ----------- * --------- 
        // ** 通常ぶる
        orange.classList.remove("now_pointer_f");
        orange.classList.add("now_pointer_s");
        // ** 通常ぶる
        // pre_pointer_out（） へ繋げる。 →→
        orange.classList.add("pre_pointer_s");   
    }

    return orange_data;
}

export const pre_pointing_out = (e, f, g) => {

    let orange_num = target_data(f.firstElementChild, "orange_num_");
    // ** 記述する内容
    // * the_see_centering　について pre_pointing を終えたあとに、
    // * 引数に与えた「下のscrap」において「先頭に pointer_s を設置」する。
    // * 自動的にそのお尻までorange_stripeが引かれて、そこで引き継ぎが終えるので（文脈に揃えることができたので）、
    // * the_see_centeringに当てていた「pre_pointing」を外してあげる

    // 今の要素が pre_pointing_s を持っていたら、
    // f（次の要素） において、先頭に sをおいてあげて、次の地点までを引っ張ってあげる
    // それで今の要素の pre_pointing_s を取り除いてあげて、純粋な now_pointer_s にしてあげる.

    // SETUP ------------------------------------------------------
    let orange_data = g;
    let the_stripe_width = 0;

    let this_orange = e.firstElementChild;

    let orange = f.firstElementChild;
    let orange_pointer_space = orange.firstElementChild;
    let orange_stripe_space = orange.lastElementChild;
    let orange_pointer_space_store = orange_pointer_space.lastElementChild;
    let orange_stripe_space_store = orange_stripe_space.lastElementChild;

    // ***　あくまで下が pre だったら
    if (this_orange.classList.contains("pre_pointer_s"))  {

        // * STRIPE ------------------------------------------------------
        if (orange_pointer_space_store.firstElementChild) {
            // * ここが違うんじゃない？
            let end_point = Number(target_data(orange_pointer_space_store.children[0], "scroll_left_")) + half_left_width; 
            the_stripe_width = end_point - window.innerWidth;
        } else {
            the_stripe_width = full_end_scrollwidth;
        }

        // すでに存在する場合は回避。
        // * 多分ここの書き方がまずいんだよなぁ.........
        // * クラスで管理するようにしようか。
        // ** 下のscrapの先頭が already、すでに先頭埋まっている状態でない場合、先頭に置く、としている。

        function funny_boo() {
                // * POINTER ------------------------------------------------------
                // ** ここで　orange_pointer 作っちゃう
                let orange_pointer = document.createElement("div");
                orange_pointer.classList.add("orange_pointer");
                orange_pointer.classList.add("orange_pointer_s");
                orange_pointer.classList.add("already");
                orange_pointer.style.left = window.innerWidth + "px";
                // pointer に mum_, scroll_left_
                orange_data[orange_num]["s_count"] += 1; 
                orange_pointer.classList.add("num_" + orange_data[orange_num]["s_count"]);
                orange_pointer.classList.add("scroll_left_" + full_start_scrollwidth);
                orange_data[orange_num]["left"].push(full_start_scrollwidth);
                // stripe に num_, scroll_left_
                orange_pointer.classList.add("num_" + orange_data[orange_num]["s_count"]);
                // 最初の時点で先頭にいる point の scrollleft をもらえたらそれでいいのかも。
                orange_pointer_space_store.prepend(orange_pointer);
    
                // * STRIPE ------------------------------------------------------
                // orange_stripe の話に移ってる。
                let orange_stripe = document.createElement("div");
                orange_stripe.classList.add("orange_stripe");
                orange_stripe.classList.add("num_" + orange_data[orange_num]["s_count"]);
                orange_stripe.style.width = the_stripe_width + "px";
                orange_stripe.style.left = window.innerWidth + "px";
                orange_stripe_space_store.prepend(orange_stripe);
    
                orange.classList.remove("now_pointer_s");
                orange.classList.add("now_pointer_f");
        }

        if (orange_pointer_space_store.children[0]) {            
            if (! orange_pointer_space_store.children[0].classList.contains("already")) {
                funny_boo();
            } 
        } else {
            funny_boo();
        }

        this_orange.classList.remove("pre_pointer_s");
    }

    return orange_data;
}


// *********** つける係り
export function orange_pointer_make(e, f) {
    let see = e;
    let orange_data = f;
    // ↓ 今いじる　orange_space.（edit 実行時にすでに挿入済みのため）
    // **** これが正しい。 - - orange_space　のこと。
    let orange = see.firstElementChild;
    let orange_pointer_space = orange.firstElementChild;
    let orange_stripe_space = orange.lastElementChild;
    let orange_pointer_space_store = orange_pointer_space.lastElementChild;
    let orange_stripe_space_store = orange_stripe_space.lastElementChild;
    let the_o_num = target_data(orange, "orange_num_");
    
    // * 実際に pointer を打つ時の場所でしょ？とっても大事じゃん。
    // *　前の話を踏まえると、orange_space.scrollLeft - 400 が　いつも pointer が打たれる場所なんじゃないかな
    let orange_pointer_left = orange_pointer_space.scrollLeft;

    // ** ここで　orange_pointer 作っちゃう
    let orange_pointer = document.createElement("div");
    orange_pointer.classList.add("orange_pointer");

    // * 一度Comesinを託した方がいいかもしれないね。どうせComesin打つわけだから。
    
    // * 誤適用
    orange_pointer.style.left = orange_pointer_left + half_left_width + "px";

    // scrollLeft は pointer 自身にも持たせておく
    let the_sl_po = "scroll_left_" + orange_pointer_left;
    orange_pointer.classList.add(the_sl_po);
    
    // * . ひと工夫 . *
    // このあたりでorangeの正しい場所に insert(append)する必要がありそうだ。
    // 多分　適当な scrollleft （s, p も区別しないし num_ も包含しないような）のリストを用意して、その中で今回打つscrollleftが何番目なのか、昇順に並び替えた時に考えて、その値を踏まえて children[??] に .before, or .after する。
    // a.indexOf(Math.max(...a)) ← みたいな。
    // opac を取り除く。
    let compare_classic = Object.create(orange_data[the_o_num]["left"]);

    compare_classic.push(orange_pointer_left);
    compare_classic.sort(sorter);
    let how_big = compare_classic.indexOf(orange_pointer_left);

    function funda_main() {
        // * 書き方を改める必要がある。
        // * たぶん正しくは「you_of_love が存在していて、かつそれ」
        // * 最終的に実現したいのは「you_of_loveがfだった場合、点を打てなくしたい」ということ。
        // * 

        // ***** ------  興味深いことは、この時点でもう　点は打ってある　ということ。   ---- ********* -------
        // ***** ------  興味深いことは、この時点でもう　点は打ってある　ということ。   ---- ********* -------
        // ***** ------  興味深いことは、この時点でもう　点は打ってある　ということ。   ---- ********* -------
        
        // 追加した orange_pointer については再取得する方が安全な気がする。

        // * * now_pointer_s を持っていたら
        if (orange.classList.contains("now_pointer_s")) {
            // * * * * 正しいscrollLeftに対して、absoluteでorange_pointer_sを追加
            // * * * * もし このhor の中でそれより　scrollLeft　が大きい pointer_s が存在したら、そこの座標までの orange_stripeを、そうじゃなかったら最後までそれを引く。
            // * * * * * scrollLeftデータベースを hor(target) 単位で用意し、 orange が走るたびに参照・更新をしよう。
            // * * * * * その pointer_s の scrollLeft より大きい値の中で最小のscrollLeftを取得して、両者の差分を orange_stripe に適応させる.
            // * * * * orange_pointer には scrollLeft の値も与えておく
            // -- hor についている pointer_s_count を取得して、 +1 の値を orange_pointer と 生成したstripe と hor にセット
            // * * * * * そのhor に now_pointer_f クラスがセットされる
            // centeringを基準にしてscrollLeftなどを計測するようにします。
            orange_pointer.classList.add("orange_pointer_s");

            // num_ を揃えてあげたり、 orange_space の counter クラスも refresh しましょう.
            orange_data[the_o_num]["s_count"] += 1;

            // ↓　これは stirpe でもそのまま使い回せます。
            // let the_s_c = "num_" + orange_data[the_o_num]["s_count"];
            orange_pointer.classList.add("num_" + orange_data[the_o_num]["s_count"]);

            // 最初にこの hor(scrap) のnumクラスを取得しておかないと。　/ いや、orange管轄にしよう。
            // まずこの orange_spaceが何番目かを取得する
            // 外部の関数を利用
            let this_orange_data = Object.create(orange_data[the_o_num]["left"]);

            // 大きかったものたちの抽出用リストを作っておく。
            // let orange_lager_data = [];
            let orange_lager_data_classic = [];
            // ループで観察して大きいやつを見つけた時に処理を実行する
            for (let i = 0; i < this_orange_data.length; i++) {
                // i が　key だと思ってる。
                if (this_orange_data[i] > orange_pointer_left) {
                    // = scrollleft, num_ とともに格納.
                    // orange_lager_data[i] = this_orange_data;
                    orange_lager_data_classic.push(this_orange_data[i]);
                }
            }

            // orange_stripe の話に移ってる。
            let orange_stripe = document.createElement("div");
            orange_stripe.classList.add("orange_stripe");

            // ****** はい scrollLeft の使い方おかしい人きましたw
            orange_stripe.style.left = orange_pointer_left + half_left_width + "px";

            // pointer_s と同じ num_ をあてる.
            // orange_stripe.classList.add(the_s_c);
            orange_stripe.classList.add("num_" + orange_data[the_o_num]["s_count"]);
            if (orange_lager_data_classic.length == 0) {
                // scrollLeftでより大きいものがなかったので、一番最後まで引っ張ってあげる場合.
                // orange_stripe.style.width = orange_stripe_space.scrollWidth - orange_pointer_left + "px";
                orange_stripe.style.width = full_end_scrollwidth - orange_pointer_left + "px";
                
            } else {
                // その中の最小を見つけてあげる
                let the_orange_lagerone = Math.min(...orange_lager_data_classic);
                // ここでは　num_ まで突き止める必要はない。
                orange_stripe.style.width = the_orange_lagerone - orange_pointer_left + "px";
            }

            // 挿入
            orange_stripe_space_store.appendChild(orange_stripe);
            
            // * * now_pointer_f を持っていたら
            } else if (orange.classList.contains("now_pointer_f")) {
                // * * * * 正しいscrollLeftに対して、absoluteでorange_pointer_fを追加
                // * * * * hor についている pointer_s_count を取得して、 その値を orange_pointer と hor の pointer_f_count にセット
                // * * * * orange_pointer には scrollLeft の値も与えておく
                // * * * * 同じ値を持つ orange_stripe を取得して、リサイズ。（scrollLeftの差分で算出）
                // * * * * * そのhor に now_pointer_s クラスがセットされる      
                orange_pointer.classList.add("orange_pointer_f");

                // ↓　これは stirpe でもそのまま使い回せます。
                orange_pointer.classList.add("num_" + orange_data[the_o_num]["s_count"]);
        
                // 外部の関数を用いて 本pointer_f と同じ num_ を共有する stripe, pointer_s を取得
                let the_comp_stripe = grab_auto(orange_pointer)[0];
                let the_comp_pointer = grab_auto(orange_pointer)[1];

                // pointer_s 側の　scrollLeft position.
                let the_comp_s_pos = Number(target_data(the_comp_pointer, "scroll_left_"));
            
                // * これで書けてるって思ってるんだろうけど.
                the_comp_stripe.style.width = orange_pointer_left - the_comp_s_pos + "px";
            }
            // 最後に s or f を切り替える
            orange.classList.toggle("now_pointer_s");
            orange.classList.toggle("now_pointer_f");
    }

    // ** でもこの 0 の場合にalreadyをつける　っていう書き方も気に入らないなぁ...
    // } else if (orange_pointer_space_store.childElementCount > 0) {
    // *　そもそも chilrenCount == 0 であった場合, そうでなかった場合で条件分岐するのが最初だ。
    // * で、 == 0 だった場合は already クラスの操作と一緒に appendChild で pointer が打てる。
    // * そうじゃなかった場合（複数がすでに存在していた場合）は、その中で you_of_loveが存在してかつf を持っている場合を考え
    // ** そうじゃないケースの身、 .after で pointer を追加するようにする.
    // * えっ、ていうか how_big の次のやつが orange_pointer_f を持っているかどうかの判定で済みそうじゃない？？？
    function fif() {
        if (orange_pointer_space_store.childElementCount == 0) {
            orange_pointer_space_store.appendChild(orange_pointer);
        } else {
            if (orange_pointer_space_store.children[how_big]) {
                orange_pointer_space_store.children[how_big].before(orange_pointer);   
            } else {
                orange_pointer_space_store.children[how_big - 1].after(orange_pointer);   
            }
        }
        
        orange_data[the_o_num]["left"].push(orange_pointer_left);

        let comesin = document.querySelector(".comesin");
        if (comesin) {
            comesin.classList.remove("comesin");
        }
        orange_pointer.classList.add("comesin");
        funda_main();
    }
    // これは必要な条件分岐だったと思うんだよね.
    // * でももう数合わせは必要ないのでは？？？

    // ** 中途半端なケース
    if (how_big + 1 < compare_classic.length) {
        if (orange_pointer_space_store.children[how_big].classList.contains("orange_pointer_s")) {

            // ** これも必要な条件分岐だが、その中のopac_cam関連はすべてなくせるはず.
            // 近すぎると点が打てないようにする。アラートとか出せるようにしたいね、最後は。混乱すると思うから。
            if (orange_pointer_space_store.children[how_big - 1]) {
                let beside_before_gap = orange_pointer_left - Number(target_data(orange_pointer_space_store.children[how_big - 1], "scroll_left_"));
                if (beside_before_gap > 50) {
                    fif();
                } 
            } else {
                fif();
            }
            let beside_after_gap = Number(target_data(orange_pointer_space_store.children[how_big], "scroll_left_")) - orange_pointer_left;                    
            if (beside_after_gap > 50) {
                fif();
            } 
        }

        // ** 一番上か一番下のケース
    } else if (how_big == 0 || how_big == compare_classic.length - 1) {
        if (orange_pointer_space_store.children[how_big - 1]) {
            let beside_before_gap = orange_pointer_left - Number(target_data(orange_pointer_space_store.children[how_big - 1], "scroll_left_"));
            if (beside_before_gap > 50) {
                fif();
            } 
        } else {
            fif();
        }
    }
    
    return orange_data;
}

// *********** 消す係り
// ** ここ function らしくしたい。w
// space や　左右の移動て消しておく。
export function delete_orange_p(e) {
    let orange_data = e;
    let comesin = document.querySelector(".comesin");

    if (comesin) {
        let orange = comesin.parentElement.parentElement.parentElement;
        let the_o_num = Number(target_data(orange, "orange_num_"));

        // delete との兼ね合い
        // ここで取れる pointer は、必ず「選択中のPointer」なので、これを削除します。
        // 同時に同じ num を共有するものについても、
        let grab_list = grab_auto(comesin);

        // あと忘れちゃいけないのはデータの更新ですよね。
        // 管理しているのは　orange_data, scroll_left_esc.
        // * orange_data
        // 消去されるcomesinが持つ scroll_left_ を取得して、その番号を削除する。
        // あとこっちは count の方も削除する必要があると思う。 sだったらね。
        let the_remover_keydata = Number(target_data(comesin, "scroll_left_"));

        // 新たにここにpointerが打たれないように。
        // ちゃんと dictionary でもこの消し方で正しくできているのかが不安。。。。
        // * scroll_left_esc
        // 消去されるcomesinが持つ scroll_left_ を取得して、その番号を scroll_left_escから削除する。
        orange_data[the_o_num]["left"].splice(orange_data[the_o_num]["left"].indexOf(the_remover_keydata), 1);

        //* 多分相方を消せていないことが問題なんだと思う.

        // 描画サイドの削除
        comesin.classList.add("opac_cam");
        comesin.style.opacity = 0;
        grab_list[0].remove();

        // あと　s f　でポインターを打てる打てないのくだりがあるからそれについても対応せんといけないかも。
        if (comesin.classList.contains("orange_pointer_f")) {
            comesin.classList.toggle("orange_pointer_f");
            comesin.classList.toggle("orange_pointer_s");
        }

        // 相手がいなかったら、その前のポイントドロップで　now_ が変化したことになるので、それを修正する必要があると。
        // 片方落ちていたら
        // それはそういうことだ。
        if (grab_list[1] == null) {
            orange.classList.toggle("now_pointer_s");
            orange.classList.toggle("now_pointer_f");                
        } else {
            grab_list[1].remove();
            orange_data[the_o_num]["left"].splice(orange_data[the_o_num]["left"].indexOf(Number(target_data(grab_list[1], "scroll_left_"))), 1);
        }
    }

    return orange_data;
}


// *** 実行する場所から考えましょう。。
// * 本来はあんまり関係なくても、一応　上下、そしてメインの左右かな。 あと space key.
// * 上下左右 ...　外してつける
// * space .. ただ外す。
// ** pointer のクラス　comesin の管理
// ****** comesin による orange_pointer 間の左右移動 + key="C"によるorange群の削除
// // 前後、クラスをtoggleして移動.
// // ArrowRightの場合
export const comesin_management = (e, f, g) => {
    if (document.querySelector(".comesin")) {

        if (e == "top") {

            let next_one = g.previousElementSibling.firstElementChild.firstElementChild.firstElementChild.lastElementChild;
            f.classList.toggle("comesin");
            next_one.classList.toggle("comesin");

        } else if (e == "left") {

            let next_one = f.previousElementSibling;
            f.classList.toggle("comesin");
            next_one.classList.toggle("comesin");

        } else if (e == "bottom") {

            let next_one = g.nextElementSibling.firstElementChild.firstElementChild.firstElementChild.firstElementChild;
            f.classList.toggle("comesin");
            next_one.classList.toggle("comesin");

        } else if (e == "right") {

            let next_one = f.nextElementSibling;
            f.classList.toggle("comesin");
            next_one.classList.toggle("comesin");

        } else if (e == "space") {

            f.classList.toggle("comesin");
            f.classList.toggle("pre_comesin");

        }
    }
}