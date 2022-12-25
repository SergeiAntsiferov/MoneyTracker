import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import AppRouter from './router/AppRouter';
import './App.scss';
import { catchHandler } from './utils/error_handling/error_handling';
import { sendData } from './utils/functions/basic';
import { createAction } from './redux/store';

function App() {
  useEffect(() => {
    getString();
  }, []);

  async function getString() {
    try {
      const result = await sendData('POST', '/');
      if (result) {
        createAction('SET_STATE', result);
      } else return;
    } catch (error) {
      catchHandler(error, 'getString');
    }
  }

  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
