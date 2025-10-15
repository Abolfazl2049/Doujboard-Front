import type { ApiUserModel } from "~/core/@services/user/types";
class User {
  id: number;
  username: string;

  constructor(init: ApiUserModel) {
    this.id = init.id;
    this.username = init.username;
  }
}

export { User };
