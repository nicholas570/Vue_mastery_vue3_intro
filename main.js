const app = Vue.createApp({
  data() {
    return {
      cart: 0,
      brand: 'The Ultimate',
      product: 'Christmas Socks',
      selectedVariant: 0,
      details: ['50% cotton', '30% wool', '20% polyester'],
      variants: [
        {
          id: 2234,
          color: 'green',
          image: { src: './assets/images/socks_green.jpg', alt: 'socks' },
          quantity: 25,
          sizes: [
            { id: 1232, code: 'x', available: true },
            { id: 432, code: 's', available: true },
            { id: 9732, code: 'm', available: true },
            { id: 1175, code: 'xl', available: true },
          ],
        },
        {
          id: 2235,
          color: 'blue',
          image: { src: './assets/images/socks_blue.jpg', alt: 'socks' },
          quantity: 0,
          sizes: [
            { id: 1232, code: 'x', available: true },
            { id: 432, code: 's', available: true },
            { id: 9732, code: 'm', available: true },
            { id: 1175, code: 'xl', available: false },
          ],
        },
      ],
      classes: {
        outOfStockImg: 'outOfStockImg',
      },
    };
  },
  methods: {
    addToCart() {
      this.cart += 1;
      this.inventory -= 1;
      if (this.inventory === 0) {
        this.inStock = false;
      }
    },
    updateVariant(index) {
      this.selectedVariant = index;
    },
  },
  computed: {
    availableSizes: function () {
      return this.variants[this.selectedVariant].sizes.filter(
        (size) => size.available
      );
    },
    title: function () {
      return `${this.brand} ${this.product}`;
    },
    image: function () {
      return this.variants[this.selectedVariant].image;
    },
    inStock: function () {
      return this.variants[this.selectedVariant].quantity;
    },
  },
});
