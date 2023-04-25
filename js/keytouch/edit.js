import { keytouch_basic, original_centering_checker, pointer_anim, adjust_box, focus_checker, centering_marker, adjust_target_pos, wheel_positioning, pointer_anim } from "../function/general.js";
import { vertical_to_hor, is_it_same_series, vertical_to_hor, tracer_basis, elem_post_getter, classmover } from "../function/tool.js";
import { is_it_same_series, yt_player_getter, yt_resetter, is_it_same_series } from "../function/multi.js";
import { make_ver_fragment } from "../function/make.js";
import { orange_pointer_make, add_orange_space_for_everyone, best_related_element, principle_management, all_view_changer, pre_pointing_in, pre_pointing_out, comesin_management, actuar_st_alloff, actuar_en_alloff  } from "../function/edit.js";
import { go_top, go_left, go_bottom, go_right } from "../function/motion.js";
import { the_name_list, screen, bo, blocksize, linesize, blocktime, half_left_width, full_end_scrollwidth, full_start_scrollwidth, custom_end_scrollwidth } from "../data/constant.js";
import { native_value } from "../data/variable.js";

let orange_data = native_value("orange_data");
let timeoutArray = native_value("timeoutArray");
let intervalArray = native_value("intervalArray");
let the_scrolled_distance = native_value("the_scrolled_distance");

