import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import {
  TruckIcon,
  CheckCircleIcon,
  StarIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

const mockDeliveries = [
  {
    id: 'MTT-001',
    requestId: 'MTF-001',
    requester: 'Mehmet Demir',
    department: 'Üretim',
    status: 'prepared',
    deliveryDate: '2024-01-16',
    items: [
      { materialName: 'Çelik Boru 50mm', requestedQuantity: 10, deliveredQuantity: 10 },
      { materialName: 'Kaynak Elektrodu', requestedQuantity: 5, deliveredQuantity: 5 }
    ]
  },
  {
    id: 'MTT-002',
    requestId: 'MTF-002',
    requester: 'Ayşe Yılmaz',
    department: 'Kalite',
    status: 'delivered',
    deliveryDate: '2024-01-15',
    receivedDate: '2024-01-16',
    items: [
      { materialName: 'Test Kiti', requestedQuantity: 2, deliveredQuantity: 2 }
    ]
  }
];

function MaterialDeliveriesList() {
  const [deliveries, setDeliveries] = useState(mockDeliveries);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'prepared':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'received':
        return 'bg-purple-100 text-purple-800';
      case 'rated':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'prepared':
        return 'Hazırlandı';
      case 'delivered':
        return 'Teslim Edildi';
      case 'received':
        return 'Teslim Alındı';
      case 'rated':
        return 'Puanlandı';
      default:
        return status;
    }
  };

  const handleReceive = (id: string) => {
    setDeliveries(deliveries.map(delivery => 
      delivery.id === id 
        ? { ...delivery, status: 'received', receivedDate: new Date().toISOString().split('T')[0] }
        : delivery
    ));
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Malzeme Teslimatları</h1>
          <p className="mt-2 text-gray-600">
            Malzeme teslim işlemlerini görüntüleyin ve yönetin
          </p>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Teslim No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Talep No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Teslim Alan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Departman
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Durum
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Teslim Tarihi
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {deliveries.map((delivery) => (
              <tr key={delivery.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {delivery.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {delivery.requestId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {delivery.requester}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {delivery.department}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(delivery.status)}`}>
                    {getStatusText(delivery.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {delivery.deliveryDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button className="text-primary-600 hover:text-primary-900">
                    <EyeIcon className="h-4 w-4" />
                  </button>
                  {delivery.status === 'delivered' && (
                    <button
                      onClick={() => handleReceive(delivery.id)}
                      className="text-green-600 hover:text-green-900"
                      title="Teslim Aldım"
                    >
                      <CheckCircleIcon className="h-4 w-4" />
                    </button>
                  )}
                  {delivery.status === 'received' && (
                    <button className="text-yellow-600 hover:text-yellow-900" title="Puanla">
                      <StarIcon className="h-4 w-4" />
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

export default function MaterialDeliveries() {
  return (
    <Routes>
      <Route index element={<MaterialDeliveriesList />} />
    </Routes>
  );
}