window.addEventListener("keydown", (e)=>{
   
    if (screen.classList.contains("edit") == false && screen.classList.contains("um") == false) {
    
        let k = e.key;
        let current;
        let type_signiture;
        let current_vertical;

        keytouch_basic(current, type_signiture, current_vertical);
        
        // マジックコマンド.
        if(e.ctrlKey) {
            if (k == "c") {
                pointer_anim();
                the_magic_copy(current_vertical);
            }
            if (k == "v") {
                pointer_anim();
                the_magic_paste(current_vertical);
            }
        }
    
    }
    
});

