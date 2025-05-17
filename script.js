async function fetchData() {
  try {
    const response = await fetch('http://localhost:3000/produk');
    const data = await response.json();
    displayData(data);
  } catch (error) {
    console.error('Gagal mengambil data:', error);
  }
}

function displayData(produkList) {
  const tableBody = document.getElementById('produk-body');
  tableBody.innerHTML = '';

  produkList.forEach((produk, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${produk.kodeSampel}</td>
      <td>${produk.pH}</td>
      <td>${produk.warnaIndikator}</td>
      <td>${produk.jumlahMikroba.toExponential()}</td>
      <td>${produk.suhuPenyimpanan}°C</td>
      <td>${produk.kategoriKelayakan}</td>
      <td>Rp ${produk.harga.toLocaleString()}</td>
    `;
    tableBody.appendChild(row);
  });
}

document.addEventListener('DOMContentLoaded', fetchData);

document.getElementById('produk-form').addEventListener('submit', async function (e) {
  e.preventDefault();
  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());
  data.pH = parseFloat(data.pH);
  data.jumlahMikroba = parseFloat(data.jumlahMikroba);
  data.suhuPenyimpanan = parseFloat(data.suhuPenyimpanan);
  data.harga = parseInt(data.harga);

  try {
    const response = await fetch('http://localhost:3000/produk', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      alert('Data berhasil ditambahkan!');
      this.reset();
      fetchData();
    } else {
      const err = await response.json();
      alert('Gagal menambah data: ' + err.error);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Terjadi kesalahan saat mengirim data.');
  }
});
