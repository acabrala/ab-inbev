import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const permissions = [
    { name: 'admin', description: 'Permissão para administrar artigos e usuários' },
    { name: 'editor', description: 'Permissão para administrar artigos' },
    { name: 'reader', description: 'Permissão para apenas ler artigos' },
  ];

  await prisma.permission.createMany({ data: permissions });

  const hashedPassword = '$2b$10$11CqZwDXOYoPU6dlHXGklus3J6Q2msiUUycmdGdt7IZzNCrqjWxzO'; 
  const rootUser = await prisma.user.create({
    data: {
      name: 'root',
      email: 'root@admin.com',
      password: hashedPassword,
    },
  });

  const adminPermission = await prisma.permission.findUnique({
    where: { name: 'admin' },
  });

  if (adminPermission) {
    await prisma.userPermission.create({
      data: {
        userId: rootUser.id,
        permissionId: adminPermission.id,
      },
    });
  }

  console.log('Seed concluído!');
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
