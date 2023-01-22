import React from 'react';
import ThemeToggle from '../../components/UI/ThemeToggle';
import Categories from './Categories/Categories';
import Setting from './Setting';

function Settings() {
  return (
    <div className="page settings">
      <div className="settings__block">
        <Setting title="Toggle colour scheme">
          <ThemeToggle />
        </Setting>
        {/* <Setting title="Categories" openable>
          <Categories />
        </Setting> */}
      </div>
    </div>
  );
}

export default Settings;
