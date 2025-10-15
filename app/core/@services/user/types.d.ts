import type {
  ChildSizeKey,
  DrinkingStatusKey,
  EducationChoicesKey,
  HealthStatusKey,
  HouseStatusKey,
  PetKey,
  ReasonChoicesKey,
  RelationShipStatusKey,
  ReligionKey,
  SmokingStatusKey,
  UserAuthStepKey,
  UserDisplayOsKey,
  UserGenderKey,
  UserImageVerificationKey,
  UserLangKey,
  UserOsKey,
} from "~/core/@services/user/variant";

interface ApiUserModel {
  id: number;
  username: string;
}

export type { ApiUserModel };
