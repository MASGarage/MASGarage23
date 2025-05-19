const services = [
  { name: 'Service CVT', price: 45 },
  { name: 'Service Throttle Body', price: 65 },
  { name: 'Paket Mas 1 (CVT + TB)', price: 100 },
  { name: 'Upgrade CVT PCX/ADV/Vario/Nmax/Aerox', price: 1100 },
  { name: 'Upgrade CVT Scoopy/Beat/Genio/Fazzio', price: 1000 },
  { name: 'Pasang Noken As / Per Klep Matic', price: 200 },
  { name: 'Service Besar Area Mesin Matic', price: 350 },
  { name: 'Pasang Bore Up Matic', price: 350 },
  { name: 'Porting Polish 2 Klep', price: 550 },
  { name: 'Porting Polish 4 Klep', price: 700 },
  { name: 'Modifikasi Mesin Matic Racing', price: 1500 },
  { name: 'Service Lengkap Matic', price: 500 }
];

let selectedServices = [];

function displayServices() {
  const servicesList = document.getElementById('services-list');
  servicesList.innerHTML = '';

  services.forEach((service, index) => {
    const item = document.createElement('div');
    item.classList.add('service-item');
    item.innerHTML = `
      <span>${service.name} (${service.price}K)</span>
      <input type="checkbox" id="service-${index}" onclick="toggleService(${index}, '${service.name}', ${service.price})">
    `;
    servicesList.appendChild(item);
  });
}

function toggleService(index, name, price) {
  const checkbox = document.getElementById(`service-${index}`);
  if (checkbox.checked) {
    selectedServices.push({ name, price });
  } else {
    selectedServices = selectedServices.filter(s => !(s.name === name && s.price === price));
  }
}

function booking() {
  const nama = document.getElementById('nama').value;
  const tanggal = document.getElementById('tanggal').value;
  const waktu = document.getElementById('waktu').value;

  if (!nama || !tanggal || !waktu) {
    alert('Silakan lengkapi semua data booking!');
    return;
  }

  if (selectedServices.length === 0) {
    alert('Pilih layanan terlebih dahulu!');
    return;
  }

  document.getElementById('konfNama').innerText = nama;
  document.getElementById('konfTanggal').innerText = tanggal;
  document.getElementById('konfWaktu').innerText = waktu;

  const layananContainer = document.getElementById('konfLayanan');
  layananContainer.innerHTML = '';
  let total = 0;

  selectedServices.forEach(service => {
    const div = document.createElement('div');
    div.textContent = `${service.name} - ${service.price}K`;
    layananContainer.appendChild(div);
    total += service.price;
  });

  document.getElementById('totalBayar').innerText = `Total Bayar: ${total}K`;

  document.getElementById('konfirmasi').style.display = 'block';
}

function reset() {
  document.getElementById('nama').value = '';
  document.getElementById('tanggal').value = '';
  document.getElementById('waktu').value = '';
  selectedServices = [];
  document.getElementById('konfirmasi').style.display = 'none';
  document.querySelectorAll('#services-list input').forEach(cb => cb.checked = false);
}

function kirimWhatsApp() {
  const nama = document.getElementById('nama').value;
  const tanggal = document.getElementById('tanggal').value;
  const waktu = document.getElementById('waktu').value;

  let pesan = `Halo MAS GARAGE,%0ASaya ingin booking servis dengan detail berikut:%0A`;
  pesan += `Nama: ${nama}%0A`;
  pesan += `Tanggal: ${tanggal}%0A`;
  pesan += `Waktu: ${waktu}%0A`;
  pesan += `Layanan:%0A`;

  let total = 0;
  selectedServices.forEach(service => {
    pesan += `- ${service.name} (${service.price}K)%0A`;
    total += service.price;
  });

  pesan += `Total Bayar: ${total}K%0A%0ATerima kasih.`;

  const noWa = '6281286252723'; // Ganti dengan nomor WhatsApp tujuan
  const url = `https://wa.me/${noWa}?text=${pesan}`;
  window.open(url, '_blank');
}

window.onload = displayServices;
