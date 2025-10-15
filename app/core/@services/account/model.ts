import { clearUserDataInLocalStorage } from "~/core/utils/browser";
import { User } from "../user/model";
import type { ApiUserModel } from "../user/types";

class Account extends User {
  constructor(init: ApiUserModel) {
    super(init);
  }
  clearData() {
    clearUserDataInLocalStorage();
  }
}
export { Account };
