import { screen, the_name_list } from "../base/elements.js";
import { horizontal_stripe_checker, make_ver_fragment, vertical_stripe_checker } from "../base/function.js";
import { classmover, vertical_to_hor, vertical_to_sp, vertical_to_sp_cover } from "../base/tools.js";

// connect

// 縦に要素を追加する処理
window.addEventListener("keydown", (e)=>{

    if (screen.classList.contains("edit") == false && screen.classList.contains("um") == false) {

        let k = e.key;

        let current;
        let current_vertical;
        let type_signiture;
        
        if (document.activeElement.tagName != "BODY") {

            current = document.activeElement;
            current_vertical = current.parentElement;
            type_signiture = current.value;
            
            if (document.activeElement.classList.contains("ms_area") == false) {    
                current.style.height = 24 + 'px';
                let scrollHeight = current.scrollHeight;
                current.style.height = scrollHeight + 'px'; 
                let height = current.clientHeight;
                current.parentElement.style.height = height + "px";
                // 現在の sp_cover を取得して、その下に追加する（after）
            }
        } else {
            current_vertical = document.querySelector(".centering");
        }
        
        let current_horizontal = vertical_to_hor(current_vertical);
        // let current_sp = vertical_to_sp(current_vertical);
        let current_sp_cover = vertical_to_sp_cover(current_vertical);
        // ------------------------------------------------------------------------------------------    

        if (type_signiture) {
            if ( type_signiture.indexOf('connect') != -1) {

                document.querySelector(".ms_area").remove();
                if (document.querySelector(".centering").lastElementChild == "TEXTAREA") {
                    document.querySelector(".centering").lastElementChild.focus();
                }

                // console.log(type_signiture);
                // centering 認証を突破しています。
                // let centering = document.querySelector(".centering");
            
                // 移転先（ひとつ上の sp_cover) 
                let the_sp_cover_a = current_sp_cover.previousElementSibling;

                if (the_sp_cover_a) {
                    // たぶんこのあたりに connected_sp(current_sp) の中の content の node list　ができるはずなんだよ。
                    // * 中に content が含まれていたら、その i を控えてデータにしておくんだ。
                    let the_current_contents = [];
                    for (let i = 0; i < current_horizontal.length; i++) {
                        // adjuster をスキップします。
                        if (i != 0) {
                            // あとごめん、移動できるように、やっぱ全部コピーしといてw
                            let the_content = current_horizontal[i].lastElementChild.cloneNode(true);
                            the_current_contents.push(the_content);
                        }
                    }
                
                    // * と思ったんだけど、current_sp_coverは全ての処理が終わるまで残っているわけだから、いちいち格納しないで、そこから毎回検索するようにしよう。
                    // current_horizontal.chilren[i].cloneNode(true) をループ内で実行するようにする。
                
                    // CENTERING =====
                    let the_centering_num = 0;
                    for (let i = 0; i < current_horizontal.children.length; i++) {
                        // adjuster をスキップします。
                        if (i != 0) {
                            if (current_horizontal.children[i].classList.contains("centering")) {
                                the_centering_num = i;
                            }
                        }
                    }
                    // before to
                    let the_current_tops = the_centering_num;
                    // after from
                    let the_current_bottoms = current_horizontal.childElementCount - the_centering_num;
                
                    // ORIGINAL_CENTERING =====
                    // 最大数を取ったりするのかしら？
                    // * でも比較するのは最後のやつじゃないといけないんじゃないかな。まぁorange_centeringだもんね... それまでは常に同期されてるわけだもんね。　← 賢い.
                    let inc_last_children = the_sp_cover_a.lastElementChild.lastElementChild.children;
                    let original_centering_num = 0;
                    for (let i = 0; i < inc_last_children.length; i++) {
                        if (i != 0) {
                            if (inc_last_children[i].classList.contains("original_centering")) {
                                original_centering_num = i;
                                console.log("waaaaaa");
                                console.log(inc_last_children[i]);
                            }  
                        }
                    }
                    // before to
                    let the_original_tops = original_centering_num;
                    // after from
                    let the_original_bottoms = the_sp_cover_a.lastElementChild.lastElementChild.childElementCount - original_centering_num;
                
                    // それぞれの centering まで　/ centering から　のブロックの数を調べて、それぞれの最大値を足したものに - 1をします。
                    let the_triumph_tops = 0;
                    let the_triumph_bottoms = 0;
                
                    // TESTTESTTESTTEST
                    console.log(the_centering_num);
                    console.log(original_centering_num); // *
                    console.log(the_current_tops);
                    console.log(the_current_bottoms); 
                    console.log(the_original_tops); // *
                    console.log(the_original_bottoms); 
                
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
                
                    let the_triumph = the_triumph_tops + the_triumph_bottoms;
                    // で、次はこの番号で無理やり 各 sp の hor に対してのループの中でブロックにループをかけて「なかったらブロック作れ」「そこに textarea詰める」の処理を施す
                    // * ↑ この時 original_centering との差分を考慮したらいいよ（新たに追加するもの以外についてはブロックの数は全部揃っているので、端から端まできっちりと。）
                    // let the_sp_gap = original_centering_num - the_centering_num;
                    // let the_content_disi = o - the_sp_gap;
                    let the_sp_gap = original_centering_num - the_centering_num;
                    let the_top_less = the_triumph_tops - the_original_tops;
                    let the_bottom_less = the_triumph_bottoms - the_original_bottoms;
                
                    console.log("the_top_less" + the_top_less);
                    console.log("the_bottom_less" + the_bottom_less);
                
                    for (let i = 0; i < the_sp_cover_a.children.length; i++) {
                        // あとで　orange_space を考慮する必要があるが、テストのために。
                        // ↓本当は「i > 0」
                        if (i >= 0) {
                            // triumph ここで使ってるよ
                            for (let o = 0; o < the_top_less; o++) {
                                // adjuster を飛ばして。
                                const first_block = the_sp_cover_a.children[i].lastElementChild.children[1];
        
                                console.log(first_block);
                                //　先頭より小さかったら
                                make_ver_fragment(first_block, "before");
                            }
                            for (let o = 0; o < the_bottom_less; o++) {
                                let last_block = the_sp_cover_a.children[i].lastElementChild.lastElementChild;
                                console.log(last_block);
                                // お尻より大きかったら
                                make_ver_fragment(last_block, "after");
                            }
                        }
                    }
                
                    // * あとは複製して同期するんだ。
                    // ↓これが複製した sp
                    let sp_copied = the_sp_cover_a.lastElementChild.cloneNode(true);
                    // ↓これがその中の hor の children(<ver>たち)
                    let children_block = sp_copied.lastElementChild.children;
                    // おそらく adjuster 分本来よりブロックがが少ないことが理由で "2" ... → 変更w 色々な兼ね合いにより。
                    let the_this_loop_endpoint = the_triumph_tops - the_centering_num + current_horizontal.childElementCount - 1;

                    for (let i = 0; i < children_block.length; i++) {
                        // textarea も含めた「総詰め直し
                        console.log("triumph_tops" + the_triumph_tops);
                        console.log("endpoint" + the_this_loop_endpoint);
                        if (i > 0) {

                            // クラス動かしまくるゾーン
                            for (let o = 0; o < the_name_list.length; o++) {
                                classmover(children_block[i], children_block[i], the_name_list[o], "remove");
                            }
                            // クラス動かしまくるゾーン
    
                            children_block[i].lastElementChild.remove();
                            // なんかすごいばかっぽいけど。。
                            let new_textarea = document.createElement("textarea");
                            new_textarea.classList.add("write_area")
                            new_textarea.classList.add("styling_0_0_1_1");
                            children_block[i].appendChild(new_textarea);
                            // 複製したspのブロックすべてについてループする必要はない。
                            if (i <= the_this_loop_endpoint) {
                                let the_content_disi = i - the_triumph_tops + the_centering_num;
                
                                if (the_content_disi > 0) { 
                                    // triumph_tops - the_centering_num が current_horizontal の相対的 0 にあたる気がする。
                                    // したがってこっちの 1 が、current_horizontal[i - triumph_tops + the_centering_num + 1]になりそう...???
                                    console.log(current_horizontal.children[the_content_disi]);
                                    console.log("high");
               
                                    
                                    let old_block = current_horizontal.children[the_content_disi];
                                    console.log(old_block);
                                    let classies = old_block.classList;
                                    console.log("nankagomen");

                                    let the_content_embed = old_block.lastElementChild.cloneNode(true);

                                    // console.log(classies);

                                    // for (let o = 0; 0 < classies.length; o++) {
                                    //     children_block[i].classList.add(classies[o]);
                                    // }
                                    
                                    // クラス動かしまくるゾーン
                                    for (let o = 0; o < the_name_list.length; o++) {
                                        classmover(old_block, children_block[i], the_name_list[o], "add");
                                        console.log("nu");
                                    }
                                    // クラス動かしまくるゾーン
                                    
                                    children_block[i].lastElementChild.remove();
                                    // centering 引き継ぎ
                                    if (current_horizontal.children[the_content_disi].classList.contains("centering")) {
                                        children_block[i].classList.add("centering")
                                    }
                                    children_block[i].appendChild(the_content_embed);
                                }
                            }
                        }
                    }     
                
                    //　最後、ようやく sp を増やした。
                    the_sp_cover_a.appendChild(sp_copied);
                
                    // あとなんか番号を教えてほしいみたいだよ。
                    // * デフォルトで　０　をつけてあげなくちゃ！　→ ってことは "付け替え" なのか！
                    let before_in_sp_num = the_sp_cover_a.childElementCount;
                    let the_ined_name = "inner_sp_num_" + before_in_sp_num + 1;
                    sp_copied.classList.add(the_ined_name);
                    
                    let the_center_num_b = [].slice.call(current_horizontal.children).indexOf(current_vertical) + 1;
                    let the_default_leng = current_horizontal.scrollLeft;
                    // 最後に　今の sp_cover をゴリっと削除します。
                    current_sp_cover.remove();
                
                    // focus()
                    let center = document.querySelector(".centering");
                    let latest_hor = vertical_to_hor(center);
                    let the_center_num = [].slice.call(latest_hor.children).indexOf(center) + 1;
                    let the_b_a_gap = the_center_num - the_center_num_b;
                    console.log(the_b_a_gap);
                    let the_redefault_scroll = the_b_a_gap * 400;
                    for (let i = 0; i < the_sp_cover_a.children.length; i++) {
                        // ブロックのループ
                        let blocks = the_sp_cover_a.children[i].lastElementChild.children;
                        the_sp_cover_a.children[i].lastElementChild.scrollLeft = the_default_leng + the_redefault_scroll;
                        // ついでに ver も同期しておくわけ。
                        // for (let o = 0; o < blocks.length; o++) {
                        //     if (o != 0) {
                        //         // adjuster に色がつくのを避ける
                        //         v_stripe_op(blocks[o]);
                        //     }
                        // }
                        console.log(the_center_num);
                        console.log(blocks.length);
                
                        let right_side_blocks = blocks.length - the_center_num;
                        // マイナスになる可能性もあって、でもループは回さないといけないので。
                        if (right_side_blocks > 0) {
                            for (let o = 0; o < Math.abs(right_side_blocks); o++) {
                                blocks[the_center_num - 1 + o].children[1].style.opacity = 1;
                            }
                            for (let o = 0; o < the_center_num; o++) {
                                blocks[the_center_num - o].children[1].style.opacity = 1;
                            }
                        } else if (right_side_blocks == 0 && blocks.length > 2) {
                            blocks[the_center_num - 2].children[1].style.opacity = 1;
                        }
                    }
    
                    // * ついでに、のくだりをここで再現. 上のコメント部分をこちらに移動しております.念のため。
                    vertical_stripe_checker(the_sp_cover_a);
                    // last Run
                    let last_one = the_sp_cover_a.lastElementChild.lastElementChild.children[the_center_num - 1];
                    let finish_form = last_one.lastElementChild;
                    // let pre_v = String(finish_form.value);
                    // // let new_v = pre_v.slice(0, -8);
                    // console.log(pre_v);
                    // console.log(new_v);
                    // finish_form.value = new_v;
                    // console.log(pre_v);
        
                    finish_form.focus();
                    horizontal_stripe_checker(the_sp_cover_a);
                }
                }
            
        }

    }
});