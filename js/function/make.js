// sp_cover の生成関数
export const make_fragment = (e, f) => {

    const sp_cover = document.createElement("div");
    const sp = document.createElement("div");
    const horizontal = document.createElement("div");
    const adjuster = document.createElement("div");
    const vertical = document.createElement("div");
    const textarea = document.createElement("textarea");
    const end_adjuster = document.createElement("div");
    
    sp_cover.classList.add("sp_cover");
    sp_cover.classList.add("pausing");
    sp.classList.add("sp");

    horizontal.classList.add("horizontal");
    adjuster.classList.add("adjuster");
    vertical.classList.add("vertical");
    textarea.classList.add("write_area");
    textarea.classList.add("style_1_1_0_1");
    adjuster.classList.add("horizontal_child");
    vertical.classList.add("horizontal_child");
    end_adjuster.classList.add("adjuster");
    end_adjuster.classList.add("horizontal_child");

    vertical.appendChild(textarea);
    horizontal.appendChild(adjuster);
    horizontal.appendChild(vertical);
    horizontal.appendChild(end_adjuster);
    sp.appendChild(horizontal);
    sp_cover.appendChild(sp);
    
    let fragment = document.createDocumentFragment();
    fragment.append(sp_cover);
    
    if (f == "before") {
        e.before(fragment);
        e.previousElementSibling.lastElementChild.lastElementChild.scrollLeft = full_start_scrollwidth;
    } else if (f == "after") {
        e.after(fragment);        
        e.nextElementSibling.lastElementChild.lastElementChild.scrollLeft = full_start_scrollwidth;
    }

    cs_bye();
}

// ブロックの生成関数
export const make_ver_fragment = (e, f) => {

    const vertical = document.createElement("div");
    const textarea = document.createElement("textarea");

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