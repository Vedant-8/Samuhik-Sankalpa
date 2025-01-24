//
//  Project.swift
//  SamuhikSeva
//
//  Created by Shrirang Zend on 22/01/25.
//

import Foundation

struct Project: Identifiable, Decodable, Equatable {
    let id: String
    let name: String
    let description: [String]
    let short_description: String
    let location: String
    let funding_goal: Int
    let funding_received: Int
}
