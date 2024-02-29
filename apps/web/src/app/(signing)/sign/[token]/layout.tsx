import React from 'react';

import Image from 'next/image';

import backgroundPattern from '@documenso/assets/images/background-pattern.png';
import { getServerComponentSession } from '@documenso/lib/next-auth/get-server-component-session';
import type { GetTeamsResponse } from '@documenso/lib/server-only/team/get-teams';
import { getTeams } from '@documenso/lib/server-only/team/get-teams';

import { Header as AuthenticatedHeader } from '~/components/(dashboard)/layout/header';
import { NextAuthProvider } from '~/providers/next-auth';

export type SigningLayoutProps = {
  children: React.ReactNode;
};

export default async function SigningLayout({ children }: SigningLayoutProps) {
  const { user, session } = await getServerComponentSession();

  let teams: GetTeamsResponse = [];

  if (user && session) {
    teams = await getTeams({ userId: user.id });
  }

  return (
    <NextAuthProvider session={session}>
      <div className="min-h-screen">
        {user && <AuthenticatedHeader user={user} teams={teams} />}

        <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden  px-4 py-12 md:p-12 lg:p-24">
          <div>
            <div className="fixed -inset-[min(600px,max(400px,60vw))] -z-[1] flex items-center justify-center opacity-70">
              <Image
                src={backgroundPattern}
                alt="background pattern"
                className="dark:brightness-95 dark:contrast-[70%] dark:invert dark:sepia"
              />
            </div>

            <div className="relative w-full">{children}</div>
          </div>
        </main>
      </div>
    </NextAuthProvider>
  );
}
