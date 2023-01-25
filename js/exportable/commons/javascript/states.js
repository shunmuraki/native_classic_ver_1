// ↓ from Native Exportable.
// let animation_generate_list = [];
// let animation_data = {section_2:{about_time:{section_current_time:0,section_duration:30,},about_anims:{data_1:{trigger_when:5,finish_when:7,anim_name:1,},data_2:{trigger_when:9,finish_when:11,anim_name:2,},data_3:{trigger_when:14,finish_when:16,anim_name:3,},data_4:{trigger_when:18,finish_when:20,anim_name:4,},data_5:{trigger_when:16,finish_when:18,anim_name:9,},data_6:{trigger_when:20,finish_when:22,anim_name:10,},data_7:{trigger_when:24,finish_when:26,anim_name:11,},data_8:{trigger_when:28,finish_when:30,anim_name:12,},}},section_4:{about_time:{section_current_time:0,section_duration:40,},about_anims:{data_1:{trigger_when:5,finish_when:7,anim_name:5,},data_2:{trigger_when:9,finish_when:11,anim_name:6,},data_3:{trigger_when:14,finish_when:16,anim_name:7,},data_4:{trigger_when:18,finish_when:20,anim_name:8,},data_5:{trigger_when:16,finish_when:18,anim_name:13,},data_6:{trigger_when:20,finish_when:22,anim_name:14,},data_7:{trigger_when:24,finish_when:26,anim_name:15,},data_8:{trigger_when:28,finish_when:30,anim_name:16,},}},section_8:{about_time:{section_current_time:0,section_duration:50,},about_anims:{data_1:{trigger_when:3,finish_when:46,anim_name:17,},}},section_10:{about_time:{section_current_time:0,section_duration:50,},about_anims:{data_1:{trigger_when:3,finish_when: 46,anim_name:18,},}},section_14:{about_time:{section_current_time:0,section_duration:95,},about_anims:{data_1:{trigger_when:3,finish_when:93,anim_name:19,},}},section_16:{about_time:{section_current_time:0,section_duration:118,},about_anims:{data_1:{trigger_when:3,finish_when: 116,anim_name:20,},}}};
// let yt_id_list = ["4LJVtdvtuwU", "ttCMssrSHY"];

import { target_data } from "./base/tools.js";
import { animation_make, Animation_show_make, Animation_hide_make, Animation_scale_make, Animation_position_make, Animation_complex_make } from "./anim.js";

let animation_list = {};

// change　もそうじゃないものも一元化を試みた。
let anim_list_num = animation_generate_list.length;

for (let i = 0; i < anim_list_num; i++) {
    let generated_animation = animation_make(i, animation_generate_list[i]);
    animation_list.push(generated_animation);
}

export const play_pause_classi = (e, f) => {
    if (f == "playing") {
        if (e.classList.contains("playing") == false) {
            e.classList.add("playing");
        }
        if (e.classList.contains("paused")) {
            e.classList.remove("paused");
        }
    } else if (f == "paused") {
        if (e.classList.contains("paused") == false) {
            e.classList.add("paused");
        }
        if (e.classList.contains("playing")) {
            e.classList.remove("playing");
        }
    }
}

export const run_finish_classi = (e, f, g) => {
    if (f == "running") {
        if (e.classList.contains(String("running" + g)) == false) {
            e.classList.add(String("running" + g));
        }
        if (e.classList.contains(String("finished" + g))) {
            e.classList.remove(String("finished" + g));
        }
    } else if (f == "finished") {
        if (e.classList.contains(String("finished" + g)) == false) {
            e.classList.add(String("finished" + g));
        }
        if (e.classList.contains(String("running" + g))) {
            e.classList.remove(String("running" + g));
        }
    }
}


export const the_states = (e, f, g, h) => {
 
    let section = e;
    let section_name = "section_" + target_data(section, "section_");
    let animation_data = f;
    let yt_elem_list = h;
    let current_time = animation_data[String(section_name)]["about_time"]["section_current_time"];
    let loop_anims = animation_data[String(section_name)]["about_anims"];
    
    for (var i = 1; i <= Object.keys(loop_anims).length; i++) {

        let anim_name = Number(loop_anims[String("data_" + i)]["anim_name"]);
        let the_object = document.getElementsByClassName(String("anim_num_" + anim_name))[0];
        var trigger_when = loop_anims[String("data_" + i)]["trigger_when"];
        let finish_when = loop_anims[String("data_" + i)]["finish_when"];
        
        var object_content = yt_elem_list[Number(target_data(the_object, "yt_num_"))];
        var loop_object_tag = the_object.lastElementChild.tagName;
        let the_animations = animation_list[anim_name];

        for (var o = 0; o < the_animations.length; o++) {

            let the_animation = the_animations[o];

            if (g == "allstop") {
    
                if (loop_object_tag == "IFRAME") {
    
                    if (the_object.classList.contains("playing")) {
                        play_pause_classi(the_object, "paused");
                        object_content.pauseVideo();
                    }
        
                } else {
    
                    let the_classlist = the_object.classList;
    
                    if ( the_animation.playState == "running" ) {
                        the_animation.pause();
                        the_animation.cancel();
    
                        for ( let o = 0; o < the_classlist.length; o++ ) {
                            if (the_classlist[o].indexOf("running") != -1) {
                                the_object.classList.remove(the_classlist[o]);
                            }
                        }
                    }
    
                    for ( let o = 0; o < the_classlist.length; o++ ) {
                        if (the_classlist[o].indexOf("finish") != -1) {
                            the_object.classList.remove(the_classlist[o]);
                        }
                    }
                }    
    
            } else if (g == "autoseek") {
    
                if (loop_object_tag == "IFRAME") {
    
                    if (the_object.classList.contains("playing") == false) {
    
                        object_content.seekTo(0);
    
                        if (current_time > trigger_when && current_time < finish_when) {
    
                            object_content.seekTo(current_time - trigger_when);
                            object_content.playVideo();
                            play_pause_classi(the_object, "playing");
    
                            object_content.addEventListener("ended", () => {
                                object_content.pauseVideo();
                                play_pause_classi(the_object, "paused");
                            })
                            
                        } else if (current_time >= finish_when) {
    
                            object_content.seekTo(finish_when - trigger_when);
                            object_content.pauseVideo();
                            play_pause_classi(the_object, "paused");
    
                        }  
                    }                
    
                } else {
    
                    if (the_animation.playState != "running" && the_object.classList.contains(String("running" + anim_name)) == false) {
    
                        if (the_object.classList.contains(String("finished" + anim_name)) == false) {
    
                            the_animation.cancel();
                            the_animation.effect.updateTiming({ fill: 'none' }); 
    
                            if (current_time > trigger_when && current_time < finish_when){
    
                                let the_duration_saving = current_time - trigger_when;
                                the_animation.currentTime = the_duration_saving;
                                run_finish_classi(the_object, "running", anim_name);
    
                                the_animation.play();
                                the_animation.effect.updateTiming({ fill: 'forwards' }); 
                                the_animation.onfinish = () => {
                                    run_finish_classi(the_object, "finished", anim_name); 
                                    the_animation.persist();
                                };
    
                            } else if (current_time >= finish_when) {
                                run_finish_classi(the_object, "finished", anim_name);
                                the_animation.effect.updateTiming({ fill: 'forwards' }); 
                                the_animation.finish();
                                the_animation.persist();
                            }
                        }       
                    }
                }    
            }
        }
    }
}