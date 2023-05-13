import {style_and_editor, none_title, iframe_and_editor, iframe_adaptation} from "../function/style.js";

// テキストに対するスタイリング設定
const text_styles = [
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
const img_styles = [
'NONE'
]
// 動画（iframe）に対するスタイリング設定
const iframe_styles = [
'NONE'
]


// ----------------- final output -----------------------------


// 全体 ←実際に使う対象のデータ。
export const native_allstyles = [
    text_styles, img_styles, iframe_styles
];

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