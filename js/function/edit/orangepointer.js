// orange_pointerの生成・追加をする関数.
export function orange_pointer_make(e) {
    
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
export function delete_orange_p() {
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