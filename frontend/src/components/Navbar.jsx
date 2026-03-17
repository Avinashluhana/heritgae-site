import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { SunIcon, MoonIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/stories', label: 'Stories' },
  { to: '/walks', label: 'Heritage Walks' },
  { to: '/submit', label: 'Submit Site' },
  { to: '/map', label: 'Explore Map' },
  { to: '/volunteer', label: 'Volunteer' },
  { to: '/donate', label: 'Donate' },
];

export default function Navbar() {
  const { isAdmin, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-stone-900/90 backdrop-blur border-b border-stone-200 dark:border-stone-700">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="font-serif text-xl font-bold text-heritage-600 dark:text-heritage-400 tracking-wide">
          🏛 I Am Heritage
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink key={to} to={to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${isActive ? 'text-heritage-600 dark:text-heritage-400' : 'text-stone-600 dark:text-stone-300 hover:text-heritage-500'}`
              }>
              {label}
            </NavLink>
          ))}
          {isAdmin && (
            <NavLink to="/admin"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${isActive ? 'text-heritage-600' : 'text-stone-600 dark:text-stone-300 hover:text-heritage-500'}`
              }>
              Dashboard
            </NavLink>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button onClick={toggle} className="p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition" aria-label="Toggle theme">
            {dark ? <SunIcon className="w-5 h-5 text-yellow-400" /> : <MoonIcon className="w-5 h-5 text-stone-500" />}
          </button>
          {isAdmin
            ? <button onClick={handleLogout} className="hidden md:block btn-secondary text-sm py-1.5 px-4">Logout</button>
            : <Link to="/admin/login" className="hidden md:block btn-primary text-sm py-1.5 px-4">Admin</Link>
          }
          <button className="md:hidden p-2" onClick={() => setOpen((o) => !o)}>
            {open ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 px-4 py-3 flex flex-col gap-3">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink key={to} to={to} onClick={() => setOpen(false)}
              className="text-sm font-medium text-stone-700 dark:text-stone-200 hover:text-heritage-500">
              {label}
            </NavLink>
          ))}
          {isAdmin && <NavLink to="/admin" onClick={() => setOpen(false)} className="text-sm font-medium">Dashboard</NavLink>}
          {isAdmin
            ? <button onClick={() => { handleLogout(); setOpen(false); }} className="btn-secondary text-sm w-full">Logout</button>
            : <Link to="/admin/login" onClick={() => setOpen(false)} className="btn-primary text-sm text-center">Admin Login</Link>
          }
        </div>
      )}
    </nav>
  );
}
