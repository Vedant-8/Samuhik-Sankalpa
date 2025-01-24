//
//  AchievementCard.swift
//  SamuhikSeva
//
//  Created by Shrirang Zend on 23/01/25.
//
import SwiftUI

struct AchievementCard: View {
    let reward: Reward

    var body: some View {
        HStack(alignment: .center, spacing: 16) {
            Circle()
                .fill(reward.achieved ? Color.green.opacity(0.2) : Color.gray.opacity(0.2))
                .frame(width: 50, height: 50)
                .overlay(
                    Image(systemName: reward.iconName)
                        .resizable()
                        .scaledToFit()
                        .frame(width: 24, height: 24)
                        .foregroundColor(reward.achieved ? .green : .gray)
                )

            VStack(alignment: .leading, spacing: 8) { // Increased spacing
                Text(reward.title)
                    .font(.headline)
                    .foregroundColor(reward.achieved ? .green : .gray)
                Text(reward.description)
                    .font(.subheadline)
                    .foregroundColor(.gray)
                ProgressView(value: CGFloat(Double(reward.progress.replacingOccurrences(of: "%", with: "")) ?? 0) / 100.0)
                    .progressViewStyle(LinearProgressViewStyle(tint: reward.achieved ? .green : .teal))
            }

            Spacer()

            Text(reward.progress)
                .font(.subheadline)
                .fontWeight(.bold)
                .padding(6)
                .background(reward.achieved ? Color.green.opacity(0.2) : Color.gray.opacity(0.2))
                .cornerRadius(12)
        }
        .padding()
        .background(Color("green100"))
        .cornerRadius(12)
        .shadow(color: Color.black.opacity(0.1), radius: 4, x: 0, y: 2) // Subtle shadow
    }
}

