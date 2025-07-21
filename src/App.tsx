import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MaterialRequests from './pages/MaterialRequests';
import MaterialDeliveries from './pages/MaterialDeliveries';
import PurchaseOrders from './pages/PurchaseOrders';
import Suppliers from './pages/Suppliers';
import Inventory from './pages/Inventory';
import ServiceManagement from './pages/ServiceManagement';
import Reports from './pages/Reports';
import { User } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);

  // Mock user for demo purposes
  const mockUser: User = {
    id: '1',
    name: 'Ahmet Yılmaz',
    email: 'ahmet@company.com',
    department: 'Üretim',
    role: 'manager',
    permissions: [
      'create_material_request',
      'approve_material_request',
      'create_delivery_form',
      'approve_delivery',
      'create_purchase_form',
      'approve_purchase',
      'add_inventory'
    ]
  };

  if (!user) {
    return <Login onLogin={() => setUser(mockUser)} />;
  }

  return (
    <Layout user={user} onLogout={() => setUser(null)}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/material-requests/*" element={<MaterialRequests />} />
        <Route path="/material-deliveries/*" element={<MaterialDeliveries />} />
        <Route path="/purchase-orders/*" element={<PurchaseOrders />} />
        <Route path="/suppliers/*" element={<Suppliers />} />
        <Route path="/inventory/*" element={<Inventory />} />
        <Route path="/service-management/*" element={<ServiceManagement />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </Layout>
  );
}

export default App;