import type { UserDto } from "../types";
class MicroUser {
  id: string;
  name: string;
  username: string;

  constructor(init: Partial<UserDto>) {
    this.id = init?.id || "";
    this.name = init?.first_name || "";
    this.username = init?.username || "";
  }
}
export { MicroUser };
