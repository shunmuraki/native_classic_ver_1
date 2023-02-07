import { full_end_scrollwidth, full_start_scrollwidth, half_left_width, screen, the_name_list, blocksize, linesize, blocktime } from "../base/elements.js";
import { make_ver_fragment, go_top, go_left, go_right, go_bottom, original_centering_checker, centering_marker, focus_checker, adjust_box, special_cleaner} from "../base/function.js";
import { vertical_to_hor, vertical_to_sp_cover, target_data, grab_auto, classmover, same_data_counter, same_data_getter, tracer_basis, elem_post_getter, which_special_is } from "../base/tools.js";
import { is_it_same_series } from "../multiable/function.js";
import { just_clear_yt_loop, yt_player_getter, yt_resetter } from "../multiable/extends.js";
import { add_orange_space_for_everyone, all_view_changer, best_related_element, comesin_management, delete_orange_p, edit_mode_default_adjust, orange_pointer_make, pre_pointing_in, pre_pointing_out, principle_management } from "./function.js";
import { wheel_positioning } from "../stylable/function.js";
import { adjust_target_pos } from "../ms/function.js";

let orange_data = {};
let timeoutArray = new Array();
let intervalArray = new Array();
let the_scrolled_distance = 0;
let orange_block_counter = 0;

let bo = document.getElementsByTagName("BODY")[0]
let pri_pointer = document.querySelector(".pointer");

// 外部ファイルに orange_data を共有する関数.
export const orange_data_getter = () => {
    return orange_data;
}

