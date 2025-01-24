import SwiftUI

struct LeaderboardRowView: View {
    let rank: Int
    let organization: Organization

    var body: some View {
        HStack {
            Text("\(rank)")
                .fontWeight(.bold)
                .frame(width: 30)
            Text(organization.name)
                .frame(maxWidth: .infinity, alignment: .leading)

            StatRow(title: "CO2", value: "\(organization.co2Reduction) tons")
            StatRow(title: "Trees", value: "\(organization.treesPlanted)")
            StatRow(title: "Water", value: "\(organization.waterSaved) liters")
        }
        .padding(.vertical, 8)
        .background(Color.white)
        .cornerRadius(8)
        .shadow(radius: 2)
    }
}
