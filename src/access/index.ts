import type { Access, PayloadRequest } from 'payload'

export const anyone: Access = () => true

export const authenticated: Access = ({ req: { user } }) => Boolean(user)

export const authenticatedAdmin = ({ req: { user } }: { req: PayloadRequest }) => Boolean(user)

export const authenticatedOrPublished: Access = ({ req: { user } }) => {
  if (user) return true
  return { _status: { equals: 'published' } }
}
