export const wrapper_index_make_essential = () => {
    // * element の 生成.
    const sp_cover = document.createElement("div");
    const sp = document.createElement("div");
    const horizontal = document.createElement("div");
    const adjuster = document.createElement("div");
    const vertical = document.createElement("div");
    const textarea = document.createElement("textarea");
    const end_adjuster = document.createElement("div");
    
    // * クラスの初期設定.
    sp_cover.classList.add("sp_cover");
    sp_cover.classList.add("pausing");
    sp.classList.add("sp");

    horizontal.classList.add("horizontal");
    adjuster.classList.add("adjuster");
    vertical.classList.add("vertical");
    textarea.classList.add("write_area");
    
    // [* これも改める必要がある.]
    textarea.classList.add("style_1_1_0_1");
    
    adjuster.classList.add("horizontal_child");
    vertical.classList.add("horizontal_child");
    end_adjuster.classList.add("adjuster");
    end_adjuster.classList.add("horizontal_child");
    
    // * 集結.
    vertical.appendChild(textarea);
    horizontal.appendChild(adjuster);
    horizontal.appendChild(vertical);
    horizontal.appendChild(end_adjuster);
    sp.appendChild(horizontal);
    sp_cover.appendChild(sp);
    
    // * fragment にする.
    // [* 果たしてその必要があるのか.]
    let fragment = document.createDocumentFragment();
    fragment.append(sp_cover);

    return fragment;
}


// * sp_cover を作成する関数
// [* wrapper_index_make() へ変更. その他の変数名も同様に変更.]
export const make_fragment = (e, f) => {

    wrapper_index_make_essential();
    
    // * 挿入.
    if (f == "before") {
        e.before(fragment);
        e.previousElementSibling.lastElementChild.lastElementChild.scrollLeft = full_start_scrollwidth;
    } else if (f == "after") {
        e.after(fragment);        
        e.nextElementSibling.lastElementChild.lastElementChild.scrollLeft = full_start_scrollwidth;
    }

    cs_bye();
}

// * block_list に新しい block を追加する関数.
// [* block_make() へ関数の名称を変更.]
export const make_ver_fragment = (e, f) => {
    let vertical = document.createElement("div");
    let textarea = document.createElement("textarea");
    vertical.classList.add("vertical");
    textarea.classList.add("write_area");
    textarea.classList.add("style_1_1_0_1");
    vertical.classList.add("horizontal_child");
    vertical.appendChild(textarea);
    let fragment = document.createDocumentFragment();
    fragment.append(vertical);
    if (f == "before") {
        e.before(fragment);
    } else if (f == "after") {
        e.after(fragment);
    }
    cs_bye();
}