// * 「ジャンル」か「項目」かによらず、選択肢がクリックされた際に実行される関数.
// * 「ジャンル」なら genre_clicked() を、「項目」なら value_clicked() を実行する.
export const style_choose = () => {
  let choose = document.getElementsByClassName("choose")[0];
  let order = choose.parentElement.children.indexOf(choose);    
  let title = String(choose.textContent);
  let v = current_states[0][order];
  if (isObject(v)) {
      // * 選択したのが「ジャンル」だった場合.
      genre_clicked(v);
      // * states を同期.
      // [* ここは states 管理関数で処理させる.]
      set("current_states", s => s[0] = v);
      set("current_states", s => s[1] = title);
      set("current_states", s => s[2].push(order));
  } else {
      // * 選択したのが「項目」だった場合. 
      value_clicked(v);
      // * states を同期.
      set("current_states", s => s = get("previous_states"));
  }
}