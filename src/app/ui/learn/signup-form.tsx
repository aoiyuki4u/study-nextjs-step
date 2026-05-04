'use client';

import { lusitana } from '@/app/ui/learn/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/learn/button';
import { useActionState } from 'react';
import { signUp} from '@/app/lib/learn/actions';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SignupForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/learn/login';
  const [state, formAction, isPending] = useActionState(
    signUp, undefined
  );
  const fieldErrors = state?.errors?.properties || {};

  return (
    <>
      <form action={formAction} className="space-y-3" noValidate>
        <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
          <h1 className={`${lusitana.className} mb-3 text-2xl`}>
            Sign Up
          </h1>
          <div className="w-full">
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="name"
              >
                Name
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="name"
                  type="name"
                  name="name"
                  placeholder="Enter your name"
                  required
                />
                <UserIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
              </div>
              {fieldErrors?.name && <p className="mt-1 text-xs text-red-500">{fieldErrors.name.errors}</p>}
            </div>
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
              {fieldErrors?.email && <p className="mt-1 text-xs text-red-500">{fieldErrors.email.errors}</p>}
            </div>
          </div>
          <div className="mt-4">
            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="password">Password</label>
            <div className="relative">
              <input 
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2" 
                id="newPassword" 
                type="password" 
                name="password"
                placeholder="password" 
                required 
                minLength={6} 
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
            {fieldErrors?.password && <p className="mt-1 text-xs text-red-500">{fieldErrors.password.errors}</p>}
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
            {fieldErrors?.confirmPassword && <p className="mt-1 text-xs text-red-500">{fieldErrors.confirmPassword.errors}</p>}
          </div>

          <input type="hidden" name="redirectTo" value={callbackUrl} />
          <Button className="mt-4 w-full" aria-disabled={isPending}>
            Sign Up <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
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
                href="/signup"
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
            {state && state.message && (
              <>
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-500">{state.message}</p>
              </>
            )}
          </div>
        </div>
      </form>
    </>
  );
}
