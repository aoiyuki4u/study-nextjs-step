'use client';

import { lusitana } from '@/app/ui/learn/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/learn/button';
import { useActionState } from 'react';
import { updatePassword, PasswordState } from '@/app/lib/learn/actions';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const initialState: PasswordState = { 
  errors: {},
  message: null
};

export default function PasswordForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/learn/login';
  // isPending : Server Action 실행 중? Boolean 값, false:기본값, true:처리중, false:완료
  // <button aria-disabled={isPending}>에 사용 서버 처리중 중복 동작 방지
  const [errorMessage, formAction, isPending] = useActionState(
    updatePassword,
    initialState,
  );

  const fieldErrors = errorMessage?.errors?.properties || {};

  return (
    <>
      <form action={formAction} className="space-y-3" noValidate>
        <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
          <h1 className={`${lusitana.className} mb-3 text-2xl`}>
            Change password
          </h1>
          <div className="w-full">
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                />
                <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
              {fieldErrors.email?.errors && (
                <div className="mt-2 text-sm text-red-500">
                  {fieldErrors.email?.errors?.map((error: string) => (
                    <p key={error}>{error}</p>
                  ))}
                </div>
              )}
            </div>
            <div className="mt-4">
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="password"
                  type="password"
                  name="oldPassword"
                  placeholder="Enter password"
                  required
                  minLength={6}
                />
                <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
              {fieldErrors.oldPassword?.errors && (
                <div className="mt-2 text-sm text-red-500">
                  {fieldErrors.oldPassword?.errors?.map((error: string) => (
                    <p key={error}>{error}</p>
                  ))}
                </div>
              )}
            </div>
          </div>

          <hr className="my-6 border-t border-gray-200" />
          <div className="mt-4">
            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="newPassword">New Password</label>
            <div className="relative">
              <input 
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2" 
                id="newPassword" 
                type="password" 
                name="newPassword"
                placeholder="New password" 
                required 
                minLength={6} 
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
            {fieldErrors.newPassword?.errors && (
              <div className="mt-2 text-sm text-red-500">
                {fieldErrors.newPassword?.errors?.map((error: string) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            )}
          </div>
          <div className="mt-4">
            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="confirmPassword">Confirm New Password</label>
            <div className="relative">
              <input 
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2" 
                id="confirmPassword" 
                type="password" 
                name="confirmPassword" 
                placeholder="Confirm new password" 
                required 
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
            {fieldErrors.confirmPassword?.errors && (
              <div className="mt-2 text-sm text-red-500">
                {fieldErrors.confirmPassword?.errors?.map((error: string) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            )}
          </div>

          <input type="hidden" name="redirectTo" value={callbackUrl} />
          <Button className="mt-4 w-full" aria-disabled={isPending}>
            Update Password <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
          </Button>

          <div className="mt-4 flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <Link
                href="/learn/login"
                className="text-blue-500 hover:underline"
              >
                login
              </Link>
              <Link
                href="/learn/login/signup"
                className="text-blue-500 hover:underline"
              >
                Sign up
              </Link>
            </div>
          </div>

          <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            {/* {errorMessage && (
              <>
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-500">{errorMessage}</p>
              </>
            )} */}
            {errorMessage && errorMessage.message && (
              <>
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-500">{errorMessage.message}</p>
              </>
            )}
          </div>
        </div>
      </form>
      <div className='border-blue-500 border rounded-xl p-2'>
        <dl>
          <dt>user@nextmail.com</dt>
          <dd>123456</dd>
        </dl>
      </div>
    </>
  );
}
