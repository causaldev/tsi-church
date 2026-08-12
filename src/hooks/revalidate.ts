import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidatePublic = ({ doc, req }: { doc?: unknown; req?: { context?: { disableRevalidate?: boolean } } }) => {
  if (req?.context?.disableRevalidate) return doc
  try {
    revalidateTag('glic')
    revalidatePath('/', 'layout')
  } catch {
    // outside Next.js request context
  }
  return doc
}
