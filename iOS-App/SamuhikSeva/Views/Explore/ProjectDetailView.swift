//
//  ProjectDetailView.swift
//  SamuhikSeva
//
//  Created by Shrirang Zend on 23/01/25.
//

import SwiftUI

struct ProjectDetailView: View {
    let project: Project

    var body: some View {
        VStack(spacing: 20) {
            // Project Name
            Text(project.name)
                .font(.largeTitle)
                .fontWeight(.bold)
                .multilineTextAlignment(.center)
                .padding()

            // Carousel of Pictures (Placeholder for now)
            TabView {
                ForEach(1...3, id: \ .self) { index in
                    Rectangle()
                        .fill(Color("green150"))
                        .frame(height: 200)
                        .cornerRadius(10)
                        .overlay(
                            Text("Image \(index)")
                                .foregroundColor(.white)
                                .font(.headline)
                        )
                }
            }
            .frame(height: 200)
            .tabViewStyle(PageTabViewStyle())

            // Goal Completion Slider
            VStack(spacing: 10) {
                Text("₹\(project.funding_received) of ₹\(project.funding_goal) raised")
                    .font(.headline)

                ProgressView(value: Double(project.funding_received) / Double(project.funding_goal))
                    .progressViewStyle(LinearProgressViewStyle(tint: .green))
                    .frame(height: 8)
                    .cornerRadius(4)
            }

            // Detailed Summary
            ScrollView {
                Text(project.description.joined(separator: "\n\n"))
                    .font(.body)
                    .padding()
            }

            Spacer()
        }
        .padding()
    }
}

