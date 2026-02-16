import type { DeleteModalProps } from "~/components/Modal/Delete.vue";
import type { Flag } from "~/core/@services/issues/model";
import type { Avatar } from "~/core/@services/management/model";
import type { SuspensionRequest } from "~/core/@services/request/suspension.model";
import type { VerificationRequest } from "~/core/@services/request/verification.model";

type PublicModalName =
  | "addFlag"
  | "imageEditor"
  | "suspendUser"
  | "banUser"
  | "sendWarning"
  | "selectAvatar"
  | "userImages"
  | "sendMessageToUser"
  | "viewImage"
  | "acceptVerificationRequest"
  | "rejectVerificationRequest"
  | "deleteItem";

interface PublicModalEvent {
  actionType: "open" | "close" | "callback";
  name: PublicModalName;
  user?: MicroUser;
  callbackData?: Flag | Avatar | SuspensionRequest;
  indexToSlide?: number;
  image?: string;
  request?: VerificationRequest;
  deleteProps?: DeleteModalProps;
}
export type { PublicModalEvent, PublicModalName };
