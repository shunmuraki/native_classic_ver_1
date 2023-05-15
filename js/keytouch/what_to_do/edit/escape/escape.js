
export const keytouch_edit_command_mode_escape = () => {
    let env = keytouch_setup();
    e.preventDefault();    
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
                            // 2回分を兼ねている。ローカルのsame_numは -1 を維持。
                            same_num = native_value('same_num', same_num + 2);
                            nex = same_num - 1;
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
                                // let same_data = same_data_getter();
                                scraps[i + 1].classList.add("continue_former");
                                scraps[i + 1].children[l].classList.add("continue_num_" + same_num);
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
        set("orange_data", s => s = 0);
        
        new_layer.remove();
        screen.classList.remove("edit");
        screen.style.opacity = 1;
        
        set("the_scrolled_distance", s => s = 0);
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