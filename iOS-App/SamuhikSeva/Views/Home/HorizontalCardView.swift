//
//  HorizontalCardView.swift
//  SamuhikSeva
//
//  Created by Shrirang Zend on 22/01/25.
//

import SwiftUI

struct HorizontalCardsView: View {
    @StateObject private var viewModel = HorizontalCardsViewModel()

    var body: some View {
        VStack(alignment: .leading) {
            Text("The Green Scroll")
                .font(.title2)
                .fontWeight(.bold)
                .padding(.bottom, 10)

            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 16) {
                    ForEach(viewModel.blogs) { blog in
                        Button(action: {
                            viewModel.selectedBlog = blog
                        }) {
                            CardView(title: blog.title, description: blog.category)
                        }
                        .buttonStyle(PlainButtonStyle())
                    }
                }
                .padding(.horizontal)
            }
        }
        .sheet(item: $viewModel.selectedBlog) { blog in
            DetailedCardView(blog: blog)
        }
    }
}

struct HorizontalCardsView_Previews: PreviewProvider {
    static var previews: some View {
        HorizontalCardsView()
            .environmentObject(HorizontalCardsViewModel())
            .onAppear {
                // Inject sample data for preview
                let sampleBlogs = [
                    Blog(id: 1, title: "Sustainability Tips", author: "John", date: "2025-01-10", content: "Content for Blog 1", category: "Tips", wordCount: 100),
                    Blog(id: 2, title: "Green Living", author: "Jane", date: "2025-01-15", content: "Content for Blog 2", category: "Lifestyle", wordCount: 200),
                ]
                HorizontalCardsViewModel().blogs = sampleBlogs
            }
            .previewLayout(.sizeThatFits)
            .padding()
    }
}
