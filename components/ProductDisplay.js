app.component('product-display', {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },
  template:
    /*html*/
    `<div class="product-display">
    <div class="product-container">
      <div class="product-image">
        <img
          :src="image.src"
          :class="[!inStock && classes.outOfStockImg]"
          :alt="image.alt"
        />
      </div>
      <div class="product-info">
        <h1>{{ title }}</h1>
        <p v-if="inStock">In stock</p>
        <p v-else>Out of stock</p>
        <p>Shipping: {{ shipping }}</p>
        <ul>
          <li v-for="detail in details">{{detail}}</li>
        </ul>
        <div
          class="color-circle"
          v-for="(variant, index) in variants"
          :key="variant.id"
          :style="{ backgroundColor: variant.color }"
          @mouseover="updateVariant(index)"
        ></div>
        <p>Available sizes:</p>
        <div v-for="size in availableSizes" key="size.id">
          {{size.code}}
        </div>
        <button
          class="button"
          :class="{ disabledButton: !inStock }"
          :disabled="!inStock"
          @click="addToCart"
        >
          Add to cart
        </button>
        <button
          class="button"
          @click="removeFromCart"
        >
          Remove from cart
        </button>
      </div>
    </div>
    <review-list v-if="reviews.length" :reviews="reviews"></review-list>
    <review-form @review-submitted="addReview"></review-form>
  </div>`,
  data() {
    return {
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
      reviews: [],
      classes: {
        outOfStockImg: 'outOfStockImg',
      },
    };
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].id);
    },
    removeFromCart() {
      this.$emit('remove-from-cart', this.variants[this.selectedVariant].id);
    },
    updateVariant(index) {
      this.selectedVariant = index;
    },
    addReview: function (review) {
      this.reviews.push(review);
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
    shipping: function () {
      if (this.premium) {
        return 'Free';
      }
      return 2.99;
    },
  },
});
