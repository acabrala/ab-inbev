import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../../prisma/prisma.service';
import { IAuthRepository } from '../../../domain/interfaces/auth.interface';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUserByEmail(email: string): Promise<{
    id: number;
    email: string;
    password: string;
    permissions: { id: number; name: string }[];
  } | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        permissions: {
          include: {
            permission: true,
          },
        },
      },
    });

    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
      password: user.password,
      permissions: user.permissions.map((userPermission) => ({
        id: userPermission.permission.id,
        name: userPermission.permission.name,
      })),
    };
  }
}
