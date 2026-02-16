import type { MyFile } from "./component";

interface NavBackChannelData {
  goBack: () => void;
}
interface PublicModalEvent {
  modalName: "Error" | "Favorite" | "UnFavorite" | "BlockUser" | "Undo" | "hiddenWarn" | "UnMatchUser";
  type: "confirm" | "close";
  finish?: () => void;
}

export type { NavBackChannelData, PublicModalEvent };
