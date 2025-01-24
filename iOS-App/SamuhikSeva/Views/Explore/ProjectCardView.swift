//
//  ProjectCardView.swift
//  SamuhikSeva
//
//  Created by Shrirang Zend on 22/01/25.
//

import SwiftUI

struct ProjectCardView: View {
    let project: Project
    @State private var isTopCard = false
    @State private var showDetail = false

    var body: some View {
        VStack(alignment: .center, spacing: 10) {
            // Image Placeholder
            Rectangle()
                .fill(
                    isTopCard ? Color("green150") : Color.gray
                )
                .frame(maxWidth: .infinity, maxHeight: 250, alignment: .center)
                .cornerRadius(10)
                .overlay(
                    Text(project.location)
                        .foregroundColor(.white)
                        .font(.caption)
                        .fontWeight(.bold)
                        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .bottomTrailing)
                        .padding(10)
                )

            // Title with NavigationLink
            Button(action: {
                showDetail.toggle()
            }) {
                Text(project.name)
                    .font(.title3)
                    .fontWeight(.bold)
                    .foregroundColor(isTopCard ? .green : .black)
                    .lineLimit(2)
                    .multilineTextAlignment(.center)
            }
            .sheet(isPresented: $showDetail) {
                ProjectDetailView(project: project)
            }

            // Two-column layout below the image
            HStack(alignment: .top, spacing: 10) {
                // Left Column: Short Description
                Text(project.short_description)
                    .font(.subheadline)
                    .foregroundColor(.black)
                    .lineLimit(6)
                    .frame(maxWidth: .infinity, alignment: .leading)

                // Right Column
                VStack(spacing: 10) {
                    // Top Section: Funds Raised
                    Text("Goal: ₹\(project.funding_goal)")
                        .font(.footnote)
                        .foregroundColor(isTopCard ? .blue : .green)
                        .multilineTextAlignment(.center)

                    // ProgressBar
                    ProgressView(value: Double(project.funding_received) / Double(project.funding_goal))
                        .progressViewStyle(LinearProgressViewStyle(tint: isTopCard ? .yellow : .green))
                        .frame(height: 8) // Adjust the height of the progress bar
                        .cornerRadius(4) // Rounded corners for the progress bar

                    // Display Percentage
                    Text("\(Int((Double(project.funding_received) / Double(project.funding_goal)) * 100))% completed")
                        .font(.caption)
                        .foregroundColor(isTopCard ? .orange : .blue)

                    // Bottom Section: Donate Button
                    Button(action: {
                        print("Donate to \(project.name)")
                    }) {
                        Text("Donate")
                            .font(.headline)
                            .padding()
                            .frame(maxWidth: .infinity)
                            .background(isTopCard ? Color.orange : Color.green)
                            .foregroundColor(.white)
                            .cornerRadius(10)
                    }
                }
                .frame(width: 100) // Fixed width for right column
            }
        }
        .padding()
        .frame(width: 250, height: 500) // Increased height to accommodate the layout
        .background(isTopCard ? Color.white : Color.gray) // Solid background color
        .cornerRadius(15)
        .shadow(color: isTopCard ? .green : .gray, radius: 10, x: 0, y: 5)
        .onAppear {
            isTopCard = true
        }
    }
}

struct ProjectCardView_Previews: PreviewProvider {
    static var previews: some View {
        ProjectCardView(project: Project(
            id: "1",
            name: "Mumbai Green Oasis Initiative",
            description: ["Mumbai Green Oasis Initiative aims to reforest urban spaces in Mumbai to combat air pollution."],
            short_description: "Focuses on reforesting urban spaces in Mumbai to combat air pollution.",
            location: "Mumbai",
            funding_goal: 50000,
            funding_received: 20000
        ))
    }
}
