import type { PublicModalEvent } from "./types";

const PublicModalChannel = new PubSub<PublicModalEvent>();
export { PublicModalChannel };
