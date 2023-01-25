// ↑ from Native Exportable .

// ***** ---------- * -  インポーターゾーン  ------------ - - - - -  -------------------------------
import { target_data, classmover } from "./base/tools.js";
import { the_states } from "./states.js";
import { on_preventer, off_preventer, transition_animation_start, transition_animation_end, all_player, all_pauser, suppression } from "./parts.js";
import { block_multiable } from "./ytp.js";
// ***** ---------- * -  インポーターゾーン  ------------ - - - - -  -------------------------------

let current_time = 0;
let duration = 0;
let additional_time = 0;

// * remove_wheel を実現するための懸念.
let the_section = null;

// ***** ---------- * -  基本データセット  ------------ - - - - -  -------------------------------

// youtube id list. これをdomに昇華させます(in states.js). 
let state_classies = ["running", "playing", "finished", "paused"];

// let yt_id_list = [];
let yt_elem_list = [];
let animation_type_list = {};

for (let i = 0; i < yt_id_list.length; i++) {
    // * id と 親（<object>）を紐付ける.let the_num = yt_id_list.length + 1;
    let the_name = String("yt_" + i);
    let pl = block_multiable(the_name, yt_id_list[i], i);
    // * ここで挿入！！（昇華）.
    yt_elem_list.push(pl);
}
// ***** ---------- * -  基本データセット  ------------ - - - - -  -------------------------------


// ***** ---------- * -  setTimeout, setInterval 関連のセットアップ  ------------ - - - - -  -------------------------------
let intervalArray = new Array();
let timeoutArray = new Array();
// ***** ---------- * -  setTimeout, setInterval 関連のセットアップ  ------------ - - - - -  -------------------------------


// ***** ---------- * -  setTimeoutのsection別初期化  ------------ - - - - -  -------------------------------
const default_timeout = (e) => {
    let the_name = "section_" + target_data(e, "section_");
    let duration = animation_data[String(the_name)]["about_time"]["section_duration"];

    let duration_use = duration * 1000;

    timeoutArray.push(setTimeout(() => {

        let the_next_section = e.nextElementSibling;

        if (the_next_section) {
            the_next_section.style.opacity = 1;
        }

        clear_shu();

        // * ここで特別なクラスを付与、かな？？
        outer_inte(e);

    }, duration_use));
}
// ***** ---------- * -  setTimeoutのsection別初期化  ------------ - - - - -  -------------------------------


// ***** ---------- * -  毎秒監視要員  ------------ - - - - -  -------------------------------
const aries = (e) => {
    let trigger_name = "section_" + target_data(e, "section_");
    // interval 形式にする必要があるあよね.
    intervalArray.push(setInterval(() => {
        animation_data[String(trigger_name)]["about_time"]["section_current_time"] += 0.5;
        the_states(e, animation_data, "autoseek", yt_elem_list);    
    }, 500)); 
}
// ***** ---------- * -  毎秒監視要員  ------------ - - - - -  -------------------------------


// ***** ---------- * -  始まりと終わり。  ------------ - - - - -  -------------------------------
const clear_shu = () => {
    clearTimeout(timeoutArray.shift());
    clearInterval(intervalArray.shift());
}

const outer_inte = (e) => {

    let the_name = "section_" + target_data(e, "section_");
    let current_time = animation_data[String(the_name)]["about_time"]["section_current_time"];
    let duration = animation_data[String(the_name)]["about_time"]["section_duration"];
    let the_next_section = e.nextElementSibling;

    // * 微調整要員
    if (current_time <= 0) {
        animation_data[String(the_name)]["about_time"]["section_current_time"] = 0;            
        current_time = 0;
        the_states(e, animation_data, "auto_seek", yt_elem_list);
    } else if (current_time >= duration) { 
        animation_data[String(the_name)]["about_time"]["section_current_time"] = duration;            
        current_time = duration;
        the_states(e, animation_data, "auto_seek", yt_elem_list);     
    }

    if (e.classList.contains("ikuneko")) {
        
        if (current_time >= duration){

            all_pauser(e, yt_elem_list);

            let objects = e.children;
            for (let i = 0; i < objects.length; i++) {
                let object = objects[i];

                for (let o = 0; o < state_classies.length; o++) {
                    classmover(object, object, state_classies[o], "remove");
                }
            }

            if (the_next_section) {
                the_next_section.style.opacity = 1;
            }

            remove_wheel();
            off_preventer();

        } 

    } else if (e.classList.contains("kuruneko")) {

        all_pauser(e, yt_elem_list);

        if (current_time <= 0) {
    
            let objects = e.children;
            for (let i = 0; i < objects.length; i++) {
                let object = objects[i];
                for (let o = 0; o < state_classies.length; o++) {
                    classmover(object, object, state_classies[o], "remove");
                }
            }

            if (the_next_section) {
                the_next_section.style.opacity = 0;
            }

            remove_wheel();
            off_preventer();

        } 
    }
}
// ***** ---------- * -  始まりと終わり。  ------------ - - - - -  -------------------------------


