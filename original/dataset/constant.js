// * Native においてブロックを判別する際に扱う記号的な役割のクラス名の集合.
export const the_name_list = ['stable', 'stable_end', 'same_start', 'same_end', 'same_num_', 'same', 'actuar_time_', 'actuar_st', 'actuar_en', 'this_video_st', 'this_video_en', "video", "img", "id_is_"];

// ---------------------------------------------------------------------------------------------------------------

// * Native のプログラムでよく使う element.
export const screen = document.querySelector(".screen");
export const body = document.getElementsByTagName("BODY")[0];
export const p_and_w = document.querySelector(".pointer_and_wheel");
export const wheel = document.querySelector(".wheel");
export const pointer = document.querySelector(".pointer");
export const layer_base = document.querySelector(".sw_basis");
export const chartbox = document.querySelector(".charts");
export const titlebox = document.querySelector(".titles");
export const um = document.querySelector(".um_display");

// ---------------------------------------------------------------------------------------------------------------

// * Native の環境設定.
export const blocksize = 360;
export const linesize = 24;
export const blocktime = 5;

// ---------------------------------------------------------------------------------------------------------------

// * width 関連
let default_block_length = blocksize * linesize;
let default_length = default_block_length + window.innerWidth;
export const half_left_width = (window.innerWidth - blocksize) / 2;
export const half_right_width = half_left_width + blocksize;
export const full_start_scrollwidth = window.innerWidth - half_left_width;
export const full_end_scrollwidth = default_length - half_right_width + blocksize;
export const window_height = window.innerHeight;
export const the_middline = window_height * 0.5;
export const the_sunsetline = window_height * 0.3;
export const custom_end_scrollwidth = e.scrollWidth - window.innerWidth - half_left_width - blocksize;