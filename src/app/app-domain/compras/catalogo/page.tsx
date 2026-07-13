import { prisma } from "@/lib/prisma"
import CatalogoClient from "./CatalogoClient"

export default async function CatalogoPage() {
  const items = await prisma.catalogItem.findMany({
    orderBy: { createdAt: 'desc' }
  }).catch(() => [])

  return <CatalogoClient items={items} />
}
