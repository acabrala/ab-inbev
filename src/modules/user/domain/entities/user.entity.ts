export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  permissions: number[];


  hasPermission(permission: number): boolean {
    return this.permissions.includes(permission);
  }
  
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
