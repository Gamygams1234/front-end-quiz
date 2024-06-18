import React, { useState } from "react";

export default function Header(props) {
  const { darkMode, changeTheme, subject } = props;
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="header mb-5">
      <div className="logo">
        {subject && (
          <div className="main-selection fw-500  text-dark-navy">
            <img className={subject.title.toLowerCase() + "-icon icon"} src={subject.icon} alt={subject.title} />
            <div>{subject.title}</div>
          </div>
        )}
      </div>

      <div className="dark-toggle">
      {darkMode ? <img src="./images/icon-sun-light.svg" /> : <img src="./images/icon-sun-dark.svg" alt="" />}

        <label className="toggle">

          <input type="checkbox" checked={darkMode} onChange={changeTheme} />
          <span className="slider"></span>
        </label>

        {darkMode ? <img src="./images/icon-moon-light.svg" /> : <img src="./images/icon-moon-dark.svg" alt="" />}
      </div>
    </div>
  );
}
