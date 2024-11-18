import { Subscription } from 'rxjs';

/**
 * Checks the specified value is undefined or not.
 * @param val The value need to be checked.
 */
export function isUndefined(val: any): boolean {
    return typeof val == 'undefined' || val === null;
}

/**
 * Checks the specified value is null/undefined/empty or not.
 * @param val The value need to be checked.
 */
export function isNullOrEmpty(val: any): boolean {
    return isUndefined(val) || val === '';
}

/**
 * Checks the specified value is null/undefined/empty/white-space or not.
 * @param val The value need to be checked.
 */
export function isNullOrWhitespace(val: any): boolean {
    return isNullOrEmpty(val) || val.toString().trim() == '';
}

/**
 * Determines whether the specified values are considered equal.
 * @param a The first value to compare.
 * @param b The second value to compare.
 */
export function equals(a: any, b: any): boolean {
    if (isUndefined(a) && isUndefined(b)) {
        return true;
    }
    if (isUndefined(a) || isUndefined(b)) {
        return false;
    }
    return a.toString() == b.toString();
}

/**
 * Determines whether the specified values are considered equal ignoring case.
 * @param a The first value to compare.
 * @param b The second value to compare.
 */
export function equalsIgnoreCase(a: any, b: any): boolean {
    if (isUndefined(a) && isUndefined(b)) {
        return true;
    }
    if (isUndefined(a) || isUndefined(b)) {
        return false;
    }
    return a.toString().toLowerCase() == b.toString().toLowerCase();
}

/**
 * Unsubscribes the provided subscriptions.
 * @param subscriptions The subscriptions should be unsubscribe.
 */
export function unsubscribe(...subscriptions: Subscription[]): void {
    const length = subscriptions?.length;
    for (let i = 0; i < length; i++) {
        const subscription = subscriptions[i];
        if (subscription instanceof Subscription) {
            subscription.unsubscribe();
        }
    }
}

/**
 * Stops event propagation.
 * @param event The event.
 */
export function stopEvent(event: any): void {
    if (!event) {
        return;
    }
    if (event.stopPropagation) {
        event.stopPropagation();
    }
    if (event.preventDefault) {
        event.preventDefault();
    }
}
