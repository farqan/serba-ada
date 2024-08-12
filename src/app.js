document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "gunting", img: "1.jpg", price: 13500 },
      { id: 2, name: "pisau", img: "2.jpg", price: 25000 },
      { id: 3, name: "piring", img: "3.jpg", price: 22500 },
      { id: 4, name: "sendok", img: "4.jpg", price: 5000 },
      { id: 5, name: "garpu", img: "5.jpg", price: 3500 },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // cek barang di cart
      const carItem = this.items.find((item) => item.id === newItem.id);
      // jika belum ada
      if (!carItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // jika barang sudah ada, cek apakah barang sama atau beda dgn yg ad di cart
        this.items = this.items.map((item) => {
          // jika barang berbeda
          if (item.id !== newItem.id) {
            return item;
          } else {
            // jika barang sudah ada, tambah quuantity dan sub total
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(id) {
      // ambil item yg ingin di remove berdasarkan id
      const carItem = this.items.find((item) => item.id === id);

      // jika item lebih dari 1
      if (carItem.quantity > 1) {
        // telusuri satu"
        this.items = this.items.map((item) => {
          // jika id tidak sama skip
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (carItem.quantity === 1) {
        // jika barang sisa 1
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -=carItem.price;
      }
    },
  });
});

// konversi ke rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
