import { useAppDispatch } from './redux/hooks';
import React, { useEffect } from 'react';
import AppRouter from './router/AppRouter';
import Header from './components/Header';
import { setDefaultStyles } from './utils/functions/others';
import './App.scss';
import './pages/pages.scss';
import './components/components.scss';
import './components/UI/ui.scss';

function App() {

  const dispatch = useAppDispatch()

  useEffect(() => {
    setDefaultStyles();
  }, []);

  return (
    <div className="App" onClick={() => dispatch({type: 'TOGGLE_SELECT', payload: {}})}>
      <Header />
      <AppRouter />
    </div>
  );
}

export default App;
