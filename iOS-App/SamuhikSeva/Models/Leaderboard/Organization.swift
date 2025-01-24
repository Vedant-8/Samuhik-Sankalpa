import Foundation

struct Organization: Identifiable, Codable {
    let id: UUID
    let name: String
    let co2Reduction: Int
    let treesPlanted: Int
    let waterSaved: Int
    let volunteersCount: Int
}
