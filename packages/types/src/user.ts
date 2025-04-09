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
  country?: string;
  gender?: string;
  martial_status?: string;
  spouse_salutation?: string;
  spouse_first_name?: string;
  spouse_last_name?: string;
  hobbies?: string[];
  sports?: string[];
  music_genres?: string[];
  movies?: string[];
}
