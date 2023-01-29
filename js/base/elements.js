export const screen = document.querySelector(".screen");

export const blocksize = 360;
export const linesize = 24;
export const blocktime = 5;

let the_b = window.innerWidth - blocksize;
let the_a = the_b / 2;
let the_c = the_a + blocksize;

let default_block_length = blocksize * linesize;
let default_length = default_block_length + window.innerWidth;

export const full_start_scrollwidth = window.innerWidth - the_a;
export const full_end_scrollwidth = default_length - the_c + blocksize;

export const half_left_width = the_a;
export const half_right_width = the_c;

export const the_name_list = ['same_start', 'same_end', 'same_num_', 'same', 'actuar_time_', 'actuar_st', 'actuar_en', 'this_video_st', 'this_video_en', "video", "img", "id_is"];

export const window_height = window.innerHeight;
export const the_middline = window_height * 0.5;
export const the_sunsetline = window_height * 0.3;

let cs = document.querySelector(".cheet_sheet");
if (cs) {
    cs.style.top = 100 + "%";
}

let csb = document.querySelector(".usage_button");

// デフォルトのセットアップ.
csb.classList.add("off");

csb.addEventListener("click", () => {
    if (csb.classList.contains("on")) {
        cs.animate(
            [
                { top: '0%' },
                { top: '100%' }
            ], {
            duration: 800,
            fill: "forwards",
            easing: "ease-in-out"
            }
        );
    } else if (csb.classList.contains("off")) {
        cs.animate(
            [
            { top: '100%' },
            { top: '0%' }
            ], {
            duration: 800,
            fill: "forwards",
            easing: "ease-in-out"
            }
        );
    }
    csb.classList.toggle("on");
    csb.classList.toggle("off");
})