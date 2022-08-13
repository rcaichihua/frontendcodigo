import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  LoginView,
  ScanQrView,
  ListPayView,
  ListPayRealTimeView,
  UsersView,
  ResponsePayView,
} from '../pages';
import { MainLayoutt } from '../layouts';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginView />} />
        <Route element={<MainLayoutt />}>
          <Route path="/ScanQr" element={<ScanQrView />} />
          <Route path="/listpay" element={<ListPayView />} />
          <Route
            path="/listpayrealtime"
            element={<ListPayRealTimeView />}
          />
          <Route path="/users" element={<UsersView />} />
          <Route path="/responsepay" element={<ResponsePayView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