window.addEventListener("keydown", (e)=>{
    
    if (document.activeElement.tagName == "TEXTAREA") {
        
        let k = e.key;
        let current;
        let type_signiture;
        let current_vertical;
        let current_horizontal;
        let current_sp_cover;
        keytouch_basic(current, type_signiture, current_vertical, current_horizontal, current_sp_cover);
        
        // Editモードを展開.
        if (type_signiture.indexOf('edi') != -1) {

            if (screen.classList.contains("ms")) {

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
                
                // これを機にデフォルトレイヤーのspecial_covを一掃.
                let specials = document.querySelectorAll(".special_cov");
                if (specials.length > 0) {
                    for (let i = specials.length - 1; i >= 0; i--) {
                        specials[i].remove();
                    }
                }

                // special_cov を全削除した分、表示の都合上 same_end 側をすべて表示しておく必要がある.
                let ends = document.querySelectorAll(".same_end");
                for (let i = ends.length - 1; i >= 0; i--) {
                    // ends[i].lastElementChild.style.setProperty('opacity', 1, 'important');
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
                bo.style.backgroundColor = "#0070D8";
                bo.classList.add("edit_mode");
    
                // 横に 10 個ずつのブロックを展開し、縦にタイムラインを展開する.
                // adjuster が２つ。
                let vh_count = current_horizontal.childElementCount - 2;
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

                // * このあたりで「余計に scrap が生成されている」疑いがある。
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
                    // 最後尾のadjuster をスキップ  
                    for (let o = 0; o < screen_vers.length - 1; o++) {
                        // 前のadjuster をスキップ  
                        if (o > 0 ) {
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

                            // * おそらくここで、デフォルトスクリーンのブロックたちから編集レイヤーの新しいブロックへ特定のクラスを移行している。
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
                                // 連続箇所の場合に無駄な分裂をさせずに済ませるために。
                                the_target_start.classList.add("co");
                            }
                            if (the_target_end.classList.contains("same") && the_target_end.classList.contains("same_end") == false) {
                                the_target_end.classList.add("same_end"); 
                                // 連続箇所の場合に無駄な分裂をさせずに済ませるために。
                                the_target_end.classList.add("co");
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
                is_it_same_series(document.querySelector(".new_layer_centering"));
                layer_centering.classList.remove("new_layer_centering");

            }
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
        } 

        if (! new_layer.classList.contains("autoseekingmode")) {
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
        }

        // シーキング機能の処理.
        if(! e.shiftKey) {
            if (e.ctrlKey) {
                if (k == "s") {
                    pointer_anim();
                    // actuar_st は途中から始まるわけだから、最初に opacity をいじっておく必要がある.
                    actuar_st_allon();
                    new_layer.classList.add("autoseekingmode");
                    let centering = document.getElementsByClassName("new_layer_centering")[0];
                    let scrap = vertical_to_sp_cover(centering);
                    let hor = vertical_to_hor(centering);
                    let the_seeking_time;
                    let players_list = new Array();
                    let play_when;
                    let pause_when;

                    // ここも connected の場合に対応させる.
                    let the_block_num = Math.floor((hor.scrollLeft + half_left_width - window.innerWidth) / blocksize);
                    for (let i = 0; i < scrap.children.length; i++) {
                        // orange_space を弾く.
                        if (i > 0) {
                            let horizon = scrap.children[i].lastElementChild;
                            for (let o = 0; o < horizon.children.length; o++) {
                                let the_block = horizon.children[the_block_num + 1];
                                let the_special_cov = which_special_is(the_block);
                                if (the_special_cov) {
                                    if (the_special_cov.lastElementChild) {
                                        if (the_special_cov.lastElementChild.tagName == "IFRAME") {
                                            let player = yt_player_getter(the_special_cov.lastElementChild);
                                            player.pauseVideo();
                                            // この時点で動画が再生されていたらループをストップ.
                                            let the_name = "same_num_" + target_data(the_special_cov, "this_cov_is_");
                                            just_clear_yt_loop(the_name);
                                        }
                                    }
                                }
                            }
                        }
                    }
        
                    if (hor.scrollLeft < full_end_scrollwidth) {
                        // 初期値のセット.
                        the_seeking_time = blocktime * 1000;
                        function the_timeout() {
                            timeoutArray.push(setTimeout(() => {
                                let centering_you = document.getElementsByClassName("new_layer_centering")[0];
                                if (centering_you.nextElementSibling && scrap.classList.contains("playing")) {
                                    let next_one_is_you = centering_you.nextElementSibling;
                                    let the_block_num = Math.floor((hor.scrollLeft + half_left_width - window.innerWidth) / blocksize);
                                    centering_marker(centering_you, next_one_is_you, "new_layer_centering");
                                    is_it_same_series(next_one_is_you);
                                    the_timeout();
                                    
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
                                                        clearTimeout(timeoutArray.shift());
                                                        clearInterval(intervalArray.shift());

                                                        let player;
            
                                                        if (the_special_cov.lastElementChild) {
                                                            if (the_special_cov.lastElementChild.tagName == "IFRAME") {
                                                                player = yt_player_getter(the_special_cov.lastElementChild); 
                                                            }
                                                        }
            
                                                        setTimeout(() => {
                                                            if (player) {
                                                                player.pauseVideo();
                                                                let the_time = yt_resetter();
                                                                player.seekTo(the_time);
                                                                player.playVideo();
                                                            }        
            
                                                            // この setTimeout １秒分を考慮する.
                                                            let ms = pause_when - play_when;
                                                            the_seeking_time = (blocktime * 1000) - ms;
                                                            the_timeout();
                                                            the_interval();
                                                        }, 1000)
                                                    }
                                                }
                                            }
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
                            //　ここもループにする.
                            // すべての special_cov からすべての player を取って全部止める.
                            let specials = document.getElementsByClassName("special_cov");
                            for (let i = 0; i < specials.length; i++) {
                                let player;
                                let the_special_cov = specials[i];
                                if (the_special_cov.lastElementChild) {
                                    if (the_special_cov.lastElementChild.tagName == "IFRAME") {
                                        player = yt_player_getter(the_special_cov.lastElementChild); 
                                        if (player) {
                                            player.pauseVideo();

                                            // また再開する時に全部を開始できるように.
                                            players_list.push(player);
                                        }
                                    }
                                }
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

                            let start = new Date();
                            play_when = start.getTime();
        
                            scrap.classList.remove("pausing");
                            scrap.classList.add("playing");

                            function player_starter(e) {
                                e.pauseVideo();
                                let the_time = yt_resetter();
                                e.seekTo(the_time);
                                e.playVideo();
                            }

                            // 現在表示しているすべての player の再生を開始する.
                            if (players_list.length == 0) {
                                let specials = document.getElementsByClassName("special_cov");
                                for (let i = 0; i < specials.length; i++) {
                                    let player;
                                    let the_special_cov = specials[i];
                                    if (the_special_cov.lastElementChild) {
                                        if (the_special_cov.lastElementChild.tagName == "IFRAME") {
                                            player = yt_player_getter(the_special_cov.lastElementChild); 
                                            if (player) {
                                                player_starter(player);
                                            }
                                        }
                                    }
                                }
                            } else { 
                                for (let i = 0; i < players_list.length; i++) {
                                    let player = players_list[i];
                                    player_starter(player);
                                }
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

            e.preventDefault();

            if (new_layer.classList.contains("autoseekingmode")) {

                the_scrolled_distance = 0;
                actuar_st_alloff();
                actuar_en_alloff();
                
                // 一番近いブロックを探させてcenteringを渡すようにする.
                let see_target = document.querySelector(".see");
                let orange_pointer_space = see_target.firstElementChild.firstElementChild;
                
                // comesin があるなら 無条件で クラスを取り外す.
                let current_comesin = document.querySelector(".comesin");
                if (current_comesin) {
                    current_comesin.classList.remove("comesin");
                }

                if (see_target.classList.contains("principle_pointer")) {
                    let nextstep = best_related_element(see_target, orange_pointer_space.scrollLeft, "pointer", orange_data);
                    let new_one = nextstep[0];
                    let scroll_distance = nextstep[1];
                    new_one.classList.add("comesin");
                    let the_gap = scroll_distance - orange_pointer_space.scrollLeft;
                    all_view_changer(see_target, the_gap);                   
                } else if (see_target.classList.contains("principle_block")) {
                    let nextstep = best_related_element(see_target, orange_pointer_space.scrollLeft, "block", orange_data);
                    let new_one = nextstep[0];
                    let scroll_distance = nextstep[1];
                    document.querySelector(".new_layer_centering").classList.remove("new_layer_centering");
                    new_one.classList.add("new_layer_centering");            
                    let the_gap = scroll_distance - orange_pointer_space.scrollLeft;
                    all_view_changer(see_target, the_gap);
                    is_it_same_series(new_one);
                }
                
                wheel_positioning();
                new_layer.classList.remove("autoseekingmode");

            } else {

                // 「pointer_s の相手がいなかった場合」ってどうやって導き出すんだろう。
                // -- pointer の数が奇数、とか？
                // 「pointer の数が偶数である場合」という条件を全体に追加してあげる必要があると思う。
                let orange_pease = document.querySelectorAll(".orange_pointer").length;

                console.log(orange_pease);

                // pointer が片方しか打たれていないまま escape キーの処理が実行されるのを回避。
                if (orange_pease % 2 == 0) {
                    // 編集を終了する時点でorange_pointer_f が存在したら初めて実行。存在しなかったら周辺のorange群を放棄する.
                    if (document.querySelector(".orange_pointer_f")) {

                        let scraps = document.querySelector(".new_layer").children;
                        
                        // 編集していた もともとの sp_coverを取得. 
                        let original_sp_cover = document.querySelector(".target_of_edition");
                        // 最初に sp_coverをクリーンアップ。
                        for (let i = 0; i < original_sp_cover.children.length; i++) {
                            let vers = original_sp_cover.children[i].lastElementChild.children;
                            // 最後尾のadjusterを残しておく.
                            for (let o = vers.length - 2; o >= 0 ; o--) {
                                // 最初のadjusterも残しておく.
                                if (o > 0) { 
                                    vers[o].remove();
                                }
                            }
                        }

                        // EXTRACZATION!!!! ----------------------------------------
                        // EXTRACZATION!!!! ----------------------------------------
                        let cool = new Array();

                        let stripe_inner_or_out = (e) => {

                            let w_col = new Array();

                            // scrapごとに処理をする。
                            let po_and_st = scraps[e].firstElementChild.firstElementChild.firstElementChild.children;
                        
                            // stripe ごとに処理する。
                            // stripeの先頭と最後尾のブロックを検出し、それらについての情報を調べて「同一scrap内のsp間で共通の選択範囲を示すデータ」を作成する。
                            for (let o = 0; o < po_and_st.length; o++) {
                                if (po_and_st[o].classList.contains("orange_pointer_s")) {
                                    let the_pointer_s = po_and_st[o];
                                    let the_pointer_f = grab_auto(the_pointer_s)[1];

                                    // そもそもこれが正しいのかは分からないけどな。
                                    let the_pointer_scrollleft_st = Number(target_data(the_pointer_s, "scroll_left_"));
                                    let the_pointer_scrollleft_en = Number(target_data(the_pointer_f, "scroll_left_"));
                        
                                    // stripeごとの選択範囲を示すデータ。scrap - orange_space ごとに束ねることになる。
                                    let stcl = new Array();
                                    let w = full_start_scrollwidth;

                                    // pointer_s と pointer_f のポジションをブロック数に変換。
                                    let st = Math.trunc((the_pointer_scrollleft_st - w) / blocksize) + 1;
                                    let en = Math.trunc((the_pointer_scrollleft_en - w) / blocksize);
                        
                                    // -- st について
                                    // 差分を取得してこれが 50 以上なら actuar と認定し、same_start と一緒にデータに格納する。
                                    // * BANS: [[何番目のst, actuar_stの大きさ], [何番目のen, actuar_enの大きさ]]
                                    let st_d = Math.trunc(the_pointer_scrollleft_st - w - (blocksize * (st - 1)));
                                    
                                    if (st_d > 50) {
                                        let rsd = blocksize - st_d;
                                        stcl.push([st, rsd]);
                                    } else {
                                        stcl.push([st, "NONE"]);
                                    }
                        
                                    // -- en について
                                    // 差分を取得してこれが 50 以上なら actuar と認定し、same_start と一緒にデータに格納する。
                                    // * BANS: [[何番目のst, actuar_stの大きさ], [何番目のen, actuar_enの大きさ], coの関係かどうか]
                                    let en_d = Math.trunc(the_pointer_scrollleft_en - w - (blocksize * en)); 
                                    
                                    if (en_d > 50) {
                                        stcl.push([en, en_d]);
                                    } else {
                                        // co についても処理。
                                        stcl.push([en, "NONE"]);
                                    }

                                    w_col.push(stcl);
                                }
                            }

                            cool.push(w_col);
                        }
                        
                        // 実行（データ成形）
                        for (let i = 0; i < scraps.length; i++) {
                            stripe_inner_or_out(i);
                        }
                        
                        // BANSについてループ
                        // クラスの付与(same_start / same_end / actuar_st / actuar_en / actuar_time_), same_num の変更.
                        // * scrap ごとに存在する「BANS」
                        // * BANS: [[何番目のst, actuar_stの大きさ], [何番目のen, actuar_enの大きさ], coの関係かどうか.
                        for (let i = 0; i < scraps.length; i++) {
                            
                            let bans = cool[i];
                            let sps = scraps[i].children;
                        
                            for (let o = 0; o < bans.length; o++) {
                                
                                // 上で一通り作成した、抽出範囲を示すデータ
                                let st_n = bans[o][0][0];
                                let st_a = bans[o][0][1];
                                let en_n = bans[o][1][0];
                                let en_a = bans[o][1][1];
                        
                                // 新しく配布する same_num_ がいくつかを保存する変数.
                                let nex;

                                // 最初のブロックと最後尾のブロックの間にどれくらいのブロックが入っているか。
                                let bbb = en_n - st_n + 1;

                                for (let l = 1; l < sps.length; l++) {
                        
                                    let st_block = sps[l].lastElementChild.children[st_n];
                                    let en_block = sps[l].lastElementChild.children[en_n];
                        
                                    let fragment = document.createDocumentFragment();
                        
                                    // -- ST_BLOCK について
                                    
                                    // ---- まず nex を決める。
                                    if (st_block.classList.contains("co") && scraps[i].classList.contains("continue_former")) {
                                        st_block.classList.remove("same_start");
                                        console.log(scraps[i].children[l]);
                                        nex = target_data(scraps[i].children[l], "continue_num_");
                                    } else {
                                        // 通常処理
                                        let same_data = same_data_getter();
                                        same_data += 1;
                                        same_data_counter(same_data);
                                        nex = same_data + 1;
                                        same_data_counter(nex);
                                        st_block.classList.add("same_start");
                                    }

                                    if (st_block.classList.contains("co")) {
                                        st_block.classList.remove("co");
                                    }

                                    // --- same と関連性のない actuar の処理
                                    if (st_a != "NONE") {
                                        st_block.classList.add("actuar_st");
                                        st_block.classList.add("actuar_time_" + st_a);
                                    }
                                    
                                    // ---- nex を用いた、新しいクラスの配布。   
                                    for (let m = 0; m < bbb; m++) {
                                        let t = sps[l].lastElementChild.children[st_n + m];
                                        classmover(t, t, "same_num_", "remove");
                                        t.classList.add("same_num_" + nex);
                                        // same_end を除いてfragmentへ追加
                                        if (en_n != st_n + m) {
                                            let cloned_t = t.cloneNode(true);
                                            fragment.appendChild(cloned_t);
                                        }
                                    }
                        
                                    // -- EN_BLOCK について

                                    if (en_block.lastElementChild) {
                                        en_block.lastElementChild.remove();
                                    } else {
                                        if (! en_block.classList.contains("co")) {
                                            // 本当の same_end ではない場合、これと同時に「stable」クラスを付与する。
                                            en_block.classList.add("stable");
                                            en_block.classList.add("stable_end");
                                        }
                                    }

                                    if (en_block.classList.contains("co")) {
                                        if (scraps[i + 1]) {
                                            let same_data = same_data_getter();
                                            scraps[i + 1].classList.add("continue_former");
                                            scraps[i + 1].children[l].classList.add("continue_num_" + same_data);
                                        } 
                                        en_block.classList.remove("same_end");
                                        en_block.classList.remove("co");

                                    } else {
                                        en_block.classList.add("same_end");
                                        let the_t = "id_is_" + target_data(en_block, "id_is_");
                                        let hit_target = document.getElementsByClassName(the_t)[document.getElementsByClassName(the_t).length - 1];
                                        let the_natural_cont = hit_target.lastElementChild.cloneNode(true);
                                        // the_natural_cont.style.setProperty('opacity', 1, 'important');
                                        // dupブロックだった場合を想定. 
                                        en_block.appendChild(the_natural_cont);
                                    }

                                    // --- same と関連性のない actuar の処理
                                    if (en_a != "NONE") {
                                        en_block.classList.add("actuar_en");
                                        en_block.classList.add("actuar_time_" + en_a);
                                    }
                        
                                    // fragmentへ追加
                                    let cloned_f = en_block.cloneNode(true);
                                    fragment.appendChild(cloned_f);
                        
                                    // fragmentの回帰。
                                    original_sp_cover.children[l - 1].lastElementChild.lastElementChild.before(fragment);
                                }
                            }
                        }


                        // ---------------------------------------- EXTRACZATION!!!!
                        // ---------------------------------------- EXTRACZATION!!!!

                        // same_end のみについけていた stable クラスを、 same_start にも配る。
                        // same_end のstable の次のブロックは必ず stable である、という考えに基づいて。
                        let stables = document.getElementsByClassName("stable");
                        for (let i = 0; i < stables.length; i++) {
                            if (stables[i].nextElementSibling) {
                                stables[i].nextElementSibling.classList.add("stable");
                            }
                        }


                        // スタイリングやクラスの付け替えなどの新調.
                        if (document.querySelector(".centering")) {
                            document.querySelector(".centering").classList.remove("centering");
                        }

                        let the_new_focusedblock = original_sp_cover.lastElementChild.lastElementChild.lastElementChild.previousElementSibling;
                        // the_new_focusdblock の中に要素が入っていないことが問題になっている。
                        // 確かに same_end を作る際に、大元から中身をコピーしていないことが問題なんじゃないか。
                        
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
                    let covs = document.querySelectorAll(".special_cov");
                    for (let i = 0; i < covs.length; i++) {
                        covs[i].remove();
                    }
                    
                    bo.style.backgroundColor = "#0070D8";
                    bo.classList.remove("edit_mode");
                    screen.style.display = "block";
                    let final_centering = document.querySelector(".centering");
                    let now_position = vertical_to_hor(final_centering).scrollLeft;
                    all_view_changer(vertical_to_sp_cover(final_centering), custom_end_scrollwidth(vertical_to_hor(final_centering)) - now_position);
                    // 編集モードが終了してからデフォルトレイヤーに戻って最初のフォーカス.
                    focus_checker(final_centering);
                    adjust_box(final_centering);

                    // 編集直後のMS起動への対策.
                    is_it_same_series(final_centering);
                    wheel_positioning();
                
                }
            }
        }
    }
});
