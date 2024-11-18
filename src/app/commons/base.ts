import { Directive, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Directive()
export abstract class Base implements OnDestroy {

    private subscription: Subscription = new Subscription();

    private subscriptions = new Map<string, Subscription>();

    protected isDestroyed?: boolean;

    constructor() {
        // Do nothing
    }

    ngOnDestroy(): void {
        this.isDestroyed = true;
        this.clearSubscriptions();
        this.onDestroy();
    }

    private clearSubscriptions(): void {
        this.unsubscribe(this.subscription);
        // Clear subscriptions map
        this.subscriptions.forEach(x => this.unsubscribe(x));
        this.subscriptions.clear();
    }

    addSubscription(subscription: Subscription, key?: string): void {
        if (key) {
            // Clear previous subscription before add new one with the same key
            this.stopSubscription(key);
            this.subscriptions.set(key, subscription);
        }
        this.subscription.add(subscription);
    }

    stopSubscription(key: string): void {
        if (key) {
            const sub = this.subscriptions.get(key);
            if (sub) this.unsubscribe(sub);
        }
    }

    unsubscribe(subscription: Subscription): void {
        if (subscription instanceof Subscription) {
            subscription.unsubscribe();
        }
    }

    protected onDestroy(): void {
        // noop
    }

}
