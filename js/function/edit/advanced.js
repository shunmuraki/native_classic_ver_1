// 移動元のorange_spaceにて s - f の関係が完結していない場合の処理.
export const pre_pointing_in = (e) => {
    
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
export const pre_pointing_out = (e, f) => {

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

