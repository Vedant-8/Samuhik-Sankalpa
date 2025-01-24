struct Quiz: Codable, Identifiable {
    let id = UUID() // Unique identifier for each quiz
    let theme: String
    let questions: [Question]
}

struct Question: Codable, Identifiable {
    let id = UUID() // Unique identifier for each question
    let question: String
    let options: [String]
    let correctOption: String
}
