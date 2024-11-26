import { User } from '../entities/user.entity';


export interface IUserRepository {
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(input: { name: string; email: string; password: string; permissions: number[] }): Promise<User>;
  update(id: number, data: Partial<User>): Promise<User>;
  delete(id: number): Promise<void>;
  findAll(): Promise<User[]>;
}
