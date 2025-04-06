import './styles/main.scss';
import { StyledEngineProvider } from '@mui/material';
import { MainLayout } from './layouts/MainLayout/MainLayout';
import { BrowserRouter } from 'react-router-dom';
import {MobxContext} from "./context";
import rootStore from "./stores/RootStore";

function App() {
  return (
    <>
      {/*понижаем приоритет дефолтных стилей MUI*/}
      <StyledEngineProvider injectFirst>
        <BrowserRouter>
            <MobxContext.Provider value={rootStore.stores}>
                <MainLayout />
            </MobxContext.Provider>
        </BrowserRouter>
      </StyledEngineProvider>
    </>
  );
}

export default App;
