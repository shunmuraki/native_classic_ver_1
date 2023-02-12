import { screen, the_name_list, blocksize } from "../base/elements.js";
import { focus_checker, make_ver_fragment } from "../base/function.js";
import { classmover, tracer_basis, vertical_to_hor, vertical_to_sp_cover, which_special_is } from "../base/tools.js";
import { adjust_target_pos } from "../ms/function.js";
import { is_it_same_series } from "../multiable/function.js";

window.addEventListener("keydown", (e)=>{

    if (screen.classList.contains("edit") == false && screen.classList.contains("um") == false) {

        let current;
        let current_vertical;
        let type_signiture;
        
        if (document.activeElement.tagName != "BODY") {
            current = document.activeElement;
            type_signiture = current.value;
            
            if (document.activeElement.classList.contains("ms_area") == false) {    
                current.style.height = 24 + 'px';
                let scrollHeight = current.scrollHeight;
                current.style.height = scrollHeight + 'px'; 
                let height = current.clientHeight;
                current.parentElement.style.height = height + "px";
            }
        }

        current_vertical = document.querySelector(".centering");
        let current_horizontal = vertical_to_hor(current_vertical);
        let current_sp_cover = vertical_to_sp_cover(current_vertical);

        if (type_signiture) {
            if ( type_signiture.indexOf('connec') != -1) {
                if (screen.classList.contains("ms")) {
                    // 先にms調整箇所を戻しておいてそれから複製させる. 
                    let target = current_vertical;
                    if (current_vertical.classList.contains("same")) {
                        target = which_special_is(current_vertical);
                    } 
                    adjust_target_pos(target.lastElementChild, "off");
                    
                    tracer_basis(document.querySelector(".centering"));
                    document.querySelector(".ms_area").remove();
                    if (document.querySelector(".centering").lastElementChild == "TEXTAREA") {
                        document.querySelector(".centering").lastElementChild.focus();
                    }
                
                    let the_sp_cover_a = current_sp_cover.previousElementSibling;
    
                    // 移動先にブロックたちを移動するために配列にブロックを格納.
                    if (the_sp_cover_a) {

                        // 移動を終えた上でスクロール位置が調整できるように centering の番号を控えておく.
                        let the_centering_num = 0;
                        for (let i = 0; i < current_horizontal.children.length; i++) {
                            // adjuster をスキップ.
                            if (i != 0) {
                                if (current_horizontal.children[i].classList.contains("centering")) {
                                    the_centering_num = i;
                                }
                            }
                        }
                        let the_current_tops = the_centering_num;
                        let the_current_bottoms = current_horizontal.childElementCount - the_centering_num;
                    
                        // original_centering を結合地点として全体のブロック数を算出するために 何番目 かを控える.
                        let inc_last_children = the_sp_cover_a.lastElementChild.lastElementChild.children;
                        let original_centering_num = 0;
                        for (let i = 0; i < inc_last_children.length; i++) {
                            if (i != 0) {
                                if (inc_last_children[i].classList.contains("original_centering")) {
                                    original_centering_num = i;
                                }  
                            }
                        }
                        let the_original_tops = original_centering_num;
                        let the_original_bottoms = the_sp_cover_a.lastElementChild.lastElementChild.childElementCount - original_centering_num;
                    
                        // ブロック数の最大値を算出するための一連の計算処理.
                        let the_triumph_tops = 0;
                        let the_triumph_bottoms = 0;
                        
                        if (the_current_tops > the_original_tops) {
                            the_triumph_tops = the_current_tops;
                        } else {
                            the_triumph_tops = the_original_tops;
                        }
                    
                        if (the_current_bottoms > the_original_bottoms) {
                            the_triumph_bottoms = the_current_bottoms;
                        } else {
                            the_triumph_bottoms = the_original_bottoms;
                        }
                    
                        let the_top_less = the_triumph_tops - the_original_tops;
                        let the_bottom_less = the_triumph_bottoms - the_original_bottoms;
                    
                        for (let i = 0; i < the_sp_cover_a.children.length; i++) {
                            if (i >= 0) {
                                for (let o = 0; o < the_top_less; o++) {
                                    const first_block = the_sp_cover_a.children[i].lastElementChild.children[1];
                                    //　先頭より小さかったら
                                    make_ver_fragment(first_block, "before");
                                }
                                for (let o = 0; o < the_bottom_less; o++) {
                                    let last_block = the_sp_cover_a.children[i].lastElementChild.lastElementChild;
                                    // お尻より大きかったら
                                    make_ver_fragment(last_block, "after");
                                }
                            }
                        }
                    
                        // あとは複製をしてライン同士を同期.
                        let sp_copied = the_sp_cover_a.lastElementChild.cloneNode(true);
                        let children_block = sp_copied.lastElementChild.children;
                        let the_this_loop_endpoint = the_triumph_tops - the_centering_num + current_horizontal.childElementCount - 1;
    
                        // 複製をする前に中身をクリーンにする.
                        for (let i = 0; i < children_block.length; i++) {
                            if (i > 0) {
                                for (let o = 0; o < the_name_list.length; o++) {
                                    classmover(children_block[i], children_block[i], the_name_list[o], "remove");
                                }
    
                                if (children_block[i].lastElementChild) {
                                    children_block[i].lastElementChild.remove();
                                }
                                let new_textarea = document.createElement("textarea");
                                new_textarea.classList.add("write_area")
                                new_textarea.classList.add("styling_1_1_0_1");
                                children_block[i].appendChild(new_textarea);
                                children_block[i].style.height = 66 + "px";
                                
                                if (i <= the_this_loop_endpoint) {
                                    let the_content_disi = i - the_triumph_tops + the_centering_num;
                    
                                    if (the_content_disi > 0) { 
                                    
                                        // ブロック単位でクラスを引き継ぐ.
                                        let old_block = current_horizontal.children[the_content_disi];
                                        let the_content_embed = null;
                                        
                                        if (old_block.lastElementChild) {
                                            the_content_embed = old_block.lastElementChild.cloneNode(true);
                                        }
                                        
                                        for (let o = 0; o < the_name_list.length; o++) {
                                            classmover(old_block, children_block[i], the_name_list[o], "add");
    
                                            // 表示上のスタイルも引き継ぐ.
                                            let s_h = getComputedStyle(old_block);
                                            children_block[i].style.height = s_h.height;
                                        }
    
                                        children_block[i].lastElementChild.remove();
                                        
                                        // centering クラスを引き継ぐ.
                                        if (current_horizontal.children[the_content_disi].classList.contains("centering")) {
                                            children_block[i].classList.add("centering")
                                        }
                                        if (the_content_embed) {
                                            children_block[i].appendChild(the_content_embed);
                                        }
                                    }
                                }
                            }
                        }     
                    
                        //　ここで複製したラインを実際に sp_cover へ挿入.
                        the_sp_cover_a.appendChild(sp_copied);
                        
                        // sp_cover 内のスタイリングのため.
                        the_sp_cover_a.classList.add("connected");
                
                        let before_in_sp_num = the_sp_cover_a.childElementCount;
                        let the_ined_name = "inner_sp_num_" + before_in_sp_num + 1;
                        sp_copied.classList.add(the_ined_name);
                        
                        let the_center_num_b = [].slice.call(current_horizontal.children).indexOf(current_vertical) + 1;
                        let the_default_leng = current_horizontal.scrollLeft;
                        
                        // 最後に移動元の sp_cover を削除.
                        current_sp_cover.remove();
                    
                        // センタリングを本来の場所へ戻す.
                        let center = document.querySelector(".centering");
                        let latest_hor = vertical_to_hor(center);
                        let the_center_num = [].slice.call(latest_hor.children).indexOf(center) + 1;
                        let the_b_a_gap = the_center_num - the_center_num_b;
                        
                        let the_redefault_scroll = the_b_a_gap * blocksize;
                        for (let i = 0; i < the_sp_cover_a.children.length; i++) {
                            the_sp_cover_a.children[i].lastElementChild.scrollLeft = the_default_leng + the_redefault_scroll;
                        }
        
                        let last_one = the_sp_cover_a.lastElementChild.lastElementChild.children[the_center_num - 1];
    
                        // Connect の場合は この sp の special_cov だけ削除しているので、それを再起させるだけでいい.
                        is_it_same_series(last_one);
                        
                        // フォーカスを当てる.
                        let bol = focus_checker(last_one);
                        if (bol) {
                            setTimeout(() => {
                                last_one.lastElementChild.value = last_one.lastElementChild.value.slice(0, -1);
                            }, 10)
                        }
                        
                        screen.classList.remove("ms");
                        
                    }
                }
            }
        }
    }
});