import { Navigate, Route, Routes } from 'react-router-dom';
import { Header } from './components';
import Home from 'pages/Home';
import Rates from 'pages/Rates';
import { useEffect } from 'react';
import { getUserInfo } from 'service/opencagedataApi';

export const App = () => {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) =>
      getUserInfo(coords),
    );
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Home />} />
        <Route path="/rates" element={<Rates />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};
