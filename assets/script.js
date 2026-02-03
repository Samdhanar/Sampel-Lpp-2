const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            entry.target.classList.remove('active');
        }
    });
}, { threshold: 0.15 });

reveals.forEach(el => observer.observe(el));

// ===== MODAL LOGIC =====
const modal = document.getElementById('buyModal');
const modalTitle = document.getElementById('modalTitle');
const modalPrice = document.getElementById('modalPrice');
const modalImage = document.getElementById('modalImage');
const quantityInput = document.getElementById('quantity');
const totalPrice = document.getElementById('totalPrice');

document.querySelectorAll('.buy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const card = btn.closest('.card');
        const name = card.dataset.name;
        const price = parseInt(card.dataset.price);
        const imgSrc = card.querySelector('img').src;

        modalTitle.textContent = name;
        modalPrice.textContent = 'Rp ' + price.toLocaleString();
        modalImage.src = imgSrc;
        quantityInput.value = 1;
        totalPrice.textContent = 'Rp ' + price.toLocaleString();

        quantityInput.oninput = () => {
            totalPrice.textContent = 'Rp ' + (price * quantityInput.value).toLocaleString();
        };

        modal.style.display = 'flex';
    });
});

function closeModal() {
    modal.style.display = 'none';
}

// === TAMBAHAN INI ===
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Floating WhatsApp
const waButton = document.getElementById('waButton');
const waPopup = document.getElementById('waPopup');

if (waButton && waPopup) {
    waButton.addEventListener('mouseenter', () => {
        waPopup.style.display = 'block';
    });

    waButton.addEventListener('mouseleave', () => {
        waPopup.style.display = 'none';
    });
}

function toggleMenu() {
    document.getElementById("navMenu").classList.toggle("active");
}

let selectedProduct = "";
let selectedPrice = 0;

document.querySelectorAll('.buy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const card = btn.closest('.card');
        selectedProduct = card.dataset.name;
        selectedPrice = parseInt(card.dataset.price);
        const imgSrc = card.querySelector('img').src;

        modalTitle.textContent = selectedProduct;
        modalPrice.textContent = 'Rp ' + selectedPrice.toLocaleString();
        modalImage.src = imgSrc;

        quantityInput.value = 1;
        totalPrice.textContent = 'Rp ' + selectedPrice.toLocaleString();

        quantityInput.oninput = () => {
            totalPrice.textContent =
                'Rp ' + (selectedPrice * quantityInput.value).toLocaleString();
        };

        modal.style.display = 'flex';
    });
});

function sendToWhatsApp() {
    const qty = quantityInput.value;
    const total = selectedPrice * qty;

    const phoneNumber = "6283823204843"; // nomor admin
    const message = `
                Pembelian ${selectedProduct}
                Jumlah: ${qty} buah
                Total harga: Rp ${total.toLocaleString()}
        `;

    const whatsappURL =
        `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank");
}