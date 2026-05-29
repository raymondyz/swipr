import { Avails } from "../constants/filter_avail";

export function filterUsers(data, swipeAvail, loc, timeAvail) {
    let newData = data;

    if (swipeAvail !== "null") {
        newData = newData.filter(n => n["swipe_availability"] == swipeAvail);
    }

    if (timeAvail !== "null") {
        if (timeAvail === Avails.CURRENT_TIME) {
            const now = new Date(
                new Date().toLocaleString("en-US", {
                    timeZone: "America/Los_Angeles"
                })
            );
            
            const dayOfWeek = now.getDay(); // 0 = sunday, etc.
            const hour = now.getHours();      // 0-23
            const minute = now.getMinutes();
            
            // if (minute >= 55) {
            //     hour += 1;
            //     hour %= 24;
            //     minute = 0;
            // }
            if (hour < 6) {
                newData = newData.filter(n => false);
            } else {
                newData = newData.filter(n => n["availability"][dayOfWeek][hour-6] == true);
            }
            
            
        }
        

    }

   

    return newData;
    
}