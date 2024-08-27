import type { User } from './user';

export interface Comment {
  id: string;
  content: string;
  user: User;
  replies: Comment[];
}
