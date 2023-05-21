export const keytouch_edit_setup = () => {

    let env = keytouch_setup();
    tracer_basis(document.querySelector(".centering"));
    document.querySelector(".ms_area").remove();
    focus_checker(document.querySelector(".centering"));

    // * デフォルトレイヤーからの離脱.
    if (env.current.tagName == "TEXTAREA") {
        env.current.blur();
    }

    // * これを機会に デフォルトレイヤーのspecial_cov を一掃.
    let specials = document.querySelectorAll(".special_cov");
    if (specials.length > 0) {
        for (let i = specials.length - 1; i >= 0; i--) {
            specials[i].remove();
        }
    }

    // * 編集レイヤーの生成と挿入.
    let add_new_layer = document.createElement("div");
    add_new_layer.classList.add("new_layer");
    add_new_layer.classList.add("block_layer");
    add_new_layer.style.display = "none";
    add_new_layer.style.opacity = 0;
    screen.after(add_new_layer);
    let new_layer = document.querySelector(".new_layer");
    
    // * 編集モードの明示化. 編集レイヤー上での処理に限定.
    screen.classList.add("edit");
    new_layer.style.display = "block";
    screen.style.display = "none";
    bo.style.backgroundColor = "#0070D8";
    bo.classList.add("edit_mode");

    // * 横に 10 個ずつのブロックを展開し、縦にタイムラインを展開する.
    let vh_count = env.current_horizontal.childElementCount - 2;
    let sp_cover_will_num = Math.ceil(vh_count / linesize);
    let new_sp_cov = env.current_sp_cover.cloneNode(true); 
    
    // * すでに sp_cover には適切なラインが築かれているので、これを崩さずに再利用する. 
    // * 中身のブロックはクリア.
    let newla_sps = new_sp_cov.children;

    // * 編集モード終了後にデフォルトレイヤーへ回帰することを見越して、
    // * screenレイヤーの sp_cover にもクラスを付与.
    env.current_sp_cover.classList.add("target_of_edition");

    for (let i = 0; i < newla_sps.length; i++) {
        let bye_once = newla_sps[i].lastElementChild.children;
        for (let o = bye_once.length - 1; o >= 0 ; o--) {
            // * adjusterを残す.
            if (o > 0) { 
                bye_once[o].remove();
            }
        }
        for (let o = 0; o < linesize; o++) {
            // * scrap(sp_cover) のclone の　horizontal に ver を10個詰める.
            make_ver_fragment(newla_sps[i].lastElementChild.lastElementChild, "after");
        }

        // * editモードは右半分のスペースまで利用するため、可動域を拡張する目的でお尻にも adjuster を挿入.
        let adjuster_element = document.createElement("div");
        adjuster_element.classList.add("adjuster");
        adjuster_element.classList.add("horizontal_child");
        newla_sps[i].lastElementChild.lastElementChild.after(adjuster_element);
    }

    // * Nativeにはラインごとのシーキング機能があるため、デフォルトでその状態をセット.
    new_sp_cov.classList.add("pausing");
    
    // * 挿入前にorange_space を追加.
    add_orange_space_for_everyone(new_sp_cov);
   
    // * scrap を必要な数だけ new_layer に追加。
    // [* このあたりで「余計に scrap が生成されている」疑いがある.]
    for (let i = 0; i < sp_cover_will_num; i++) {
        let new_one = new_sp_cov.cloneNode(true);
        new_one.firstElementChild.classList.add("orange_num_" + i);
        new_one.classList.add("principle_pointer");
        new_layer.appendChild(new_one);
    }

    // * デフォルトレイヤーに存在する大元のブロックたちの中身を、編集レイヤーの対応するブロックへ移行.
    let screen_sps = env.current_sp_cover.children;
    for (let i = 0; i < screen_sps.length; i++) {
        let screen_vers = screen_sps[i].lastElementChild.children;
        // * 最後尾のadjuster をパス.
        for (let o = 0; o < screen_vers.length - 1; o++) {
            // * 前のadjuster をパス.  
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
                
                // * 編集レイヤーにおけるデフォルトのセンタリングを決定. 編集レイヤーにおける centering は 「new_layer_centering」クラスによる管理.
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
                
                // * dupブロックの場合を考えて条件分岐.
                if (screen_vers[o].lastElementChild) {
                    let imp_content = screen_vers[o].lastElementChild.cloneNode(true);
                    the_block_into.appendChild(imp_content);
                }
            }
        } 
    }

    // * [linesize] 個ずつで強制的に区分けされたscrapによって same が分裂したケースに対応.
    for (let i = 0; i < new_layer.childElementCount; i++) {
        for (let o = 0; o < new_layer.children[i].childElementCount; o++) {
            if (o > 0) {
                let the_target_start = new_layer.children[i].children[o].lastElementChild.firstElementChild.nextElementSibling;
                let the_target_end = new_layer.children[i].children[o].lastElementChild.lastElementChild.previousElementSibling;
                if (the_target_start.classList.contains("same") && the_target_start.classList.contains("same_start") == false) {
                    the_target_start.classList.add("same_start");
                    // * 編集モードへの展開が、トリミング後に影響しないよう、エスケープ処理に備えて co クラスを付与.
                    the_target_start.classList.add("co");
                }
                if (the_target_end.classList.contains("same") && the_target_end.classList.contains("same_end") == false) {
                    the_target_end.classList.add("same_end"); 
                    // * 編集モードへの展開が、トリミング後に影響しないよう、エスケープ処理に備えて co クラスを付与.
                    the_target_end.classList.add("co");
                }
            }
        }
    }

    // * デフォルトで センタリング になったブロックを明示.
    let layer_centering = document.querySelector(".new_layer_centering");
    let default_scrap = vertical_to_sp_cover(layer_centering);
    default_scrap.classList.add("see");

    // * 移行先でのms分のスペースを調整.            
    adjust_target_pos(layer_centering.lastElementChild, "off");

    // * 画面を切り替える.
    screen.style.opacity = 0;
    new_layer.style.opacity = 1;

    // * 以下編集レイヤーのスクロール位置の調整.
    let centering_num = [].slice.call(layer_centering.parentElement.children).indexOf(layer_centering) - 1;
    let see = document.querySelector(".see");
    let see_num = [].slice.call(new_layer.children).indexOf(see);
    let scraps = new_layer.children;
    let the_default_scrollleft = blocksize * centering_num + window.innerWidth - half_left_width;
    
    for (let i = 0; i < scraps.length; i++) {
        let scrap = scraps[i];
        // * orange_dataと連携が開始.
        set("orange_data", s => s[i] = {});
        set("orange_data", s => s[i]["s_count"] = 0);
        set("orange_data", s => s[i]["left"] = []);
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
    // * 「例えば」を提示する意味も込めて、編集モードになった時点で予めセンタリングから orange_pointer と orange_stripe を自動的に追加.
    set("orange_data", s => s = orange_pointer_make(new_see, get("orange_data")));
    new_see.firstElementChild.firstElementChild.firstElementChild.firstElementChild.classList.add("comesin");
    // * 「see」ラインを画面中央に配置.
    edit_mode_default_adjust(new_see);
    is_it_same_series(document.querySelector(".new_layer_centering"));
    layer_centering.classList.remove("new_layer_centering");

}