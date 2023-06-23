window.addEventListener("keydown", (e)=>{ 
    let k = e.key;
    if (document.activeElement.tagName != "BODY") {        
        let type_signiture = document.activeElement.value;
        if (type_signiture) { 
            if ( env.type_signiture.indexOf('connec') != -1) {
                if (screen.classList.contains("ms")) {
                    keytouch_connect();
                }
            } else if (env.type_signiture.indexOf('edi') != -1) {
                if (screen.classList.contains("ms")) {
                    keytouch_edit_setup();
                }
            } else if ( env.type_signiture.indexOf('youtube.com') != -1) {
                keytouch_multi_youtube();
            } else if ( env.type_signiture.indexOf('imag') != -1) {
                keytouch_multi_image();
            } else if ( env.type_signiture.indexOf('styl') != -1) {
                keytouch_style_setup();
            } else if ( env.type_signiture.indexOf('ted') != -1) { 
                keytouch_um_setup();
            }
        }
    }

    // ---------------------------------------------------------------------------------------------------------------
    
    if (k == "k") {
        if (e.metaKey) {
            keytouch_duplicate();
        }
    }
    
    if (k == "c") { 
        if (e.metaKey) {
            if (screen.classList.contains("edit")) {
                keytouch_edit_command_c();
            }
        } else if (e.ctrlKey) {
            if (screen.classList.contains("edit") == false && screen.classList.contains("um") == false) {
                keytouch_magic_command_c();
            }
        }
    }

    if (k == "v") {
        if(e.ctrlKey) {
            if (screen.classList.contains("edit") == false && screen.classList.contains("um") == false) {
                keytouch_magic_command_v();
            }
        }
    }
    
    if (k == "u") {
        if(e.metaKey) {
            if (screen.classList.contains("edit") == false && screen.classList.contains("um") == false) {
                keytouch_make_command_u();
            }
        }
    }

    if (k == "Enter") {
        if(e.metaKey) {
            if (screen.classList.contains("edit") == false && screen.classList.contains("um") == false) {
                keytouch_make_command_enter();
            }
        } else {
            if (screen.classList.contains("ms")) {
                keytouch_ms_command_escape_or_enter();
            } else if (screen.classList.contains("style")) {
                keytouch_style_command_enter();
            } else if (screen.classList.contains("um_ready")) {
                keytouch_um_command_enter();
            }
        }
    }

    if (k == "Escape") {
        if (e.metaKey) {
            if (screen.classList.contains("edit")) {
                if (new_layer.classList.contains("autoseekingmode")) {
                    keytouch_edit_command_autoseek_escape();
                } else {
                    keytouch_edit_command_mode_escape();
                }
            }
        } else {
            if (screen.classList.contains("ms")) {
                keytouch_ms_command_escape_or_enter();
            } else if (screen.classList.contains("style")) {
                keytouch_style_command_escape();        
            } else if (screen.classList.contains("um")) {
                keytouch_um_command_escape();
            }
        }
    }
    
    if (k == "s") {
        if (e.ctrlKey) {
            if (screen.classList.contains("edit")) {
                keytouch_edit_command_s();
            }
        }
    }

    if (k == "/") {
        keytouch_ms_command_slash();
    }

    // ---------------------------------------------------------------------------------------------------------------
    
    if (k == "ArrowUp") {
        if(e.shiftKey) {      
            if (screen.classList.contains("edit")) {
                if (! new_layer.classList.contains("autoseekingmode")) {
                    if (the_see_centering.classList.contains("principle_block")) {
                        keytouch_edit_command_block_arrow_top();
                    } else if (the_see_centering.classList.contains("principle_pointer")) {
                        keytouch_edit_command_pointer_arrow_top();
                    }
                }
            } else {
                if (screen.classList.contains("um") == false) {
                    keytouch_motion_command_arrow_top();
                }
            }
        }
    }

    if (k == "ArrowLeft") {
        if(e.shiftKey) {
            if (screen.classList.contains("edit")) {
                if (! new_layer.classList.contains("autoseekingmode")) {
                    if (the_see_centering.classList.contains("principle_block")) {
                        keytouch_edit_command_switch_to_pointer();
                    } 
                }
            } else {
                if (screen.classList.contains("um") == false) {
                    keytouch_motion_command_arrow_left();
                }
            }
        } else {
            if (screen.classList.contains("edit")) {
                if (! new_layer.classList.contains("autoseekingmode")) {
                    keytouch_edit_command_switch_to_pointer();
                }
            } else if (screen.classList.contains("style")) {
                keytouch_style_command_arrow_left();
            } else if (screen.classList.contains("um")) {
                keytouch_um_command_arrow_left();
            }
        }
    }

    if (k == "ArrowRight") {
        if(e.shiftKey) {
            if (screen.classList.contains("edit")) {
                if (! new_layer.classList.contains("autoseekingmode")) {
                    if (the_see_centering.classList.contains("principle_pointer")) {
                        keytouch_edit_command_switch_to_block();
                    }
                }
            } else {
                if (screen.classList.contains("edit")) {
                    if (screen.classList.contains("um") == false) {
                        keytouch_motion_command_arrow_right();
                    }
                } else if (screen.classList.contains("style")) {
                    keytouch_style_command_arrow_right();
                } else if (screen.classList.contains("um")) {
                    keytouch_um_command_arrow_right();
                }
            }
        } else {
            if (! new_layer.classList.contains("autoseekingmode")) {
                keytouch_edit_command_switch_to_block();
            }
        }
    }

    if (k == "ArrowDown") {
        if (screen.classList.contains("edit")) {
            if (! new_layer.classList.contains("autoseekingmode")) {
                if (the_see_centering.classList.contains("principle_block")) {
                    keytouch_edit_command_block_arrow_bottom();
                } else if (the_see_centering.classList.contains("principle_pointer")) {
                    keytouch_edit_command_pointer_arrow_bottom();
                }
            }
        } else {
            if (screen.classList.contains("um") == false) {
                keytouch_motion_command_arrow_bottom();
            }
        }
    }
})