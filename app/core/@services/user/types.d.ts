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
  email: string;
  first_name: string;
  last_name: string;
  profile: Partial<{
    id: number;
    unique_id: string;
    alt_username: string;
    gender: UserGenderKey;
    gender_edited: boolean;
    default_language: UserLangKey;
    lat_lon: string;
    coin: number;
    fcm_token: string;
    web_fcm_token: string;
    flag: boolean;
    flag_message: string;
    auth_step: UserAuthStepKey;
    created_at: string;
    user: number;
    referrer: string;
    country: Record<string, any>;
    country_edited: boolean;
    country_id: number;
    state: Record<string, any>;
    state_id: number | null;
    operating_system: UserOsKey;
    device: string;
    hide_account: boolean;
    pause_account: boolean;
  }>;
  last_message: null;
  push_setting: {
    id: number;
    created_at: string;
    updated_at: string;
    enable: boolean;
    play_right: boolean;
    daily_reward: boolean;
    user: number;
  };
  is_active: true;
  has_password: true;
  groups: [];
  side_profile: Partial<{
    id: number;
    created_at: string;
    updated_at: string;
    birth_date: string;
    birth_date_edited: boolean;
    height: number;
    weight: number;
    religion: ReligionKey;
    drinking: DrinkingStatusKey;
    smoking: SmokingStatusKey;
    child_size: ChildSizeKey;
    reason: ReasonChoicesKey;
    attracted_to: UserGenderKey;
    attracted_to_edited: boolean;
    lust: string;
    health: HealthStatusKey;
    house: HouseStatusKey;
    operating_system: UserOsKey;
    education: EducationChoicesKey;
    bio: string;
    languages: Record<string, any>[];
    languages_id: string;
    car: Record<string, any>;
    car_id: number | null;
    interests: Record<string, any>[];
    interests_id: string;
    job: Record<string, any>;
    job_id: number;
    relationship: RelationShipStatusKey;
    ethnicity: Record<string, any>;
    ethnicity_id: number | null;
    pet: PetKey;
    ethnicity_edited: boolean;
  }>;
  unread_support: 0;
  unread_notification: 0;
  unread_messages: 0;
  profile_image: Record<string, any>[];
  is_blue_badge_under_review: boolean;
}

export type { ApiUserModel };
