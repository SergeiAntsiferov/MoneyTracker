import { useEffect } from 'react';
import AppRouter from './router/AppRouter';
import { catchHandler } from './utils/error_handling/error_handling';
import { sendData } from './utils/functions/basic';
import { createAction } from './redux/store';
import Header from './components/Header';
import { changeCssProperty } from './utils/functions/others';
import './App.scss';
import './pages/pages.scss';
import './components/components.scss';
import './components/UI/ui.scss';

function App() {
  const defaultStyles = {
    '--font_color': 'initial',
    '--primary_color': '#624DE3',
    '--secondary_color_1': '#555555',
    '--secondary_color_2': '#f0eefe',
    '--background_color': '#ffffff',
  };

  useEffect(() => {
    changeCssProperty(defaultStyles);
  }, []);

  return (
    <div className="App" onClick={() => createAction('TOGGLE_SELECT', false)}>
      <Header />
      <AppRouter />
    </div>
  );
}

export default App;
