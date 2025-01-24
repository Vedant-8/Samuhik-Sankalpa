//
//  PhotoOverlaySection.swift
//  SamuhikSeva
//
//  Created by Shrirang Zend on 23/01/25.
//
import SwiftUI

struct PhotoOverlaySection: View {
    var body: some View {
        NavigationLink(destination: ExploreView()) {
            ZStack(alignment: .bottom) {
                Image("heroImage")
                    .resizable()
                    .scaledToFill()
                    .frame(height: 250)
                    .cornerRadius(15)
                    .clipped()

                Color.black
                    .opacity(0.4) // Adjust opacity as needed
                    .cornerRadius(15)

                VStack {
                    Text("Connecting you to causes that need your support")
                        .font(.headline)
                        .foregroundColor(.white)
                        .multilineTextAlignment(.center)
                        .padding(.horizontal, 16)

                    Text("Explore Donations")
                        .font(.headline)
                        .padding()
                        .frame(maxWidth: .infinity)
                        .background(
                            LinearGradient(
                                gradient: Gradient(colors: [Color.green.opacity(0.6), Color.green]),
                                startPoint: .leading,
                                endPoint: .trailing
                            )
                        )
                        .foregroundColor(.white)
                        .cornerRadius(10)
                        .shadow(color: Color.green.opacity(0.5), radius: 5, x: 0, y: 3)
                        .padding(.horizontal, 50)
                }
                .padding()
            }
        }
    }
}

#Preview {
    PhotoOverlaySection()
}
