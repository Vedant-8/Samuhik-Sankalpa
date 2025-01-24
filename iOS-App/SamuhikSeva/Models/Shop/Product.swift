//
//  Product.swift
//  SamuhikSeva
//
//  Created by Shrirang Zend on 23/01/25.
//

import Foundation
import Combine

struct Product: Identifiable, Codable {
    let id: Int
    let name: String
    let description: String
    let price: Double
    let category: String
    let rating: Double
    var stock: Int

    func decrementStock() -> Product {
        return Product(id: id, name: name, description: description, price: price, category: category, rating: rating, stock: stock - 1)
    }

    func incrementStock(by quantity: Int) -> Product {
        return Product(id: id, name: name, description: description, price: price, category: category, rating: rating, stock: stock + quantity)
    }
}
