//
//  CartView.swift
//  SamuhikSeva
//
//  Created by Shrirang Zend on 23/01/25.
//

import SwiftUI

struct CartView: View {
    @EnvironmentObject var viewModel: ShopViewModel

    var body: some View {
        VStack {
            if viewModel.cartItems.isEmpty {
                Text("Your cart is empty.")
                    .font(.headline)
                    .foregroundColor(.gray)
                    .padding()
            } else {
                List(viewModel.cartItems) { cartItem in
                    HStack {
                        VStack(alignment: .leading) {
                            Text(cartItem.product.name)
                                .font(.headline)
                            Text(String(format: "$%.2f", cartItem.product.price))
                                .font(.subheadline)
                                .foregroundColor(.gray)
                        }

                        Spacer()

                        Text("Qty: \(cartItem.quantity)")
                            .font(.subheadline)
                            .foregroundColor(.secondary)
                    }
                }
            }
            Spacer()
        }
        .navigationTitle("Cart")
    }
}
struct CartView_Previews: PreviewProvider {
    static var previews: some View {
        let viewModel = ShopViewModel()
        viewModel.cartItems = [
            CartItem(
                product: Product(
                    id: 2,
                    name: "Organic Cotton Tote Bag",
                    description: "Durable and stylish organic cotton tote bag for shopping, carrying books, or everyday use. Washable and biodegradable.",
                    price: 12.49,
                    category: "Bags & Accessories",
                    rating: 4.7,
                    stock: 200
                ),
                quantity: 2
            )
        ]
        return CartView()
            .environmentObject(viewModel)
    }
}

