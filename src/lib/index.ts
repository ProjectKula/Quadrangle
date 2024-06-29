import { PUBLIC_ROOT_URL } from '$env/static/public';

export function getRoot() {
    return PUBLIC_ROOT_URL;
}

export function formatRelativeDate(secondsSince1970: number): string {
    const now = Math.floor(Date.now() / 1000);
    const elapsedSeconds = now - secondsSince1970;

    const SECONDS_IN_A_MINUTE = 60;
    const SECONDS_IN_AN_HOUR = 3600;
    const SECONDS_IN_A_DAY = 86400;
    const SECONDS_IN_A_WEEK = 604800;
    const SECONDS_IN_A_YEAR = 31536000;

    if (elapsedSeconds < 3 * SECONDS_IN_A_MINUTE) {
        return "Now";
    } else if (elapsedSeconds < SECONDS_IN_AN_HOUR) {
        const minutes = Math.floor(elapsedSeconds / SECONDS_IN_A_MINUTE);
        return `${minutes} m ago`;
    } else if (elapsedSeconds < 48 * SECONDS_IN_AN_HOUR) {
        const hours = Math.floor(elapsedSeconds / SECONDS_IN_AN_HOUR);
        return `${hours} h ago`;
    } else if (elapsedSeconds < 7 * SECONDS_IN_A_DAY) {
        const days = Math.floor(elapsedSeconds / SECONDS_IN_A_DAY);
        return `${days} d ago`;
    } else if (elapsedSeconds < SECONDS_IN_A_YEAR) {
        const weeks = Math.floor(elapsedSeconds / SECONDS_IN_A_WEEK);
        return `${weeks} w ago`;
    } else {
        const years = Math.floor(elapsedSeconds / SECONDS_IN_A_YEAR);
        return `${years} y ago`;
    }
}