window.addEventListener("keydown", (e)=>{

    let k = e.key;

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
        
        // Editモードを展開.
        if ( type_signiture.indexOf('edi') != -1) {

            tracer_basis(document.querySelector(".centering"));

            document.querySelector(".ms_area").remove();
            focus_checker(document.querySelector(".centering"));
    
            // デフォルトレイヤーからの離脱.
            if (current.tagName == "TEXTAREA") {
                current.blur();
              }
    
            // 下準備.
            let current_vertical = document.querySelector(".centering");
            let current_horizontal = vertical_to_hor(current_vertical);
            let current_sp_cover = vertical_to_sp_cover(current_vertical);

            let special_cov_will_die = document.getElementsByTagName("script")[0].previousElementSibling;
            if (special_cov_will_die.classList.contains("special_cov")) {
                console.log(special_cov_will_die);
                special_cov_will_die.remove();
            }

    
            // 編集レイヤーの生成と挿入.
            const add_new_layer = document.createElement("div");
            add_new_layer.classList.add("new_layer");
            add_new_layer.classList.add("block_layer");
            add_new_layer.style.display = "none";
            add_new_layer.style.opacity = 0;
            screen.after(add_new_layer);
            let new_layer = document.querySelector(".new_layer");
            
            // Editモードの明示化. 編集レイヤー上での処理に限定.
            screen.classList.add("edit");
            new_layer.style.display = "block";
            screen.style.display = "none";
            bo.style.backgroundColor = "#121212";
            bo.classList.add("edit_mode");

            // 横に 10 個ずつのブロックを展開し、縦にタイムラインを展開する.
            let vh_count = current_horizontal.childElementCount - 1;
            let sp_cover_will_num = Math.ceil(vh_count / linesize);
            let new_sp_cov = current_sp_cover.cloneNode(true); 
            
            // すでに sp_cover には適切なラインが築かれているので、これを崩さずにそのまま再利用する. (中身のブロックはクリア.)
            let newla_sps = new_sp_cov.children;

            // のちのために screenレイヤーの sp_cover にもクラスを付与.
            current_sp_cover.classList.add("target_of_edition");
    
            for (let i = 0; i < newla_sps.length; i++) {
                let bye_once = newla_sps[i].lastElementChild.children;
                for (let o = bye_once.length - 1; o >= 0 ; o--) {
                    // adjusterは残しておく.
                    if (o > 0) { 
                        bye_once[o].remove();
                    }
                }
                for (let o = 0; o < linesize; o++) {
                    // scrap(sp_cover) のclone の　horizontal に ver を10個詰める.
                    make_ver_fragment(newla_sps[i].lastElementChild.lastElementChild, "after");
                }

                // editモードは右半分のスペースまで利用するため、可動域を拡張する目的でお尻にも adjuster を挿入.
                let adjuster_element = document.createElement("div");
                adjuster_element.classList.add("adjuster");
                adjuster_element.classList.add("horizontal_child");
                newla_sps[i].lastElementChild.lastElementChild.after(adjuster_element);
            }
    
            // Nativeにはラインごとのシーキング機能があるため、デフォルトでその状態をセット.
            new_sp_cov.classList.add("pausing");
            
            // 挿入前にorange_space を追加.
            add_orange_space_for_everyone(new_sp_cov);
           
            // scrap を必要な数だけ new_layer に追加。
            for (let i = 0; i < sp_cover_will_num; i++) {
                let new_one = new_sp_cov.cloneNode(true);
                new_one.firstElementChild.classList.add("orange_num_" + i);
                new_one.classList.add("principle_pointer");
                new_layer.appendChild(new_one);
            }
    
            // デフォルトレイヤーに存在する大元のブロックたちの中身を、編集レイヤーの対応するブロックへ移行.
            let screen_sps = current_sp_cover.children;
            for (let i = 0; i < screen_sps.length; i++) {
                let screen_vers = screen_sps[i].lastElementChild.children;
                for (let o = 0; o < screen_vers.length; o++) {
                  
                    // adjuster をスキップ  
                    if (o > 0) {
                        let the_num = o;
                        let ver_side = Math.trunc(the_num / linesize);
                        let hor_side = the_num % linesize;
                        
                        // 割り切れてしまった場合.
                        if (ver_side == 0 && hor_side == 1) {
                            hor_side = 0;
                        } else if (ver_side > 0 && hor_side == 0) {
                            ver_side -= 1;
                            hor_side = 23;
                        } else {
                            hor_side -= 1;
                        }
                        
                        new_layer.children[ver_side].children[i + 1].lastElementChild.children[linesize].classList.add("you");
                        
                        // 編集レイヤーにおけるデフォルトのセンタリングを決定. 編集レイヤーにおける centering は 「new_layer_centering」クラスによる管理.
                        let the_block_into = new_layer.children[ver_side].children[i + 1].lastElementChild.children[hor_side + 1];
                        
                        if (the_block_into.lastElementChild) {
                            the_block_into.lastElementChild.remove();
                        }
                        for (let j = 0; j < the_name_list.length; j++) {
                            classmover(screen_vers[o], the_block_into, the_name_list[j], "add");
                        }
                        if (screen_vers[o].classList.contains("centering")) {
                            the_block_into.classList.add("new_layer_centering");
                        } 
                        
                        // dupブロックの場合を考えて条件分岐.
                        if (screen_vers[o].lastElementChild) {
                            let imp_content = screen_vers[o].lastElementChild.cloneNode(true);
                            the_block_into.appendChild(imp_content);
                        }
                    }
                } 
            }

            // 10個ずつで強制的に区分けされたscrapによって same が分裂したケースに対応.
            for (let i = 0; i < new_layer.childElementCount; i++) {
                for (let o = 0; o < new_layer.children[i].childElementCount; o++) {
                    if (o > 0) {
                        let the_target_start = new_layer.children[i].children[o].lastElementChild.firstElementChild.nextElementSibling;
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
    
            // デフォルトで center になったことを明示.
            let layer_centering = document.querySelector(".new_layer_centering");
            let default_scrap = vertical_to_sp_cover(layer_centering);
            default_scrap.classList.add("see");

            // 移行先でのms分のスペースを調整.            
            adjust_target_pos(layer_centering.lastElementChild, "off");
    
            // 画面の切り替え.
            screen.style.opacity = 0;
            new_layer.style.opacity = 1;

            // 以下編集レイヤーのスクロール位置の調整.
            let centering_num = [].slice.call(layer_centering.parentElement.children).indexOf(layer_centering) - 1;
            let see = document.querySelector(".see");
            let see_num = [].slice.call(new_layer.children).indexOf(see);
            let scraps = new_layer.children;
            let the_default_scrollleft = blocksize * centering_num + window.innerWidth - half_left_width;
            
            for (let i = 0; i < scraps.length; i++) {
                let scrap = scraps[i];
                
                // orange_dataと連携が開始.
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
            
            // 「例えば」を提示する意味も込めて、編集モードになった時点で予めセンタリングから orange_pointer と orange_stripe を自動的に追加.
            orange_data = orange_pointer_make(new_see, orange_data); 
            new_see.firstElementChild.firstElementChild.firstElementChild.firstElementChild.classList.add("comesin");

            // 「see」ラインを画面中央に配置.
            edit_mode_default_adjust(new_see);
            console.log(document.querySelector(".new_layer_centering"));
            is_it_same_series(document.querySelector(".new_layer_centering"));
            layer_centering.classList.remove("new_layer_centering");
        }
    }

    if (screen.classList.contains("edit")) {

        let new_layer = document.querySelector(".new_layer");
        let new_layer_centering = document.querySelector(".new_layer_centering");

        // 下準備.
        let centering = null;
        let the_see_centering = document.querySelector(".see");

        if (document.querySelector(".comesin")) {
            centering = document.querySelector(".comesin");
        } else if (document.querySelector(".pre_comesin")) {
            // spaceキーの直後は comesin クラスが存在しないケースを考慮. 代替的に 「pre_comesin」クラスを設ける.
            centering = document.querySelector(".pre_comesin");
        }

        if(! e.shiftKey) { 
            let orange_pointer_space = the_see_centering.firstElementChild.firstElementChild;
            let orange_pointer_list = orange_pointer_space.firstElementChild;

            // 以下ブロック移動モードとポインター移動モードの切り替え処理.
            if (k == "ArrowLeft") {
                if (the_see_centering.classList.contains("principle_block")) {

                    if (centering) {
                        if (centering.classList.contains("opac_cam")) {
                            centering.remove();
                        }
                    }

                    if (orange_pointer_list.childElementCount != 0) {
                        centering.classList.remove("comesin"); 
                        let nextstep = best_related_element(the_see_centering, vertical_to_hor(new_layer_centering).scrollLeft, "pointer", orange_data);
                        let new_one = nextstep[0];
                        let scroll_distance = nextstep[1];
                        new_layer_centering.classList.remove("new_layer_centering");
                        new_one.classList.add("comesin");
                        let the_gap = scroll_distance - vertical_to_hor(new_layer_centering).scrollLeft;
                        all_view_changer(the_see_centering, the_gap);                        
                        principle_management(the_see_centering, "principle_pointer");
                        wheel_positioning();
                    }
                } 
                // sprinciple_pointer だった場合は何もしない.
            }
            if (k == "ArrowRight") {
                if (the_see_centering.classList.contains("principle_pointer")) {

                    let nextstep = best_related_element(the_see_centering, orange_pointer_space.scrollLeft, "block", orange_data);
                    let new_one = nextstep[0];
                    let scroll_distance = nextstep[1];
                    new_one.classList.add("new_layer_centering");                    
                    let the_gap = scroll_distance - orange_pointer_space.scrollLeft;
                    all_view_changer(the_see_centering, the_gap);
                    principle_management(the_see_centering, "principle_block");
                    is_it_same_series(new_one);
                    wheel_positioning();
                }
                // principle_block だった場合は何もしない.
                the_scrolled_distance = 0;
            }
        }

        // ブロックによる上下左右移動の処理.
        if(e.shiftKey) {
            if (the_see_centering.classList.contains("principle_block")) {

                if (k == "ArrowUp") {
                    if (the_see_centering.previousElementSibling) {
                        orange_data = pre_pointing_in(the_see_centering, orange_data);
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

                // ポインターによる上下左右移動の処理.
                if (k == "ArrowUp") {
                    let the_countingstart_top = elem_post_getter(the_see_centering);
                    // スクロール位置の調整のため現在地を控えておく.
                    let the_countingnow_pos = the_see_centering.getBoundingClientRect().top;
                    while (the_countingstart_top >= 1) {
                        if (new_layer.children[the_countingstart_top].previousElementSibling.firstElementChild.firstElementChild.firstElementChild.childElementCount != 0) {
                            
                            // もとのthe_see_centeringからクラスを外す.
                            the_see_centering.classList.toggle("see");
                            // 更新.
                            the_see_centering = new_layer.children[the_countingstart_top];

                            let orange_pointer_space = the_see_centering.previousElementSibling.firstElementChild.firstElementChild;
                            
                            comesin_management("top", centering, the_see_centering);

                            if (centering.classList.contains("opac_cam")) {
                                centering.remove();
                            }
                            
                            orange_data = pre_pointing_in(the_see_centering, orange_data);

                            let default_distance = document.querySelector(".comesin").parentElement.parentElement.scrollLeft;
                            let the_gap = target_data(document.querySelector(".comesin"), "scroll_left_") - default_distance;
                            all_view_changer(the_see_centering.previousElementSibling, the_gap);
                            principle_management(the_see_centering.previousElementSibling, "principle_pointer");
                            let nextstep = best_related_element(the_see_centering.previousElementSibling, orange_pointer_space.scrollLeft, "block", orange_data);

                            // 再度更新.
                            the_see_centering.previousElementSibling.classList.toggle("see");
                            the_see_centering = the_see_centering.previousElementSibling;
                            let the_see_centering_height = the_see_centering.getBoundingClientRect().top - the_countingnow_pos;

                            // edit モードでは「see」ラインの高さを固定したい狙い.
                            scrollBy(0, the_see_centering_height);
                            wheel_positioning();
                            
                            let new_one = nextstep[0];
                            is_it_same_series(new_one);
                            the_scrolled_distance = 0;

                            break;
                        }
                        the_countingstart_top -= 1;
                    }
                }
                if (k == "ArrowLeft") {
                    if (centering.previousElementSibling) {
                        let orange_pointer_space = the_see_centering.firstElementChild.firstElementChild;
                        let the_gap = target_data(centering.previousElementSibling, "scroll_left_") - centering.parentElement.parentElement.scrollLeft;
                        all_view_changer(the_see_centering, the_gap);
                        
                        comesin_management("left", centering, the_see_centering);
                        
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
                        all_view_changer(the_see_centering, the_gap);
                        
                        comesin_management("right", centering, the_see_centering);
                        
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
                    let the_bottom_num = new_layer.childElementCount - 1;
                    let the_countingstart_bottom = elem_post_getter(the_see_centering);

                    // スクロール位置の調整のため現在地を控えておく.
                    let the_countingnow_pos = the_see_centering.getBoundingClientRect().top;
                    while (the_countingstart_bottom < the_bottom_num) {
                        if (new_layer.children[the_countingstart_bottom].nextElementSibling.firstElementChild.firstElementChild.firstElementChild.childElementCount != 0) {
                            
                            // もとのthe_see_centeringからクラスを外す.
                            the_see_centering.classList.toggle("see");
                            // 更新.
                            the_see_centering = new_layer.children[the_countingstart_bottom];

                            let orange_pointer_space = the_see_centering.nextElementSibling.firstElementChild.firstElementChild;
                            orange_data = pre_pointing_in(the_see_centering, orange_data);
                            orange_data = pre_pointing_out(the_see_centering, the_see_centering.nextElementSibling, orange_data);
                        
                            comesin_management("bottom", centering, the_see_centering);
                        
                            if (centering.classList.contains("opac_cam")) {
                              centering.remove();
                            }
      
                            let default_distance = document.querySelector(".comesin").parentElement.parentElement.scrollLeft;
                            let the_gap = target_data(document.querySelector(".comesin"), "scroll_left_") - default_distance;
                            all_view_changer(the_see_centering.nextElementSibling, the_gap);
                            principle_management(the_see_centering.nextElementSibling, "principle_pointer");
                            let nextstep = best_related_element(the_see_centering.nextElementSibling, orange_pointer_space.scrollLeft, "block", orange_data);
                            // 再度更新.
                            the_see_centering.nextElementSibling.classList.toggle("see");
                            the_see_centering = the_see_centering.nextElementSibling;
                            let the_see_centering_height = the_see_centering.getBoundingClientRect().top - the_countingnow_pos;
                            
                            // edit モードでは「see」ラインの高さを固定したい狙い.
                            scrollBy(0, the_see_centering_height);
                            wheel_positioning();
                            
                            let new_one = nextstep[0];
                            is_it_same_series(new_one);
                            the_scrolled_distance = 0;

                            break;
                        }
                        the_countingstart_bottom += 1;
                    }
                }
            }
        }

        // シーキング機能の処理.
        if(! e.shiftKey) {
            if (e.ctrlKey) {
                if (k == "s") {
                    let centering = document.getElementsByClassName("new_layer_centering")[0];
                    let scrap = vertical_to_sp_cover(centering);
                    let hor = vertical_to_hor(centering);
                    let the_seeking_time;

                    // この取り方はどうも推奨できない.
                    let special_cov = null;
                    let player; 
                    let play_when;
                    let pause_when;

                    if (centering.classList.contains("same")) {
                        special_cov = which_special_is(centering);
                    }
        
                    if (special_cov) {
                        if (special_cov.lastElementChild) {
                            if (special_cov.lastElementChild.tagName == "IFRAME") {
                                player = yt_player_getter(special_cov.lastElementChild);
                                player.pauseVideo();
                                // この時点で動画が再生されていたらループをストップ.
                                just_clear_yt_loop();
                            }
                        }
                    }
        
                    if (scrap.classList.contains("scrolled") == false) {
                        scrap.classList.add("scrolled");
                    }
        
                    if (hor.scrollLeft < full_end_scrollwidth) {
        
                        // 初期値のセット.
                        the_seeking_time = blocktime * 1000;
        
                        function the_timeout() {
                            timeoutArray.push(setTimeout(() => {
                                let centering_you = document.getElementsByClassName("new_layer_centering")[0];
                                if (centering_you.nextElementSibling && scrap.classList.contains("playing")) {
                                    let next_one_is_you = centering_you.nextElementSibling;
                                    centering_marker(centering_you, next_one_is_you, "new_layer_centering");
                                    is_it_same_series(next_one_is_you);
                                    the_timeout();
        
                                    centering = document.getElementsByClassName("new_layer_centering")[0];
                                    
                                    if (special_cov) {
                                        if (! special_cov.isEqualNode(which_special_is(centering))) {
                                            // 新しいspecial_covが台頭する時.
                                            special_cov = which_special_is(centering);                                            

                                            clearTimeout(timeoutArray.shift());
                                            clearInterval(intervalArray.shift());

                                            if (special_cov.lastElementChild) {
                                                if (special_cov.lastElementChild.tagName == "IFRAME") {
                                                    player = yt_player_getter(special_cov.lastElementChild); 
                                                }
                                            }

                                            setTimeout(() => {
                                                if (player) {
                                                    player.pauseVideo();
                                                    let the_time = yt_resetter();
                                                    player.seekTo(the_time);
                                                    play_when.playVideo();
                                                }        

                                                // この setTimeout １秒分を考慮したい/
                                                let ms = pause_when - play_when;
                                                the_seeking_time = (blocktime * 1000) - ms;
                                                the_timeout();
                                                the_interval();
                                            }, 1000)
                                        }
                                    }
                                } else {
                                    clearTimeout(timeoutArray.shift()); 
                                }
                            }, the_seeking_time));
                        }
        
                        function the_interval() {
                            intervalArray.push(setInterval(() => {
                                all_view_changer(scrap, blocksize / blocktime);
                                let the_block_num = Math.floor((hor.scrollLeft + half_left_width - window.innerWidth) / blocksize);                        
                                let the_pri_distance = window.innerWidth + (the_block_num * blocksize) - half_left_width;
                                let the_block = hor.children[the_block_num + 1];
                                
                                // 現在の、実際のhorのscrollLeft とそれがどれくらい離れているかの算出.
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
                            
                            if (player) {
                                player.pauseVideo();
                            }
                            
                            scrap.classList.remove("playing");
                            scrap.classList.add("pausing");
                        
                            let the_b_name = "scroll_over_" + the_scrolled_distance;
                            let the_a = the_scrolled_distance % blocktime;
                            let the_a_name = "scroll_over_" + the_a;
                            if (scrap.classList.contains(the_b_name)) {
                                scrap.classList.remove(the_b_name);
                            }
        
                            scrap.classList.add(the_a_name);
                            clearTimeout(timeoutArray.shift());
                            clearInterval(intervalArray.shift());
        
                            let stop = new Date();
                            pause_when = stop.getTime();
        
                            // 経過時間をミリ秒で取得.
                            let ms = pause_when - play_when;
                            the_seeking_time = (blocktime * 1000) - ms;
        
                        } else if (scrap.classList.contains("pausing")) {
                            
                            if (player) {
                                player.pauseVideo();
                                let the_time = yt_resetter();
                                player.seekTo(the_time);
                            }
        
                            let start = new Date();
                            play_when = start.getTime();
        
                            scrap.classList.remove("pausing");
                            scrap.classList.add("playing");
        
                            if (player) {
                                player.playVideo();
                            }
        
                            // 再実行.
                            the_timeout();
                            the_interval();
                        } 
                      }
                   }
            }
        }

        // ポインターの削除と追加.
        if(e.metaKey) {
            if (k == "c") { 
                function delete_opacam() {
                    // 「opac_cam」 を指標として利用してから即削除.
                    if (document.querySelector(".opac_cam")) {
                        document.querySelector(".opac_cam").remove();
                    }                         
                }

                function pointer_anim() {                    
                    pri_pointer.animate(
                        [
                          { scale: 1 },
                          { scale: 0.8 }
                        ], {
                          duration: 400,
                          fill: "both",
                        }
                    );
                    pri_pointer.animate(
                        [
                            { scale: 0.8 },
                            { scale: 1,  }
                        ], {
                          duration: 300,
                          fill: "both",
                          delay: 400,
                        }
                    );
                }

                if (centering) {
                    if (the_see_centering.firstElementChild.firstElementChild.scrollLeft == Number(target_data(centering, "scroll_left_"))) {
                        if (the_see_centering.classList.contains("principle_pointer") && centering.classList.contains("opac_cam") == false){
                            delete_opacam(); 
                            pointer_anim();
                            setTimeout(() => {
                                orange_data = delete_orange_p(orange_data);
                            }, 200)
                        } else if (centering.classList.contains("opac_cam") == true) {
                            delete_opacam();
                            pointer_anim();
                            setTimeout(() => {
                                orange_data = orange_pointer_make(the_see_centering, orange_data);
                            }, 200)
                        }
                    } else {
                        delete_opacam();   
                        pointer_anim();
                        setTimeout(() => {
                            orange_data = orange_pointer_make(the_see_centering, orange_data);
                        }, 200)
                    }
                } else {
                    pointer_anim();
                    setTimeout(() => {
                        orange_data = orange_pointer_make(the_see_centering, orange_data);
                    }, 200)
                }
            }
        }

        // Edit モードを終了.
        if (k == "Escape") {
            // 編集を終了する時点でorange_pointer_f が存在したら初めて実行。存在しなかったら周辺のorange群を放棄する.
            if (document.querySelector(".orange_pointer_f")) {
                
                // 編集していた もともとの sp_coverを取得. 
                let original_sp_cover = document.querySelector(".target_of_edition");

                // 最初に sp_coverをクリーンアップ。
                for (let i = 0; i < original_sp_cover.children.length; i++) {
                    let vers = original_sp_cover.children[i].lastElementChild.children;
                    for (let o = vers.length - 1; o >= 0 ; o--) {
                        // adjusterを残しておく.
                        if (o > 0) { 
                            vers[o].remove();
                        }
                    }
                }

                let scraps = document.querySelector(".new_layer").children;

                // 本来same_endではなかったが、編集の結果same_endとなるブロックへの対処。中身にvideo本来を格納. 
                // ブロックの content が video で左隣は船内のsameで右隣は船外のsame、そして、same_end を持っていないなら実行. 
                let special_menu = (e, f, g) => {
                    let f_p = g;
                    if (e.previousElementSibling) {
                        if (e.previousElementSibling.classList.contains("same") && e.previousElementSibling.classList.contains("you_in")) {
                            if (e.nextElementSibling) {
                                if (e.nextElementSibling.classList.contains("same") && e.nextElementSibling.classList.contains("you_in") == false) {                                                     
                                    if (f.classList.contains("same") && f.classList.contains("same_end") == false) {
                                        let the_t = "same_num_" + target_data(e, "same_num_");
                                        let hit_target = document.getElementsByClassName(the_t)[document.getElementsByClassName(the_t).length - 1];
                                        let the_natural_cont = hit_target.lastElementChild.cloneNode(true);
                                        the_natural_cont.style.opacity = 1;
                                        // dupブロックだった場合を想定.                                        
                                        if (f.lastElementChild) {
                                            f.lastElementChild.remove();
                                        }
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

                                        let same_name = "same_num_" + target_data(f, "same_num_");
                                        let breakpoint = [].slice.call(f_p.children).indexOf(f);                                                        
                                        
                                        let same_data = same_data_getter();
                                        same_data += 1;
                                        same_data_counter(same_data);
                                
                                        for (let i = f_p.children.length - 1; i >= breakpoint; i--) {
                                            if (f_p.children[i].classList.contains(same_name)) {
                                                let same_block = f_p.children[i];
                                                classmover(same_block, same_block, "same_num_", "remove");
                                                same_block.classList.add("same_num_" + same_data);
                                            }
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
                        
                        // 先頭が orange_space, それ以外の場所に sp が並ぶ。
                        
                        // orange_spaceについて
                        let po_and_st = scraps[i].firstElementChild.firstElementChild.firstElementChild.children;
                        let block_num = f;

                        // １つのorange_stripe の中に乗っかっているブロックを検出する処理.
                        let thisblock_scrollleft_st = (blocksize * block_num) + full_start_scrollwidth - blocksize;
                        let thisblock_scrollleft_en = thisblock_scrollleft_st + blocksize;

                        for (let o = 0; o < po_and_st.length; o++) {
                            if (po_and_st[o].classList.contains("orange_pointer_s")) {
                                let the_pointer_s = po_and_st[o];
                                let the_pointer_f = grab_auto(the_pointer_s)[1];
                                let the_pointer_scrollleft_st = Number(target_data(the_pointer_s, "scroll_left_")) + 5;
                                let the_pointer_scrollleft_en = Number(target_data(the_pointer_f, "scroll_left_")) + 5;
                                let the_desition_one = false;
                                let the_desition_second = false;

                                // s - f　上に "st" が乗っかっているかどうか判定.
                                if (the_pointer_scrollleft_st <= thisblock_scrollleft_st && thisblock_scrollleft_st < the_pointer_scrollleft_en) {
                                    the_desition_one = true;
                                }
                                // s - f　上に "en" が乗っかっているかどうか判定.
                                if (the_pointer_scrollleft_st < thisblock_scrollleft_en && thisblock_scrollleft_en <= the_pointer_scrollleft_en) {
                                    the_desition_second = true;
                                }

                                // 以下「完全に orange_stripe の上に乗っかっていたわけではないブロック」への対応処理.
                                let fif = (f, g) => {
                                    orange_block_counter += 1;
                                    e.classList.add("you_in");
                                    e.classList.add("you_" + orange_block_counter);
                                    you_are_on_orange = e.cloneNode(true);

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
                                    if (gap > 10 && gap < blocksize) {
                                        if (gap > 50) {
                                            fif("actuar_en", gap - 5);
                                        }
                                    }
                                } else if (the_desition_one == false && the_desition_second == true) {
                                    let gap = thisblock_scrollleft_en - the_pointer_scrollleft_st;
                                    if (gap > 10 && gap < blocksize) {                                       
                                        if (gap > 50) {
                                            fif("actuar_st", 405 - gap);
                                        }
                                    }
                                }
                            }
                        }
                        return you_are_on_orange;
                    }

                    // 以下scap ごとにorange_stripeの上にあるブロックを検出して Fragment に束ねていく処理.
                    let sps = scraps[i].children;
                    for (let o = 0; o < sps.length; o++) {
                        
                        // 先頭のOrange_spaceをスキップ.
                        let scrap_sp_hor_fragment = document.createDocumentFragment();
                        let sp_hor_blocks = sps[o].lastElementChild.children;

                        for (let l = 0; l < sp_hor_blocks.length; l++) {
                            // 最初と最後の adjuster を省く.
                            if (l != 0 && l != sp_hor_blocks.length - 1) {
                                let active_block = stripe_inner_or_out(sp_hor_blocks[l], l);
                                if (active_block) {                                    
                                    scrap_sp_hor_fragment.appendChild(active_block);
                                }
                            }
                        }

                        // 新たな same群 の生成.
                        for (let l = 0; l < scrap_sp_hor_fragment.children.length; l++) {
                            let the_ob_name = "you_" + target_data(scrap_sp_hor_fragment.children[l], "you_");
                            let its_you = document.getElementsByClassName(the_ob_name)[0];
                            special_menu(its_you, scrap_sp_hor_fragment.children[l], scrap_sp_hor_fragment);
                        }
                        
                        // デフォルトレイヤーにおける編集対象だったsp_coverへFragmentたちを挿入. 編集モードから回帰.
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

                original_sp_cover.classList.remove("see");
                original_sp_cover.classList.remove("target_of_edition");
            } 
            // edit モードをリセット.
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
            
            bo.style.backgroundColor = "#121212";
            bo.classList.remove("edit_mode");
            screen.style.display = "block";
            let final_centering = document.querySelector(".centering");
            // 編集モードが終了してからデフォルトレイヤーに戻って最初のフォーカス.
            focus_checker(final_centering);
            let the_e_n = final_centering.getBoundingClientRect().top + window.pageYOffset - (window.innerHeight * 0.6);
            scrollBy(0, - the_e_n);

            // 編集直後のMS起動への対策.
            is_it_same_series(final_centering);
        }
    }
});
