import { useState } from 'react';
import {
  ChartBarIcon,
  DocumentArrowDownIcon,
  CalendarIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';

const reportTypes = [
  {
    id: 'most_consumed_products',
    name: 'En Çok Tüketilen Ürünler',
    description: 'Belirli dönemde en çok tüketilen malzemelerin listesi',
    icon: ChartBarIcon,
    color: 'bg-blue-500'
  },
  {
    id: 'most_requesting_department',
    name: 'En Çok Talepte Bulunan Departman',
    description: 'Malzeme taleplerinde en aktif departmanlar',
    icon: ChartBarIcon,
    color: 'bg-green-500'
  },
  {
    id: 'least_requesting_department',
    name: 'En Az Talepte Bulunan Departman',
    description: 'Malzeme taleplerinde en az aktif departmanlar',
    icon: ChartBarIcon,
    color: 'bg-yellow-500'
  },
  {
    id: 'least_consumed_products',
    name: 'En Az Tüketilen Ürünler',
    description: 'Belirli dönemde en az tüketilen malzemelerin listesi',
    icon: ChartBarIcon,
    color: 'bg-red-500'
  },
  {
    id: 'least_ordered_products',
    name: 'En Az Sipariş Verilen Ürünler',
    description: 'Satın alma siparişlerinde en az yer alan malzemeler',
    icon: ChartBarIcon,
    color: 'bg-purple-500'
  },
  {
    id: 'price_change_rate',
    name: 'Fiyat Değişiklik Oranı',
    description: 'Malzeme fiyatlarındaki değişim oranları',
    icon: ChartBarIcon,
    color: 'bg-indigo-500'
  }
];

const mockReportData = {
  most_consumed_products: [
    { name: 'Çelik Boru 50mm', quantity: 150, unit: 'adet' },
    { name: 'Kaynak Elektrodu', quantity: 45, unit: 'kg' },
    { name: 'Hidrolik Yağ', quantity: 120, unit: 'litre' },
    { name: 'Rulman 6203', quantity: 25, unit: 'adet' },
    { name: 'Test Kiti', quantity: 8, unit: 'adet' }
  ],
  most_requesting_department: [
    { department: 'Üretim', requests: 45 },
    { department: 'Bakım', requests: 32 },
    { department: 'Kalite', requests: 18 },
    { department: 'Ar-Ge', requests: 12 },
    { department: 'Satış', requests: 5 }
  ]
};

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState({
    from: '2024-01-01',
    to: '2024-01-31'
  });

  const generateReport = (reportId: string) => {
    setSelectedReport(reportId);
    // Here you would normally fetch data from your backend
    console.log(`Generating report: ${reportId} for period: ${dateFilter.from} to ${dateFilter.to}`);
  };

  const exportReport = (format: 'pdf' | 'excel') => {
    console.log(`Exporting report as ${format}`);
    // Here you would implement the export functionality
  };

  const getReportComponent = () => {
    if (!selectedReport) return null;

    switch (selectedReport) {
      case 'most_consumed_products':
        return (
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">En Çok Tüketilen Ürünler</h3>
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Malzeme
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tüketim Miktarı
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Birim
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockReportData.most_consumed_products.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.unit}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'most_requesting_department':
        return (
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">En Çok Talepte Bulunan Departmanlar</h3>
            <div className="space-y-4">
              {mockReportData.most_requesting_department.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{item.department}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full"
                        style={{ width: `${(item.requests / 45) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500">{item.requests} talep</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-white shadow rounded-lg p-6">
            <div className="text-center">
              <ChartBarIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Rapor Oluşturuluyor</h3>
              <p className="mt-1 text-sm text-gray-500">
                Seçilen rapor için veriler işleniyor...
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Raporlar</h1>
        <p className="mt-2 text-gray-600">
          Sistem verilerini analiz edin ve raporlar oluşturun
        </p>
      </div>

      {/* Date Filter */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Rapor Filtreleri</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Başlangıç Tarihi
            </label>
            <div className="mt-1 relative">
              <input
                type="date"
                value={dateFilter.from}
                onChange={(e) => setDateFilter({ ...dateFilter, from: e.target.value })}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
              <CalendarIcon className="absolute right-3 top-2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bitiş Tarihi
            </label>
            <div className="mt-1 relative">
              <input
                type="date"
                value={dateFilter.to}
                onChange={(e) => setDateFilter({ ...dateFilter, to: e.target.value })}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
              <CalendarIcon className="absolute right-3 top-2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Report Types */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">Rapor Türleri</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reportTypes.map((report) => (
            <div
              key={report.id}
              className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => generateReport(report.id)}
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`p-3 rounded-md ${report.color}`}>
                      <report.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">
                      {report.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {report.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Generated Report */}
      {selectedReport && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Rapor Sonuçları</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => exportReport('pdf')}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <DocumentArrowDownIcon className="h-4 w-4 mr-1" />
                PDF
              </button>
              <button
                onClick={() => exportReport('excel')}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <DocumentArrowDownIcon className="h-4 w-4 mr-1" />
                Excel
              </button>
            </div>
          </div>
          {getReportComponent()}
        </div>
      )}
    </div>
  );
}