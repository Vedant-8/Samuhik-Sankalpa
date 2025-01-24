//
//  Reward.swift
//  SamuhikSeva
//
//  Created by Shrirang Zend on 23/01/25.
//

import Foundation

struct Reward: Identifiable {
    let id: Int
    let title: String
    let description: String
    let progress: String
    let achieved: Bool
    let impact: String
    let iconName: String // Name of the system image (SF Symbol)

    static let sampleData: [Reward] = [
        Reward(id: 1, title: "Carbon Footprint Reducer",
               description: "Reduced carbon emissions through sustainable practices.",
               progress: "75%", achieved: true,
               impact: "Saved 250kg of CO2", iconName: "leaf"),
        Reward(id: 2, title: "Water Conservation Champion",
               description: "Adopted water-saving techniques.",
               progress: "60%", achieved: true,
               impact: "Saved 1,000 liters of water", iconName: "drop"),
        Reward(id: 3, title: "Renewable Energy Adopter",
               description: "Started transitioning to renewable energy sources.",
               progress: "40%", achieved: false,
               impact: "On track to save 500kWh", iconName: "wind"),
        Reward(id: 4, title: "Green Garden Guardian",
               description: "Maintained a sustainable garden with native plants.",
               progress: "90%", achieved: true,
               impact: "Created habitat for 12 species", iconName: "leaf.arrow.circlepath")
    ]
}
