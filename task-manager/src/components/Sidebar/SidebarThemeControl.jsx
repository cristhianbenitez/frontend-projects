import PropTypes from 'prop-types';

SidebarThemeControl.propTypes = {
  theme: PropTypes.string,
  handleTheme: PropTypes.func,
  isOpen: PropTypes.bool
};

export function SidebarThemeControl({ theme, handleTheme, isOpen }) {
  if (isOpen) {
    return (
      <div
        className="p-1 w-full flex justify-between gap-1 text-body-m  bg-lightBlue dark:bg-darkLight rounded-lg"
        onClick={handleTheme}
      >
        <button
          className={`flex items-center pl-7 gap-2 text-center w-1/2 py-2 rounded-lg font-medium ${
            theme === 'dark' && 'bg-dark'
          }`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15 4C15.292 4 15.438 4 15.578 4.042C16.192 4.225 16.478 4.93 16.164 5.49C16.092 5.617 15.874 5.828 15.439 6.249C13.935 7.704 13 9.743 13 12c0 2.257 .935 4.297 2.439 5.751c.435.421.653.632.725.76c.314.559.028 1.265-.586 1.448C15.438 20 15.292 20 15 20C10.582 20 7 16.418 7 12S10.582 4 15 4"
              fill="currentColor"
            />
          </svg>
          Dark
        </button>
        <button
          className={`flex items-center pl-7 gap-2 text-center w-1/2 py-2 rounded-lg font-medium ${
            theme === 'light' && 'bg-white'
          }`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="4" fill="currentColor" />
            <path
              d="M12 5V3M12 21V19M16.9498 7.04996L18.364 5.63574M5.63608 18.3644L7.05029 16.9502M19 12H21M3 12H5M16.9498 16.95L18.364 18.3643M5.63608 5.63559L7.05029 7.0498"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          Light
        </button>
      </div>
    );
  }
  return (
    <button className="flex flex-col w-full justify-center items-center p-2 ">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15 4C15.292 4 15.438 4 15.578 4.042C16.192 4.225 16.478 4.93 16.164 5.49C16.092 5.617 15.874 5.828 15.439 6.249C13.935 7.704 13 9.743 13 12c0 2.257 .935 4.297 2.439 5.751c.435.421.653.632.725.76c.314.559.028 1.265-.586 1.448C15.438 20 15.292 20 15 20C10.582 20 7 16.418 7 12S10.582 4 15 4"
          fill="currentColor"
        />
      </svg>
    </button>
  );
}
