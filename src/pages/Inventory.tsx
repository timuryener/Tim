import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import {
  PlusIcon,
  EyeIcon,
  ExclamationTriangleIcon,
  ArchiveBoxIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';

const mockInventory = [
  {
    id: '1',
    name: 'Çelik Boru 50mm',
    description: '50mm çaplı çelik boru, 6 metre uzunluk',
    category: 'raw_material',
    unit: 'adet',
    currentStock: 45,
    criticalLevel: 20,
    unitPrice: 150,
    suppliers: ['Demir Çelik A.Ş.'],
    lastUpdated: '2024-01-15'
  },
  {
    id: '2',
    name: 'Kaynak Elektrodu',
    description: 'E7018 tip kaynak elektrodu, 3.2mm',
    category: 'raw_material',
    unit: 'kg',
    currentStock: 120,
    criticalLevel: 50,
    unitPrice: 85,
    suppliers: ['Demir Çelik A.Ş.'],
    lastUpdated: '2024-01-14'
  },
  {
    id: '3',
    name: 'Rulman 6203',
    description: 'SKF marka 6203 tip rulman',
    category: 'technical',
    unit: 'adet',
    currentStock: 8,
    criticalLevel: 15,
    unitPrice: 120,
    suppliers: ['Teknik Malzeme Ltd.'],
    lastUpdated: '2024-01-16'
  },
  {
    id: '4',
    name: 'Test Kiti',
    description: 'Kalite kontrol test kiti',
    category: 'equipment',
    unit: 'adet',
    currentStock: 5,
    criticalLevel: 10,
    unitPrice: 250,
    suppliers: ['Teknik Malzeme Ltd.'],
    lastUpdated: '2024-01-13'
  },
  {
    id: '5',
    name: 'Hidrolik Yağ',
    description: 'ISO VG 46 hidrolik yağ',
    category: 'raw_material',
    unit: 'litre',
    currentStock: 180,
    criticalLevel: 100,
    unitPrice: 45,
    suppliers: ['Endüstri Kimya'],
    lastUpdated: '2024-01-12'
  }
];

function InventoryList() {
  const [inventory] = useState(mockInventory);
  const [filter, setFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredInventory = inventory.filter(item => {
    const stockFilter = filter === 'all' || 
      (filter === 'critical' && item.currentStock <= item.criticalLevel) ||
      (filter === 'normal' && item.currentStock > item.criticalLevel);
    
    const catFilter = categoryFilter === 'all' || item.category === categoryFilter;
    
    return stockFilter && catFilter;
  });

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'technical':
        return 'Teknik Malzeme';
      case 'equipment':
        return 'Ekipman';
      case 'raw_material':
        return 'Hammadde';
      case 'packaging':
        return 'Ambalaj';
      default:
        return category;
    }
  };

  const getStockStatus = (currentStock: number, criticalLevel: number) => {
    if (currentStock <= criticalLevel) {
      return { color: 'text-red-600', icon: ExclamationTriangleIcon };
    }
    return { color: 'text-green-600', icon: ArchiveBoxIcon };
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Envanter Yönetimi</h1>
          <p className="mt-2 text-gray-600">
            Malzeme envanterini görüntüleyin ve yönetin
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            to="/inventory/new"
            className="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500"
          >
            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
            Yeni Malzeme
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <FunnelIcon className="h-5 w-5 text-gray-400" />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-md border-gray-300 text-sm focus:border-primary-500 focus:ring-primary-500"
        >
          <option value="all">Tüm Stoklar</option>
          <option value="critical">Kritik Seviye</option>
          <option value="normal">Normal Seviye</option>
        </select>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-md border-gray-300 text-sm focus:border-primary-500 focus:ring-primary-500"
        >
          <option value="all">Tüm Kategoriler</option>
          <option value="technical">Teknik Malzeme</option>
          <option value="equipment">Ekipman</option>
          <option value="raw_material">Hammadde</option>
          <option value="packaging">Ambalaj</option>
        </select>
      </div>

      {/* Inventory Table */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Malzeme
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kategori
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mevcut Stok
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kritik Seviye
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Birim Fiyat
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tedarikçiler
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredInventory.map((item) => {
              const stockStatus = getStockStatus(item.currentStock, item.criticalLevel);
              return (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        <stockStatus.icon className={`h-8 w-8 ${stockStatus.color}`} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {item.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getCategoryText(item.category)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {item.currentStock} {item.unit}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className={`h-2 rounded-full ${
                          item.currentStock <= item.criticalLevel
                            ? 'bg-red-500'
                            : 'bg-green-500'
                        }`}
                        style={{
                          width: `${Math.min(100, (item.currentStock / (item.criticalLevel * 2)) * 100)}%`
                        }}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.criticalLevel} {item.unit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₺{item.unitPrice}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.suppliers.join(', ')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-primary-600 hover:text-primary-900">
                      <EyeIcon className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Critical Stock Alert */}
      {inventory.filter(item => item.currentStock <= item.criticalLevel).length > 0 && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Kritik Stok Uyarısı
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>
                  {inventory.filter(item => item.currentStock <= item.criticalLevel).length} malzeme kritik stok seviyesinde veya altında.
                  Satın alma işlemi başlatılması önerilir.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Inventory() {
  return (
    <Routes>
      <Route index element={<InventoryList />} />
    </Routes>
  );
}