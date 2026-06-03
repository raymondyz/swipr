import { Avails } from "../constants/filter_avail";

export function filterUsers(data, filters) {

    const { swipeAvail, location, timeAvail, weekday, hour } = filters;

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
            
            
        } else if (timeAvail === Avails.SELECTING_HOUR) {
            let targetIndexWeekday = -1;
            if (weekday !== "null") {
                targetIndexWeekday = 0;
                for (const [day, label] of Object.entries(Avails.WEEKDAYS)) {
                    if (weekday === label) {
                        break;
                    }
                    targetIndexWeekday++;
                }
            }
            let targetIndexHour = -1;
            if (hour !== "null") {
                targetIndexHour = 0;
                for (const [h, label] of Object.entries(Avails.HOURS).sort(([a], [b]) => a.localeCompare(b))) {
                    if (hour === h) {
                        break;
                    }
                    targetIndexHour++;
                }
            }
            newData = newData.filter(n => {

                const avail = n["availability"];

                if (targetIndexWeekday === -1 && targetIndexHour === -1) { // wildcards
                    return avail?.some(day => day?.some(v => v === true));
                }
                if (targetIndexWeekday === -1) {
                    return avail?.some(day => day?.[targetIndexHour] === true);
                }
                if (targetIndexHour === -1) {
                    return avail[targetIndexWeekday]?.some(v => v === true);
                }

                return avail?.[targetIndexWeekday]?.[targetIndexHour] === true;
            });
        }
        

    }

   

    return newData;
    
}