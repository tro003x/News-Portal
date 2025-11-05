import React, { useContext } from 'react';
import { format } from 'date-fns';
import CategoriesMenu from './CategoriesMenu';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const TopBar = () => {
  const { user, setUser, logOut } = useContext(AuthContext) || {};

  const fallbackAvatar = user
    ? `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(
        user.displayName || user.email || 'user'
      )}`
    : null;

  // Normalize Google photo URL to include a size parameter so the image resolves reliably
  const normalizedPhotoURL = (() => {
    const raw = user?.photoURL;
    if (!raw) return null;
    try {
      const u = new URL(raw);
      if (u.hostname.endsWith('googleusercontent.com')) {
        // Prefer an explicit size; many Google URLs accept `sz` query
        if (!u.searchParams.has('sz')) {
          u.searchParams.set('sz', '96');
        }
        return u.toString();
      }
      return raw;
    } catch {
      return raw;
    }
  })();

  return (
    <div className="w-11/12 mx-auto flex items-center justify-between py-0">
      <div className="flex items-center gap-4">
        <CategoriesMenu />
        <div className="text-sm text-accent hidden sm:block">{format(new Date(), 'EEEE, d MMMM, yyyy')}</div>
      </div>

      <div className="flex items-center gap-4">
        {user && (
          <img
            src={normalizedPhotoURL || fallbackAvatar}
            alt={user.displayName || 'User'}
            className="w-8 h-8 rounded-full"
            onError={(e) => {
              const current = e.currentTarget.getAttribute('src') || '';
              if (normalizedPhotoURL && current === normalizedPhotoURL && fallbackAvatar) {
                e.currentTarget.src = fallbackAvatar;
                return;
              }
              e.currentTarget.style.display = 'none';
            }}
          />
        )}
        {user ? (
          <button
            onClick={async () => {
              try {
                if (logOut) await logOut();
                else if (setUser) setUser(null);
                toast.success('Successfully logged out');
              } catch (err) {
                toast.error('Logout failed: ' + (err?.message || err));
              }
            }}
            className="btn btn-primary btn-sm px-4"
          >
            Sign Out
          </button>
        ) : (
          <Link to="/auth/signin" className="btn btn-primary btn-sm px-4">Sign In</Link>
        )}
      </div>
    </div>
  );
};

export default TopBar;
