//
//  HorizontalCardsViewModel.swift
//  SamuhikSeva
//
//  Created by Shrirang Zend on 22/01/25.
//

import Foundation
import Combine

class HorizontalCardsViewModel: ObservableObject {
    @Published var blogs: [Blog] = [] // Stores blogs loaded from JSON
    @Published var selectedBlog: Blog? // For the detailed view

    init() {
        loadBlogs()
    }

    private func loadBlogs() {
        guard let url = Bundle.main.url(forResource: "blogs", withExtension: "json") else {
            print("blogs.json file not found!")
            return
        }

        do {
            let data = try Data(contentsOf: url)
            // Decode the JSON as a dictionary with a "blogs" key
            let decodedData = try JSONDecoder().decode([String: [Blog]].self, from: data)
            if let blogsArray = decodedData["blogs"] {
                blogs = blogsArray // Assign the array of blogs to the published property
                print("Loaded blogs: \(blogs.count) blogs loaded.")
            } else {
                print("No blogs found in blogs.json.")
            }
        } catch {
            print("Error decoding blogs.json: \(error)")
        }
    }
}
