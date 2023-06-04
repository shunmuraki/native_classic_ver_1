// * 対応する special_cov を返す関数.
export const get_correspond_same_concealer = (e) => {
    let the_name = "this_cov_is_" + target_data(e, "same_num_");
    let the_special_cov = document.getElementsByClassName(the_name)[0];
    return the_special_cov;
}