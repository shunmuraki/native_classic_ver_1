import { centering_marker, focus_checker} from "../base/function.js";
import { same_data_counter, same_data_getter } from "../base/tools.js";

export const same_around = (e, f) => {
    let next_one;

    function same_setup() {
        e.classList.add("same");
        let same_data = same_data_getter();
        same_data += 1;
        same_data_counter(same_data);
    }

    if (f == "default") {

        next_one = e.previousElementSibling;
        if (! e.classList.contains("same")) {
            same_setup();
            e.classList.add("same_end");
            next_one.classList.add("same_start");
        }

    } else if (f == "connected") {
        next_one = e.nextElementSibling;
        if (! e.classList.contains("same")) {
            same_setup();
            e.classList.add("same_start");
            next_one.classList.add("same_end");
        }
        let the_content = e.lastElementChild;
        if (next_one.lastElementChild) {
            next_one.lastElementChild.remove();
            next_one.appendChild(the_content.cloneNode(true));
        }
        the_content.remove();
        centering_marker(e, next_one, "centering");
        if(e.classList.contains("same_end")) {
            e.classList.remove("same_end");
            next_one.classList.add("same_end");
        }
    }

    let same_data_latest = same_data_getter();
    let the_name = "same_num_" + same_data_latest;

    e.classList.add("same");
    next_one.classList.add("same");          
    e.classList.add(the_name);
    next_one.classList.add(the_name);
    
    // command + U では必要なかったが配慮.
    focus_checker(next_one);
}