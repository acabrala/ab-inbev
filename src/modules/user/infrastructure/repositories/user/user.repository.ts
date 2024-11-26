import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../../prisma/prisma.service';
import { IUserRepository } from '../../../domain/interfaces/user-repository.interface';
import { User } from '../../../domain/entities/user.entity';
import { UpdateUserDto } from 'src/modules/user/application/dtos/update-user.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) { }

  async findById(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user ? new User(user) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user ? new User(user) : null;
  }

  async create(input: { name: string; email: string; password: string; permissions: number[] }): Promise<User> {
    try {
      const createdUser = await this.prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: input.password,
          createdAt: new Date(),
          permissions: {
            create: input.permissions.map((permissionId) => ({
              permissionId,
            })),
          },
        },
        include: {
          permissions: true,
        },
      });

      return new User({
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
        password: createdUser.password,
        createdAt: createdUser.createdAt,
      });
    } catch (error) {

      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new Error('Este e-mail já está registrado. Tente com outro e-mail.');
      }

      throw error;
    }
  }

  async update(id: number, data: Partial<User>): Promise<User> {
    const permissionIds = data.permissions?.map(permissionId => permissionId) || [];
    
    await this.prisma.userPermission.deleteMany({
      where: { userId: id },
    });
  
    const newPermissions = permissionIds.map(permissionId => ({
      userId: id,
      permissionId: permissionId,
    }));
  
    await this.prisma.userPermission.createMany({
      data: newPermissions,
    });
  
    const updatedUser = await this.prisma.user.findUnique({
      where: { id },
      include: {
        permissions: {
          select: {
            permission: { select: { id: true } },
          },
        },
      },
    });
  
    return new User({
      ...updatedUser,
      permissions: updatedUser.permissions.map((perm) => perm.permission.id),
    });
  }
  

  async delete(id: number): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      include: {
        permissions: {
          select: {
            permission: { select: { id: true } },
          },
        },
      },
    });

    return users.map(
      (user) =>
        new User({
          ...user,
          permissions: user.permissions.map((perm) => perm.permission.id),
        }),
    );
  }
}
