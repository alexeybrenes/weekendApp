export default function combineDateTime(date, time) {
    const datetime = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        time.getHours(),
        time.getMinutes(),
        time.getSeconds()
    );
    return datetime.getTime();
}