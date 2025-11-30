'use client';

import { usePathname, useRouter } from 'next/navigation';
import type UserInterface from '@/types/UserInterface';
import { useAuth } from '@/hooks/useAuth';
import styles from './Profile.module.scss';
import Link from 'next/link';

interface Props {
  userFromServer?: UserInterface;
}

const Profile = ({
  userFromServer,
}: Props): React.ReactElement => {
  const router = useRouter();
  const pathname = usePathname();

  const { user } = useAuth();

  const getUser = (): UserInterface | null | undefined => user ?? userFromServer;

  const logoutHandler = async (e: React.MouseEvent<HTMLElement>): Promise<void> => {
    e.preventDefault();
    const { logout } = useAuth.getState();
    await logout();
    router.push('/login');
  };

  return (
    <div className={styles.Profile}>

      {getUser() && (
        <>
          {getUser()?.email}
          {'   '}
        </>
      )}

      {!getUser() && (
        <Link
          href="/login"
          className={pathname.includes('/login') ? styles.linkActive : ''}
        >
          Вход
        </Link>
      )}

      {getUser() && <Link href="/logout" onClick={logoutHandler}>Выход</Link>}
    </div>
  );
};
export default Profile;
