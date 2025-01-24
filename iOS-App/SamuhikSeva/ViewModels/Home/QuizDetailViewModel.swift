import Foundation

class QuizDetailViewModel: ObservableObject {
    @Published var quiz: Quiz
    @Published var selectedOptions: [UUID: String] = [:] // Tracks selected options per question

    init(quiz: Quiz) {
        self.quiz = quiz
    }

    // Function to handle option selection for a specific question
    func selectOption(for questionID: UUID, option: String) {
        selectedOptions[questionID] = option
    }

    // Function to check if the selected option is correct
    func isOptionCorrect(for questionID: UUID) -> Bool {
        guard let question = quiz.questions.first(where: { $0.id == questionID }),
              let selectedOption = selectedOptions[questionID] else {
            return false
        }
        return selectedOption == question.correctOption
    }

    // Function to calculate total score
    func calculateScore() -> Int {
        quiz.questions.filter { question in
            isOptionCorrect(for: question.id)
        }.count
    }
}
