export const native_convert = () => {
    
    const zip = new JSZip();
    let export_space = document.querySelector(".exporter");
    let edit_wrapper_indexies = export_space.querySelectorAll(".edit_wrapper_index");

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
    for (let i = 0; i < edit_wrapper_indexies.length; i++) {
        
        let section = document.createElement("div");
        section.classList.add("section");

        let output_fragment = document.createDocumentFragment(); 
        let edit_list_wrappers = edit_wrapper_indexies[i].children;
        let edit_list_wrapper_num = edit_list_wrappers.length;
       
        // * animation_data は section 単位で構成される.
        set("animation_data", s => s[String("section_" + i)] = {});
        set("animation_data", s => s[String("section_" + i)]["about_time"] = {});
        set("animation_data", s => s["section_" + i]["about_anims"] = {});
       
        // * data_num は section 毎に初期化.
        let data_num = -1;

        // * sp_cover 内の sp ごとに処理.
        for (let o = 0; o < edit_list_wrapper_num; o++) { 
    
            // ---------------------------------------------------------------------------------------------------------------
    
            let edit_list_wrapper = edit_list_wrappers[o];
            let blocks = edit_list_wrapper.lastElementChild.children;
            
            // * まだ animation_data におけるこの section の section_duration が設定されていなかった場合にこれをセットする.
            // [* でもなぜここでやる必要があるのかは不明.]
            if (! get("animation_data")[String("section_" + i)]["about_time"]["section_duration"]) {
                set("animation_data", s => s[String("section_" + i)]["about_time"]["section_duration"] = blocks.length * 5);
            }
    
            let here = o + 1;
            let classname = "outerstyle_" + sp_num + "_" + here;
            section.classList.add("section_" + i);
            
            // * sp 内に存在する vertical 単位で、中に画像要素を持つものについて path をグローバル変数に控えると同時に、
            // * この vertical の画像要素の src に対して「書き出し用のパス」を挿入.
            for (let j = 0; j < blocks.length; j++) {
                img_src_getter(blocks[j]);
            }
            
            // * adjuster は削除済みで、以下リニアだけを処理の対象にするべく vertical.length から始まり検査.
            // * same を持つブロックがひとつ入っている場合にもこの検査は = true とする.
            // * 取り込んだ動画をトリミングした結果単一のブロックだけが残った、というケースを想定して.
            let desider = false;
            if (blocks.length > 1) {
                desider = true;
            } else  {
                if (blocks[0].classList.contains("video") && blocks[0].classList.contains("same")) {
                    desider = true;
                }
            }
            
            // * 最初の要素は再生開始時に表示されている必要があり、
            // * 最後の要素は再生終了時に表示されたままである必要があって、
            // * 通常のリニア内の要素として扱ってしまわないようにクラスを付与.
            edit_list_wrapper.lastElementChild.firstElementChild.classList.add("opening");
            edit_list_wrapper.lastElementChild.lastElementChild.classList.add("ending");
            
            // ---------------------------------------------------------------------------------------------------------------

            // * 以下リニア内でのみ実行される処理を記述.
            // * [ケース1] 直前のブロックが存在した場合に same　を持っていない or 持っていても same_num の番号が異なる = true
            // * [ケース2] 直後のブロックが存在した場合に same　を持っていない or 持っていても same_num の番号が異なる = true
            // * [ケース3] video クラスを有している = true, * 上記２ケースで「まさに必要なブロック」であることがわかった上で.
            if (desider) {
                section.classList.add("linear");
                for (let j = 0; j < verticals.length; j++) {
                    let block = blocks[j]; 
                    // * block がクラスに有する YouTube の 動画ID を控える.
                    // [* "the_imp_id" という名前は変えた方がいい。]
                    let the_imp_id = "id_is_" + target_data(block, "id_is_");
                    if (block.classList.contains("same")) {
                        // * same クラスを持つブロックについて.
                        // * エディター上のDOMを書き出す際の基本動作として、
                        // * まず「中身が伴っている、まさに必要な箇所」だけを取り出す必要がある.
                        // * 従って最初にその「まさに必要なブロック」かどうかを判定し、処理を実行する.
                        let same_classname = "same_num_" + target_data(block, "same_num_");
                        // * [ケース1]の検査と start_animation の生成.                    
                        if (block.classList.contains("same_start")) {
                            conversion_on_same_start();

                        }                        
                        // * [ケース2]の検査と end_animation の生成.
                        if (block.classList.contains("same_end")) {
                            conversion_on_same_end();           
                        }
                    }  
                    else {
                        // * 単体のリニアブロックについて.
                        conversion_on_individual();
                    }
                }
            } else {
                conversion_on_nonlinear();
            }
            // * デフォルトの current_time を設定.
            // [* これって最初の方に実行できたら可読性が高いと思うが.]
            set("animation_data", s => s["section_" + i]["about_time"]["section_current_time"] = 0);
        }
        // * 最後に全体を fragment にする.
        output_fragment.appendChild(section);
    }
    
    // * エディターから複製した DOM すべて削除.
    let export_space_contents = export_space.children;
    for (let i = export_space_contents.length - 1; i >= 0 ; i--) {
        export_space_contents[i].remove();
    }
    
    // * この時点で export_space の中身が完全に書き出し後のDOMに切り替わる。
    export_space.appendChild(output_fragment);
}