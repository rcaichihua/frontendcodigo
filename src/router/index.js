import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginView, CollectView } from '../pages';
import { MainLayoutt } from '../layouts';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginView />} />
        <Route element={<MainLayoutt />}>
          <Route path="/collect" element={<CollectView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
