# ERP Sistemi - Malzeme Yönetimi

Bu proje, kapsamlı bir Kurumsal Kaynak Planlama (ERP) sistemidir. Malzeme talep ve teslim süreçleri, satın alma ve tedarikçi yönetimi, envanter yönetimi ve servis/bakım işlemlerini kapsar.

## 🚀 Özellikler

### Malzeme Talep ve Teslim Süreci
- ✅ Malzeme talep formu oluşturma ve yönetimi
- ✅ Onay iş akışları
- ✅ Otomatik stok kontrolü ve rezervasyon
- ✅ Malzeme teslim yönetimi
- ✅ Bildirim sistemi ve teslim onayları
- ✅ Puanlama sistemi

### Satın Alma ve Tedarikçi Yönetimi
- ✅ Kritik stok seviyesi uyarıları
- ✅ Fiyat teklif talep sistemi
- ✅ Tedarikçi değerlendirme sistemi
- ✅ Otomatik sipariş oluşturma
- ✅ Tedarikçi performans takibi

### Sipariş, Mal Kabul ve Depolama
- ✅ Sipariş takip sistemi
- ✅ Mal kabul işlemleri
- ✅ Stok yönetimi
- ✅ İade işlemleri
- ✅ Depo transferleri

### Envanter Yönetimi ve Raporlama
- ✅ Kapsamlı envanter listesi
- ✅ Kritik stok seviyesi takibi
- ✅ Kategoriye göre filtreleme
- ✅ Detaylı raporlama sistemi
- ✅ İstatistiksel analizler

### Servis ve Bakım Yönetimi
- ✅ Ekipman servis kayıtları
- ✅ Periyodik bakım planlaması
- ✅ Servis talebi oluşturma
- ✅ Bakım uyarı sistemi

## 🛠️ Teknolojiler

- **Frontend:** React 18 + TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Heroicons
- **Routing:** React Router v6
- **Form Management:** React Hook Form
- **Build Tool:** Vite
- **Date Utilities:** date-fns

## 📦 Kurulum

### Gereksinimler
- Node.js 18+ 
- npm veya yarn

### Adımlar

1. **Bağımlılıkları yükleyin:**
```bash
npm install
```

2. **Geliştirme sunucusunu başlatın:**
```bash
npm run dev
```

3. **Tarayıcınızda açın:**
```
http://localhost:3000
```

## 🔐 Giriş Bilgileri

Demo için aşağıdaki bilgileri kullanabilirsiniz:

- **E-posta:** ahmet@company.com
- **Şifre:** 123456

## 📱 Kullanım

### Ana Sayfa
- Sistem durumu özeti
- Hızlı işlem linkleri
- Son talepler ve kritik stok durumu

### Malzeme Talepleri
- Yeni talep oluşturma
- Mevcut talepleri görüntüleme
- Onay/Red işlemleri
- Durum filtreleme

### Tedarikçiler
- Tedarikçi listesi
- Performans değerlendirmeleri
- Yeni tedarikçi ekleme
- Durum filtreleme

### Envanter
- Malzeme listesi
- Stok durumu görüntüleme
- Kritik stok uyarıları
- Kategori filtreleme

### Raporlar
- Çeşitli analiz raporları
- PDF/Excel export
- Tarih filtreleme

## 🏗️ Proje Yapısı

```
src/
├── components/          # Yeniden kullanılabilir bileşenler
│   └── Layout.tsx      # Ana layout bileşeni
├── pages/              # Sayfa bileşenleri
│   ├── Dashboard.tsx
│   ├── MaterialRequests.tsx
│   ├── MaterialDeliveries.tsx
│   ├── PurchaseOrders.tsx
│   ├── Suppliers.tsx
│   ├── Inventory.tsx
│   ├── ServiceManagement.tsx
│   ├── Reports.tsx
│   └── Login.tsx
├── types/              # TypeScript tip tanımları
│   └── index.ts
├── App.tsx             # Ana uygulama bileşeni
├── main.tsx           # Giriş noktası
└── index.css          # Global stiller
```

## 🎨 UI/UX Özellikleri

- **Responsive Tasarım:** Mobil, tablet ve masaüstü uyumlu
- **Modern Interface:** Tailwind CSS ile temiz ve profesyonel tasarım
- **Kolay Navigasyon:** Sidebar navigasyon menüsü
- **Durum Göstergeleri:** Renkli badge'ler ve durumlar
- **Filtreleme:** Gelişmiş filtreleme seçenekleri
- **Uyarı Sistemi:** Kritik durumlar için görsel uyarılar

## 🔧 Geliştirme

### Build
```bash
npm run build
```

### Lint
```bash
npm run lint
```

### Preview
```bash
npm run preview
```

## 📋 Yetki Sistemi

Sistem aşağıdaki izin türlerini destekler:

- `create_material_request` - Malzeme talebi oluşturma
- `approve_material_request` - Malzeme talebi onaylama
- `create_delivery_form` - Teslim formu oluşturma
- `approve_delivery` - Teslimat onaylama
- `create_purchase_form` - Satın alma formu oluşturma
- `approve_purchase` - Satın alma onaylama
- `evaluate_supplier` - Tedarikçi değerlendirme
- `add_supplier` - Tedarikçi ekleme
- `receive_goods` - Mal kabul
- `add_inventory` - Envanter ekleme
- Ve daha fazlası...

## 🎯 Gelecek Özellikler

- [ ] Gerçek zamanlı bildirimler
- [ ] Mobil uygulama
- [ ] Barkod/QR kod desteği
- [ ] Gelişmiş analitik dashboard
- [ ] E-posta entegrasyonu
- [ ] API entegrasyonu
- [ ] Çoklu dil desteği

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

Sorularınız için lütfen GitHub Issues kullanın.

---

**Not:** Bu bir demo uygulamasıdır. Gerçek ortamda kullanım için uygun güvenlik önlemleri alınmalı ve backend entegrasyonu yapılmalıdır.