export type UserProfile = {
  id: string;
  telegram_id: number;
  first_name?: string | null;
  last_name?: string | null;
  username?: string | null;
  language_code?: string | null;
};
