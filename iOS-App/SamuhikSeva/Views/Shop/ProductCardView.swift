//
//  ProductCardView.swift
//  SamuhikSeva
//
//  Created by Shrirang Zend on 23/01/25.
//


import SwiftUI

struct ProductCardView: View {
    @EnvironmentObject var viewModel: ShopViewModel
    let product: Product
    @State private var isAddedToCart = false

    var body: some View {
        VStack(alignment: .leading) {
            Rectangle()
                .fill(Color.green.opacity(0.2))
                .frame(height: 150)
                .cornerRadius(10)
                .overlay(
                    Text(product.category)
                        .font(.caption)
                        .foregroundColor(.white)
                        .padding(4)
                        .background(Color.green)
                        .cornerRadius(5), alignment: .topTrailing
                )

            Text(product.name)
                .font(.headline)
                .lineLimit(2)

            Text(String(format: "$%.2f", product.price))
                .font(.subheadline)
                .foregroundColor(.gray)

            HStack {
                Button(action: {
                    if !isAddedToCart {
                        viewModel.addToCart(product: product)
                        isAddedToCart = true

                        // Revert back to "Add to Cart" after 1 second
                        DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
                            isAddedToCart = false
                        }
                    }
                }) {
                    Text(isAddedToCart ? "Added" : "Add to Cart")
                        .font(.footnote)
                        .padding(8)
                        .background(isAddedToCart ? Color.gray : Color.green)
                        .foregroundColor(.white)
                        .cornerRadius(10)
                }
                Spacer()

                Text(String(format: "⭐ %.1f", product.rating))
                    .font(.footnote)
            }
        }
        .padding()
        .background(Color.white)
        .cornerRadius(10)
        .shadow(radius: 5)
    }
}

struct ProductCardView_Previews: PreviewProvider {
    static var previews: some View {
        let viewModel = ShopViewModel()
        viewModel.products = [
            Product(
                id: 1,
                name: "Reusable Bamboo Utensil Set",
                description: "A set of eco-friendly, reusable bamboo utensils perfect for reducing single-use plastic waste. Includes a fork, knife, spoon, and chopsticks in a travel pouch.",
                price: 15.99,
                category: "Kitchen & Dining",
                rating: 4.8,
                stock: 120
            )
        ]
        return ProductCardView(product: viewModel.products[0])
            .environmentObject(viewModel)
    }
}
