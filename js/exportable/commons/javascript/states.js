import { animation_make } from "./anim.js";
import { target_data } from "./base/tools.js";

// animation_generate_list = []; *Nativeから追加.
let animation_list = {};

// [処理内容]
// -- animation_generate_list を取得してループを設置.
// -- Animation_complex_make() に通して 返ってくる animation を受け取り
// -- animation_list[i] に格納するようにする.
for (let i = 0; i < animation_generate_list.length; i++) {
    // video_animation の数合わせをスキップ.
    if (animation_generate_list[i][0]) {
        let animation_part = animation_make(String("anim_num_" + i), animation_generate_list[i]);
        animation_list["anim_" + i] = animation_part;
    }
}

console.log(animation_list);

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

// 渦中の section 内の 各object の状態を current_time と照合しながら更新する関数.
export const the_states = (e, f, g, h) => {
 
    let section = e;
    let section_name = "section_" + target_data(section, "section_");
    let animation_data = f;
    let yt_elem_list = h;
    let current_time = animation_data[String(section_name)]["about_time"]["section_current_time"];
    let loop_anims = animation_data[String(section_name)]["about_anims"];
    
    for (var i = 0; i < Object.keys(loop_anims).length; i++) {

        let anim_name = Number(loop_anims[String("data_" + i)]["anim_name"]);
        let the_object = document.getElementsByClassName(String("anim_num_" + anim_name))[0];
        let trigger_when = loop_anims[String("data_" + i)]["trigger_when"];
        let finish_when = loop_anims[String("data_" + i)]["finish_when"];
        let seekt = loop_anims[String("data_" + i)]["video_startpoint"];
        let loop_object_tag = the_object.lastElementChild.tagName;
        let the_animation = animation_list["anim_" + String(anim_name)];
        let object_content = yt_elem_list[Number(target_data(the_object, "yt_num_"))];

        console.log(object_content);

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

                    if (current_time > trigger_when && current_time < finish_when) {

                        if (seekt) {
                            if (the_object.classList.contains("seekto_ready")) {
                                object_content.seekTo(current_time - trigger_when + seekt);
                                the_object.classList.remove("seekto_ready");
                                the_object.classList.add("seek_did");
                            }
                        }
                        
                        if (the_object.classList.contains("playing") == false) { 

                            if (seekt) {
                                if (! the_object.classList.contains("seek_did")) {
                                    object_content.seekTo(current_time - trigger_when + seekt);
                                } else {
                                    the_object.classList.remove("seek_did");
                                }
                            }
                                
                            object_content.playVideo();
                            play_pause_classi(the_object, "playing");
    
                            object_content.addEventListener("ended", () => {
                                object_content.pauseVideo();
                                play_pause_classi(the_object, "paused");
                            })
                        }
                    } else if (current_time >= finish_when) {
                        if (the_object.classList.contains("playing") == false) {
                            object_content.seekTo(0);
                            if (seekt) {
                                object_content.seekTo(finish_when - trigger_when + seekt);
                            }
                            object_content.pauseVideo();
                            play_pause_classi(the_object, "paused");
                        }
                        the_object.classList.add("seekto_ready");
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