# 🛋️ Mobilya Tasarım Sistemi

Modern web teknolojilerini kullanarak 2D ve 3D mobilya tasarımı yapabileceğiniz kapsamlı bir platform.

## ✨ Özellikler

- **2D Tasarım**: Canvas tabanlı 2D mobilya yerleştirme
- **3D Modelleme**: Three.js ile gerçekçi 3D görünüm
- **Mobilya Kataloğu**: 8 farklı mobilya türü (kanepe, sandalye, masa, yatak, vs.)
- **Renk Seçimi**: 12 hazır renk + özel renk picker
- **Sürükle-Bırak**: Kataloğdan mobilyaları sürükleyerek tuvale ekleyin
- **Ölçü Hesaplama**: Otomatik alan ve hacim hesaplaması
- **Parça Kombinasyonu**: Birden fazla mobilyayı bir arada tasarlayın
- **Dışa Aktarma**: Tasarımları JSON formatında indirin
- **Canlı Özellikleri**: Seçili mobilyaların tüm özelliklerini görün

## 🚀 Hızlı Başlangıç

### Kurulum

```bash
# Repository'yi klonlayın
git clone https://github.com/ahmetkorayustundag-lang/mobilya.git
cd mobilya

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```

Tarayıcı otomatik olarak http://localhost:5173 adresini açacaktır.

## 🎮 Kullanım

### 2D Tasarım Modunda
- **Mobilya Ekle**: Katalogdan mobilya seçin veya sürükleyin
- **Hareket Ettir**: Mobilyayı tıklayıp sürükleyin
- **Ok Tuşları**: Seçili mobilyayı ok tuşlarıyla hareket ettirin
- **Shift + Ok**: Daha hızlı hareket ettirin
- **Delete**: Seçili mobilyayı silin

### 3D Modelleme Modunda
- **Tıkla**: Mobilyayı seçmek için tıklayın
- **Otomatik Renderizasyon**: Mobilyalar real-time olarak 3D'de gösterilir
- **Renk Senkronizasyonu**: 2D'de renk değiştirince 3D'de otomatik güncellenir

## 📦 Teknoloji Stack

- **React 18**: Modern UI bileşenleri
- **Vite**: Hızlı geliştirme ortamı
- **Three.js**: 3D grafikleri için
- **Zustand**: State management
- **Canvas API**: 2D grafikleri için
- **CSS3**: Responsive dizayn

## 📋 Mobilya Kataloğu

- 🛋️ Klasik Kanepe (200×90×85cm)
- 🪑 Sandalye (60×60×85cm)
- 📦 Kahvaltı Masası (100×60×45cm)
- 🛏️ Çift Kişilik Yatak (160×200×100cm)
- 📚 Kitaplık (120×30×200cm)
- 🚪 Gardırop (100×60×200cm)
- 📫 Gece Komodinası (50×40×60cm)
- 💼 Çalışma Masası (120×60×75cm)

## 📤 Veri Dışa Aktarması

Tasarımınız JSON formatında kaydedilir ve indirilir.

## 🚀 Derleme

```bash
npm run build
```

---

**Ahmet Koray Üstündag**