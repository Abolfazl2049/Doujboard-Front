import { getDeviceName } from "~/core/@services/user/utils/data";
class LoginAttempt {
  ipAddress: string;
  userAgent: string;
  success: boolean;
  createdAt: string;
  constructor(init: Record<string, any>) {
    this.ipAddress = init.ip_address;
    this.userAgent = init.user_agent;
    this.success = init.successful;
    this.createdAt = init.created_at;
    this.userAgent = init.user_agent;
  }
  deviceName() {
    const extractedDevice = this.userAgent.split("(")[1]?.split(";")[1]?.split(")")[0]?.trim();
    return getDeviceName(extractedDevice);
  }
}
export { LoginAttempt };
