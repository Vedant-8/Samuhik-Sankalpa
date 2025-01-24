//
//  Blog.swift
//  SamuhikSeva
//
//  Created by Shrirang Zend on 23/01/25.
//


struct Blog: Codable, Identifiable {
    let id: Int
    let title: String
    let author: String
    let date: String
    let content: String
    let category: String
    let wordCount: Int
}
