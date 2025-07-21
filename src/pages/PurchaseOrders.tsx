import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import {
  PlusIcon,
  EyeIcon,
  CheckCircleIcon,
  TruckIcon
} from '@heroicons/react/24/outline';

const mockOrders = [
  {
    id: 'SIP-001',
    supplierId: '1',
    supplierName: 'Demir Çelik A.Ş.',
    totalAmount: 15000,
    orderDate: '2024-01-10',
    expectedDelivery: '2024-01-20',
    status: 'confirmed',
    items: [
      { materialName: 'Çelik Boru 50mm', quantity: 100, unitPrice: 150 }
    ]
  },
  {
    id: 'SIP-002',
    supplierId: '2',
    supplierName: 'Teknik Malzeme Ltd.',
    totalAmount: 8500,
    orderDate: '2024-01-12',
    expectedDelivery: '2024-01-22',
    status: 'sent',
    items: [
      { materialName: 'Rulman 6203', quantity: 50, unitPrice: 120 },
      { materialName: 'Test Kiti', quantity: 10, unitPrice: 250 }
    ]
  }
];

function PurchaseOrdersList() {
  const [orders, setOrders] = useState(mockOrders);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'sent':
        return 'bg-blue-100 text-blue-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'partial':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-purple-100 text-purple-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'draft':
        return 'Taslak';
      case 'sent':
        return 'Gönderildi';
      case 'confirmed':
        return 'Onaylandı';
      case 'partial':
        return 'Kısmi Teslim';
      case 'completed':
        return 'Tamamlandı';
      case 'cancelled':
        return 'İptal Edildi';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Satın Alma Siparişleri</h1>
          <p className="mt-2 text-gray-600">
            Satın alma siparişlerini görüntüleyin ve yönetin
          </p>
        </div>
        <div className="mt-4 sm:mt-0 space-x-2">
          <Link
            to="/purchase-orders/receipt"
            className="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500"
          >
            <TruckIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
            Mal Kabul
          </Link>
          <Link
            to="/purchase-orders/new"
            className="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500"
          >
            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
            Yeni Sipariş
          </Link>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sipariş No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tedarikçi
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Toplam Tutar
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sipariş Tarihi
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Teslim Tarihi
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Durum
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.supplierName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ₺{order.totalAmount.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.orderDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.expectedDelivery}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button className="text-primary-600 hover:text-primary-900">
                    <EyeIcon className="h-4 w-4" />
                  </button>
                  {(order.status === 'confirmed' || order.status === 'partial') && (
                    <button className="text-green-600 hover:text-green-900" title="Mal Kabul">
                      <TruckIcon className="h-4 w-4" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function PurchaseOrders() {
  return (
    <Routes>
      <Route index element={<PurchaseOrdersList />} />
    </Routes>
  );
}