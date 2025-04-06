import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './styles/main.scss';
import { ButtonAtom } from '@atoms';
import { StyledEngineProvider } from '@mui/material';
import { MainLayout } from './layouts/MainLayout/MainLayout';
import { BrowserRouter } from 'react-router-dom';

function App(props) {
  return (
    <>
      {/*понижаем приоритет дефолтных стилей MUI*/}
      <StyledEngineProvider injectFirst>
        <BrowserRouter>
          <MainLayout {...props} />
        </BrowserRouter>

        {/*      <div>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">Click on the Vite and React logos to learn more</p>*/}
      </StyledEngineProvider>
    </>
  );
}

export default App;
