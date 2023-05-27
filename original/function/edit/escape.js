// * orange_stripe 上にあるブロックだけを抽出する関数.
// * トリミングの際に実行される.　(/keytouch/what_to_do/edit/escape)
let stripe_inner_or_out = (e) => {
    
    // [* cool の宣言が欠けている.]        
    let w_col = new Array();
    // * scrapごとに処理をする。
    let po_and_st = scraps[e].firstElementChild.firstElementChild.firstElementChild.children;
    
    // * stripe ごとに処理する。
    // * stripeの先頭と最後尾のブロックを検出し、それらについての情報を調べて
    // * 「同一scrap内のsp間で共通の選択範囲を示すデータ」を作成する。
    for (let o = 0; o < po_and_st.length; o++) {
        if (po_and_st[o].classList.contains("orange_pointer_s")) {
            let the_pointer_s = po_and_st[o];
            let the_pointer_f = grab_auto(the_pointer_s)[1];
            let the_pointer_scrollleft_st = Number(target_data(the_pointer_s, "scroll_left_"));
            let the_pointer_scrollleft_en = Number(target_data(the_pointer_f, "scroll_left_"));

            // * stripeごとの選択範囲を示すデータ。scrap - orange_space ごとに束ねることになる。
            let stcl = new Array();
            let w = full_start_scrollwidth;

            // * pointer_s と pointer_f のポジションをブロック数に変換。
            let st = Math.trunc((the_pointer_scrollleft_st - w) / blocksize) + 1;
            let en = Math.trunc((the_pointer_scrollleft_en - w) / blocksize);

            // * 以下 [st] について
            // 差分を取得してこれが 50 以上なら actuar と認定し、same_start と一緒にデータに格納する。
            // * BANS: [[何番目のst, actuar_stの大きさ], [何番目のen, actuar_enの大きさ]]
            let st_d = Math.trunc(the_pointer_scrollleft_st - w - (blocksize * (st - 1)));
            
            if (st_d > 50) {
                let rsd = blocksize - st_d;
                stcl.push([st, rsd]);
            } else {
                stcl.push([st, "NONE"]);
            }

            // 以下 [en] について
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