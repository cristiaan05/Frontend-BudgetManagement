import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import AddBankAccount from './components/AddBankAccount';
import LoginRegister from './components/LoginRegister';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import ProtectorRoute from './components/Auth/ProtectorRoute';
import Transactions from './components/Transactions';
import AddTransaction from './components/AddTransaction';


function App() {
  const location = useLocation();
  const isSpecialPage = location.pathname === '/';
  return (
    <>
      {!isSpecialPage && <Navbar />}
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/dashboard/*" element={
          <ProtectorRoute>
            <Dashboard />
          </ProtectorRoute>
        } />
        <Route path="/transactions/*" element={
          <ProtectorRoute>
            <Transactions />
          </ProtectorRoute>
        } />
        <Route path="/dashboard/addBankAccount" element={<AddBankAccount />} />
        <Route path="/transactions/AddTransactions" element={<AddTransaction />} />
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    </>

  );
}

export default App;
