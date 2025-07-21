import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import {
  PlusIcon,
  EyeIcon,
  StarIcon
} from '@heroicons/react/24/outline';

const mockSuppliers = [
  {
    id: '1',
    name: 'Demir Çelik A.Ş.',
    email: 'info@demircelik.com',
    phone: '+90 212 123 4567',
    address: 'Organize Sanayi Bölgesi, İstanbul',
    status: 'approved',
    rating: 85,
    evaluationCount: 12,
    materials: ['Çelik Boru', 'Metal İşleme', 'Kaynak Malzemeleri']
  },
  {
    id: '2',
    name: 'Teknik Malzeme Ltd.',
    email: 'satış@teknikmalzeme.com',
    phone: '+90 232 345 6789',
    address: 'Atatürk OSB, İzmir',
    status: 'approved',
    rating: 92,
    evaluationCount: 8,
    materials: ['Rulman', 'Test Ekipmanları', 'Ölçüm Aletleri']
  },
  {
    id: '3',
    name: 'Endüstri Kimya',
    email: 'contact@endustrikikimya.com',
    phone: '+90 312 567 8901',
    address: 'Siteler Sanayi, Ankara',
    status: 'pending',
    rating: 0,
    evaluationCount: 0,
    materials: ['Kimyasal Maddeler', 'Temizlik Ürünleri']
  }
];

function SuppliersList() {
  const [suppliers] = useState(mockSuppliers);
  const [filter, setFilter] = useState('all');

  const filteredSuppliers = suppliers.filter(supplier => 
    filter === 'all' || supplier.status === filter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'blocked':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Onaylı';
      case 'pending':
        return 'Beklemede';
      case 'blocked':
        return 'Bloklu';
      default:
        return status;
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 90) return 'text-green-600';
    if (rating >= 80) return 'text-yellow-600';
    if (rating >= 70) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tedarikçiler</h1>
          <p className="mt-2 text-gray-600">
            Tedarikçi bilgilerini görüntüleyin ve yönetin
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            to="/suppliers/new"
            className="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500"
          >
            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
            Yeni Tedarikçi
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-md border-gray-300 text-sm focus:border-primary-500 focus:ring-primary-500"
        >
          <option value="all">Tüm Tedarikçiler</option>
          <option value="approved">Onaylı</option>
          <option value="pending">Beklemede</option>
          <option value="blocked">Bloklu</option>
        </select>
      </div>

      {/* Suppliers Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredSuppliers.map((supplier) => (
          <div key={supplier.id} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                      <span className="text-primary-600 font-medium text-sm">
                        {supplier.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {supplier.name}
                    </h3>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(supplier.status)}`}>
                      {getStatusText(supplier.status)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="text-sm text-gray-500 space-y-1">
                  <p>{supplier.email}</p>
                  <p>{supplier.phone}</p>
                  <p>{supplier.address}</p>
                </div>
              </div>

              {supplier.status === 'approved' && (
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <StarIcon className="h-4 w-4 text-yellow-400" />
                    <span className={`ml-1 text-sm font-medium ${getRatingColor(supplier.rating)}`}>
                      {supplier.rating}/100
                    </span>
                    <span className="ml-2 text-sm text-gray-500">
                      ({supplier.evaluationCount} değerlendirme)
                    </span>
                  </div>
                </div>
              )}

              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Malzemeler</h4>
                <div className="flex flex-wrap gap-1">
                  {supplier.materials.slice(0, 2).map((material, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {material}
                    </span>
                  ))}
                  {supplier.materials.length > 2 && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      +{supplier.materials.length - 2} daha
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-6 flex justify-between">
                <button className="text-primary-600 hover:text-primary-900 text-sm font-medium">
                  <EyeIcon className="h-4 w-4 inline mr-1" />
                  Detaylar
                </button>
                <button className="text-yellow-600 hover:text-yellow-900 text-sm font-medium">
                  <StarIcon className="h-4 w-4 inline mr-1" />
                  Değerlendir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Suppliers() {
  return (
    <Routes>
      <Route index element={<SuppliersList />} />
    </Routes>
  );
}