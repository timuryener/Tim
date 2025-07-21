import { Link } from 'react-router-dom';
import {
  DocumentTextIcon,
  TruckIcon,
  ShoppingCartIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  BuildingStorefrontIcon,
  ArchiveBoxIcon
} from '@heroicons/react/24/outline';

const stats = [
  {
    name: 'Bekleyen Talepler',
    value: '12',
    change: '+2',
    changeType: 'increase',
    icon: DocumentTextIcon,
    color: 'bg-blue-500',
    href: '/material-requests'
  },
  {
    name: 'Onay Bekleyen',
    value: '5',
    change: '-1',
    changeType: 'decrease',
    icon: ClockIcon,
    color: 'bg-yellow-500',
    href: '/material-requests'
  },
  {
    name: 'Aktif Siparişler',
    value: '8',
    change: '+3',
    changeType: 'increase',
    icon: ShoppingCartIcon,
    color: 'bg-green-500',
    href: '/purchase-orders'
  },
  {
    name: 'Kritik Stok',
    value: '15',
    change: '+4',
    changeType: 'increase',
    icon: ExclamationTriangleIcon,
    color: 'bg-red-500',
    href: '/inventory'
  }
];

const recentRequests = [
  {
    id: 'MTF-001',
    requester: 'Mehmet Demir',
    department: 'Üretim',
    status: 'pending',
    date: '2024-01-15',
    items: 3
  },
  {
    id: 'MTF-002',
    requester: 'Ayşe Yılmaz',
    department: 'Kalite',
    status: 'approved',
    date: '2024-01-15',
    items: 2
  },
  {
    id: 'MTF-003',
    requester: 'Can Özkan',
    department: 'Bakım',
    status: 'delivered',
    date: '2024-01-14',
    items: 5
  }
];

const criticalStockItems = [
  {
    name: 'Çelik Boru 50mm',
    currentStock: 5,
    criticalLevel: 20,
    unit: 'adet',
    category: 'Hammadde'
  },
  {
    name: 'Rulman 6203',
    currentStock: 2,
    criticalLevel: 10,
    unit: 'adet',
    category: 'Yedek Parça'
  },
  {
    name: 'Hidrolik Yağ',
    currentStock: 15,
    criticalLevel: 50,
    unit: 'litre',
    category: 'Kimyasal'
  }
];

const quickActions = [
  {
    name: 'Yeni Malzeme Talebi',
    description: 'Malzeme talep formu oluştur',
    href: '/material-requests/new',
    icon: DocumentTextIcon,
    color: 'bg-blue-600'
  },
  {
    name: 'Mal Kabul',
    description: 'Gelen malzemeleri sisteme kaydet',
    href: '/purchase-orders/receipt',
    icon: TruckIcon,
    color: 'bg-green-600'
  },
  {
    name: 'Tedarikçi Ekle',
    description: 'Yeni tedarikçi bilgilerini ekle',
    href: '/suppliers/new',
    icon: BuildingStorefrontIcon,
    color: 'bg-purple-600'
  },
  {
    name: 'Envanter Ekle',
    description: 'Yeni malzeme envantere ekle',
    href: '/inventory/new',
    icon: ArchiveBoxIcon,
    color: 'bg-indigo-600'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'approved':
      return 'bg-green-100 text-green-800';
    case 'delivered':
      return 'bg-blue-100 text-blue-800';
    case 'rejected':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'pending':
      return 'Bekliyor';
    case 'approved':
      return 'Onaylandı';
    case 'delivered':
      return 'Teslim Edildi';
    case 'rejected':
      return 'Reddedildi';
    default:
      return status;
  }
};

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Ana Sayfa</h1>
        <p className="mt-2 text-gray-600">
          Sistem durumu ve son aktivitelerin özeti
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.name}
            to={stat.href}
            className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`p-3 rounded-md ${stat.color}`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </div>
                      <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                        stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">Hızlı İşlemler</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => (
            <Link
              key={action.name}
              to={action.href}
              className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                <div className={`inline-flex p-3 rounded-lg ${action.color}`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-900">
                    {action.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {action.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Recent Requests */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Son Talepler</h2>
            <Link
              to="/material-requests"
              className="text-sm text-primary-600 hover:text-primary-500"
            >
              Tümünü Gör
            </Link>
          </div>
          <div className="bg-white shadow rounded-lg">
            <ul className="divide-y divide-gray-200">
              {recentRequests.map((request) => (
                <li key={request.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {request.id}
                        </p>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(request.status)}`}>
                          {getStatusText(request.status)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {request.requester} - {request.department}
                      </p>
                      <p className="text-xs text-gray-400">
                        {request.items} ürün - {request.date}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Critical Stock */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Kritik Stok Durumu</h2>
            <Link
              to="/inventory"
              className="text-sm text-primary-600 hover:text-primary-500"
            >
              Envantere Git
            </Link>
          </div>
          <div className="bg-white shadow rounded-lg">
            <ul className="divide-y divide-gray-200">
              {criticalStockItems.map((item, index) => (
                <li key={index} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.category}
                      </p>
                      <div className="mt-2 flex items-center">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              (item.currentStock / item.criticalLevel) < 0.5
                                ? 'bg-red-500'
                                : 'bg-yellow-500'
                            }`}
                            style={{
                              width: `${Math.min(100, (item.currentStock / item.criticalLevel) * 100)}%`
                            }}
                          />
                        </div>
                        <span className="ml-3 text-sm text-gray-500">
                          {item.currentStock} / {item.criticalLevel} {item.unit}
                        </span>
                      </div>
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