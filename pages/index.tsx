'use client';
import SessionProvider from '@/SessionProvider';
import PropertyList from '../components/PropertyList';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Home = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
    }
  }, [status]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 underline">
        Real Estate Listings
      </h1>
      <PropertyList />
    </div>
  );
};

export default Home;
