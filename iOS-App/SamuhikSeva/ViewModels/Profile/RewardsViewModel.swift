//
//  RewardsViewModel.swift
//  SamuhikSeva
//
//  Created by Shrirang Zend on 23/01/25.
//


import Foundation

class RewardsViewModel: ObservableObject {
    @Published var rewards: [Reward] = []

    init() {
        // Load rewards from sample data or a backend in the future
        rewards = Reward.sampleData
    }
}
