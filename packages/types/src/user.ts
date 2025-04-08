export interface User {
  user_id: string;
  password: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  profile_photo_url?: string;
  address?: string;
  date_of_birth?: string;
  salutation?: string;
}
