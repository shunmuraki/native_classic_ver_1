import { target_data, grab_auto } from "../function/tool.js";
import { wheel_positioning } from "./general.js";
import { blocksize, half_left_width, full_end_scrollwidth, full_start_scrollwidth, window_height } from "../data/constant.js";

// ポインターやブロックからして一番近いブロックかポインターを検出する関数.
export const best_related_element = (e, f, g, h) => {

    let the_elem = null;
    let the_left = 0;
    let scrap = e;
    let orange = scrap.firstElementChild;
    let orange_pointer_list = orange.firstElementChild.firstElementChild;
    let orange_data = h;

    // orange_data が修正ポイントの中心になりそうだね。

    if (g == "block") {
        let vers = scrap.firstElementChild.nextElementSibling.lastElementChild.children;
        let exact_distance = f + half_left_width - window.innerWidth;
        let the_num = Math.round(exact_distance / blocksize);
        the_elem = vers[the_num + 1];

        let boxes_width = blocksize * the_num;
        let the_final_num = window.innerWidth + boxes_width - half_left_width;
        the_left = the_final_num;

    } else if (g == "pointer") {
    
        // 今の scrap の orange_space が持つ orange_num_ を取得後、orange_data[orange_num_]["left"] で　そのscrapの pointer のscrollLeft 値の集合を取得して最も近いpointerを見つけ出す。
        let the_key_num = target_data(orange, "orange_num_");
        let dataset = get("orange_data")[the_key_num]["left"];
        let exact_distance = f;

        // それより小さいものの中で最大の値を取得. これが最も近い場所にあるポインターのscrollLeft.
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

        // DOMにおいて予め pointer はscrollLeftの値順に並べてあるため、データの中の「何番目」とそれが一致する.
        if (original_dataset_min.length > 0) {
            nearly_left = Math.max(...original_dataset_min);
        } else if (original_dataset_min.length <= 0) { 
            nearly_left = Math.min(...original_dataset_max);
        }

        let the_name = "scroll_left_" + nearly_left;
        the_left = nearly_left;
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

// 今がポインター移動かブロック移動かを管理.
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

// scrapやsp_cover内のスクロール位置をすべて最適化する関数.
export const all_view_changer = (e, f) => {
    if (e.children[0].classList.contains("orange_space")) {
        let orange = e.firstElementChild;
        let orange_pointer_space = orange.firstElementChild;
        let orange_stripe_space = orange.lastElementChild;
    
        let po_de = orange_pointer_space.scrollLeft;
        orange_pointer_space.scrollLeft = po_de + f;
        
        let st_de = orange_stripe_space.scrollLeft;
        orange_stripe_space.scrollLeft = st_de + f;

        for (let i = 0; i < e.children.length; i++) {
            if (i > 0) {
                let hor_de = e.children[i].lastElementChild.scrollLeft;
                e.children[i].lastElementChild.scrollLeft = hor_de + f;
            }
        }
    } else {    
        for (let i = 0; i < e.children.length; i++) {
            let hor_de = e.children[i].lastElementChild.scrollLeft;
            e.children[i].lastElementChild.scrollLeft = hor_de + f;
        }
    }
};


// ---------------------------------- タイマー処理 ---------------------------------- 

// * the_timeout から独立。
// setTimeout は外に出したらいいか？ func - return か？

// 引数に渡す必要があるものについてリストにしてほしい。
// scrap, hor. pause_when, play_when, the_seeking_time

// 厳密にはまだ引数の部分は接続し切れてないけどね。
export const the_timeout = (e, f, g, h, j) => {
    // push までをセットにしたいかな。
    let scrap = e;
    let hor = f;
    let pause_when = g;
    let play_when = h;
    let the_seeking_time = j;

    // 核となるタイマー処理.
    let s_timeout = setTimeout(() => {    
        let centering_you = document.getElementsByClassName("new_layer_centering")[0];
        if (centering_you.nextElementSibling && scrap.classList.contains("playing")) {
            let next_one_is_you = centering_you.nextElementSibling;
            let the_block_num = Math.floor((hor.scrollLeft + half_left_width - window.innerWidth) / blocksize);
            centering_marker(centering_you, next_one_is_you, "new_layer_centering");
            is_it_same_series(next_one_is_you);
            
            // 再帰
            set_timeout();
            
            centering = document.getElementsByClassName("new_layer_centering")[0];
    
            // このあたりをループにする connected に対応させる.
            for (let i = 0; i < scrap.children.length; i++) {
                // orange_space を弾く.
                if (i > 0) {
                    let horizon = scrap.children[i].lastElementChild;
                    for (let o = 0; o < horizon.children.length; o++) {
                        let the_block = horizon.children[the_block_num + 2];
                        let the_special_cov = which_special_is(the_block);
    
                        if (the_special_cov) {
                            if (! the_special_cov.isEqualNode(which_special_is(centering))) {
                                // 新しいspecial_covが台頭する時.
                                // special_cov = which_special_is(centering);                                            
    
                                the_clear_timeout();
                                the_clear_interval();
    
                                let player;
                                if (the_special_cov.lastElementChild) {
                                    if (the_special_cov.lastElementChild.tagName == "IFRAME") {
                                        player = yt_player_getter(the_special_cov.lastElementChild); 
                                    }
                                }

                                // これって１秒ごとに切り替わったかどうかをチェックしてるってこと？
                                // 5秒の setTime の間に？
                                // 次の要素があることを確認してから実行をしたいんだと思う。
                                // なかなか粋な計らいだと感じたが？
                                setTimeout(() => {
                                    if (player) {
                                        player.pauseVideo();
                                        let the_time = yt_resetter();
                                        player.seekTo(the_time);
                                        player.playVideo();
                                    }        
    
                                    // この setTimeout １秒分を考慮する.
                                    let ms = pause_when - play_when;
                                    // 4秒ってこと？？
                                    the_seeking_time = (blocktime * 1000) - ms;
                                    set_timeout();
                                    set_interval();
                                }, 1000)
                            }
                        }
                    }
                }
            }
        } else {
            // variable
            // timeoutArray についても読み込む必要があったりするよね.
            the_clear_timeout();
        }
    }, the_seeking_time);

    // タイマー処理を返す。
    return s_timeout;
}

// the_interval から外部化したタイマー処理
// scrap, hor, the_scrolled_distance
export const the_interval = (e, f) => {
    
    let scrap = e;
    let hor = f;

    let s_interval = setInterval(() => {
        all_view_changer(scrap, blocksize / blocktime);
        let the_block_num = Math.floor((hor.scrollLeft + half_left_width - window.innerWidth) / blocksize);                        
        let the_pri_distance = window.innerWidth + (the_block_num * blocksize) - half_left_width;
                                        
        // 現在の、実際のhorのscrollLeft とそれがどれくらい離れているかの算出.
        let the_gap =  hor.scrollLeft - the_pri_distance;
        
        // actuar の変化処理については connected の場合を想定して scrap 内の　sp - hor でループさせる必要がある.
        for (let i = 0; i < scrap.children.length; i++) {
            // orange_space を弾く.
            if (i > 0) {
                let horizon = scrap.children[i].lastElementChild;
                for (let o = 0; o < horizon.children.length; o++) {
                    let the_block = horizon.children[the_block_num + 1];
                    let the_special_cov = which_special_is(the_block);
                    // 自動シーキング中のacutar 描画.    
                    if (the_block.classList.contains("actuar_st")) {
                        let the_actuar_distance = Math.floor(Number(target_data(the_block, "actuar_time_")));
                        if (the_gap > the_actuar_distance - 10) {
                            if (the_special_cov) {
                                the_special_cov.lastElementChild.style.setProperty('opacity', 1, 'important');
                            } else {
                                the_block.lastElementChild.style.setProperty('opacity', 1, 'important');
                            }
                        }
                    } else if (the_block.classList.contains("actuar_en")) {
                        let the_actuar_distance = Math.floor(Number(target_data(the_block, "actuar_time_")));
                        if (the_gap > the_actuar_distance - 10) {
                            if (the_special_cov) {
                                the_special_cov.lastElementChild.style.setProperty('opacity', 0.5, 'important');
                            } else {
                                the_block.lastElementChild.style.setProperty('opacity', 0.5, 'important');
                            }
                        }
                    }
                }   
            }
        }
    
        if (hor.scrollLeft > full_end_scrollwidth - 110) {
            // variable
            if (get("intervalArray").length > 0) {
                the_clear_interval();
            }
    
            scrap.classList.remove("playing");
            scrap.classList.add("pausing");
        }
    
        set("the_scrolled_distance", s => s + 1);
    
    }, 1000);

    return s_interval;
}


// 二大タイマー処理をここへ。
export const set_timeout = () => {
    // new する必要があるかも.
    set("timeoutArray", s => s.push(the_timeout()));
}

export const set_interval = () => {
    // new する必要があるかも.
    set("intervalArray", s => s.push(the_interval()));
}


export const the_clear_timeout = () => {
    // 戻り値を取得しつつ、shift() 実行後の timeoutArray を取得しておく。
    let array = get("timeoutArray");
    let the_v = timeout.shift();
    set("timeoutArray", s => s = array);
    // variable
    clearTimeout(the_v);
}

export const the_clear_interval = () => { 
    // 戻り値を取得しつつ、shift() 実行後の timeoutArray を取得しておく。
    let array = get("intervalArray");
    let the_v = array.shift();
    set("intervalArray", s => s = array);
    // variable
    clearTimeout(the_v);
}


// ---------------------------------- タイマー処理 ---------------------------------- 


// orange_space を生成・追加する関数.
export function add_orange_space_for_everyone(e) {
    let orange_space = document.createElement("div");
    orange_space.classList.add("orange_space");
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
    e.prepend(fragment);
}

// 移動元のorange_spaceにて s - f の関係が完結していない場合の処理.
export const pre_pointing_in = (e, f) => {
    
    let orange_num = target_data(e.firstElementChild, "orange_num_");
    let orange = e.firstElementChild;
    let orange_pointer_space = orange.firstElementChild;
    let orange_stripe_space = orange.lastElementChild;
    let orange_pointer_space_store = orange_pointer_space.lastElementChild;
    let orange_stripe_space_store = orange_stripe_space.lastElementChild;
       
    if (orange.classList.contains("now_pointer_f")) {

        // 以下一番最後のpointerのクラスが s なら以下を実行.
        if (orange_pointer_space_store.lastElementChild.classList.contains("orange_pointer_s")) {

            let start_point = Number(target_data(orange_pointer_space_store.lastElementChild, "scroll_left_"));
            let re_stripe_width = full_end_scrollwidth - start_point;
            orange_stripe_space_store.lastElementChild.style.width = re_stripe_width + "px";
            let orange_pointer = document.createElement("div");
            orange_pointer.classList.add("orange_pointer");
            orange_pointer.classList.add("orange_pointer_f");        
            orange_pointer.style.left = full_end_scrollwidth + half_left_width + "px";
            orange_pointer.classList.add("num_" + get("orange_data")[orange_num]["s_count"]);
            orange_pointer.classList.add("scroll_left_" + full_end_scrollwidth);

            // NEW !!!!
            set("orange_data", s => s[orange_num]["left"].push(full_end_scrollwidth));
            orange_pointer_space_store.appendChild(orange_pointer);

        } else {
            
            let the_name = "num_" + get("orange_data")[orange_num]["s_count"];
            for (let i = 0; i < orange_pointer_space_store.children.length; i++) {
                if (orange_pointer_space_store.children[i].classList.contains(the_name)) {
                    orange_pointer_space_store.children[i].remove();
                    let the_remover_keydata = target_data(orange_pointer_space_store.children[i], "scroll_left_");

                    // NEW !!!!!
                    set("orange_data", s => s[orange_num]["left"].splice(s[orange_num]["left"].indexOf(the_remover_keydata), 1));
                }
            }
            for (let i = 0; i < orange_stripe_space_store.children.length; i++) {
                if (orange_stripe_space_store.children[i].classList.contains(the_name)) {
                    orange_stripe_space_store.children[i].remove();
                }
            }

        }
        
        // 通常の状態を模す.
        orange.classList.remove("now_pointer_f");
        orange.classList.add("now_pointer_s");     
        // pre_pointer_out（） へ繋げる.
        orange.classList.add("pre_pointer_s");   
    }
}


// s - f　の関係を pre_pointer_in で scrap 内は解消したものの、直下のscrapに本来は orange_sripe が全体へ続くはずなので、これを標準的なpointerの追加によってクリアする処理.
export const pre_pointing_out = (e, f, g) => {

    let orange_num = target_data(f.firstElementChild, "orange_num_"); 
    let the_stripe_width = 0;
    let this_orange = e.firstElementChild;
    let orange = f.firstElementChild;
    let orange_pointer_space = orange.firstElementChild;
    let orange_stripe_space = orange.lastElementChild;
    let orange_pointer_space_store = orange_pointer_space.lastElementChild;
    let orange_stripe_space_store = orange_stripe_space.lastElementChild;

    // 直下のscrpが pre_pointer_s クラスを持っていたら.
    if (this_orange.classList.contains("pre_pointer_s"))  {
        if (orange_pointer_space_store.firstElementChild) {
            let end_point = Number(target_data(orange_pointer_space_store.children[0], "scroll_left_")) + half_left_width; 
            the_stripe_width = end_point - window.innerWidth;
        } else {
            the_stripe_width = full_end_scrollwidth;
        }

        function funny_boo() {
                let orange_pointer = document.createElement("div");
                orange_pointer.classList.add("orange_pointer");
                orange_pointer.classList.add("orange_pointer_s");
                orange_pointer.classList.add("already");
                orange_pointer.style.left = window.innerWidth + "px";

                // NEW!!!!
                set("orange_data", s => s[orange_num]["s_count"] += 1);
                orange_pointer.classList.add("num_" + orange_data[orange_num]["s_count"]);
                orange_pointer.classList.add("scroll_left_" + full_start_scrollwidth);

                // NEW ~~~~~~
                set("orange_data", s => s[orange_num]["left"].push(full_start_scrollwidth));
                
                orange_pointer.classList.add("num_" + get("orange_data")[orange_num]["s_count"]);
                orange_pointer_space_store.prepend(orange_pointer);
    
                let orange_stripe = document.createElement("div");
                orange_stripe.classList.add("orange_stripe");
                orange_stripe.classList.add("num_" + get("orange_data")[orange_num]["s_count"]);
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
}


// orange_pointerの生成・追加をする関数.
export function orange_pointer_make(e, f) {
    
    let see = e;
    let orange = see.firstElementChild;
    let orange_pointer_space = orange.firstElementChild;
    let orange_stripe_space = orange.lastElementChild;
    let orange_pointer_space_store = orange_pointer_space.lastElementChild;
    let orange_stripe_space_store = orange_stripe_space.lastElementChild;
    let the_o_num = target_data(orange, "orange_num_");
    
    // 実際に pointer を打つ時の場所.
    let orange_pointer_left = orange_pointer_space.scrollLeft;
    let orange_pointer = document.createElement("div");
    orange_pointer.classList.add("orange_pointer");
    orange_pointer.style.left = orange_pointer_left + half_left_width + "px";

    // scrollLeft は pointer 自身にも持たせておく.
    let the_sl_po = "scroll_left_" + orange_pointer_left;
    orange_pointer.classList.add(the_sl_po);
    
    // orange_pointerがDOMにてscrollLeftの値順に挿入されるように工夫. (relatestなポインターを発見しやすくする狙い.)
    let compare_classic = Object.create(get("orange_data")[the_o_num]["left"]);
    compare_classic.push(orange_pointer_left);
    compare_classic.sort(sorter);
    let how_big = compare_classic.indexOf(orange_pointer_left);

    function funda_main() {
        // [処理内容]
        // now_pointer_s を持っていたら
        // 正しいscrollLeftに対して、absoluteでorange_pointer_sを追加.
        // もし このhor の中でそれより　scrollLeft　が大きい pointer_s が存在したら、そこの座標までの orange_stripeを、そうじゃなかったら最後までそれを引く.
        // scrollLeftデータベースを hor(target) 単位で用意し、 orange が走るたびに参照・更新.
        // その pointer_s の scrollLeft より大きい値の中で最小のscrollLeftを取得して、両者の差分を orange_stripe に適応させる.
        // hor についている pointer_s_count を取得して、 +1 の値を orange_pointer と 生成したstripe と hor にセット.
        // そのhor に now_pointer_f クラスをセット.
        // centeringを基準にしてscrollLeftなどを計測.
        if (orange.classList.contains("now_pointer_s")) {
            orange_pointer.classList.add("orange_pointer_s");
            set("orange_data", s => s[the_o_num]["s_count"] += 1);
            orange_pointer.classList.add("num_" + get("orange_data")[the_o_num]["s_count"]);
            
            // 大きかったものたちの集合.
            let this_orange_data = Object.create(get("orange_data")[the_o_num]["left"]);
            let orange_lager_data_classic = [];
            
            for (let i = 0; i < this_orange_data.length; i++) {
                if (this_orange_data[i] > orange_pointer_left) {
                    orange_lager_data_classic.push(this_orange_data[i]);
                }
            }

            // orange_stripeサイドの処理.
            let orange_stripe = document.createElement("div");
            orange_stripe.classList.add("orange_stripe");
            orange_stripe.style.left = orange_pointer_left + half_left_width + "px";

            // pointer_s と同じ num_ をあてる.
            orange_stripe.classList.add("num_" + get("orange_data")[the_o_num]["s_count"]);
            if (orange_lager_data_classic.length == 0) {
                // scrollLeftでより大きいものがなかったので、一番最後まで引っ張ってあげる場合.
                orange_stripe.style.width = full_end_scrollwidth - orange_pointer_left + "px";
                
            } else {
                // これらの中の最小を見つける.
                let the_orange_lagerone = Math.min(...orange_lager_data_classic);
                orange_stripe.style.width = the_orange_lagerone - orange_pointer_left + "px";
            }
            // 挿入
            orange_stripe_space_store.appendChild(orange_stripe);
            
            // [処理内容]
            // now_pointer_f を持っていたら
            // 正しいscrollLeftに対して、absoluteでorange_pointer_fを追加.
            // hor についている pointer_s_count を取得して、 その値を orange_pointer と hor の pointer_f_count にセット.
            // orange_pointer には scrollLeft の値も与えておく.
            // 同じ値を持つ orange_stripe を取得して、リサイズ。（scrollLeftの差分で算出）.
            // そのhor に now_pointer_s クラスがセットされる.
            } else if (orange.classList.contains("now_pointer_f")) {
                orange_pointer.classList.add("orange_pointer_f");
                orange_pointer.classList.add("num_" + get("orange_data")[the_o_num]["s_count"]);
        
                // 外部の関数を用いて 本pointer_f と同じ num_ を共有する stripe, pointer_s を取得.
                let the_comp_stripe = grab_auto(orange_pointer)[0];
                let the_comp_pointer = grab_auto(orange_pointer)[1];
                // pointer_s 側の　scrollLeft position.
                let the_comp_s_pos = Number(target_data(the_comp_pointer, "scroll_left_"));            
                the_comp_stripe.style.width = orange_pointer_left - the_comp_s_pos + "px";
            }
            
            // 最後に s or f をスイッチング.
            orange.classList.toggle("now_pointer_s");
            orange.classList.toggle("now_pointer_f");
    }

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
        
        // NEW!!!!!!
        set("orange_data", s => s[the_o_num]["left"].push(orange_pointer_left));

        let comesin = document.querySelector(".comesin");
        if (comesin) {
            comesin.classList.remove("comesin");
        }
        orange_pointer.classList.add("comesin");
        funda_main();
    }

    // 全体の中間地点に位置する場合.
    if (how_big + 1 < compare_classic.length) {
        if (orange_pointer_space_store.children[how_big].classList.contains("orange_pointer_s")) {
            // 近すぎると点が打てないようにする.
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

    // *番上か一番下に位置する場合.
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
}

// ポインターを消す関数.
export function delete_orange_p(e) {
    let comesin = document.querySelector(".comesin");
    if (comesin) {
        let orange = comesin.parentElement.parentElement.parentElement;
        let the_o_num = Number(target_data(orange, "orange_num_"));

        // ここで取れる pointer は、必ず「選択中のPointer」なので、これを削除.
        // 同時に同じ num を共有するものについても. (orange群)
        let grab_list = grab_auto(comesin);

        // そしてデータの更新. 管理しているのは　orange_data, scroll_left_esc.
        // 消去されるcomesinが持つ scroll_left_ を取得して、その番号を削除. 
        let the_remover_keydata = Number(target_data(comesin, "scroll_left_"));

        // 消去されるcomesinが持つ scroll_left_ を取得して、その番号を scroll_left_escから削除.
        // NEW!!!!!
        set("orange_data", s => s[the_o_num]["left"].splice(s[the_o_num]["left"].indexOf(the_remover_keydata), 1));

        // 描画サイドの削除.
        comesin.classList.add("opac_cam");
        comesin.style.opacity = 0;
        grab_list[0].remove();

        // s or f　でポインターを打てる打てないといった関係性に対応。
        if (comesin.classList.contains("orange_pointer_f")) {
            comesin.classList.toggle("orange_pointer_f");
            comesin.classList.toggle("orange_pointer_s");
        }

        // 相手（orange_pointer_f）がいなかったら、そのタイミング（ひとつ手前）で　now_pointer_? が変化したことになるのでこれについても修正.
        if (grab_list[1] == null) {
            orange.classList.toggle("now_pointer_s");
            orange.classList.toggle("now_pointer_f");                
        } else {
            grab_list[1].remove();

            // NEW!!!!!!!
            set("orange_data", s => [the_o_num]["left"].splice(s[the_o_num]["left"].indexOf(Number(target_data(grab_list[1], "scroll_left_"))), 1));
        }
    }
}

// comesin クラス（最新のorange_pointerを検索できる）を管理する関数. (上下左右 ...　外してつける / space .. ただ外す)
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

        }
    }
}

// センタリングしているブロックの位置から window のスクロール位置を調整する関数.
export const edit_mode_default_adjust = (e) => {
    let editor_height = window_height - 100;
    let the_up_comming = (editor_height - e.clientHeight) / 2;
    if (editor_height - e.getBoundingClientRect().bottom < the_up_comming) {
        let the_adjust_num = the_up_comming + e.getBoundingClientRect().bottom - editor_height;
        scrollBy(0, the_adjust_num);
        wheel_positioning();
    }
}

// オートシーキングモードにおいて actuar のデフォルトセットアップをする関数.
export const actuar_st_allon = () => {
    let sts = document.querySelectorAll(".actuar_st");
    for (let i = 0; i < sts.length; i++) {
        if (sts[i].lastElementChild) {
            sts[i].lastElementChild.style.setProperty('opacity', 0.5, 'important');
        }
    }
}

// オートシーキングモード終了後にactuar_stが付いたブロックの描画を現場復帰する関数.
export const actuar_st_alloff = () => {
    let sts = document.querySelectorAll(".actuar_st");
    for (let i = 0; i < sts.length; i++) {
        if (sts[i].lastElementChild) {
            sts[i].lastElementChild.style.setProperty('opacity', 1, 'important');
        }
    }
}

// オートシーキングモード終了後にactuar_enが付いたブロックの描画を現場復帰する関数.
export const actuar_en_alloff = () => {
    let ens = document.querySelectorAll(".actuar_en");
    for (let i = 0; i < ens.length; i++) {
        ens[i].style.opacity = 1;
        if (ens[i].lastElementChild) {
            ens[i].lastElementChild.style.setProperty('opacity', 1, 'important');
        }
    }
}