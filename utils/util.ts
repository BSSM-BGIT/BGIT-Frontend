export const numberInBetween = (start: number | undefined, end: number | undefined, given: number): boolean => {
    if (start === undefined && end === undefined) return true;
    if (start === undefined || end === undefined) {
        if (start !== undefined && given >= start) return true;
        if (end !== undefined && given <= end) return true;
        return false;
    }
    if (given >= start && given <= end) return true;
    return false;
}