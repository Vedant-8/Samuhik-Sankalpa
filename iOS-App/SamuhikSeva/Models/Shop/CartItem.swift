//
//  CartItem.swift
//  SamuhikSeva
//
//  Created by Shrirang Zend on 23/01/25.
//
import Foundation
import Combine

struct CartItem: Identifiable {
    let id = UUID()
    let product: Product
    var quantity: Int
}
