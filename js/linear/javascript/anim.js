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
    let anim_howmuch = the_genedata[0];
    let anim_duration = the_genedata[1];

    let na = new Animation_opacity_stand(the_target);
    let final_o_num = style_data["opacity"][anim_howmuch];
    na_final = na.createAnim(final_o_num, anim_duration);

    return na_final;
}