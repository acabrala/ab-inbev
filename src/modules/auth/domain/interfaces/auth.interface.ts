export interface IAuthRepository {
    findUserByEmail(email: string): Promise<{
      id: number;
      email: string;
      password: string;
      permissions: { id: number; name: string }[];
    } | null>;
  }
  