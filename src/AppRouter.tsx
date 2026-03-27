import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SalesDashboard from './Module/sales_dashboard';
import SalesAllLeads from './Module/sales_all_leads';
import SalesDeals from './Module/sales_deals';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SalesDashboard />} />
        <Route path="/leads" element={<SalesAllLeads />} />
        <Route path="/deals" element={<SalesDeals />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
