import SwiftUI

struct LeaderboardCardView: View {
    let organization: Organization
    let rank: Int

    var body: some View {
        VStack(spacing: 8) {
            Text(trophy(for: rank))
                .font(.largeTitle)
            Text(organization.name)
                .font(.headline)
                .fontWeight(.bold)
                .multilineTextAlignment(.center)

            VStack(alignment: .leading, spacing: 4) {
                StatRow(title: "CO2 Reduction", value: "\(organization.co2Reduction) tons")
                StatRow(title: "Trees Planted", value: "\(organization.treesPlanted)")
                StatRow(title: "Water Saved", value: "\(organization.waterSaved) liters")
                StatRow(title: "Volunteers", value: "\(organization.volunteersCount)")
            }
            .padding(.top, 4)
        }
        .padding()
        .background(color(for: rank))
        .cornerRadius(10)
        .shadow(radius: 2)
    }

    private func color(for rank: Int) -> Color {
        switch rank {
        case 1: return Color.yellow.opacity(0.8)
        case 2: return Color.gray.opacity(0.8)
        case 3: return Color.orange.opacity(0.8)
        default: return Color.white
        }
    }

    private func trophy(for rank: Int) -> String {
        switch rank {
        case 1: return "🥇"
        case 2: return "🥈"
        case 3: return "🥉"
        default: return ""
        }
    }
}
