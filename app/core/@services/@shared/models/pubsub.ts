interface SubscriptionOptions {
  once?: true;
}
class Subscription<EventData> {
  readonly callback: (data: EventData) => void;
  readonly id: string;
  unsubscribe: () => void;
  readonly options: SubscriptionOptions = {};

  constructor(callback: (data: EventData) => void, subscriptions: Subscription<EventData>[], options: SubscriptionOptions = {}) {
    this.callback = callback;
    this.id = genUUID();
    this.unsubscribe = () =>
      subscriptions.splice(
        subscriptions.findIndex((s) => s.id === this.id),
        1,
      );
    this.options = options;
  }
}

class PubSub<EventData> {
  private readonly subscribers: Subscription<EventData>[] = [];

  get subscriberCount(): number {
    return this.subscribers.length;
  }

  subscribe(callback: (data: EventData) => void, options: SubscriptionOptions = {}) {
    const subscription = new Subscription<EventData>(callback, this.subscribers, options);
    this.subscribers.push(subscription);
    return subscription;
  }

  removeSubscriber(id: string): boolean {
    const index = this.subscribers.findIndex((s: Subscription<EventData>) => s.id === id);
    if (index !== -1) {
      this.subscribers.splice(index, 1);
      return true;
    }
    return false;
  }

  hasSubscriber(id: string): boolean {
    return this.subscribers.some((s: Subscription<EventData>) => s.id === id);
  }

  clear(): void {
    this.subscribers.length = 0;
  }

  publish(data: EventData) {
    for (const subscription of this.subscribers) {
      try {
        subscription.callback(data);
        if (subscription.options.once) subscription.unsubscribe();
      } catch (error) {
        console.error("Subscriber execution failed:", error);
      }
    }
  }
}
export { PubSub, Subscription };
