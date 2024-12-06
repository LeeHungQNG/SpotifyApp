import { SignedIn, SignedOut, SignOutButton, UserButton } from '@clerk/clerk-react';
import { LayoutDashboardIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import SignInOAuthButtons from './SignInOAuthButtons';
import { useAuthSore } from '@/stores/useAuthStore';
import { cn } from '@/lib/utils';
import { buttonVariants } from './ui/button';

const TopBar = () => {
  const { isAdmin } = useAuthSore();
  console.log('🚀 ~ TopBar ~ isAdmin:', isAdmin);

  return (
    <div className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10">
      <div className="flex gap-2 items-center">
        <img src="/spotify.png" className="size-8" alt="Spotify logo" />
        Spotify
      </div>
      <div className="flex gap-4 items-center">
        {isAdmin && (
          <Link to={'/admin'} className={cn(buttonVariants({ variant: 'outline' }))}>
            <LayoutDashboardIcon className="size-4  mr-2" />
            Admin Dashboard
          </Link>
        )}

        <SignedIn>
          <SignOutButton />
        </SignedIn>

        <SignedOut>
          <SignInOAuthButtons />
        </SignedOut>

        <UserButton />
      </div>
    </div>
  );
};
export default TopBar;
