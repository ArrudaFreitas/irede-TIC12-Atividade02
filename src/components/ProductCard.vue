<script lang="ts">
    import { defineComponent, type PropType } from 'vue'
    import type { Product } from '@/models/Product'
    import Card from 'primevue/card'
    import Button from 'primevue/button'

    export default defineComponent({
        name: 'ProductCard',
        components: {
            Card,
            Button,
        },
        props: {
            product: {
                type: Object as PropType<Product>,
                required: true,
            },
        },
        emits: ['add-to-cart'],
        methods: {
            handleAdd() {
                this.$emit('add-to-cart', this.product)
            },
        },
    })
</script>

<template>
    <Card class="h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
        <template #header>
            <div class="bg-surface-100 rounded-t-lg flex items-center justify-center p-6">
                <i class="pi pi-box text-5xl text-primary" />
            </div>
        </template>

        <template #title>
            {{ product.name }}
        </template>

        <template #subtitle>
            <span class="flex items-center gap-1">
                <i class="pi pi-tag text-xs" />
                {{ product.category.title }}
            </span>
        </template>

        <template #content>
            <p class="text-2xl font-bold text-primary">
                R$ {{ product.price.toFixed(2) }}
            </p>
        </template>

        <template #footer>
            <Button label="Adicionar ao Carrinho" icon="pi pi-cart-plus" class="w-full" @click="handleAdd" />
        </template>
    </Card>
</template>

<style></style>