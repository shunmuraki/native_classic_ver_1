window.addEventListener("keydown", (e)=>{ 
  
  let k = e.key;
  let current;
  let type_signiture;
  let current_vertical;
  let current_horizontal;
  let current_sp_cover;
  keytouch_basic(current, type_signiture, current_vertical, current_horizontal, current_sp_cover);

  if(e.metaKey) {  
    // 以下 command + k の処理.
    if (k == "k") {
      pointer_anim();
      // 複製されるのが画像かもしれないので、command + U では必要なかったが配慮.
      if (current.tagName == "TEXTAREA") {
        current.blur();
      }
        
      // 具体的な複製の処理.
        let sps = current_sp_cover.children;
        let c_v_num = [].slice.call(current_horizontal.children).indexOf(current_vertical);
        let scrollleft_b = current_horizontal.scrollLeft;
        let balanc = 0;
        // connnected
        if (sps.length > 1) {
        same_around(current_vertical, "connected");
        } else {
        // 通常の処理.
        // 現在のブロックを same_end として、その前に要素を追加しながら移動していく.
        make_dup_fragment(current_vertical, "before");
        same_around(current_vertical, "default");
        }

        // ブロック挿入が終わって sp_cover が満たされた以降の処理. このあたりも大枠が command + u と同様.
        let center = document.querySelector(".centering");
        let the_center_num_b = [].slice.call(vertical_to_hor(center).children).indexOf(center);

        balanc = the_center_num_b - c_v_num;
        for (let i = 0; i < sps.length; i++) {
            sps[i].lastElementChild.scrollLeft = balanc * blocksize + scrollleft_b;
        }

        original_centering_checker(current_sp_cover, center);
        is_it_same_series(center);
      }
  }
})