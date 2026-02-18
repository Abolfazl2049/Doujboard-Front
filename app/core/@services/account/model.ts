import type { UserDto } from "~/core/@services/user/types";
import { MicroUser } from "../user/models/micro";

class Account extends MicroUser {
  unreadActions: number;
  unreadNews: number = 0;
  unreadAdminMessages: number = 0;
  unreadNotifications: number = 0;
  constructor(init: UserDto) {
    super(init);
    this.unreadNews = init.unread_notification;
    this.unreadActions = init.unread_actions;
    this.unreadNotifications = init.unread_admin_notification;
    this.unreadAdminMessages = init.unread_messages;
  }
  clearData() {
    clearUserDataInLocalStorage();
  }
}

export { Account };
