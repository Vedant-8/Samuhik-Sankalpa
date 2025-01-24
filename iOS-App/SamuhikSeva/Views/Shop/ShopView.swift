//
//  ShopView.swift
//  SamuhikSeva
//
//  Created by Shrirang Zend on 23/01/25.
//

import SwiftUI

struct ShopView: View {
    @StateObject private var viewModel = ShopViewModel()
    @State private var searchText = ""
    @State private var isDrawerOpen = false

    var body: some View {
        ZStack {
            VStack(spacing: 0) {
                // Custom Top Bar for Consistency
                HStack {
                    Button(action: {
                        withAnimation {
                            isDrawerOpen.toggle()
                        }
                    }) {
                        Image(systemName: "line.horizontal.3")
                            .resizable()
                            .frame(width: 25, height: 20)
                            .padding()
                            .foregroundColor(Color.green)
                    }

                    Spacer()

                    Text("Shop")
                        .font(.headline)
                        .foregroundColor(.primary)

                    Spacer()

                    NavigationLink(destination: CartView().environmentObject(viewModel)) {
                        Image(systemName: "cart")
                            .font(.title2)
                            .foregroundColor(.green)
                    }
                    .padding(.trailing)
                }
                .background(Color.white)
                .shadow(color: .gray.opacity(0.2), radius: 5, x: 0, y: 5)

                // Search Bar
                HStack {
                    TextField("Search products...", text: $searchText)
                        .textFieldStyle(RoundedBorderTextFieldStyle())
                        .padding(.leading)

                    Button(action: {
                        // Clear search
                        searchText = ""
                    }) {
                        Image(systemName: "xmark.circle.fill")
                            .foregroundColor(.gray)
                            .padding(.trailing)
                    }
                }
                .padding(.vertical, 8)

                // Product List
                ScrollView {
                    LazyVGrid(columns: [GridItem(.adaptive(minimum: 150))], spacing: 16) {
                        ForEach(viewModel.filteredProducts(searchText: searchText)) { product in
                            ProductCardView(product: product)
                                .environmentObject(viewModel)
                        }
                    }
                    .padding()
                }

                Spacer()
            }

            // Drawer View
            if isDrawerOpen {
                DrawerView(isDrawerOpen: $isDrawerOpen)
                    .transition(.move(edge: .leading))
            }
        }
    }
}

struct ShopView_Previews: PreviewProvider {
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
            ),
            Product(
                id: 2,
                name: "Organic Cotton Tote Bag",
                description: "Durable and stylish organic cotton tote bag for shopping, carrying books, or everyday use. Washable and biodegradable.",
                price: 12.49,
                category: "Bags & Accessories",
                rating: 4.7,
                stock: 200
            )
        ]
        return ShopView()
            .environmentObject(viewModel)
    }
}
