import { useEffect } from 'react';
import AppRouter from './router/AppRouter';
import { catchHandler } from './utils/error_handling/error_handling';
import { sendData } from './utils/functions/basic';
import { createAction } from './redux/store';
import Header from './components/Header';
import './App.scss';
import './pages/pages.scss';
import './components/components.scss';
import { changeCssProperty } from './utils/functions/others';

function App() {
  useEffect(() => {
    getTheme();
  }, []);

  // get current color theme
  async function getTheme() {
    try {
      const result = await sendData('GET', '/get_theme');
      if (result) {
        createAction('SET_CURRENT_THEME', result);
        changeCssProperty(result?.styles);
      } else return;
    } catch (error) {
      catchHandler(error, 'getTheme');
    }
  }

  return (
    <div className="App">
      <Header />
      <AppRouter />
    </div>
  );
}

export default App;
