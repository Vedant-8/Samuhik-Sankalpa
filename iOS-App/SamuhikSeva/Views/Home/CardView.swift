//
//  CardView.swift
//  SamuhikSeva
//
//  Created by Shrirang Zend on 22/01/25.
//
import SwiftUI

struct CardView: View {
    let title: String
    let description: String
    @State private var isHovering = false

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            Image(systemName: "leaf.fill")
                .font(.largeTitle)
                .foregroundColor(.green)

            Text(title)
                .font(.headline)
                .foregroundColor(.black)
                .lineLimit(2)

            Text(description)
                .font(.subheadline)
                .foregroundColor(.gray)
                .lineLimit(1)
        }
        .padding()
        .frame(width: 200, height: 150)
        .background(
            LinearGradient(
                gradient: Gradient(colors: isHovering ? [Color.green, Color.green.opacity(0.8)] : [Color.green.opacity(0.2), Color.green.opacity(0.6)]),
                startPoint: .top, endPoint: .bottom
            )
        )
        .cornerRadius(10)
        .onHover { hovering in
            isHovering = hovering
        }
    }
}


struct CardView_Previews: PreviewProvider {
    static var previews: some View {
        CardView(
            title: "Top Educational Resources for Learning About Sustainability",
            description: "Educational Resources"
        )
            .previewLayout(.sizeThatFits)
            .padding()
    }
}
