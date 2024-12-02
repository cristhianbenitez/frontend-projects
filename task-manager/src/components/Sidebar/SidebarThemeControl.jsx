import PropTypes from 'prop-types';

import MoonIcon from '@assets/icons/moon.svg';
import SunIcon from '@assets/icons/sun.svg';

SidebarThemeControl.propTypes = {
  theme: PropTypes.string,
  handleTheme: PropTypes.func,
  isOpen: PropTypes.bool
};

export function SidebarThemeControl({ theme, handleTheme, isOpen }) {
  if (isOpen) {
    return (
      <div
        className="p-1 w-full flex justify-between gap-1 text-white text-body-m bg-darkLight rounded-lg"
        onClick={handleTheme}
      >
        <button
          className={`flex items-center pl-7 gap-2 text-center w-1/2 py-2 rounded-lg ${
            theme === 'dark' ? 'bg-dark' : ''
          }`}
        >
          <img src={MoonIcon} alt="moon icon" />
          Dark
        </button>
        <button
          className={`flex items-center pl-7 gap-2 text-center w-1/2 py-2 rounded-lg ${
            theme === 'light' ? 'bg-dark' : ''
          }`}
        >
          <img src={SunIcon} alt="sun icon" />
          Light
        </button>
      </div>
    );
  }
  return (
    <button className="flex flex-col w-full justify-center items-center p-2">
      <img src={MoonIcon} alt="moon icon" className="w-6 h-6" />
    </button>
  );
}
