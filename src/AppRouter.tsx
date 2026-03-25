import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SalesDashboard from './Module/sales_dashboard';
import SalesAllLeads from './Module/sales_all_leads';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SalesDashboard />} />
        <Route path="/leads" element={<SalesAllLeads />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
