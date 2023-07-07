window.addEventListener("keydown", (event)=>{ 
    
    let k = event.key;
    let default_display = element(".default_display");

    if (document.activeElement.tagName != "BODY") {        
        let type_signiture = document.activeElement.value;
        if (type_signiture) { 
            if ( type_signiture.indexOf('connec') != -1) {
                if (element(".default_display").classList.contains("ms")) {
                    keytouch_connect();
                }
            } else if (type_signiture.indexOf('edi') != -1) {
                if (element(".default_display").classList.contains("ms")) {
                    keytouch_edit_setup();
                }
            } else if (type_signiture.indexOf('youtube.com') != -1) {
                keytouch_multi_youtube();
            } else if (type_signiture.indexOf('imag') != -1) {
                keytouch_multi_image();
            } else if (type_signiture.indexOf('styl') != -1) {
                keytouch_style_setup();
            } else if (type_signiture.indexOf('ted') != -1) { 
                keytouch_um_setup();
            }
        }
    }

    // ---------------------------------------------------------------------------------------------------------------
    
    if (k == "k") {
        if (event.metaKey) {
            keytouch_duplicate();
        }
    }
    
    if (k == "c") { 
        if (event.metaKey) {
            if (default_display.classList.contains("edit")) {
                keytouch_edit_command_c();
            }
        } else if (event.ctrlKey) {
            if (default_display.classList.contains("edit") == false && default_display.classList.contains("um") == false) {
                keytouch_magic_command_c();
            }
        }
    }

    if (k == "v") {
        if(event.ctrlKey) {
            if (default_display.classList.contains("edit") == false && default_display.classList.contains("um") == false) {
                keytouch_magic_command_v();
            }
        }
    }
    
    if (k == "u") {
        if(event.metaKey) {
            if (default_display.classList.contains("edit") == false && default_display.classList.contains("um") == false) {
                keytouch_make_command_u();
            }
        }
    }

    if (k == "Enter") {
        if(event.metaKey) {
            if (default_display.classList.contains("edit") == false && default_display.classList.contains("um") == false) {
                keytouch_make_command_enter();
            }
        } else {
            if (default_display.classList.contains("ms")) {
                keytouch_ms_command_escape_or_enter();
            } else if (default_display.classList.contains("style")) {
                keytouch_style_command_enter();
            } else if (default_display.classList.contains("um_ready")) {
                keytouch_um_command_enter();
            }
        }
    }

    if (k == "Escape") {
        if (event.metaKey) {
            if (default_display.classList.contains("edit")) {
                if (default_display.classList.contains("autoseekingmode")) {
                    keytouch_edit_command_autoseek_escape();
                } else {
                    keytouch_edit_command_mode_escape();
                }
            }
        } else {
            if (default_display.classList.contains("ms")) {
                keytouch_ms_command_escape_or_enter();
            } else if (default_display.classList.contains("style")) {
                keytouch_style_command_escape();        
            } else if (default_display.classList.contains("um")) {
                keytouch_um_command_escape();
            }
        }
    }
    
    if (k == "s") {
        if (event.ctrlKey) {
            if (default_display.classList.contains("edit")) {
                keytouch_edit_command_s();
            }
        }
    }

    if (k == "/") {
        keytouch_ms_command_slash();
    }

    // ---------------------------------------------------------------------------------------------------------------
    
    if (k == "ArrowUp") {
        if(event.shiftKey) {
            if (default_display.classList.contains("edit")) {
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