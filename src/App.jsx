import { Navigate, Route, Routes } from 'react-router-dom';
import { Header } from './components';
import Home from 'pages/Home';
import Rates from 'pages/Rates';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchBaseCurrency } from 'reduxState/currency/operations';
import { setBaseCurrency } from 'reduxState/currency/currencySlice';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const success = ({ coords }) => {
      dispatch(fetchBaseCurrency(coords));
    }
    const error = () => {
      dispatch(setBaseCurrency('USD'));
    }
    navigator.geolocation.getCurrentPosition(
      success, error
    );

  }, [dispatch]);

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
