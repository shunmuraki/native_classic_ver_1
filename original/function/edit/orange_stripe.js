// * 移動元のorange_spaceにて orange_pointer_s - orange_pointer_f の関係が
// * 完結していないストライプがあるかチェックし、
// * その場合にそのラインの一番後ろに orange_pointer_f を追加して対応する関数.
export const orange_stripe_pre_end = (edit_env) => {
    if (edit_env.orange_space.classList.contains("now_pointer_f")) {
        // * 以下一番最後のpointerのクラスが orange_pointer_s であるなら実行.
        if (edit_env.orange_pointer_space_store.lastElementChild.classList.contains("orange_pointer_s")) {
            
            let final_pointer_scrollleft = Number(target_data(edit_env.orange_pointer_space_store.lastElementChild, "scroll_left_"));
            let final_stripe_width = full_end_scrollwidth - final_pointer_scrollleft;
            edit_env.orange_stripe_space_store.lastElementChild.style.width = final_stripe_width + "px";    
            let new_orange_pointer = document.createElement("div");
            new_orange_pointer.classList.add("orange_pointer");
            new_orange_pointer.classList.add("orange_pointer_f");        
            new_orange_pointer.style.left = full_end_scrollwidth + half_left_width + "px";
            new_orange_pointer.classList.add("num_" + get("orange_data")[orange_num]["s_count"]);
            new_orange_pointer.classList.add("scroll_left_" + full_end_scrollwidth);
            
            set("orange_data", s => s[orange_num]["left"].push(full_end_scrollwidth));
            edit_env.orange_pointer_space_store.appendChild(orange_pointer);

        } else {
            let orange_num_classname = "num_" + get("orange_data")[orange_num]["s_count"];
            for (let i = 0; i < edit_env.orange_pointer_space_store.children.length; i++) {
                if (edit_env.orange_pointer_space_store.children[i].classList.contains(orange_num_classname)) {
                    edit_env.orange_pointer_space_store.children[i].remove();
                    let the_remover_keydata = target_data(edit_env.orange_pointer_space_store.children[i], "scroll_left_");
                    set("orange_data", s => s[orange_num]["left"].splice(s[orange_num]["left"].indexOf(the_remover_keydata), 1));
                }
            }
            for (let i = 0; i < edit_env.orange_stripe_space_store.children.length; i++) {
                if (edit_env.orange_stripe_space_store.children[i].classList.contains(orange_num_classname)) {
                    edit_env.orange_stripe_space_store.children[i].remove();
                }
            }
        }
        
        // * 通常の状態を模す.
        edit_env.orange_space.classList.remove("now_pointer_f");
        edit_env.orange_space.classList.add("now_pointer_s");     
        // * 下記 pre_pointer_out（）と連携する.
        edit_env.orange_space.classList.add("pre_pointer_s");   
    }
}

// * 問題の「stripe が完結していない scrap」があった時に、それ自身へ対応するのが上記の pre_pointing_in() 、
// * 反対にその下の影響を受ける scrap に対応するのがこの関数.
export const orange_stripe_pre_start = (e, edit_env) => {
    let the_stripe_width = 0;
    let previous_orange_space = get_orange_space(e);
    // * 問題の scrap の直下の scrap が pre_pointer_s クラスを持っていた場合に実行.
    if (previous_orange_space.classList.contains("pre_pointer_s"))  {
        if (edit_env.orange_pointer_store_space.firstElementChild) {
            let end_point = Number(target_data(edit_env.orange_pointer_store_space.children[0], "scroll_left_")) + half_left_width; 
            the_stripe_width = end_point - window.innerWidth;
        } else {
            the_stripe_width = full_end_scrollwidth;
        }
        if (edit_env.orange_pointer_store_space.children[0]) {
            if (! edit_env.orange_pointer_store_space.children[0].classList.contains("already")) {
                orange_stripe_pre_start_essential(edit_env);
            } 
        } else {
            orange_stripe_pre_start_essential(edit_env);
        }
        previous_orange_space.classList.remove("pre_pointer_s");
    }

}

// * 上記　pre_pointing_out の中身.
// * 移動元の orange_stripe が完結していない場合に　orange_sripe を延長するため、直下の orange_space の先頭に自動的に orange_pointer_s を設置する関数.
function orange_stripe_pre_start_essential(edit_env) {
    // * orange_pointer の生成
    let new_orange_pointer = document.createElement("div");
    new_orange_pointer.classList.add("orange_pointer");
    new_orange_pointer.classList.add("orange_pointer_s");
    new_orange_pointer.classList.add("already");
    new_orange_pointer.style.left = window.innerWidth + "px";

    set("orange_data", s => s[edit_env.orange_num]["s_count"] += 1);
    new_orange_pointer.classList.add("num_" + orange_data[edit_env.orange_num]["s_count"]);
    new_orange_pointer.classList.add("scroll_left_" + full_start_scrollwidth);
    set("orange_data", s => s[edit_env.orange_num]["left"].push(full_start_scrollwidth));
    new_orange_pointer.classList.add("num_" + get("orange_data")[orange_num]["s_count"]);
    edit_env.orange_pointer_space_store.prepend(new_orange_pointer);
    
    // * stripe の生成
    let new_orange_stripe = document.createElement("div");
    new_orange_stripe.classList.add("orange_stripe");
    new_orange_stripe.classList.add("num_" + get("orange_data")[edit_env.orange_num]["s_count"]);
    new_orange_stripe.style.width = the_stripe_width + "px";
    new_orange_stripe.style.left = window.innerWidth + "px";
    get_orange_stripe_space_store(edit_env.orange_space).prepend(new_orange_stripe);
    edit_env.orange_space.classList.remove("now_pointer_s");
    edit_env.orange_space.classList.add("now_pointer_f");
}