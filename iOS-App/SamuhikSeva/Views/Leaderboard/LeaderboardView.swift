import SwiftUI

struct LeaderboardView: View {
    @StateObject private var viewModel = LeaderboardViewModel()

    var body: some View {
        NavigationView {
            ScrollView {
                VStack(spacing: 20) {
                    // Title
                    Text("Leaderboard")
                        .font(.largeTitle)
                        .fontWeight(.bold)
                        .padding(.top)

                    // Top 3 Organizations as Cards
                    LazyVGrid(columns: [GridItem(.adaptive(minimum: 150))], spacing: 16) {
                        ForEach(viewModel.organizations.prefix(3).enumeratedArray(), id: \.element.id) { index, org in
                            LeaderboardCardView(
                                organization: org,
                                rank: index + 1
                            )
                        }
                    }
                    .padding(.horizontal)

                    // Remaining Organizations in Table Format
                    VStack(alignment: .leading, spacing: 8) {
                        Text("Full Leaderboard")
                            .font(.title2)
                            .fontWeight(.semibold)

                        ForEach(viewModel.organizations.dropFirst(3).enumeratedArray(), id: \.element.id) { index, org in
                            LeaderboardRowView(
                                rank: index + 4,
                                organization: org
                            )
                        }
                    }
                    .padding()
                }
            }
            .navigationBarTitle("", displayMode: .inline)
        }
    }
}
