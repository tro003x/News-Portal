import React, { useContext } from 'react';
import { format } from 'date-fns';
import CategoriesMenu from './CategoriesMenu';
import userIcon from '../assets/user.png';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const TopBar = () => {
  const { user, setUser, logOut } = useContext(AuthContext) || {};

  return (
    <div className="w-11/12 mx-auto flex items-center justify-between py-0">
      <div className="flex items-center gap-4">
        <CategoriesMenu />
        <div className="text-sm text-accent hidden sm:block">{format(new Date(), 'EEEE, d MMMM, yyyy')}</div>
      </div>

      <div className="flex items-center gap-4">
        <img src={user?.photoURL || userIcon} alt="user" className="w-8 h-8 rounded-full" />
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
