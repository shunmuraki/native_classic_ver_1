import { full_end_scrollwidth, full_start_scrollwidth, half_left_width, screen, the_name_list } from "../base/elements.js";
import { make_ver_fragment, go_top, go_left, go_right, go_bottom, vertical_stripe_checker, horizontal_stripe_checker, original_centering_checker, centering_marker} from "../base/function.js";
import { vertical_to_hor, vertical_to_sp, vertical_to_sp_cover, target_data, grab_auto, classmover } from "../base/tools.js";
import { is_it_same_series } from "../multiable/function.js";
import { add_orange_space_for_everyone, all_view_changer, best_related_element, comesin_management, delete_orange_p, orange_pointer_make, pre_pointing_in, pre_pointing_out, principle_management } from "./function.js";

// orange_data. / グローバルなんだけど、どうせ全部あとで消去することになるからね。 一応盾の　scrap ごとに管理はしておくけど。
let orange_data = {};
let timeoutArray = new Array();
let intervalArray = new Array();
let the_scrolled_distance = 0;
let orange_block_counter = 0;

// * 前提となる「別レイヤー」を生成
// 縦に要素を追加する処理
window.addEventListener("keydown", (e)=>{

    let k = e.key;

    // ---------------------------------- * - * - * - * Editable シリーズ * - * - * - * ----------------------------------
    // * * 仮置きキー・センテンス
    if (document.activeElement.tagName == "TEXTAREA") {

        let current = document.activeElement;
        let type_signiture = current.value;

        if (document.activeElement.classList.contains("ms_area") == false) {
            current.style.height = 24 + 'px';
            let scrollHeight = current.scrollHeight;
            current.style.height = scrollHeight + 'px'; 
            let height = current.clientHeight;
            current.parentElement.style.height = height + "px";
        }        
        
        if ( type_signiture.indexOf('edit') != -1) {

            document.querySelector(".ms_area").remove();
            if (document.querySelector(".centering").lastElementChild == "TEXTAREA") {
                document.querySelector(".centering").lastElementChild.focus();
            }
    
            // * もう screen 側には触れないように。 centering クラスは残るよ。
            document.activeElement.blur();
    
            // 現在の sp_cover を取得して、その下に追加する（after）
            let current_vertical = document.querySelector(".centering");
            let current_horizontal = vertical_to_hor(current_vertical);
            let current_sp = vertical_to_sp(current_vertical);
            let current_sp_cover = vertical_to_sp_cover(current_vertical);
    
            const add_new_layer = document.createElement("div");
            add_new_layer.classList.add("new_layer");
            add_new_layer.classList.add("block_layer");
            add_new_layer.style.display = "none";
            add_new_layer.style.opacity = 0;
            screen.after(add_new_layer);
            
            // デフォルト（screen を使っている時）    
            let new_layer = document.querySelector(".new_layer");
            
            // 認証機能
            screen.classList.add("edit");
            new_layer.style.display = "block";

            // その数だけspを複製して縦に並べる（sibling）
            // デフォルトでは縦のflexについては上から下に向かって並べる
            // ここでの　sp には、動画や音声なども入っているので、これをcloneすると全部解決すると。これは賢いアイディアだね。
            // でも本番環境では current から遡るような形で特定をする必要があるよね。　でも "/edit" が入力されることで起きるのが編集モードなんだとしたら、それ自体が current として取れる。
    
            // **** いや centering認証　使ったら？？？　と思うけど。

            // [ BLOCK PLAN ]
            // とりあえずは条件分岐なして devide してみるね。
            let vh_count = current_horizontal.childElementCount - 1;

            // 繰り上げ
            let sp_cover_will_num = Math.ceil(vh_count / 10);
            let new_sp_cov = current_sp_cover.cloneNode(true); 
            // 一度中身の <sp> でループして、その各<ver>を全消し
            let newla_sps = new_sp_cov.children;

            // のちのために screenレイヤーの sp_cover にもクラスを付与しておきます。
            current_sp_cover.classList.add("target_of_edition");
    
            for (let i = 0; i < newla_sps.length; i++) {
                
                // sp のchildren ... <ver>たち
                let bye_once = newla_sps[i].lastElementChild.children;

                for (let o = bye_once.length - 1; o >= 0 ; o--) {
                    // adjusterを残しておきたい作戦。 ** ←brilliant!
                    if (o > 0) { 
                        bye_once[o].remove();
                    }
                }
                for (let o = 0; o < 10; o++) {
                    // scrap(sp_cover) の cloneの　Hor に ver を10こ詰めていきます
                    // この scrap(sp_cover)には適切な数の sp も入っているので..
                    // adjusterが基準になるはず。
                    make_ver_fragment(newla_sps[i].lastElementChild.lastElementChild, "after");
                }

                // editモードのための特別な仕様。
                let adjuster_element = document.createElement("div");
                adjuster_element.classList.add("adjuster");
                adjuster_element.classList.add("horizontal_child");
                newla_sps[i].lastElementChild.lastElementChild.after(adjuster_element);
            }
    
            // * seeking関連のデフォルトセットアップ.
            new_sp_cov.classList.add("pausing");
            
            // 先に orange_space は追加しておきますね。それでそのあとにループでnew_layerへ詰めるようにしましょう。
            add_orange_space_for_everyone(new_sp_cov);
           
            // scrap を必要な数だけ new_layer に追加。
            for (let i = 0; i < sp_cover_will_num; i++) {
                
                // ちょうどいいので、ここで　orange_num_を追加しておく必要があるよね？ってこと。
                let new_one = new_sp_cov.cloneNode(true);
                new_one.firstElementChild.classList.add("orange_num_" + i);
                new_one.classList.add("principle_pointer");
                new_layer.appendChild(new_one);
            }
    
            // <ver> をひとつずつ new_layer の方へ格納していく
            let screen_sps = current_sp_cover.children;
            
            // もとの screen layer にある sp_cover のなかで　sp についてループ
            for (let i = 0; i < screen_sps.length; i++) {
                let screen_vers = screen_sps[i].lastElementChild.children;
                for (let o = 0; o < screen_vers.length; o++) {
                  
                    // adjuster をスキップ  
                    if (o > 0) {
                        
                        // これだと　value がうつらないかしら？？
                        let imp_content = screen_vers[o].lastElementChild.cloneNode(true);
                        let the_num = o;
                        let ver_side = Math.trunc(the_num / 10);
                        let hor_side = the_num % 10;
                        
                        // 割り切れてしまった場合
                        if (ver_side == 0 && hor_side == 1) {
                            hor_side = 0;
                        } else if (ver_side > 0 && hor_side == 0) {
                            ver_side -= 1;
                            hor_side = 9;
                        } else {
                            hor_side -= 1;
                        }
    
                        // だいぶと賢い。 
                        new_layer.children[ver_side].children[i + 1].lastElementChild.children[10].classList.add("you!!!");
                        let the_block_into = new_layer.children[ver_side].children[i + 1].lastElementChild.children[hor_side + 1];
    
                        // デフォルトシフト（下で言うところのマーキング）がこの中でできる
                        if (screen_vers[o].classList.contains("centering")) {
                            the_block_into.classList.add("new_layer_centering");
                            // * マーキング
                            // scrollTOP とかこれあってんのかよ. まぁでもこんな感じ。
                            //  ********* 「display」をトップに描画, *** いやようやくここで　new_layer 表示されるんかい！！
                        } 
    
                        the_block_into.lastElementChild.remove();
                        the_block_into.appendChild(imp_content);

                        // クラス動かしまくるゾーン
                        for (let j = 0; j < the_name_list.length; j++) {
                            classmover(screen_vers[o], the_block_into, the_name_list[j], "add");
                        }
                    }
                } 
            }

            // 切られたsameのために。// 切られたsameのために。// 切られたsameのために。
            for (let i = 0; i < new_layer.childElementCount; i++) {
                for (let o = 0; o < new_layer.children[i].childElementCount; o++) {
                    if (o > 0) {
                        let the_target_start = new_layer.children[i].children[o].lastElementChild.firstElementChild.nextElementSibling.nextElementSibling;
                        let the_target_end = new_layer.children[i].children[o].lastElementChild.lastElementChild.previousElementSibling;
                        if (the_target_start.classList.contains("same") && the_target_start.classList.contains("same_start") == false) {
                            the_target_start.classList.add("same_start");
                        }
                        if (the_target_end.classList.contains("same") && the_target_end.classList.contains("same_end") == false) {
                            the_target_end.classList.add("same_end");
                        }
                    }
                }
            }
    
            // デフォルトで center になったことを明示。 // see クラス付与地点！！！
            let layer_centering = document.querySelector(".new_layer_centering");
            let default_scrap = vertical_to_sp_cover(layer_centering);
            default_scrap.classList.add("see");
            layer_centering.classList.remove("new_layer_centering");
    
            screen.style.opacity = 0;
            new_layer.style.opacity = 1;

            let centering_num = [].slice.call(layer_centering.parentElement.children).indexOf(layer_centering) - 1;
    
            let see = document.querySelector(".see");
            let see_num = [].slice.call(new_layer.children).indexOf(see);

            let scraps = new_layer.children;
            let the_default_scrollleft = 400 * centering_num + window.innerWidth - half_left_width;
            
            for (let i = 0; i < scraps.length; i++) {
                let scrap = scraps[i];
                // default の処理！！ orange に繋げ！
                orange_data[i] = {};
                orange_data[i]["s_count"] = 0;
                orange_data[i]["left"] = [];
    
                if (i == see_num) {
                    for (let o = 0; o < scrap.children.length; o++) {
                        // orange_space をスキップ
                        if (o == 0) {
                            scrap.children[o].children[0].scrollLeft = the_default_scrollleft;
                            scrap.children[o].children[1].scrollLeft = the_default_scrollleft;
                        }
                        if (o > 0) {
                            scrap.children[o].lastElementChild.scrollLeft = the_default_scrollleft;
                        }
                    }
                } else {
                    for (let o = 0; o < scrap.children.length; o++) {
                        // orange_space をスキップ
                        if (o == 0) {
                            scrap.children[o].children[0].scrollLeft = full_start_scrollwidth;
                            scrap.children[o].children[1].scrollLeft = full_start_scrollwidth;
                        }
                        if (o > 0) {
                            scrap.children[o].lastElementChild.scrollLeft = full_start_scrollwidth;
                        }
                    }
                }
            }
            
            let new_see = document.getElementsByClassName("see")[0];
            // 例えばで一個実行するのはアリかもしれない.
            orange_data = orange_pointer_make(new_see, orange_data); 
            new_see.firstElementChild.firstElementChild.firstElementChild.firstElementChild.classList.add("comesin");
        }
    }

    // ---------------------------------- * - * - * - * Editable シリーズ * - * - * - * ----------------------------------
    if (screen.classList.contains("edit")) {

        let new_layer = document.querySelector(".new_layer");
        let new_layer_centering = document.querySelector(".new_layer_centering");

        // ** -- 下準備 -- **
        let centering = null;
        let the_see_centering = document.querySelector(".see");

        if (document.querySelector(".comesin")) {
            // 通常運転
            centering = document.querySelector(".comesin");
        } else if (document.querySelector(".pre_comesin")) {
            // spaceキーの直後
            centering = document.querySelector(".pre_comesin");
        }

        // centering も new_layer_centering もあるんだから、これでうまくやろうよ。
        if(! e.shiftKey) { 
            let orange_pointer_space = the_see_centering.firstElementChild.firstElementChild;
            let orange_pointer_list = orange_pointer_space.firstElementChild;
            if (k == "ArrowUp") {
                // * まず今の所属しているscrapの principle を確認。
                // ** principle_block だった場合
                if (the_see_centering.classList.contains("principle_block")) {
                    // *＊＊ もし、所属しているscrapのorange_spaceにpointerが一つでも存在したら
                    // 現在のブロックからだいたいのScrollLeftを算出して、それをpointerのもつscrollLeftと照合しながら定める。
                    // しかも「存在するものの中で」っていうのがポイントだと思う。
                    // 先に削除した上での動き、とするとどうだろう。
                    if (centering.classList.contains("opac_cam")) {
                        centering.remove();
                    }
    
                    if (orange_pointer_list.childElementCount != 0) {
                        centering.classList.remove("comesin");
                        // 仮置きの、transparent だったら
                        let nextstep = best_related_element(the_see_centering, vertical_to_hor(new_layer_centering).scrollLeft, "pointer", orange_data);
                        let new_one = nextstep[0];
                        let scroll_distance = nextstep[1];
                        // *** そちらの pointerに comesin を当ててあげる
                        // *** 前のcomesinを剥奪して付け替え
                        new_layer_centering.classList.remove("new_layer_centering");
                        new_one.classList.add("comesin");
                        
                        let the_gap = scroll_distance - vertical_to_hor(new_layer_centering).scrollLeft;
                        all_view_changer(the_see_centering, the_gap);
                        // *** 必要ならscrollLeftで場所を整えてあげる
                        principle_management(the_see_centering, "principle_pointer");
                    }
                } 
                // ** principle_pointer だった場合
                // *** 何もしない
            }
            if (k == "ArrowDown") {
                // * まず今の所属しているscrapの principle を確認。
                // ** principle_pointer だった場合
                // *＊＊ その所属しているscrapの一番上のhorの一番最初？最後？いや、一番今のscrollLeftに近い場所にあるブロックを見つけて
                if (the_see_centering.classList.contains("principle_pointer")) {

                    let nextstep = best_related_element(the_see_centering, orange_pointer_space.scrollLeft, "block", orange_data);
                    let new_one = nextstep[0];
                    let scroll_distance = nextstep[1];
                    // *** そちらの blockに new_layer_centering を当ててあげる
                    // *** 前のnew_layer_centering　を剥奪して付け替え
                    new_one.classList.add("new_layer_centering");
                    
                    // *** 必要ならscrollLeftで場所を整えてあげる
                    let the_gap = scroll_distance - orange_pointer_space.scrollLeft;
                    all_view_changer(the_see_centering, the_gap);
                    principle_management(the_see_centering, "principle_block");
                    is_it_same_series(new_one);
                }
                // ** principle_block だった場合
                // *** 何もしない
                the_scrolled_distance = 0;
            }
        }

        // ********** ---------  BLOCK DRIVEN COMMAND  --------- ********** ------------------

        // * ベースはやっぱりこれだが、さて、どこをどうフィットさせていく必要がある？
        // * なるほど current を渡しているわけですねぇ..................
        // ** たぶんこれは直す必要があって、おそらく「current_vertical」までをこっちで指定しちゃうんだよね。
        // * * * まぁなんか１から書いたほうがいいんだろうな。
        // * new_layer_centering による管理。
        // * default のセットアップはすでに済んでいる。
        // * いやぁ..... でもこれ使い回せたら相当かっこいいけどなぁ...
        // * 逆に改めて書くのもねぇ.........
        if(e.shiftKey) {
            if (the_see_centering.classList.contains("principle_block")) {

                if (k == "ArrowUp") {
                    if (the_see_centering.previousElementSibling) {
                        orange_data = pre_pointing_in(the_see_centering, orange_data);
                        // see　クラス　付け替え更新！！
                        principle_management(the_see_centering.previousElementSibling, "principle_block");

                        the_see_centering.classList.toggle("see");
                        the_see_centering.previousElementSibling.classList.toggle("see");
                        go_top(new_layer_centering, "new_layer_centering");
                        the_scrolled_distance = 0;
                    }
                }
                if (k == "ArrowLeft") {
                    go_left(new_layer_centering, "new_layer_centering");
                    the_scrolled_distance = 0;
                }
                if (k == "ArrowRight") {
                    go_right(new_layer_centering, "new_layer_centering");
                    the_scrolled_distance = 0;
                }
                if (k == "ArrowDown") {
                    if (the_see_centering.nextElementSibling) {
                        // see　クラス　付け替え更新！！
                        orange_data = pre_pointing_in(the_see_centering, orange_data);
                        orange_data = pre_pointing_out(the_see_centering, the_see_centering.nextElementSibling, orange_data);
                        principle_management(the_see_centering.nextElementSibling, "principle_block");
                            
                        the_see_centering.classList.toggle("see");
                        the_see_centering.nextElementSibling.classList.toggle("see");

                        go_bottom(new_layer_centering, "new_layer_centering");
                        the_scrolled_distance = 0;
                    }
                }

            } else if (the_see_centering.classList.contains("principle_pointer")) {

                if (k == "ArrowUp") {
                    if (the_see_centering.previousElementSibling) {
                        if (the_see_centering.previousElementSibling.firstElementChild.firstElementChild.firstElementChild.childElementCount != 0) {
                            // ******** たぶんこのあたりも sp_cover のことをわかってないんだ。
                            // ******** see クラスは scrap につけるようにしましょう！
                            // ******** その前提に立った時には結構自然なコードなのかもしれないけどどうかな？？??
                            var the_see_centering_height = the_see_centering.clientHeight;
                            let orange_pointer_space = the_see_centering.previousElementSibling.firstElementChild.firstElementChild;
                            // * クラスっていうか pointer を新しく作って一番下にappendする必要があるわけでしょう？？？？？？
                            // * * 描画については気にする必要がない。これは結構美しいプログラムじゃない？？？だいぶスマート。
                            // 最初の子要素　orange_space について、クラスや点の調整をかける。                    
                            // ******** うん、この場合も奇跡的に現行通りで大丈夫グッド.
                            // [][][] orange_data をいじる。                      
                            // ここについては絶対に定点移動になる。
                            new_layer.scrollTo({
                                top: - the_see_centering_height,
                                behavior: "smooth",
                            })
                            
                            // authentic
                            comesin_management("top", centering, the_see_centering);
    
                            // 仮置きの、transparent だったら。
                            if (centering.classList.contains("opac_cam")) {
                                centering.remove();
                            }
                            
                            orange_data = pre_pointing_in(the_see_centering, orange_data);

                            let default_distance = document.querySelector(".comesin").parentElement.parentElement.scrollLeft;
                            let the_gap = target_data(document.querySelector(".comesin"), "scroll_left_") - default_distance;
                            all_view_changer(the_see_centering.previousElementSibling, the_gap);
                            // see　クラス　付け替え更新！！
                            principle_management(the_see_centering.previousElementSibling, "principle_pointer");
    
                            the_see_centering.classList.toggle("see");
                            the_see_centering.previousElementSibling.classList.toggle("see");

                            let nextstep = best_related_element(the_see_centering.previousElementSibling, orange_pointer_space.scrollLeft, "block", orange_data);
                            let new_one = nextstep[0];
                            is_it_same_series(new_one);

                            the_scrolled_distance = 0;
                        }
                    }
                }
                if (k == "ArrowLeft") {
                    if (centering.previousElementSibling) {
                        // let the_gap = centering.parentElement.parentElement.scrollLeft - target_data(centering, "scroll_left_");
                        let orange_pointer_space = the_see_centering.firstElementChild.firstElementChild;
                        let the_gap = target_data(centering.previousElementSibling, "scroll_left_") - centering.parentElement.parentElement.scrollLeft;

                        // 400px 分、orange_line_po, orange_line_st, すべての scrap に所属する hor を等しく動かす。
                        all_view_changer(the_see_centering, the_gap);
                        // authentic   
                        comesin_management("left", centering, the_see_centering);
                        // * 前の comesin まで。 上の関数で return してもらおうかしら。個数か。

                        // 仮置きの、transparent だったら。
                        if (centering.classList.contains("opac_cam")) {
                            centering.remove();
                        }

                        let nextstep = best_related_element(the_see_centering, orange_pointer_space.scrollLeft, "block", orange_data);
                        let new_one = nextstep[0];
                        is_it_same_series(new_one);

                        the_scrolled_distance = 0;
                    }
                }
                if (k == "ArrowRight") {
                    if (centering.nextElementSibling) {
                        let orange_pointer_space = the_see_centering.firstElementChild.firstElementChild;
                        let the_gap = target_data(centering.nextElementSibling, "scroll_left_") - centering.parentElement.parentElement.scrollLeft;
                        // 400px 分、orange_line_po, orange_line_st, すべての scrap に所属する hor を等しく動かす。
                        all_view_changer(the_see_centering, the_gap);
                        
                        comesin_management("right", centering, the_see_centering);
                        // 400px 分、orange_line_po, orange_line_st, すべての scrap に所属する hor を等しく動かす。
                        // * 前の comesin まで。 上の関数で return してもらおうかしら。個数か。

                        // 仮置きの、transparent だったら。
                        if (centering.classList.contains("opac_cam")) {
                            centering.remove();
                        }

                        let nextstep = best_related_element(the_see_centering, orange_pointer_space.scrollLeft, "block", orange_data);
                        let new_one = nextstep[0];
                        is_it_same_series(new_one);

                        the_scrolled_distance = 0;
                    }
                }
                if (k == "ArrowDown") {
                    if (the_see_centering.nextElementSibling) {
                        if (the_see_centering.nextElementSibling.firstElementChild.firstElementChild.firstElementChild.childElementCount != 0) {

                            let orange_pointer_space = the_see_centering.nextElementSibling.firstElementChild.firstElementChild;
                            // ******** たぶんこのあたりも sp_cover のことをわかってないんだ。
                            // ******** see クラスは scrap につけるようにしましょう！
                            // ******** その前提に立った時には結構自然なコードなのかもしれないけどどうかな？？??
                            var the_see_centering_height = the_see_centering.clientHeight;
                            // ここについては絶対に定点移動になる。
                            // ここが sp_cover じゃないといけない
                            // その頭の　ver に focus
                            // 頭の　hor に new_layer_centering クラスを付与.
                            // [][][] orange_data をいじろうかと思ったけど引数から return させたのを再度代入したらええわ
                            // この時重要なのは、データを丸ごと渡すことだよ。
                            orange_data = pre_pointing_in(the_see_centering, orange_data);
                            orange_data = pre_pointing_out(the_see_centering, the_see_centering.nextElementSibling, orange_data);
            
                            new_layer.scrollTo({
                                top: the_see_centering_height,
                                behavior: "smooth",
                            })
                            
                            // authentic   
                            comesin_management("bottom", centering, the_see_centering);
                            // 仮置きの、transparent だったら。
                            if (centering.classList.contains("opac_cam")) {
                              centering.remove();
                            }
      
                            let default_distance = document.querySelector(".comesin").parentElement.parentElement.scrollLeft;
                            let the_gap = target_data(document.querySelector(".comesin"), "scroll_left_") - default_distance;
                            all_view_changer(the_see_centering.nextElementSibling, the_gap);
                            // see　クラス　付け替え更新！！
                            principle_management(the_see_centering.nextElementSibling, "principle_pointer");
      
                            the_see_centering.classList.toggle("see");
                            the_see_centering.nextElementSibling.classList.toggle("see");

                            let nextstep = best_related_element(the_see_centering.nextElementSibling, orange_pointer_space.scrollLeft, "block", orange_data);
                            let new_one = nextstep[0];
                            is_it_same_series(new_one);
                            the_scrolled_distance = 0;
                        }
                    }
                }
            }
        }

        // SCROLL
        if(! e.shiftKey) {
        if (k == " ") {
            let centering = document.getElementsByClassName("new_layer_centering")[0];
            let scrap = vertical_to_sp_cover(centering);
            let hor = vertical_to_hor(centering);
            let next_one = centering.nextElementSibling;
            let the_seeking_time;
            let special_cov = document.querySelector(".special_cov");

            let play_when;
            let pause_when;

            if (scrap.classList.contains("scrolled") == false) {
                scrap.classList.add("scrolled");
            }

            if (hor.scrollLeft < full_end_scrollwidth) {
               
                // 初期値.
                the_seeking_time = 3000;

                function the_timeout() {
                    timeoutArray.push(setTimeout(() => {
                        let centering_you = document.getElementsByClassName("new_layer_centering")[0];
                        if (centering_you.nextElementSibling && scrap.classList.contains("playing")) {

                            let next_one_is_you = centering_you.nextElementSibling;
                            centering_marker(centering_you, next_one_is_you, "new_layer_centering");
                            // special_cov チェック関数リスト.....................
                            is_it_same_series(next_one_is_you);
                            the_timeout();
                        } else {
                            clearTimeout(timeoutArray.shift());
                        }
                    }, the_seeking_time));
                }

                function the_interval() {
                
                    // ** あとシークさせる Interval も。
                    intervalArray.push(setInterval(() => {
                        all_view_changer(scrap, 400 / 3);
                        // * １秒ごとに参照できれば十分なので、 ACTUAR への対応を書いてください、お願いします。
                        // * 今の scrollLeft　が分かれば、どのブロックがセンターポジションに面しているかがわかる。その中の ACTUAR クラスを探すんだ。
                        // * それが過ぎているかどうか。
                        let the_block_num = Math.floor((hor.scrollLeft + half_left_width - window.innerWidth) / 400);
                        // the_blockをcenteringとした時の本来の位置
                        // * まぁだから要するにこの一点ってことね.
                        let the_pri_distance = window.innerWidth + (the_block_num * 400) - half_left_width;

                        let the_block = hor.children[the_block_num + 1];
                        // 現在の、実際のhorのscrollLeft とそれがどれくらい離れているかの算出
                        let the_gap =  hor.scrollLeft - the_pri_distance;

                        if (special_cov) {
                            if (the_block.classList.contains("actuar_st")) {
                                let the_actuar_distance = Number(target_data(the_block, "actuar_time_"));
                                if (the_gap > the_actuar_distance - 10) {
                                    special_cov.lastElementChild.style.opacity = 1;
                                }
                            } else if (the_block.classList.contains("actuar_en")) {
                                let the_actuar_distance = Number(target_data(the_block, "actuar_time_"));
                                if (the_gap > the_actuar_distance - 10) {
                                    special_cov.lastElementChild.style.opacity = 0;
                                }
                            }
                        }

                        if (hor.scrollLeft > full_end_scrollwidth - 110) {
                            if (intervalArray.length > 0) {
                                clearInterval(intervalArray.shift());
                            }
                            scrap.classList.remove("playing");
                            scrap.classList.add("pausing");
                        }

                        the_scrolled_distance += 1;

                    }, 1000));
                }

                if (scrap.classList.contains("playing")) {
                    
                    scrap.classList.remove("playing");
                    scrap.classList.add("pausing");
                
                    let the_b_name = "scroll_over_" + the_scrolled_distance;
                    let the_a = the_scrolled_distance % 3;
                    let the_a_name = "scroll_over_" + the_a;
                    if (scrap.classList.contains(the_b_name)) {
                        scrap.classList.remove(the_b_name);
                    }

                    scrap.classList.add(the_a_name);
                    clearTimeout(timeoutArray.shift());
                    clearInterval(intervalArray.shift());

                    let stop = new Date();
                    pause_when = stop.getTime();

                    // 経過時間をミリ秒で取得
                    let ms = pause_when - play_when;
                    the_seeking_time = 3000 - ms;

                } else if (scrap.classList.contains("pausing")) {
                    let start = new Date();
                    play_when = start.getTime();

                    // 再実行.
                    the_timeout();
                    the_interval();

                    scrap.classList.remove("pausing");
                    scrap.classList.add("playing");
                } 
              }
           }
        }

        // ** なんか代替案として、早々とComesinを消してしまうやり方もあるなって思った。
        // ** そうしたらもっとシンプルにできるはずなんだよね...........
        if(e.metaKey) {
            if (k == "c") { 
                function delete_opacam() {
                    // 指標として利用してから即削除し、それから実行をする.
                    if (document.querySelector(".opac_cam")) {
                        document.querySelector(".opac_cam").remove();
                    }                         
                }

                if (centering) {
                    if (the_see_centering.firstElementChild.firstElementChild.scrollLeft == Number(target_data(centering, "scroll_left_"))) {
                        if (the_see_centering.classList.contains("principle_pointer") && centering.classList.contains("opac_cam") == false){
                            delete_opacam(); 
                            orange_data = delete_orange_p(orange_data);
                        } else if (centering.classList.contains("opac_cam") == true) {
                            delete_opacam();              
                            orange_data = orange_pointer_make(the_see_centering, orange_data);
                        }
                    } else {
                        delete_opacam();         
                        orange_data = orange_pointer_make(the_see_centering, orange_data);
                    }
                } else {
                    orange_data = orange_pointer_make(the_see_centering, orange_data);
                }
            }
        }

        // escape// escape// escape// escape// escape        
        if (k == "Escape") {

            // orange_pointer_f が存在したら初めて実行。存在しなかったら全部放棄する.            
            if (document.querySelector(".orange_pointer_f")) {
                // * 編集していた もともとの sp_cover. 
                let original_sp_cover = document.querySelector(".target_of_edition");

                // * 最初に sp_coverをクリーンアップ。
                for (let i = 0; i < original_sp_cover.children.length; i++) {
                    let vers = original_sp_cover.children[i].lastElementChild.children;
                    for (let o = vers.length - 1; o >= 0 ; o--) {
                        // adjusterを残しておきたい作戦。 ** ←brilliant!
                        if (o > 0) { 
                            vers[o].remove();
                        }
                    }
                }

                let scraps = document.querySelector(".new_layer").children;

                let special_menu = (e, f) => {
                    // * こいつが video で
                    // * 左隣は船内のsameで
                    // * 右隣は船外のsame
                    // * そして、same_end を持っていないなら
                    // * ↓ 実行.
                    if (e.classList.contains("video")) {
                        if (e.previousElementSibling) {
                            if (e.previousElementSibling.classList.contains("same") && e.previousElementSibling.classList.contains("you_in")) {
                                if (e.nextElementSibling) {
                                    if (e.nextElementSibling.classList.contains("same") && e.nextElementSibling.classList.contains("you_in") == false) {                                                     
                                        if (f.classList.contains("same") && f.classList.contains("same_end") == false) {
                                            // *　動的に、動画の same_en だった場合はさ、ちゃんと本体を入れるって約束でしょ？
                                            let the_t = "same_num_" + target_data(e, "same_num_");
                                            let hit_target = document.getElementsByClassName(the_t)[document.getElementsByClassName(the_t).length - 1];
                                            let the_natural_cont = hit_target.lastElementChild.cloneNode(true);
                                            the_natural_cont.style.opacity = 1;
                                            f.lastElementChild.remove();
                                            f.appendChild(the_natural_cont);
                                            f.classList.add("same_end");
                                        } 
                                    }
                                }
                            }

                            if (e.previousElementSibling.classList.contains("same") && e.nextElementSibling.classList.contains("you_in")) {
                                if (e.previousElementSibling) {
                                    if (e.previousElementSibling.classList.contains("same") && e.previousElementSibling.classList.contains("you_in") == false) {                                                     
                                        if (f.classList.contains("same") && f.classList.contains("same_start") == false) {
                                            f.classList.add("same_start");
                                        } 
                                    }
                                }
                            }
                        }
                    }
                }

                for (let i = 0; i < scraps.length; i++) {
                    let stripe_inner_or_out = (e, f) => {
                        let you_are_on_orange = null;
                        // *** で、要所はかけたわけですけど、ここからブロックを sp -horごとのセパレートでループ実行してそれぞれから単一のfragmentを生成する必要がある。
                        // 先頭が orange_space, それ以外の場所に sp が並びます。
                        // orange_spaceについて
                        let po_and_st = scraps[i].firstElementChild.firstElementChild.firstElementChild.children;
                        let block_num = f;

                        let thisblock_scrollleft_st = (400 * block_num) + full_start_scrollwidth - 400;
                        let thisblock_scrollleft_en = thisblock_scrollleft_st + 400;

                        for (let o = 0; o < po_and_st.length; o++) {
                            if (po_and_st[o].classList.contains("orange_pointer_s")) {
                                let the_pointer_s = po_and_st[o];
                                let the_pointer_f = grab_auto(the_pointer_s)[1];
                                // この間に治まるかしらって聞いてるのよ。

                                // * 待っていまいち正しい書き方がわからないぞ...？？
                                // ** "s - f 線上に st もしくは en があれば　このブロックは線に接している" ←たぶんこう.
                                // * そして、被った箇所についてはクラスで記憶するようにしたらいいんじゃないかと思った。                                // * PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP
                                let the_pointer_scrollleft_st = Number(target_data(the_pointer_s, "scroll_left_")) + 5;
                                let the_pointer_scrollleft_en = Number(target_data(the_pointer_f, "scroll_left_")) + 5;
                                let the_desition_one = false;
                                let the_desition_second = false;

                                // s - f　上に "st" が乗っかっているかどうか判定する関数
                                if (the_pointer_scrollleft_st <= thisblock_scrollleft_st && thisblock_scrollleft_st < the_pointer_scrollleft_en) {
                                    the_desition_one = true;
                                }
                                // s - f　上に "en" が乗っかっているかどうか判定する関数
                                if (the_pointer_scrollleft_st < thisblock_scrollleft_en && thisblock_scrollleft_en <= the_pointer_scrollleft_en) {
                                    the_desition_second = true;
                                }

                                let fif = (f, g) => {

                                    orange_block_counter += 1;
                                    e.classList.add("you_in");
                                    e.classList.add("you_" + orange_block_counter);
                                    // * ここを工夫しないと。画像だったり動画だったりするよ？
                                    you_are_on_orange = e.cloneNode(true);

                                    let the_distance;
                                    
                                    if (f == "actuar_st") {

                                        you_are_on_orange.classList.add("actuar_st");
                                        you_are_on_orange.classList.add("actuar_time_" + g);

                                    } else if (f == "actuar_en") {

                                        you_are_on_orange.classList.add("actuar_en");
                                        you_are_on_orange.classList.add("actuar_time_" + g);
                                    }
                                }

                                if (the_desition_one == true && the_desition_second == true) {
                                    fif();
                                } else if (the_desition_one == true && the_desition_second == false) {
                                    let gap = the_pointer_scrollleft_en - thisblock_scrollleft_st;
                                    if (gap > 10 && gap < 400) {
                                        // *** ここが唯一 ACTUAR が発生する場所だろう、きっと！！！
                                        if (gap > 50) {
                                            fif("actuar_en", gap - 5);
                                        }
                                    }
                                } else if (the_desition_one == false && the_desition_second == true) {
                                    let gap = thisblock_scrollleft_en - the_pointer_scrollleft_st;
                                    if (gap > 10 && gap < 400) {
                                        // *** ここもかぁ！！ ACTUAR が発生する場所だろう、きっと！！！                                        
                                        if (gap > 50) {
                                            fif("actuar_st", 405 - gap);
                                        }
                                    }
                                }
                            }
                        }

                        return you_are_on_orange;
                    }

                    let sps = scraps[i].children;
                    for (let o = 0; o < sps.length; o++) {
                        // 先頭のOrange_spaceを省いている。
                        let scrap_sp_hor_fragment = document.createDocumentFragment();
                        // sp - hor について
                        // はい、ここまでは美しいですよ〜！
                        let sp_hor_blocks = sps[o].lastElementChild.children;
                        for (let l = 0; l < sp_hor_blocks.length; l++) {
                            // 最初と最後の adjuster を省いてあげる.
                            // * sp_cover側のクリーンアップの時に先頭のadjusterが消えてしまわないようにしよう. ←たぶん済んでいるはず.
                            if (l != 0 && l != sp_hor_blocks.length - 1) {
                                let active_block = stripe_inner_or_out(sp_hor_blocks[l], l);
                                if (active_block) {
                                    // ** で、多分このあたりでstyleプロパティあたりを再加工しておきたいんだろうね。
                                    /// * 条件 + 実行内容
                                    scrap_sp_hor_fragment.appendChild(active_block);
                                }
                            }
                        }

                        for (let l = 0; l < scrap_sp_hor_fragment.children.length; l++) {
                            let the_ob_name = "you_" + target_data(scrap_sp_hor_fragment.children[l], "you_");
                            let its_you = document.getElementsByClassName(the_ob_name)[0];
                            special_menu(its_you, scrap_sp_hor_fragment.children[l]);
                        }
                        
                        if (o != 0) {
                            original_sp_cover.children[o - 1].lastElementChild.appendChild(scrap_sp_hor_fragment);
                        }
                    }
                }

                // スタイリングやクラスの付け替えなどの新調.
                if (document.querySelector(".centering")) {
                    document.querySelector(".centering").classList.remove("centering");
                }
                let the_new_focusedblock = original_sp_cover.lastElementChild.lastElementChild.lastElementChild;
                document.querySelector(".new_layer_centering").classList.remove("new_layer_centering");
                the_new_focusedblock.classList.add("centering");

                original_centering_checker(original_sp_cover, the_new_focusedblock);
                vertical_stripe_checker(original_sp_cover);
                horizontal_stripe_checker(original_sp_cover);

                original_sp_cover.classList.remove("see");
                original_sp_cover.classList.remove("target_of_edition");

                // and then, focus on !!!, and turn back to the auth.
                if (the_new_focusedblock.lastElementChild) {
                    if (the_new_focusedblock.lastElementChild.tagName == "TEXTAREA") {
                        the_new_focusedblock.lastElementChild.focus();
                    }
                }
            } 
            // edit モード周辺をリセット！！
            // scroll_left_esc = [];
            orange_data = {};
            new_layer.remove();
            screen.classList.remove("edit");
            screen.style.opacity = 1;
            the_scrolled_distance = 0;
            orange_block_counter = 0;
            let covs = document.querySelectorAll(".special_cov");
            for (let i = 0; i < covs.length; i++) {
                covs[i].remove();
            }
        }
    }
});
