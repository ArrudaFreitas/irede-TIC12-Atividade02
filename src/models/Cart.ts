import type { Product } from './Product'

export interface CartItem {
    product: Product
    quantity: number
}

export class Cart {
    items: CartItem[] = []

    addItem(product: Product, quantity: number = 1): void {
        const existing = this.items.find(i => i.product.id === product.id)
        if (existing) {
            existing.quantity += quantity
        } else {
            this.items.push({ product, quantity })
        }
    }

    removeUnit(productId: number): void {
        const index = this.items.findIndex(i => i.product.id === productId)
        if (index === -1) return
        if (this.items[index].quantity > 1) {
            this.items[index].quantity--
        } else {
            this.items.splice(index, 1)
        }
    }

    removeItem(productId: number): void {
        const index = this.items.findIndex(i => i.product.id === productId)
        if (index !== -1) this.items.splice(index, 1) // ✅ sem reatribuição
    }

    get totalUnits(): number {
        return this.items.reduce((sum, i) => sum + i.quantity, 0)
    }

    get totalPrice(): number {
        return this.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
    }
}