<script lang="ts">
    import { defineComponent, type PropType } from 'vue'
    import type { Product } from '@/models/Product'

    export default defineComponent({
        name: 'ProductCard',
        props: {
            product: {
                type: Object as PropType<Product>,
                required: true
            }
        },
        emits: ['add-to-cart'],
        methods: {
            handleAdd() {
            this.$emit('add-to-cart', this.product)
            }
        }
    });
</script>

<template>
    <article class="product-card">
        <header class="product-card__header">
            <h2>{{ product.name }}</h2>
            <p>Categoria: {{ product.category.title }}</p>
        </header>

        <div class="product-card__body">
            <p>Preço: <strong>${{ product.price.toFixed(2) }}</strong></p>
        </div>

        <footer class="product-card__footer">
            <button @click="handleAdd">Adicionar</button>
        </footer>
    </article>
</template>

<style>

</style>