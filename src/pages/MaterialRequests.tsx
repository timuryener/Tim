import { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import {
  PlusIcon,
  EyeIcon,
  CheckIcon,
  XMarkIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';

// Mock data
const mockRequests = [
  {
    id: 'MTF-001',
    requesterId: '1',
    requesterName: 'Mehmet Demir',
    department: 'Üretim',
    status: 'pending',
    requestDate: '2024-01-15',
    items: [
      { materialId: '1', materialName: 'Çelik Boru 50mm', quantity: 10, unit: 'adet' },
      { materialId: '2', materialName: 'Kaynak Elektrodu', quantity: 5, unit: 'kg' }
    ],
    notes: 'Acil üretim için gerekli'
  },
  {
    id: 'MTF-002',
    requesterId: '2',
    requesterName: 'Ayşe Yılmaz',
    department: 'Kalite',
    status: 'approved',
    requestDate: '2024-01-15',
    approvedBy: 'Ahmet Yılmaz',
    approvedDate: '2024-01-15',
    items: [
      { materialId: '3', materialName: 'Test Kiti', quantity: 2, unit: 'adet' }
    ]
  }
];

const mockMaterials = [
  { id: '1', name: 'Çelik Boru 50mm', unit: 'adet', currentStock: 45 },
  { id: '2', name: 'Kaynak Elektrodu', unit: 'kg', currentStock: 120 },
  { id: '3', name: 'Test Kiti', unit: 'adet', currentStock: 8 },
  { id: '4', name: 'Rulman 6203', unit: 'adet', currentStock: 25 },
  { id: '5', name: 'Hidrolik Yağ', unit: 'litre', currentStock: 80 }
];

function MaterialRequestsList() {
  const [requests, setRequests] = useState(mockRequests);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  const filteredRequests = requests.filter(request => 
    filter === 'all' || request.status === filter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
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
      case 'rejected':
        return 'Reddedildi';
      case 'completed':
        return 'Tamamlandı';
      default:
        return status;
    }
  };

  const handleApprove = (id: string) => {
    setRequests(requests.map(req => 
      req.id === id 
        ? { ...req, status: 'approved' as const, approvedBy: 'Ahmet Yılmaz', approvedDate: new Date().toISOString().split('T')[0] }
        : req
    ) as any);
  };

  const handleReject = (id: string) => {
    setRequests(requests.map(req => 
      req.id === id 
        ? { ...req, status: 'rejected' as const, approvedBy: 'Ahmet Yılmaz', approvedDate: new Date().toISOString().split('T')[0] }
        : req
    ) as any);
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Malzeme Talepleri</h1>
          <p className="mt-2 text-gray-600">
            Malzeme talep formlarını görüntüleyin ve yönetin
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            to="/material-requests/new"
            className="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500"
          >
            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
            Yeni Talep
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
          <option value="all">Tüm Talepler</option>
          <option value="pending">Bekleyenler</option>
          <option value="approved">Onaylananlar</option>
          <option value="rejected">Reddedilenler</option>
          <option value="completed">Tamamlananlar</option>
        </select>
      </div>

      {/* Requests Table */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Talep No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Talep Eden
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Departman
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ürün Sayısı
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Durum
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tarih
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRequests.map((request) => (
              <tr key={request.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {request.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {request.requesterName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {request.department}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {request.items.length}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(request.status)}`}>
                    {getStatusText(request.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {request.requestDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button
                    onClick={() => navigate(`/material-requests/${request.id}`)}
                    className="text-primary-600 hover:text-primary-900"
                  >
                    <EyeIcon className="h-4 w-4" />
                  </button>
                  {request.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleApprove(request.id)}
                        className="text-green-600 hover:text-green-900"
                      >
                        <CheckIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleReject(request.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                    </>
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

function NewMaterialRequest() {
  const [formData, setFormData] = useState({
    department: 'Üretim',
    items: [{ materialId: '', quantity: 1, notes: '' }],
    notes: ''
  });
  const navigate = useNavigate();

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { materialId: '', quantity: 1, notes: '' }]
    });
  };

  const removeItem = (index: number) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index)
    });
  };

  const updateItem = (index: number, field: string, value: any) => {
    const updatedItems = formData.items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setFormData({ ...formData, items: updatedItems });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally send the data to your backend
    console.log('Form submitted:', formData);
    navigate('/material-requests');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Yeni Malzeme Talebi</h1>
        <p className="mt-2 text-gray-600">
          Malzeme talep formu oluşturun
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Genel Bilgiler</h3>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Departman
              </label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                <option>Üretim</option>
                <option>Kalite</option>
                <option>Bakım</option>
                <option>Ar-Ge</option>
                <option>Satış</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700">
              Açıklama
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              placeholder="Talep açıklaması (opsiyonel)"
            />
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Talep Edilen Malzemeler</h3>
            <button
              type="button"
              onClick={addItem}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200"
            >
              <PlusIcon className="h-4 w-4 mr-1" />
              Malzeme Ekle
            </button>
          </div>

          <div className="space-y-4">
            {formData.items.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-12 items-end">
                  <div className="sm:col-span-5">
                    <label className="block text-sm font-medium text-gray-700">
                      Malzeme
                    </label>
                    <select
                      value={item.materialId}
                      onChange={(e) => updateItem(index, 'materialId', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      required
                    >
                      <option value="">Malzeme Seçin</option>
                      {mockMaterials.map((material) => (
                        <option key={material.id} value={material.id}>
                          {material.name} (Stok: {material.currentStock} {material.unit})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Miktar
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      required
                    />
                  </div>

                  <div className="sm:col-span-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Not
                    </label>
                    <input
                      type="text"
                      value={item.notes}
                      onChange={(e) => updateItem(index, 'notes', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      placeholder="Opsiyonel not"
                    />
                  </div>

                  <div className="sm:col-span-1">
                    {formData.items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="inline-flex items-center p-2 border border-transparent rounded-md text-red-600 hover:bg-red-50"
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/material-requests')}
            className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            İptal
          </button>
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700"
          >
            Talep Gönder
          </button>
        </div>
      </form>
    </div>
  );
}

export default function MaterialRequests() {
  return (
    <Routes>
      <Route index element={<MaterialRequestsList />} />
      <Route path="new" element={<NewMaterialRequest />} />
    </Routes>
  );
}