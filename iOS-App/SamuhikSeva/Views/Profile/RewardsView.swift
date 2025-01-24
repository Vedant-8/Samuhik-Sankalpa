//
//  RewardsView.swift
//  SamuhikSeva
//
//  Created by Shrirang Zend on 23/01/25.
//

import SwiftUI

struct RewardsView: View {
    @State private var isDrawerOpen = false // State for the drawer (if needed in the future)

    var body: some View {
        VStack(spacing: 0) {
            // Top Bar
            HStack {
                Button(action: {
                    withAnimation {
                        isDrawerOpen.toggle()
                    }
                }) {
                    Image(systemName: "line.horizontal.3")
                        .resizable()
                        .frame(width: 25, height: 20)
                        .padding()
                        .foregroundColor(Color.green)
                }

                Spacer()

                Text("Profile")
                    .font(.headline)
                    .foregroundColor(.black)

                Spacer()

                Image(systemName: "bell")
                    .resizable()
                    .frame(width: 25, height: 25)
                    .padding()
                    .foregroundColor(.black)
            }
            .background(Color.white)
            .shadow(color: Color.black.opacity(0.1), radius: 4, x: 0, y: 2) // Add shadow for elevation

            // Main Content
            ScrollView {
                VStack(alignment: .center, spacing: 24) {
                    Text("Badges")
                        .font(.title2)
                        .fontWeight(.bold)
                        .foregroundColor(Color.green)
                        .padding(.horizontal, 16)
                        .padding(.top, 16)
                    
                    // Main Stats Section
                    ScrollView(.horizontal, showsIndicators: false) {
                        HStack(spacing: 16) {
                            RewardStatCard(title: "Total Points", value: "2,500+", icon: "chart.line.uptrend.xyaxis", color: .teal)
                            RewardStatCard(title: "Day Streak", value: "30", icon: "calendar", color: .blue)
                            RewardStatCard(title: "Badges Earned", value: "5", icon: "star", color: .yellow)
                            RewardStatCard(title: "Initiatives Completed", value: "10", icon: "leaf.fill", color: .green)
                        }
                        .padding(.horizontal, 16)
                    }

                    // Achievements Section
                    VStack(alignment: .center, spacing: 16) {
                        Text("Achievements")
                            .font(.title2)
                            .fontWeight(.bold)
                            .foregroundColor(Color.green)
                            .padding(.horizontal, 16)

                        ForEach(Reward.sampleData) { reward in
                            AchievementCard(reward: reward)
                                .padding(.horizontal, 16)
                        }
                    }
                }
                .padding(.bottom, 20) // Add bottom padding for spacing
            }
        }
    }
}

struct RewardsView_Previews: PreviewProvider {
    static var previews: some View {
        RewardsView()
    }
}
