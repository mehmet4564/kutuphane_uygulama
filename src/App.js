import React, { useState, useEffect } from "react"

const kitapVeri = [
  { id: 1, baslik: "JavaScript Başlangıç Rehberi", yazar: "Ahmet Yılmaz", kategori: "Programlama" },
  { id: 2, baslik: "React ile Modern Web", yazar: "Elif Demir", kategori: "Programlama" },
  { id: 3, baslik: "Tarih Atlası", yazar: "Mehmet Kaya", kategori: "Tarih" },
  { id: 4, baslik: "Psikoloji 101", yazar: "Ayşe Çelik", kategori: "Psikoloji" },
  { id: 5, baslik: "Felsefe Notları", yazar: "Caner Aksoy", kategori: "Felsefe" },
  { id: 6, baslik: "Bilim Dünyası", yazar: "Deniz Arslan", kategori: "Bilim" }
]

function App() {
  const [arama, setArama] = useState(() => localStorage.getItem("arama") || "")
  const [seciliKategori, setSeciliKategori] = useState("Hepsi")
  const [favoriKitaplar, setFavoriKitaplar] = useState(() => {
    const kayit = localStorage.getItem("favoriler")
    return kayit ? JSON.parse(kayit) : []
  })

  useEffect(() => {
    localStorage.setItem("arama", arama)
  }, [arama])

  useEffect(() => {
    localStorage.setItem("favoriler", JSON.stringify(favoriKitaplar))
  }, [favoriKitaplar])

  const favoriToggle = (kitapId) => {
    setFavoriKitaplar(prev =>
      prev.includes(kitapId) ? prev.filter(k => k !== kitapId) : [...prev, kitapId]
    )
  }

  const filtreliKitaplar = kitapVeri.filter(k => {
    const baslikKontrol = k.baslik.toLowerCase().includes(arama.toLowerCase())
    const kategoriKontrol = seciliKategori === "Hepsi" || k.kategori === seciliKategori
    return baslikKontrol && kategoriKontrol
  })

  return (
    <div style={{ padding: 20, fontFamily: "Verdana, sans-serif", backgroundColor: "#f0f4f8", minHeight: "100vh" }}>
      <header style={{ textAlign: "center", marginBottom: 25 }}>
        <h1 style={{ color: "#3e2c50ff", letterSpacing: 2 }}>Kütüphane</h1>
      </header>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 25 }}>
        <input
          type="text"
          placeholder="Ara..."
          value={arama}
          onChange={e => setArama(e.target.value)}
          style={{
            flex: 1,
            padding: 8,
            borderRadius: 6,
            border: "1px solid #ccc",
            marginRight: 15
          }}
        />
        <select
          value={seciliKategori}
          onChange={e => setSeciliKategori(e.target.value)}
          style={{ padding: 8, borderRadius: 6, border: "1px solid #ccc" }}
        >
          {["Hepsi", "Programlama", "Tarih", "Psikoloji", "Felsefe", "Bilim"].map((k, i) => (
            <option key={i} value={k}>{k}</option>
          ))}
        </select>
      </div>

      <section style={{ display: "flex", marginBottom: 30 }}>
        <div style={{
          flex: 1,
          backgroundColor: "#fff",
          borderRadius: 8,
          padding: 15,
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          marginRight: 20
        }}>
          <h2 style={{ marginBottom: 10 }}>Favoriler ({favoriKitaplar.length})</h2>
          <ul>
            {kitapVeri.filter(k => favoriKitaplar.includes(k.id)).map(k => (
              <li key={k.id}>{k.baslik}</li>
            ))}
          </ul>
        </div>

        <div style={{ flex: 2, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 15 }}>
          {filtreliKitaplar.map(k => (
            <div
              key={k.id}
              style={{
                backgroundColor: "#fff",
                borderRadius: 8,
                padding: 12,
                boxShadow: "0 1px 4px rgba(0,0,0,0.1)"
              }}
            >
              <h3 style={{ marginBottom: 6, color: "#34495e" }}>{k.baslik}</h3>
              <p style={{ fontSize: 14, color: "#7f8c8d", marginBottom: 10 }}>{k.yazar} - {k.kategori}</p>
              <button
                onClick={() => favoriToggle(k.id)}
                style={{
                  width: "100%",
                  padding: "6px 0",
                  border: "none",
                  borderRadius: 4,
                  backgroundColor: favoriKitaplar.includes(k.id) ? "#e74c3c" : "#3498db",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                {favoriKitaplar.includes(k.id) ? "Favoriden Çıkar" : "Favori Ekle"}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default App


