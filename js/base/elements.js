export const screen = document.querySelector(".screen");

let the_b = window.innerWidth - 400;
let the_a = the_b / 2;
let the_c = the_a + 400;

let default_block_length = 400 * 10;
let default_length = default_block_length + window.innerWidth;

export const full_start_scrollwidth = window.innerWidth - the_a;
export const full_end_scrollwidth = default_length - the_c + 400;

export const half_left_width = the_a;
export const half_right_width = the_c;

export const the_name_list = ['same_start', 'same_end', 'same_num_', 'same', 'actuar_time_', 'actuar_st', 'actuar_en', 'this_video_st', 'this_video_en', "video", "img", "id_is"];