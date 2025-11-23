'use client';

import { useRouter } from 'next/navigation';
import styles from './BackButton.module.scss';

interface Props {
  href?: string;
  text?: string;
}

const BackButton = ({ href, text = '<< список студентов' }: Props): React.ReactElement => {
  const router = useRouter();

  const handleClick = (): void => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <button className={styles.BackButton} onClick={handleClick}>
      {text}
    </button>
  );
};

export default BackButton;

