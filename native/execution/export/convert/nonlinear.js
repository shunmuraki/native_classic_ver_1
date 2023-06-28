// * ノンリニアに所属するブロックに対する書き出し処理はシンプルである.
export const conversion_on_nonlinear = (block, section) => {
    textarea_conversion(block);
    object_conversion(block, section);
}