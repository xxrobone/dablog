import { useTheme } from '@hooks/useTheme';
import { VscColorMode } from 'react-icons/vsc';

// styles

import styles from './ThemeSelector.module.scss';

export default function ThemeSelector() {
  const { changeTheme, theme } = useTheme();

  const toggleMode = () => {
    changeTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={styles.theme_selector}>
      <div className={styles.theme_toggle}>
        <VscColorMode
          onClick={toggleMode}
          className={styles.toggle_icon}
          alt='dark/light toggle icon'
        />
          </div>
          <p>{theme}</p>
    </div>
  );
}
