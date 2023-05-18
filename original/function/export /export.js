let export_space = document.querySelector(".exporter");
let sp_covers = export_space.querySelectorAll(".sp_cover");

// ---------------------------------------------------------------------------------------------------------------

const zip = new JSZip();

// ---------------------------------------------------------------------------------------------------------------

// * エクスポートの処理に入る前に export.html から adjuster をすべて除去する.
let adjusters = export_space.querySelectorAll(".adjuster");
for (let i = adjusters.length - 1; i >= 0 ; i--) {
    adjusters[i].remove();
}

// ---------------------------------------------------------------------------------------------------------------

// * 中核の書き出し処理の中身.
// * sp_cover から vertical に至るまでのDOM構造を、section - object の形に置き換えるための処理.

// * sp_cover 単位の処理.
for (let i = 0; i < sp_covers.length; i++) {

    let caset = document.createDocumentFragment(); 
    let sps = sp_covers[i].children;
    let the_big_section = document.createElement("div");
    the_big_section.classList.add("section");
    let sp_num = sps.length;
    
    // [* なぜここで animation_data をいじるのか.]
    // [* そもそも section にまつわる animation_data の要素とはなんだったか.]
    set("animation_data", s => s[String("section_" + i)] = {});
    set("animation_data", s => s[String("section_" + i)]["about_time"] = {});
    set("animation_data", s => s["section_" + i]["about_anims"] = {});

    // * sectionごとに data_num を初期化.
    let data_num = -1;

    // * sp_cover 内の sp ごとに処理.
    for (let o = 0; o < sp_num; o++) { 

        // ---------------------------------------------------------------------------------------------------------------

        let sp = sps[o];
        let verticals = sp.lastElementChild.children;
        
        // * まだ animation_data におけるこの section の section_duration が設定されていなかった場合にこれをセットする.
        // [* でもなぜここでやる必要があるのだろう.]
        if (! get("animation_data")[String("section_" + i)]["about_time"]["section_duration"]) {
            set("animation_data", s => s[String("section_" + i)]["about_time"]["section_duration"] = verticals.length * 5);
        }

        let here = o + 1;
        let the_classname = "outerstyle_" + sp_num + "_" + here;
        the_big_section.classList.add("section_" + i);
        
        // * sp 内に存在する vertical 単位で、中に画像要素を持つものについて path をグローバル変数に控えると同時に、
        // * この vertical の画像要素の src に対して「書き出し用のパス」を挿入.
        for (let j = 0; j < verticals.length; j++) {
            img_src_getter(verticals[j]);
        }
        
        // * adjuster は削除済みで、以下リニアだけを処理の対象にするべく vertical.length から始まり検査.
        // * same を持つブロックがひとつ入っている場合にもこの検査は = true とする.
        // * 取り込んだ動画をトリミングした結果単一のブロックだけが残った、というケースを想定して.
        let desider = false;

        if (verticals.length > 1) {
            desider = true;
        } else  {
            if (verticals[0].classList.contains("video") && verticals[0].classList.contains("same")) {
                desider = true;
            }
        }
        
        // * 最初の要素は再生開始時に表示されている必要があり、
        // * 最後の要素は再生終了時に表示されたままである必要があって、
        // * 通常のリニア内の要素として扱ってしまわないようにクラスを付与.
        sp.lastElementChild.firstElementChild.classList.add("opening");
        sp.lastElementChild.lastElementChild.classList.add("ending");
        
        // ---------------------------------------------------------------------------------------------------------------

        // * 以下リニア内でのみ実行される処理を記述.
        if (desider) {

            the_big_section.classList.add("linear");
            
            for (let j = 0; j < verticals.length; j++) {

                let block = verticals[j]; 
                // * block がクラスに有する YouTube の 動画ID を控える.
                // [* "the_imp_id" という名前は変えた方がいい。]
                let the_imp_id = "id_is_" + target_data(block, "id_is_");

                if (block.classList.contains("same")) {

                    // * エディター上のDOMを書き出す際の基本動作として、
                    // * まず「中身が伴っている、まさに必要な箇所」だけを取り出す必要がある.
                    // * 従って最初にその「まさに必要なブロック」かどうかを判定し、処理を実行する.
                    // * [ケース1] 直前のブロックが存在した場合に same　を持っていない or 持っていても same_num の番号が異なる = true
                    // * [ケース2] 直後のブロックが存在した場合に same　を持っていない or 持っていても same_num の番号が異なる = true
                    // * 上記２ケースで「まさに必要なブロック」であることがわかった上で、さらに
                    // * [ケース3] video クラスを有している = true
                    // * この判定をして、 video_animation を生成する処理を実行.

                    let the_same_name = "same_num_" + target_data(block, "same_num_");

                    // * [ケース1]の検査と start_animation の生成.                    
                    if (block.classList.contains("same_start")) {
                        if (! block.classList.contains("opening")) {
                                if (block.previousElementSibling) {
                                    if (! block.previousElementSibling.classList.contains("same")) {
                                        startblock_around(block, j, data_num, i, "video");
                                    } else {
                                        if (! the_imp_id) {
                                            startblock_around(block, j, data_num, i, "video");
                                        } else {
                                            if (! block.previousElementSibling.classList.contains(the_imp_id)) {
                                                startblock_around(block, j, data_num, i, "video");
                                            }
                                        }
                                    }
                                } else {
                                    startblock_around(block, j, data_num, i, "video");
                                }
                        }
                    } 
                    
                    // * [ケース2]の検査と end_animation の生成.
                    if (block.classList.contains("same_end")) {
                        if (! block.classList.contains("ending")) {
                            if (block.nextElementSibling) {
                                if (! block.nextElementSibling.classList.contains("same")) {
                                    endblock_around(block, j, data_num, i);
                                } else {
                                    if (! the_imp_id) {
                                        endblock_around(block, j, data_num, i);
                                    } else {
                                        if (! block.nextElementSibling.classList.contains(the_imp_id)) {
                                            endblock_around(block, j, data_num, i);
                                        }
                                    }
                                }
                            } else {
                                endblock_around(block, j, data_num, i);
                            }
                        }

                        // * video属性の場合は、それ用の video_animation を併せて作成.
                        if (block.classList.contains("video")) {
                            data_num += 1;
                            let video_animation = {};
                            // * 同じ same_num_を持つ　same_start を取得し、
                            // * ペアのブロックの位置関係を比較することで、 この video の duration(v_duration) を算出している.
                            // * video_duration は animation における 「duration」 に該当.
                            let the_start_elems = document.getElementsByClassName(the_same_name)[0];
                            let v_start_when = Math.floor(Number(target_data(the_start_elems, "this_video_st_")));
                            let v_end_when = Math.floor(Number(target_data(block, "this_video_st_"))) + 5;
                            let v_duration = Number(v_end_when - v_start_when);
                        
                            video_animation["finish_when"] = (j * 5) + 5;
                            video_animation["trigger_when"] = video_animation["finish_when"] - v_duration;
                            video_animation = ac_vi_adaptation(block, video_animation, "active_st");

                            // * same_startの方に付与されているactuarも反映.
                            video_animation = ac_vi_adaptation(the_start_elems, video_animation, "active_st");
                            video_animation["anim_name"] = get("animation_generate_list").length;
                            video_animation["video_startpoint"] -= v_duration;
                            set("animation_generate_list", s => s.push([]));
                            set("animation_data", s => s["section_" + i]["about_anims"]["data_" + data_num] = video_animation);
                            block.classList.add("anim_num_" + video_animation["anim_name"]);
                            
                            // * iframe自身 の YouTubeの 動画id を取得し、リストに加える.
                            // * またそのリストの長さを測り、その数字を yt_N というidに持ったdiv要素に置換.
                            iframe_adaptation(block);

                        } else if (block.lastElementChild.tagName == "TEXTAREA") {
                            textarea_adaptation(block);
                        }
                        block.classList.add(the_classname);            
                        object_setter(block, the_big_section);
                    }

                } 

                else {

                    // * video 属性の場合は追加で video_animation を作成.
                    if (block.classList.contains("video")) {
                        
                        // * same を持たない、単一の流れていくブロックについて start_animation と end_animation を生成.
                        for_ind(block, the_imp_id, j, data_num, i);
                        data_num += 1;
                        let video_animation = {};
                        video_animation["trigger_when"] = j * 5;
                        video_animation["finish_when"] = video_animation["trigger_when"] + 5;
                        video_animation = ac_vi_adaptation(block, video_animation, "active_st");
                        video_animation["anim_name"] = get("animation_generate_list").length + 1;
                        set("animation_generate_list", s => s.push([]));
                        set("animation_data", s => s["section_" + i]["about_anims"]["data_" + data_num] = video_animation);
                        block.classList.add("anim_num_" + video_animation["anim_name"]);
                        let object_you = iframe_adaptation(block);
                        the_big_section.appendChild(object_you);

                    } else if (block.lastElementChild.tagName == "TEXTAREA") {
                        
                        // * エディター上でのブロック間の移動の過程でできた
                        // * 「<textarea> を中身持つが value はないもの」というのは多く存在して、これをしっかり弾いておく必要がある.
                        if (block.lastElementChild.value !== "") {
                            // * same を持たない、単一の流れていくブロックについて start_animation と end_animation を生成.
                            for_ind(block, the_imp_id, j, data_num, i);
                            textarea_adaptation(block);
                            block.classList.add(the_classname);
                            object_setter(block, the_big_section);
                        }

                    } else if (block.lastElementChild.tagName == "IMG") {
                        
                        // * same を持たない、単一の流れていくブロックについて start_animation と end_animation を生成.
                        for_ind(block, the_imp_id, j, data_num, i);
                        block.classList.add(the_classname);
                        object_setter(block, the_big_section);
                    }
                
                }
            }
            
        } else {

            // * ノンリニアに所属するブロックに対する書き出し処理はシンプルである.
            let block = verticals[0];
            textarea_adaptation(block);
            object_setter(block, the_big_section);
        }
        
        // * デフォルトの current_time を設定.
        // [* これって最初の方に実行するのが適切ではないか.]
        set("animation_data", s => s["section_" + i]["about_time"]["section_current_time"] = 0);
    }

    // * 最後に全体を fragment にする.
    caset.appendChild(the_big_section);
}

// * エディターから複製した DOM すべて削除.
let be = export_space.children;
for (let i = be.length - 1; i >= 0 ; i--) {
    be[i].remove();
}

// * この時点で export_space の中身が完全に書き出し後のDOMに切り替わる。
export_space.appendChild(caset);