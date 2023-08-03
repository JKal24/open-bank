export function getDate(subtractedDays) {
    let date = new Date();
    const offset = date.getTimezoneOffset();
    date = new Date(date.getTime() - (offset * 60 * 1000));
    date.setDate(date.getDate() - subtractedDays);
    return date.toISOString().split('T')[0];
}
//# sourceMappingURL=date.js.map