import {style_and_editor, none_title, iframe_and_editor, iframe_adaptation} from "../function/style.js";

// * テキスト要素に提供する装飾のジャンルと選択項目.
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

// * 画像要素に提供する装飾のジャンルと選択項目.
const img_styles = [
  'NONE'
]

// * 動画要素に提供する装飾のジャンルと選択項目.
const iframe_styles = [
  'NONE'
]

// ---------------------------------------------------------------------------------------------------------------

// * Nativeにおける装飾のすべてのジャンルと選択項目を統括する配列。
// * ホイールを生成する際は常にこれを参照する.
export const native_allstyles = [
    text_styles, 
    img_styles,
    iframe_styles
];

// * Nativeで用意している装飾の項目ごとに実行される処理をまとめた連想配列.
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