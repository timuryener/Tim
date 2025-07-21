import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import {
  PlusIcon,
  EyeIcon,
  WrenchScrewdriverIcon,
  ClockIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const mockServiceRecords = [
  {
    id: '1',
    equipmentId: 'EQ-001',
    equipmentName: 'CNC Torna Tezgahı',
    serviceType: 'maintenance',
    nextServiceDate: '2024-01-25',
    lastServiceDate: '2023-12-25',
    interval: 30,
    status: 'due'
  },
  {
    id: '2',
    equipmentId: 'EQ-002',
    equipmentName: 'Hidrolik Pres',
    serviceType: 'inspection',
    nextServiceDate: '2024-02-01',
    lastServiceDate: '2024-01-01',
    interval: 31,
    status: 'active'
  },
  {
    id: '3',
    equipmentId: 'EQ-003',
    equipmentName: 'Kaynak Makinası',
    serviceType: 'maintenance',
    nextServiceDate: '2024-01-20',
    lastServiceDate: '2023-12-20',
    interval: 31,
    status: 'overdue'
  }
];

const mockServiceRequests = [
  {
    id: 'SRV-001',
    equipmentId: 'EQ-001',
    equipmentName: 'CNC Torna Tezgahı',
    requestType: 'repair',
    description: 'Motor titreşimi var, kontrol edilmeli',
    priority: 'high',
    requestedBy: 'Mehmet Demir',
    requestDate: '2024-01-15',
    status: 'pending'
  },
  {
    id: 'SRV-002',
    equipmentId: 'EQ-002',
    equipmentName: 'Hidrolik Pres',
    requestType: 'maintenance',
    description: 'Periyodik bakım zamanı geldi',
    priority: 'medium',
    requestedBy: 'Ayşe Yılmaz',
    requestDate: '2024-01-14',
    status: 'approved',
    scheduledDate: '2024-01-18'
  }
];

function ServiceManagementDashboard() {
  const [serviceRecords] = useState(mockServiceRecords);
  const [serviceRequests] = useState(mockServiceRequests);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'due':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Aktif';
      case 'due':
        return 'Zamanı Geldi';
      case 'overdue':
        return 'Gecikmiş';
      case 'completed':
        return 'Tamamlandı';
      default:
        return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'Acil';
      case 'high':
        return 'Yüksek';
      case 'medium':
        return 'Orta';
      case 'low':
        return 'Düşük';
      default:
        return priority;
    }
  };

  const overdueCount = serviceRecords.filter(record => record.status === 'overdue').length;
  const dueCount = serviceRecords.filter(record => record.status === 'due').length;

  return (
    <div className="space-y-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Servis ve Bakım Yönetimi</h1>
          <p className="mt-2 text-gray-600">
            Ekipman servis ve bakım işlemlerini yönetin
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            to="/service-management/request/new"
            className="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500"
          >
            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
            Yeni Servis Talebi
          </Link>
        </div>
      </div>

      {/* Alerts */}
      {(overdueCount > 0 || dueCount > 0) && (
        <div className="space-y-4">
          {overdueCount > 0 && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Gecikmiş Bakım Uyarısı
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>
                      {overdueCount} ekipmanın bakım süresi geçmiş. Acil müdahale gerekiyor.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {dueCount > 0 && (
            <div className="rounded-md bg-yellow-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <ClockIcon className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Bakım Zamanı Geldi
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      {dueCount} ekipmanın bakım zamanı geldi. Planlama yapınız.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Service Records */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Servis Kayıtları</h2>
            <Link
              to="/service-management/records"
              className="text-sm text-primary-600 hover:text-primary-500"
            >
              Tümünü Gör
            </Link>
          </div>
          <div className="bg-white shadow rounded-lg">
            <ul className="divide-y divide-gray-200">
              {serviceRecords.map((record) => (
                <li key={record.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {record.equipmentName}
                        </p>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(record.status)}`}>
                          {getStatusText(record.status)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {record.serviceType === 'maintenance' ? 'Bakım' : 
                         record.serviceType === 'repair' ? 'Onarım' : 'Kontrol'}
                      </p>
                      <p className="text-xs text-gray-400">
                        Sonraki: {record.nextServiceDate} | Son: {record.lastServiceDate}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Service Requests */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Servis Talepleri</h2>
            <Link
              to="/service-management/requests"
              className="text-sm text-primary-600 hover:text-primary-500"
            >
              Tümünü Gör
            </Link>
          </div>
          <div className="bg-white shadow rounded-lg">
            <ul className="divide-y divide-gray-200">
              {serviceRequests.map((request) => (
                <li key={request.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {request.equipmentName}
                        </p>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(request.priority)}`}>
                          {getPriorityText(request.priority)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {request.description}
                      </p>
                      <p className="text-xs text-gray-400">
                        {request.requestedBy} - {request.requestDate}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServiceManagement() {
  return (
    <Routes>
      <Route index element={<ServiceManagementDashboard />} />
    </Routes>
  );
}