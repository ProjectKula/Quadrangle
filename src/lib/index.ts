// @ts-expect-error not sure why it's not working
import { PUBLIC_ROOT_URL } from '$env/static/public';

export function getRootUrl() {
    return PUBLIC_ROOT_URL;
}
