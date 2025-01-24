//
//  DetailedCardView.swift
//  SamuhikSeva
//
//  Created by Shrirang Zend on 22/01/25.
//

import SwiftUI

struct DetailedCardView: View {
    let blog: Blog

    var body: some View {
        VStack(spacing: 16) {
            // Header with Title, Author, and Category
            VStack(alignment: .leading, spacing: 8) {
                Text(blog.category.uppercased())
                    .font(.caption)
                    .fontWeight(.bold)
                    .foregroundColor(.white)
                    .padding(.horizontal, 8)
                    .padding(.vertical, 4)
                    .background(Color.green.opacity(0.8))
                    .cornerRadius(8)

                Text(blog.title)
                    .font(.title)
                    .fontWeight(.bold)
                    .foregroundColor(.black.opacity(0.7))
                    .lineLimit(2)

                Text("by \(blog.author) - \(blog.date)")
                    .font(.subheadline)
                    .foregroundColor(.black.opacity(0.9))
            }
            .padding()
            .background(
                LinearGradient(
                    gradient: Gradient(colors: [Color("green100"), Color("green600")]),
                    startPoint: .top,
                    endPoint: .bottom
                )
            )
            .cornerRadius(10)
            .shadow(radius: 5)

            // Content Area
            ScrollView {
                VStack(alignment: .leading, spacing: 12) {
                    Text(blog.content)
                        .font(.body)
                        .foregroundColor(.black)
                        .lineSpacing(6)

                    Spacer()
                }
                .padding()
                .background(Color.white)
                .cornerRadius(10)
                .shadow(radius: 2)
            }

            // Footer with Word Count
            HStack {
                Spacer()
                Text("\(blog.wordCount) words")
                    .font(.footnote)
                    .foregroundColor(.gray)
            }
            .padding(.top, 8)
        }
        .padding()
        .background(Color(UIColor.systemGroupedBackground))
        .ignoresSafeArea(.all)
    }
}

struct DetailedCardView_Previews: PreviewProvider {
    static var previews: some View {
        DetailedCardView(blog: Blog(
            id: 1,
            title: "Top Educational Resources for Learning About Sustainability",
            author: "Jane Doe",
            date: "2025-01-15",
            content: """
Sustainability is becoming an increasingly essential topic in today’s world. Fortunately, there are numerous educational resources available to help individuals and organizations understand the principles and practices of sustainability and take meaningful action.

Online platforms such as Coursera and edX offer comprehensive courses like 'Sustainability in Practice' and 'Introduction to Sustainable Development'. These courses, taught by experts from top universities, cover critical topics such as renewable energy, waste management, and sustainable urban planning.
""",
            category: "Educational Resources",
            wordCount: 412
        ))
        .previewLayout(.sizeThatFits)
        .padding()
    }
}
