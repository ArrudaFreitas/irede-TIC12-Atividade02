<script lang="ts">
    import { defineComponent } from 'vue'
    import type { Product } from '@/models/Product'
    import { Cart } from '@/models/Cart'
    import ProductCard from '@/components/ProductCard.vue'

    export default defineComponent({
        name: 'App',
        components: {
            ProductCard,
        },
        data() {
            return {
                products: [
                    { id: 1, name: 'Notebook', price: 3500, category: { id: 1, title: 'Eletrônicos' } },
                    { id: 2, name: 'Mouse', price: 150, category: { id: 1, title: 'Eletrônicos' } },
                    { id: 3, name: 'Teclado', price: 280, category: { id: 1, title: 'Eletrônicos' } },
                ] as Product[],
                cart: new Cart(),
            }
        },
        methods: {
            addToCart(product: Product) {
                this.cart.addItem(product)
            },
            removeUnit(productId: number) {
                this.cart.removeUnit(productId)
            },
            removeItem(productId: number) {
                this.cart.removeItem(productId)
            },
        },
    })
</script>

<template>
    <main class="min-h-screen bg-surface-50 p-6">

        <section class="mb-10">
            <h1 class="text-3xl font-bold text-surface-800 mb-6">Produtos</h1>
            <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <ProductCard v-for="product in products" :key="product.id" :product="product"
                    @add-to-cart="addToCart" />
            </div>
        </section>

        <section class="cart">
            <h2 class="cart__title">Carrinho</h2>
            <ul class="cart__list">
                <li class="cart__item" v-for="item in cart.items" :key="item.product.id">
                    <span class="cart__item-name">{{ item.product.name }}</span>
                    <span class="cart__item-quantity">x {{ item.quantity }}</span>
                    <button class="cart__item-btn cart__item-btn--decrease"
                        @click="removeUnit(item.product.id)">-</button>
                    <button class="cart__item-btn cart__item-btn--remove"
                        @click="removeItem(item.product.id)">🗑</button>
                </li>
            </ul>
            <footer class="cart__footer">
                <p class="cart__total-units">Total de itens: {{ cart.totalUnits }}</p>
                <p class="cart__total-price">Preço final: R$ {{ cart.totalPrice.toFixed(2) }}</p>
            </footer>
        </section>

    </main>
</template>

<style></style>