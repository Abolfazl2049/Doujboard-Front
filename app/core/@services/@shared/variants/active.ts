import { VariantMaster, type Variant } from "../models/variant";

type ActiveStatusName = "Active" | "Inactive";
type ActiveStatusKey = "true" | "false";
interface ActiveStatusData {
  badgeClassName: string;
  value: boolean;
}
interface ActiveStatus extends Variant<ActiveStatusName, ActiveStatusKey, ActiveStatusData> {}

const ActiveStatusV = new VariantMaster<ActiveStatusName, ActiveStatusKey, ActiveStatusData>([
  {
    key: "true",
    name: "Active",
    displayName: "Active",
    data: {
      badgeClassName: "bg-[#DCFCE7] text-[#016630] border-[#7BF1A8]",
      value: true,
    },
  },
  {
    key: "false",
    name: "Inactive",
    displayName: "Inactive",
    data: {
      badgeClassName: "bg-[#FFE2E2] text-[#9F0712] border-[#FFA2A2]",
      value: false,
    },
  },
]);
export { ActiveStatusV };
export type { ActiveStatus, ActiveStatusKey, ActiveStatusName };
