import { pragm_stylies } from "./parts.js";

export class Animation_vertical_stand {
    constructor(e) {
        this.target = e;
    }
    createAnim(f, g) {
        let animation_desc;
        let effect = new KeyframeEffect(
            this.target,
            [
                {top: f + "px"}
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
        let animation_desc;
        let effect = new KeyframeEffect(
            this.target,
            [
                {left: f + "px"} 
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
        let animation_desc;
        let effect = new KeyframeEffect(
            this.target,
            [
                {transform: "scale(" + f + ")"}
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
        let animation_desc;
        let effect = new KeyframeEffect(
            this.target,
            [
                {opacity: f}
            ], 
            {
                duration: g * 1000, 
                easing: 'linear', 
            },
        );  
        animation_desc = new Animation(effect);
        return animation_desc;
    }
}     

export const animation_make = (e, f) => {
    
    let the_target = document.getElementsByClassName(e)[0];
    let the_genedata = f;
    let anim_type = the_genedata[0][0];
    let anim_howmuch = the_genedata[0][1];
    let anim_duration = the_genedata[1];

    let na;
    let na_final;

    let style_data = pragm_stylies(the_target);

    if (anim_type == "vertical") {
        na = new Animation_vertical_stand(the_target);
        let final_v_num = style_data["vertical"][anim_howmuch];
        na_final = na.createAnim(final_v_num, anim_duration);

    } else if (anim_type == "horizontal") {
        na = new Animation_horizontal_stand(the_target);
        let final_h_num = style_data["horizontal"][anim_howmuch];
        na_final = na.createAnim(final_h_num, anim_duration);

    } else if (anim_type == "scale") {
        na = new Animation_scale_stand(the_target);
        let final_s_num = style_data["scale"][anim_howmuch];
        na_final = na.createAnim(final_s_num, anim_duration);

    } else if (anim_type == "opacity") {
        na = new Animation_opacity_stand(the_target);
        let final_o_num = style_data["opacity"][anim_howmuch];
        na_final = na.createAnim(final_o_num, anim_duration);
    }

    return na_final;
}