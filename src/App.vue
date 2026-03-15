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
            onQuantityChange(productId: number, newQty: number) {
                const item = this.cart.items.find(i => i.product.id === productId)
                if (!item) return

                const diff = newQty - item.quantity
                if (diff > 0) {
                    for (let i = 0; i < diff; i++) this.cart.addItem(item.product)
                } else {
                    for (let i = 0; i < Math.abs(diff); i++) this.cart.removeUnit(productId)
                }
            },
            removeItem(productId: number) {
                this.cart.removeItem(productId)
            },
        },
    })
</script>

<template>
    <main class="min-h-screen bg-surface-50 p-6">
        <div class="grid grid-cols-12 gap-6 items-start">
            <section class="col-span-12 lg:col-span-8">
                <h1 class="text-3xl font-bold text-surface-800 mb-6">Produtos</h1>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ProductCard
                        v-for="product in products"
                        :key="product.id"
                        :product="product"
                        @add-to-cart="addToCart"
                    />
                </div>
            </section>

            <section class="col-span-12 lg:col-span-4 sticky top-6">
                <h2 class="text-2xl font-bold text-surface-800 mb-4">Carrinho</h2>

                <DataView :value="cart.items" data-key="product.id">
                    <template #list="{ items }">
                        <div class="flex flex-col gap-3">
                            <div
                                v-for="item in items"
                                :key="item.product.id"
                                class="flex flex-col bg-white rounded-xl shadow p-4 gap-3"
                            >
                                <div class="flex items-center justify-between gap-2">
                                    <div class="flex items-center gap-2 min-w-0">
                                        <div class="bg-surface-100 rounded-lg p-2 shrink-0">
                                            <i class="pi pi-box text-lg text-primary" />
                                        </div>
                                        <div class="min-w-0">
                                            <p class="font-semibold text-surface-800 truncate">{{ item.product.name }}</p>
                                            <p class="text-xs text-surface-500">{{ item.product.category.title }}</p>
                                        </div>
                                    </div>
                                    <Button
                                        icon="pi pi-trash"
                                        severity="danger"
                                        text
                                        rounded
                                        @click="removeItem(item.product.id)"
                                        v-tooltip="'Remover item'"
                                        class="shrink-0"
                                    />
                                </div>

                                <div class="flex items-center justify-between gap-2">
                                    <p class="text-primary font-bold text-sm">
                                        R$ {{ (item.product.price * item.quantity).toFixed(2) }}
                                    </p>
                                    <InputNumber
                                        :modelValue="item.quantity"
                                        @update:modelValue="(val) => onQuantityChange(item.product.id, val ?? 1)"
                                        showButtons
                                        buttonLayout="horizontal"
                                        :min="1"
                                        :max="99"
                                        decrementButtonIcon="pi pi-minus"
                                        incrementButtonIcon="pi pi-plus"
                                    />
                                </div>
                            </div>
                        </div>
                    </template>
                </DataView>

                <div
                    v-if="cart.items.length > 0"
                    class="mt-4 bg-white rounded-xl shadow p-4 flex justify-between items-center"
                >
                    <p class="text-surface-600 text-sm">
                        Total de itens: <span class="font-bold text-surface-800">{{ cart.totalUnits }}</span>
                    </p>
                    <p class="text-lg font-bold text-primary">
                        R$ {{ cart.totalPrice.toFixed(2) }}
                    </p>
                </div>
            </section>

        </div>
    </main>
</template>

<style></style>