export function filterUsers(data, swipeAvail, loc, timeAvail) {
    let newData = data;

    if (swipeAvail !== "null") {
        newData = newData.filter(n => n["swipe_availability"] == swipeAvail);
    }

    return newData;
    
}