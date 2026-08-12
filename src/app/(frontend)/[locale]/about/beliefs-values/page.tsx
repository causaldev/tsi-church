import { redirect } from 'next/navigation'

type Props = { params: Promise<{ locale: string }> }

export default async function BeliefsRedirect({ params }: Props) {
  const { locale } = await params
  redirect(`/${locale}/about#beliefs`)
}