// ***** ---------- * -  Wheel 周辺  ------------ - - - - -  -------------------------------

const the_arrows = (event) => {
        
    let the_name = "section_" + target_data(the_section, "section_");
    let the_next_section = the_section.nextElementSibling;

    let section_duration = animation_data[the_name]["about_time"]["section_duration"];
    duration = section_duration;
    
    let distance = event.deltaY;
    let plus = distance / 100;

    current_time = animation_data[the_name]["about_time"]["section_current_time"]; 
    
    all_pauser(the_section, yt_elem_list);

    additional_time += plus;

    suppression(() => { 

        let the_name = "section_" + target_data(the_section, "section_");

        clear_shu();

        the_states(the_section, animation_data, "allstop", yt_elem_list);

        // * additional_time によって上下が決まるし、この時点で特別なクラスを持っているなら、それは下の要素について対応する必要があるってこと。
        if (the_section.classList.contains("special_med_zero")) {
            if (additional_time > 0) {
                if (the_next_section) {
                    the_next_section.style.opacity = 0;
                }
            } else if (additional_time < 0) {
                if (the_next_section) {
                    the_next_section.style.opacity = 1;
                }
            }
            the_section.classList.remove("special_med_zero");
        } else if (the_section.classList.contains("special_med_full")) {
            if (additional_time > 0) {
                if (the_next_section) {
                    the_next_section.style.opacity = 1;
                }
            } else if (additional_time < 0) {
                if (the_next_section) {
                    the_next_section.style.opacity = 0;
                }
            }
            the_section.classList.remove("special_med_full");
        }

        let real_current_time = current_time + additional_time;
        let delayer = duration - real_current_time;
        let duration_use = delayer * 1000;

        animation_data[the_name]["about_time"]["section_current_time"] = real_current_time;
        
        if (additional_time > 0) {
            if (the_section.classList.contains("ikuneko") == false) {   
                the_section.classList.add("ikuneko");
            }
            if (the_section.classList.contains("kuruneko")) {
                the_section.classList.remove("kuruneko");
            }
        } else if (additional_time < 0) {
            if (the_section.classList.contains("kuruneko") == false) {   
                the_section.classList.add("kuruneko");
            }
            if (the_section.classList.contains("ikuneko")) {
                the_section.classList.remove("ikuneko");
            }
        }

        timeoutArray.push(setTimeout(() => {

            let the_next_section = the_section.nextElementSibling; 

            if (the_next_section) {
                the_next_section.style.opacity = 1;
            }
                        
            clear_shu();
            // * ここで特別なクラスを付与、かな？？
            the_section.classList.add("special_med_full");
            outer_inte(the_section);

        }, duration_use));


        if (current_time < 0 || current_time > duration) {
            clear_shu();

            // * ここで特別なクラスを付与、かな？？
            if (current_time <= 0) {
                the_section.classList.add("special_med_zero");
            } else if (current_time >= duration) {
                the_section.classList.add("special_med_full");
            }

            outer_inte(the_section);
        } else {
            aries(the_section);
        }

        current_time = 0;
        duration = 0;
        additional_time = 0;
        
     }, 300);
}


const seek_by_wheel = () => {
    the_section.addEventListener("wheel", the_arrows, true);
}

// ** remove する関数をここに書いてあげれば良いのでは？？
const remove_wheel = () => {
    the_section.removeEventListener("wheel", the_arrows, true);
}
// ***** ---------- * -  Wheel 周辺  ------------ - - - - -  -------------------------------


// ***** ---------- * -  Cropper() 周辺  ------------ - - - - -  -------------------------------
const options = {
    threshold: buildThresholdList()
  };
  
  function buildThresholdList() {
    let thresholds = [];
    let numSteps = 20;
  
    for (let b = 1; b <= numSteps; b++) {
      let ratio = b / numSteps;
      thresholds.push(ratio);
    }
    return thresholds;
  }

const cropper = () => {
    function showElements(entries) {
        entries.forEach((entry) => {
        let nowElement = entry.target;
          if (entry.isIntersecting) {
            
            if (Math.round(entry.intersectionRatio * 100) == 100) {

                // * remove_wheel のため。
                the_section = nowElement;

                on_preventer();

                let the_next_section = nowElement.nextElementSibling;

                if (the_next_section) {
                    the_next_section.style.opacity = 0;
                }

                aries(nowElement);
                default_timeout(nowElement);
                nowElement.classList.remove("iwatchyou");
                nowElement.classList.add("state_on");

                seek_by_wheel();

            } 
          } else {  
              
              nowElement.classList.remove("state_on");
              nowElement.classList.add("iwatchyou");

          }
        });
    }   
    
    let observer = new IntersectionObserver(showElements, options);
    let myTarget = document.querySelectorAll(".iwatchyou");
    for (let n = 0; n < myTarget.length; n++) {
        observer.observe(myTarget[n]);
    }
}
// ***** ---------- * -  Cropper() 周辺  ------------ - - - - -  -------------------------------

// * 実行
cropper();