// グローバル変数たち --------------------------- **********
// "function" "keytouch" に関してはこのように 'data" にて外で宣言するようにしている。
// 一方で "setup" は独立している。

// magic コマンドでカットした後半の箇所たちを保存しておく変数
let magic_elms = new Array();

// ----- from ms -----

// * centering を保存しておくことで、マークダウンスペースの挿入先を管理しておく変数。
let ms_adjust_target;
// * centering 自身の高さを控えておいて、ここに 60px 加えたりして、マークダウンスペースの場所を確定させてスタイリングに反映させる変数。
let default_pos;

// ----- from multiable -----

// * ホリゾンタルに読み込んだ YT について、バックエンドの「player」をリストにして参照できるようにする変数.
let players_list = {};
// * YT の単一ブロックにおける５秒ごと（or blocktime）のループ処理を司る setInterval を連ねておく変数. ブロックが移った際にループを丸ごと消せるようにする。
let yt_loop = new Array();
// * デフォルトレイヤーにおいて、same群間の区別を図るために割り振っている「same_num_」を常に監視する変数.
let same_data = 0;
// * Native には special_cov という仕組みがあって、この special_cov における YT のループ処理を他とは別に管理する変数.
let special_playerlist = {};
// * 同様に special_cov に配布される same_num_ を別途管理するための変数.
let s_n = 100;
// * same 群の外へ出た時に、現存する special_cov の中にある「最新の要素」を管理する変数.
let same_start_content = null;

// ----- from editable -----

// * エディットモードにおけるオレンジスペースを表現する変数. 
// * 構造: {1: { s_count: 5, left: 1085 }}
// ** 何番目のスクラップに所属する orange_space についての話か.
// orange_num
// ** その orange_spaace の中に含まれる pointer_s にて「pointer_s」を区別するための番号。ペアになる orange_pointer_f にはこの番号が同様に付与される（ex: num_5）
// s_count
// ** そのポインターの scrollLeft を保存。
// left
let orange_data = {};
// * auto-seeking-mode における "5"秒単位の処理をさせるための setTimeout の戻り値を詰め込む。
let timeoutArray = new Array();
// * auto-seeking-mode における "1"秒単位の処理をさせるための setInterval の戻り値を詰め込む。
let intervalArray = new Array();
// * auto-seeking-mode によって移動した分の scrollLeft の量を保存しておく。
let the_scrolled_distance = 0;

// ----- from stylable -----

// - * - 項目選択関数を記述する
// !!!! 常に native_styles の current_zone を管理するようにしませんか !!!!!
// content: [zone, title, number]
let current_states = [null, null, []];
let previous_states = [null, null, []];


// ----------------------------------------------------   values   -----------------------------------------------------------

// Native 緩衝材
let values = {
    "magic_elms": magic_elms,
    "default_pos": default_pos,
    "ms_adjust_target": ms_adjust_target,
    "players_list": players_list,
    "yt_loop": yt_loop,
    "same_data": same_data,
    "special_playerlist": special_playerlist,
    "s_n": s_n,
    "same_start_content": same_start_content,
    "orange_data": orange_data,
    "timeoutArray": timeoutArray,
    "intervalArray": intervalArray,
    "the_scrolled_distance": the_scrolled_distance,
    "orange_block_counter": orange_block_counter,
    "current_states": current_states,
    "previous_states": previous_states,
}


// global.js の引き渡し関数
// e = 変数名
// f= 代入して更新する値
export const native_value = (e, f) => {
    let value = values[e];
    if (f) {
        value = f;   
    }
    return value;
}