//
//  Card.swift
//  SamuhikSeva
//
//  Created by Shrirang Zend on 22/01/25.
//

import Foundation

struct CardData: Identifiable, Codable {
    let id: Int
    let title: String
    let description: String
    let content: String
    let category: String
    let author: String
    let date: String
    let wordCount: Int
}
