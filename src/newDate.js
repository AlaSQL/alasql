var dateRegexp = /\d{4}\.\d{2}\.\d{2} \d{2}:\d{2}:\d{2}\.\d{3}/;
function newDate(d) {
    if (typeof d === "string") {
        if (dateRegexp.test(d)) {
            d = d.replace(".", "-").replace(".", "-");
        }
    }
    return new Date(d);
}