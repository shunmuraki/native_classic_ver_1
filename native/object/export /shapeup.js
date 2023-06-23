export const native_shapeup = () => {
    
    let export_space = document.querySelector(".exporter");
    let sections = export_space.children;
    // * same_num は異なっても、同じ YouTube動画ID を共有しているケースがある.
    // * これについて、このIDを持つ最後の same_end を覗いて、同一ライン上にある他のブロックを削除する.
    for (let i = 0; i < sections.length; i++) {
        let final_big_objects = sections[i].children;
        for (let o = final_big_objects.length - 1; o >= 0; o--) {
            if (final_big_objects[o]) {
                if (final_big_objects[o].classList.contains("same_deletable")) {
                    let the_deletable_key = "same_id_" + target_data(final_big_objects[o], "same_id_");
                    if (get("section_deletable_list").indexOf(the_deletable_key) == -1) {
                        set("section_deletable_list", s => s.push(the_deletable_key));
                        let will_deleted = document.getElementsByClassName(the_deletable_key);
                        for (let l = will_deleted.length - 1; l >= 0; l--) {
                            if (! will_deleted[l].isEqualNode(final_big_objects[o])) {
                                // * 中身を持たせている same_end を残しておく.
                                if (! will_deleted[l].lastElementChild) { 
                                    let del_list = will_deleted[l].classList;
                                    // * 最後の same_end ブロックにすべてのクラスを集中させる.
                                    for (let j = 0; j < del_list.length; j++) {
                                        if (del_list[j].indexOf("anim_num_") != -1) {                                        
                                            final_big_objects[o].classList.add(del_list[j]);
                                        }
                                    }
                                }
                            }
                        }
                        for (let l = will_deleted.length - 1; l >= 0; l--) {
                            if (! will_deleted[l].isEqualNode(final_big_objects[o])) {
                                // * 中身を持たせている same_end を残しておく.
                                if (! will_deleted[l].lastElementChild) {
                                    will_deleted[l].remove();
                                }
                            }
                        }
                    }
                    // * 本処理のために活用したクラス(same_deletable, same_id)を取り払って現場復帰.
                    if (final_big_objects[o]) {
                        classmover(final_big_objects[o], final_big_objects[o], "same_deletable", "remove");
                        classmover(final_big_objects[o], final_big_objects[o], "same_id_", "remove");
                    }
                }
            }
        }
    
        // * Linear の リニア スペースにて最初の要素は描画しておくようにするため.
        if (sections[i].classList.contains("linear")) {
            if (sections[i].firstElementChild) {
                sections[i].firstElementChild.classList.add("fire");
            }
        } else {
            sections[i].classList.add("non");
            // * リニア スペースでない場合は animation_data からこの section 関連のデータを削除.
            let pre = get("animation_data");
            delete pre["section_" + i];
            set("animation_data", s => s = pre);
        }
    }
}