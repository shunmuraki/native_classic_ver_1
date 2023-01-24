import { screen } from "../base/elements.js";
import { is_it_same_series, same_cutter } from "../multiable/function.js";
import { make_fragment, make_ver_fragment, go_top, go_left, go_bottom, go_right, centering_marker, original_centering_checker, vertical_stripe_checker, horizontal_stripe_checker } from "./function.js";
import { vertical_to_hor, vertical_to_sp, vertical_to_sp_cover } from "./tools.js";

    // 縦に要素を追加する処理
    window.addEventListener("keydown", (e)=>{
        if (screen.classList.contains("edit") == false && screen.classList.contains("um") == false) {
            let k = e.key;

            let current;
            let current_vertical;
            let type_signiture;
            
            if (document.activeElement.tagName != "BODY") {
                current = document.activeElement;
                type_signiture = current.value;
                current_vertical = current.parentElement;

                if (document.activeElement.classList.contains("ms_area") == false) {
                    current.style.height = 24 + 'px';
                    let scrollHeight = current.scrollHeight;
                    current.style.height = scrollHeight + 'px'; 
                    let height = current.clientHeight;
                    current.parentElement.style.height = height + "px";
                }
                // 現在の sp_cover を取得して、その下に追加する（after）
            } else {
                current_vertical = document.querySelector(".centering");
            }
            
            let current_horizontal = vertical_to_hor(current_vertical);
            // let current_sp = vertical_to_sp(current_vertical);
            let current_sp_cover = vertical_to_sp_cover(current_vertical);
            // ------------------------------------------------------------------------------------------    
        
            if(e.metaKey) {
                if (k == "Enter") {
                    // v_stripe_op(current_vertical);
                    // [[[ --- new_setup --- ]]
                    original_centering_checker(current_sp_cover, current_vertical);
                    vertical_stripe_checker(current_sp_cover);
                    horizontal_stripe_checker(current_sp_cover);
        
                    make_fragment(current_sp_cover, "after");    
                    let next_one = current_sp_cover.nextElementSibling.lastElementChild.lastElementChild.lastElementChild;
                    var next_textarea = next_one.lastElementChild;
                    centering_marker(current_vertical, next_one, "centering");
                    // original_centering_marker(current_vertical);
        
                    next_textarea.focus();

                    is_it_same_series(next_one);
                }
            }
        
            // ------------------------------------------------------------------------------------------    
        
            // 横に要素を追加する処理
        
            if(e.metaKey) {
                if (k == "u") {
                    let sps = current_sp_cover.children;
                    let c_v_num = [].slice.call(current_horizontal.children).indexOf(current_vertical);
        
                    console.log("bap_after:" + c_v_num);
                    let scrollleft_b = current_horizontal.scrollLeft;
                    console.log(c_v_num);
        
                    console.log(sps.length);
                    console.log(sps);
                    // ここが違う？？
                    // let the_center_num = [].slice.call(current_horizontal.children).indexOf(current_vertical);
        
                    let balanc = 0;
                    let center_num = [].slice.call(sps).indexOf(vertical_to_sp(current_vertical));
        
                    console.log("center_num:" + center_num);
        
                    for (let i = 0; i < sps.length; i++) {
                        console.log(sps[i]);
                        console.log(vertical_to_sp(current_vertical));
                        if (i == center_num) {
                            console.log("wow");
                            make_ver_fragment(current_vertical, "after");  
                            let next_one = current_vertical.nextElementSibling;
                            console.log(next_one);
                            next_one.lastElementChild.focus();
                            centering_marker(current_vertical, next_one, "centering");
                            // current.previousElementSibling.style.opacity = 1;
                        } else {
                            // * ここがたぶん途中からの挿入である必要があって。だからindexOfの出番だと思う。
                            // ** editの場合は特別仕様にする必要がある...
                            let c_v = sps[i].lastElementChild.children[c_v_num];
                            if (c_v.classList.contains("same") || c_v.classList.contains("same_end") == false) {
                                let addition = c_v.cloneNode(true);
                                c_v.before(addition);
          
                                console.log(c_v);
                                console.log("dup made!");
                            } else if (c_v.classList.contains("same") == false || c_v.classList.contains("same_end")) {
                                console.log(c_v);
                                console.log("ver made!");
                                make_ver_fragment(c_v, "after");
                            }
                        }
                    }
        
                    // after that...
                    let center = document.querySelector(".centering");
                    let the_center_num_b = [].slice.call(vertical_to_hor(center).children).indexOf(center);
                    
                    console.log("bap_after:" + the_center_num_b);
                    balanc = the_center_num_b - c_v_num;
                    for (let i = 0; i < sps.length; i++) {
                        sps[i].lastElementChild.scrollLeft = balanc * 400 + scrollleft_b;
                        console.log(sps[i].lastElementChild.children[the_center_num_b]);
                        // original_centering_marker(sps[i].lastElementChild.children[the_center_num_b]);
                    }
                    // let target = sps[0].lastElementChild.children[the_center_num_b].children[1].style.opacity = 1;
        
                    // [[[ --- new_setup --- ]]]
                    original_centering_checker(current_sp_cover, center);
                    vertical_stripe_checker(current_sp_cover);
                    horizontal_stripe_checker(current_sp_cover);

                    // もし same の途中だったら　というケースを考える必要がある。ここでもう一度再構築が必要になる。

                    // SPECIAL COV
                    same_cutter(center, "addon");
                    is_it_same_series(center);
                }
            }
        
            // ------------------------------------------------------------------------------------------    
        
            // edit finished.
            if(e.metaKey) {
                if (k == " ") {
                    window.location.href = "/";
                }
            }
        
            // ------------------------------------------------------------------------------------------    
        
            // ver & hor moving func.
        
            if(e.shiftKey) {
                
                if (k == "ArrowUp") {
                    // original_centering_marker(current_vertical);
                    original_centering_checker(current_sp_cover, current_vertical);
                    console.log(current_vertical);
                    go_top(current_vertical, "centering");
                    // v_stripe_op(current_vertical);
                    vertical_stripe_checker(current_sp_cover);
                    horizontal_stripe_checker(current_sp_cover);
                }
        
                if (k == "ArrowLeft") {
                    go_left(current_vertical, "centering");
                }
        
                if (k == "ArrowRight") {
                    go_right(current_vertical, "centering");
                }
        
                if (k == "ArrowDown") {
                    // original_centering_marker(current_vertical);
                    original_centering_checker(current_sp_cover, current_vertical);

                    console.log(current_vertical);
                    go_bottom(current_vertical, "centering");
                    // v_stripe_op(current_vertical);    
                    vertical_stripe_checker(current_sp_cover);
                    horizontal_stripe_checker(current_sp_cover);
                }
            }
            
            // ------------------------------------------------------------------------------------------    
            
            // Markdowns.
        }
    });

