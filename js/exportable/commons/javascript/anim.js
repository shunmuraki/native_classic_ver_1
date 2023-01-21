import { pragm_stylies } from "./parts.js";

export class Animation_vertical_stand {
    constructor(e) {
        this.target = e;
    }
    createAnim(f, g) {
        let effect = new KeyframeEffect(
            this.target,
            [
                {top: f},
            ], 
            {
                duration: g * 1000, 
                easing: 'linear', 
                composite: 'accumulate'
            },
        );  
        animation_desc = new Animation(effect);
        return animation_desc;
    }
}     

export class Animation_horizontal_stand {
    constructor(e) {
        this.target = e;
    }
    createAnim(f, g) {
        let effect = new KeyframeEffect(
            this.target,
            [
                {left: f} 
            ], 
            {
                duration: g * 1000, 
                easing: 'linear',
                composite: 'accumulate'
            },
        );  
        animation_desc = new Animation(effect);
        return animation_desc;
    }
}    

export class Animation_scale_stand {
    constructor(e) {
        this.target = e;
    }
    
    createAnim(f, g) {
        let effect = new KeyframeEffect(
            this.target,
            [
                {transform: "scale(" + f + ");"},
            ], 
            {
                duration: g * 1000,
                easing: 'linear', 
                composite: 'accumulate'
            },
        );  
        animation_desc = new Animation(effect);
        return animation_desc;
    }
}     

export class Animation_opacity_stand {
    constructor(e) {
        this.target = e;
    }
    
    createAnim(f, g) {
        let effect = new KeyframeEffect(
            this.target,
            [
                {opacity: f} 
            ], 
            {
                duration: g * 1000, 
                easing: 'linear', 
                composite: 'accumulate'
            },
        );  
        animation_desc = new Animation(effect);
        return animation_desc;
    }
}     

export const animation_make = (e, f) => {
    let the_targetname = "anim_num_" + e;
    let the_target = document.getElementsByClassName(the_targetname)[0];

    // スタイルデータの生成.
    let style_data = pragm_stylies(the_target);

    Animation_complex_make(f, the_target);

    let the_genedata = [["opacity", 1], 1];
    let anim_type = the_genedata[0][0];
    let anim_howmuch = the_genedata[0][1];
    let anim_duration = the_genedata[1];

    let na;
    let na_final;

    if (anim_type == "vertical") {
        na = Animation_vertical_stand(the_target);

        // animation_howmuch を実際の値に変換.
        let final_v_num = style_data["vertical"][anim_howmuch];
        na_final = na.createAnim(final_v_num, anim_duration);

    } else if (anim_type == "horizontal") {
        na = Animation_horizontal_stand(the_target);

        // animation_howmuch を実際の値に変換.
        let final_h_num = style_data["horizontal"][anim_howmuch];
        na_final = na.createAnim(final_h_num, anim_duration);

    } else if (anim_type == "scale") {
        na = Animation_scale_stand(the_target);

        // animation_howmuch を実際の値に変換.
        let final_s_num = style_data["scale"][anim_howmuch];
        na_final = na.createAnim(final_s_num, anim_duration);

    } else if (anim_type == "opacity") {
        na = Animation_opacity_stand(the_target);

        // animation_howmuch を実際の値に変換.
        let final_o_num = style_data["opacity"][anim_howmuch];
        na_final = na.createAnim(final_o_num, anim_duration);

    }

    return na_final;
}