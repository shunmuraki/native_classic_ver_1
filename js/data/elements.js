import { blur_checker, focus_checker } from "./function.js";
import { none_title, style_and_editor, literal_replace, iframe_adaptation, iframe_and_editor } from "./stylefuncs.js";
import { classmover } from "./tools.js";

// DOM系列
export const screen = document.querySelector(".screen");
// せめて "body" にしてくれ
export const bo = document.getElementsByTagName("BODY")[0];
export const pointer = document.querySelector(".pointer_and_wheel");

export const wheel = document.querySelector(".wheel");
export const the_pointer = document.querySelector(".pointer");
// もしくは wheel じゃなくて layer_base に sw_basis を指定するか。
export const layer_base = document.querySelector(".sw_basis");

export const chartbox = document.querySelector(".charts");
export const titlebox = document.querySelector(".titles");

export const um = document.querySelector(".um_display");

// Native の設定
export const blocksize = 360;
export const linesize = 24;
export const blocktime = 5;

// width 関連
let default_block_length = blocksize * linesize;
let default_length = default_block_length + window.innerWidth;

export const half_left_width = (window.innerWidth - blocksize) / 2;
export const half_right_width = half_left_width + blocksize;

export const full_start_scrollwidth = window.innerWidth - half_left_width;
export const full_end_scrollwidth = default_length - half_right_width + blocksize;

export const window_height = window.innerHeight;
export const the_middline = window_height * 0.5;
export const the_sunsetline = window_height * 0.3;

// stable周辺追加バージョン
export const the_name_list = ['stable', 'stable_end', 'same_start', 'same_end', 'same_num_', 'same', 'actuar_time_', 'actuar_st', 'actuar_en', 'this_video_st', 'this_video_en', "video", "img", "id_is_"];

// e = scrollWidth
export const custom_end_scrollwidth = (e) => {
    let the_distance = e.scrollWidth - window.innerWidth - half_left_width - blocksize;
    return the_distance;
}

// style_ 周辺
export const native_style_funcs = {
    'regular': [
        style_and_editor(e, "style_weight_"),
        none_title()
    ], 
    'medium': [
        style_and_editor(e, "style_weight_"),
        none_title()
    ], 
    'bold': [
        style_and_editor(e, "style_weight_"),
        none_title()
    ], 
    'h1': [
        style_and_editor(e, "style_size_"),
        literal_replace(e, "h1")
    ], 
    'h2': [
        style_and_editor(e, "style_size_"),
        literal_replace(e, "h2")
    ], 
    'h3': [
        style_and_editor(e, "style_size_"),
        literal_replace(e, "h3")
    ],  
    'link': [
        style_and_editor(e, "style_deco_"),
        none_title()
    ], 
    'embed': [
        iframe_and_editor(e),
        iframe_adaptation(e)
    ], 
    'red': [
        style_and_editor(e, "style_color_"),
        none_title()
    ],
    'blue': [
        style_and_editor(e, "style_color_"),
        none_title()
    ],
    'orange': [
        style_and_editor(e, "style_color_"),
        none_title()
    ],
    'green': [
        style_and_editor(e, "style_color_"),
        none_title()
    ],
    'purple': [
        style_and_editor(e, "style_color_"),
        none_title()
    ],
    'pink': [
        style_and_editor(e, "style_color_"),
        none_title()
    ], 
    'underline': [
        style_and_editor(e, "style_deco_"),
        none_title()
    ], 
    'quote': [
        style_and_editor(e, "style_color_"),
        none_title()
    ], 
    'NONE': [
        none_title(),
        none_title(),
    ]
};

// テキストに対するスタイリング設定
export const native_styles = [
    {
      'weight': [
        'regular', 
        'medium', 
        'bold'
      ],
    },
    {
      'transform': [
        {
          'size': [
            'h1', 
            'h2', 
            'h3', 
            'p'
          ]
        },
        'link',
        'embed'
      ],
    },
    {
      'deco': [
        {
          'color': [
            'red',
            'blue',
            'orange',
            'green',
            'purple',
            'pink'
          ]
        }, 
        'underline',
        'quote'
      ]
    }
  ]

// 画像に対するスタイリング設定
export const native_styles_img = [
'NONE'
]
// 動画（iframe）に対するスタイリング設定
export const native_styles_video = [
'NONE'
]

// 全体 ←実際に使う対象のデータ。
export const native_allstyles = [
    native_styles, native_styles_img, native_styles_video
];