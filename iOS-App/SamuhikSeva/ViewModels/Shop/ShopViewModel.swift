//
//  ShopViewModel.swift
//  SamuhikSeva
//
//  Created by Shrirang Zend on 23/01/25.
//

import Foundation

class ShopViewModel: ObservableObject {
    @Published var products: [Product] = []
    @Published var cartItems: [CartItem] = []

    init() {
        loadProducts()
    }

    func loadProducts() {
        if let url = Bundle.main.url(forResource: "shop", withExtension: "json") {
            do {
                let data = try Data(contentsOf: url)
                let decodedProductList = try JSONDecoder().decode(ProductList.self, from: data)
                self.products = decodedProductList.products
                print("Loaded products: \(products.map { $0.name })")
            } catch {
                print("Error loading products: \(error)")
            }
        } else {
            print("Products JSON file not found!")
        }
    }

    func addToCart(product: Product) {
        print("Attempting to add product to cart: \(product.name)")

        if let index = products.firstIndex(where: { $0.id == product.id }) {
            if products[index].stock > 0 {
                // Check if product already exists in the cart
                if let cartIndex = cartItems.firstIndex(where: { $0.product.id == product.id }) {
                    cartItems[cartIndex].quantity += 1
                    print("Increased quantity for \(product.name) in cart to \(cartItems[cartIndex].quantity)")
                } else {
                    cartItems.append(CartItem(product: products[index], quantity: 1))
                    print("Added \(product.name) to cart with quantity 1")
                }

                // Reduce stock using mutation of the array element
                products[index] = products[index].decrementStock()
                print("Reduced stock for \(product.name) to \(products[index].stock)")
            } else {
                print("Cannot add \(product.name) to cart. Out of stock.")
            }
        } else {
            print("Product \(product.name) not found in the product list.")
        }
    }

    func removeFromCart(cartItem: CartItem) {
        print("Attempting to remove \(cartItem.product.name) from cart")

        if let cartIndex = cartItems.firstIndex(where: { $0.product.id == cartItem.product.id }) {
            // Increase stock back
            if let productIndex = products.firstIndex(where: { $0.id == cartItem.product.id }) {
                products[productIndex] = products[productIndex].incrementStock(by: cartItems[cartIndex].quantity)
                print("Restored stock for \(cartItem.product.name) to \(products[productIndex].stock)")
            }

            // Remove item from cart
            cartItems.remove(at: cartIndex)
            print("Removed \(cartItem.product.name) from cart")
        } else {
            print("\(cartItem.product.name) not found in cart")
        }
    }

    func checkout() {
        print("Checking out with items: \(cartItems.map { "\($0.product.name) (Qty: \($0.quantity))" })")
        cartItems.removeAll()
        print("Cart is now empty")
    }

    func filteredProducts(searchText: String) -> [Product] {
        if searchText.isEmpty {
            return products
        } else {
            return products.filter { $0.name.lowercased().contains(searchText.lowercased()) }
        }
    }
}
