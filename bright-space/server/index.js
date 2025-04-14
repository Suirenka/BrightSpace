const { PrismaClient } = require('@prisma/client');


const prisma = new PrismaClient();

async function main() {
  const posts = await prisma.post.findMany();
  console.log(posts);
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
