import type { User } from './user';

export interface Comment {
  id: string;
  content: string;
  user: User;
  replies: Comment[];
  parent: Comment | null;
  parent_id?: string | null;
}

export interface CreateComment {
  content: string;
  parent_id: string | null;
}
