import * as User from '../../services/userSvc'

import { ErrorCode, KnownError, UserRole } from '../../common-types'

export async function rootOnly(userId: string|undefined): Promise<void> {
  if (!userId) {
    throw new KnownError(ErrorCode.UserUnauthenticated)
  }
  const user = await User.getUserById(userId)
  if (user.role !== UserRole.Root) {
    throw new KnownError(ErrorCode.UserUnauthorized)
  }
}
