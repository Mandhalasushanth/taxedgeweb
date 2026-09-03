import { env } from '@core/config'
import { permissionsFor } from '@core/auth'
import type { AuthSession, AuthUser, UserRole } from '@core/auth'

import { authApi } from '../api/authApi'
import type {
  CreateProfilePayload,
  LoginPayload,
  RegisterPayload,
  VerifyOtpPayload,
} from '../types/auth.types'

/* ------------------------------------------------------------------ *
 * Development mocks - delete this block once the API is live.
 * ------------------------------------------------------------------ */
/**
 * Demo sign-ins while mocks are on:
 *   9000000001  Super admin      9000000004  GST agent
 *   9000000002  Admin            9000000005  ITR agent
 *   9000000003  Manager          anything else  Customer
 */
const DEMO_ROLES: Record<string, { role: UserRole; fullName: string; id: string; department?: string }> = {
  '9000000001': { role: 'SUPER_ADMIN', fullName: 'Vasavi Reddy', id: 'stf_001', department: 'Operations' },
  '9000000002': { role: 'ADMIN', fullName: 'Rahul Menon', id: 'stf_002', department: 'Operations' },
  '9000000003': { role: 'MANAGER', fullName: 'Priya Nair', id: 'stf_003', department: 'Compliance' },
  '9000000004': { role: 'GST_AGENT', fullName: 'Imran Shaikh', id: 'stf_004', department: 'Compliance' },
  '9000000005': { role: 'ITR_AGENT', fullName: 'Sneha Kulkarni', id: 'stf_005', department: 'Compliance' },
}

const mockUser = (mobile: string): AuthUser => {
  const demo = DEMO_ROLES[mobile]
  if (demo) {
    return {
      id: demo.id,
      fullName: demo.fullName,
      email: `${demo.fullName.split(' ')[0].toLowerCase()}@taxedge.in`,
      mobile,
      role: demo.role,
      department: demo.department,
      permissions: permissionsFor(demo.role),
      isProfileComplete: true,
    }
  }

  return {
    id: 'usr_demo_001',
    fullName: 'Demo Customer',
    email: 'demo@taxedge.in',
    mobile,
    role: 'CUSTOMER',
    permissions: [],
    isProfileComplete: true,
  }
}

const mockSession = (mobile: string): AuthSession => ({
  user: mockUser(mobile),
  tokens: { accessToken: 'mock.access.token', refreshToken: 'mock.refresh.token' },
})

const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms))
/* ------------------------------------------------------------------ */

/**
 * Business rules for signing in. Pages call this, never authApi directly,
 * so the mock switch and any future multi-step logic lives in one place.
 */
export const authFlowService = {
  async login(payload: LoginPayload): Promise<AuthSession> {
    if (env.enableMocks) {
      await delay()
      return mockSession(payload.mobile)
    }
    return authApi.login(payload)
  },

  async register(payload: RegisterPayload): Promise<{ mobile: string }> {
    if (env.enableMocks) {
      await delay()
      return { mobile: payload.mobile }
    }
    await authApi.register(payload)
    return { mobile: payload.mobile }
  },

  async sendOtp(mobile: string): Promise<void> {
    if (env.enableMocks) {
      await delay(300)
      return
    }
    await authApi.sendOtp({ mobile })
  },

  async verifyOtp(payload: VerifyOtpPayload): Promise<AuthSession> {
    if (env.enableMocks) {
      await delay()
      if (payload.otp !== '123456') throw new Error('That code is incorrect. Try 123456 in demo mode.')
      return mockSession(payload.mobile)
    }
    return authApi.verifyOtp(payload)
  },

  async setPasscode(passcode: string): Promise<void> {
    if (env.enableMocks) {
      await delay(300)
      return
    }
    await authApi.setPasscode({ passcode })
  },

  async createProfile(payload: CreateProfilePayload): Promise<AuthUser> {
    if (env.enableMocks) {
      await delay()
      return { ...mockUser('9999999999'), isProfileComplete: true }
    }
    return authApi.createProfile(payload)
  },

  async logout(): Promise<void> {
    if (env.enableMocks) return
    try {
      await authApi.logout()
    } catch {
      /* signing out locally must succeed even if the server call fails */
    }
  },
}
