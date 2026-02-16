import type {
  ChildSizeKey,
  DrinkingStatusKey,
  EducationChoicesKey,
  HealthStatusKey,
  HouseStatusKey,
  LustStatusKey,
  PetKey,
  ReasonChoicesKey,
  RelationShipStatusKey,
  ReligionKey,
  SmokingStatusKey,
  UserAuthStepKey,
  UserGenderKey,
  UserLangKey,
  UserOsKey,
} from "~/core/@services/user/variant";
import type { MegaUser } from "./models/mega";
import type { UserSF } from "../shop/user.model";
import type { AdminRoleDto } from "../admin/types";

interface UserDto {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  is_online: boolean;
  date_joined: string;
  email: string;
  profile: Partial<{
    deleted_at: string;
    id: string;
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
    translation_language: number | null;
    timezone: string;
    images: ProfileImageDto[];
    default_image: ProfileImageDto;
    profile_image: ProfileImageDto;
    suspend: boolean;
    suspended_at: string;
    last_login: string;
  }>;
  last_message: null;
  push_setting: Partial<{
    id: string;
    created_at: string;
    updated_at: string;
    enable: boolean;
    play_right: boolean;
    daily_reward: boolean;
    user: number;
  }>;
  side_profile: Partial<{
    id: string;
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
    lust: LustStatusKey;
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
    timezone: string;
    family_size: number;
  }>;
  last_online: string;
  verify?: boolean;
  user_timezone?: string;
  is_active: boolean;
  has_password: boolean;
  unread_notification: number;
  unread_actions: number;
  is_blue_badge_under_review: boolean;
  unread_messages: number;
  unread_admin_notification: number;
  password?: string;
  flag_count?: number;
  watch_list?: Record<string, any>;
  pin_id?: number;
  blur_id?: number;

  admin_profile?: Partial<{
    id: string;
    created_at: string;
    updated_at: string;
    user: number;
    two_fa: boolean;
    role: string | AdminRoleDto;
    role_name: string;
    failed_log_attempts: number;
  }>;
  last_login_attempt: Record<string, any>;
}
interface ProfileImageDto {
  id: string;
  image: string;
  order: number;
  is_primary: boolean;
  is_verified: boolean;
  is_blurred: boolean;
}
interface UserDetailChannelData {
  user: MegaUser;
  deletedUserSF?: UserSF;
}

interface LocationDto {
  licence: string;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  address: {
    country: string;
    country_code: string;
    road: string;
    neighbourhood: string;
    city: string;
    district: string;
    county: string;
    state: string;
  };
  boundingbox: string[];
}
interface UserActivityChartDto {
  status: string;
  data: {
    period: "weekly" | "daily" | "monthly";
    data: Array<{
      label: string;
      value: number;
    }>;
  };
}
// Dashboard stats for the user index page
export interface UserStatsDto {
  user_list?: number;
  suspended_users?: number;
  watch_list?: number;
}

export type { UserDto, ProfileImageDto, UserDetailChannelData, LocationDto, UserActivityChartDto };
