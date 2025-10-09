import { clearUserDataInLocalStorage } from "~/core/utils/browser";
import { User } from "../user/model";
import type { ApiUserModel } from "../user/types";
import { UserAuthStepVariant, type UserAuthStepName } from "../user/variant";

class Account extends User {
  coin: number;
  isActive: boolean;
  hasPassword: boolean;
  authStep: UserAuthStepName = "NAME_COUNTRY";
  latLon?: string;

  constructor(init: ApiUserModel) {
    super(init);
    this.coin = init.profile?.coin || 0;
    this.isActive = init.is_active;
    this.hasPassword = init.has_password;
    if (init.profile?.auth_step) this.authStep = UserAuthStepVariant[init.profile?.auth_step ]?.name as UserAuthStepName;
    this.latLon = init.profile?.lat_lon;
  }
  getDeviceStrForApi() {
    if (this.device) {
      let str = `${this.device.client?.name}-${this.device.os?.name}${this.device.os?.version}`;
      if (this.device.device?.brand) str += `-${this.device.device.brand}`;
      if (this.device.device?.model) str += `${this.device.device.model}`;
      return str;
    }
  }
  clearData() {
    clearUserDataInLocalStorage();
  }
}
export { Account };
