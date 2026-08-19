import dotenv from "dotenv";

dotenv.config();
dotenv.config({ path: ".env.local", override: true });

async function main() {
  const [{ prisma }, { syncRpaAccountCatalog }] = await Promise.all([
    import("../src/lib/prisma"),
    import("../src/lib/financeiro/rpa-integration"),
  ]);
  console.log(JSON.stringify(await syncRpaAccountCatalog(prisma), null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
