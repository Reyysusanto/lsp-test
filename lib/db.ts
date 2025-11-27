import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { DATABASE_URL, NODE_ENV } from '@/utils/env';

const adapter = new PrismaPg({
  connectionString: DATABASE_URL!,
});

const prismaClientSingleton = () => {
  return new PrismaClient({
    adapter,
  });
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();
if (NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;

export default prisma;
