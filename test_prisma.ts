import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  try {
    const employee = await prisma.employee.create({
      data: {
        name: "Test User",
        cpf: "12345678901",
        email: "test@example.com",
        phone: "11999999999",
        registration: "12345",
        roleId: null,
        secretariatId: null,
        departmentId: null,
        unitId: null,
      }
    });
    console.log("Success:", employee.id);
  } catch (error: any) {
    console.error("Prisma Error:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}
main();
