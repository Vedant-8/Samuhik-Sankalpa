import Foundation

class LeaderboardViewModel: ObservableObject {
    @Published var organizations: [Organization] = []

    init() {
        loadOrganizations()
    }

    private func loadOrganizations() {
        guard let url = Bundle.main.url(forResource: "orgs", withExtension: "json") else {
            print("JSON file not found")
            return
        }

        do {
            let data = try Data(contentsOf: url)
            let decodedData = try JSONDecoder().decode([Organization].self, from: data)
            organizations = decodedData.sorted { orgA, orgB in
                let impactA = orgA.co2Reduction + orgA.treesPlanted + orgA.waterSaved
                let impactB = orgB.co2Reduction + orgB.treesPlanted + orgB.waterSaved
                return impactB > impactA
            }
        } catch {
            print("Error loading organizations: \(error)")
        }
    }
}
