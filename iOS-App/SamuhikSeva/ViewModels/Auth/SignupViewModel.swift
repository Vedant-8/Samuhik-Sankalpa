//
//  SignupViewModel.swift
//  SamuhikSeva
//
//  Created by Shrirang Zend on 22/01/25.
//

import Foundation
import SwiftData
import Combine
import SwiftUI

class SignupViewModel: ObservableObject {
    @Published var email: String = ""
    @Published var password: String = ""
    @Published var confirmPassword: String = ""
    @Published var errorMessage: String = ""
    @Published var showError: Bool = false

    // Validation properties
    var hasLetter: Bool {
        return password.rangeOfCharacter(from: .letters) != nil
    }

    var hasNumber: Bool {
        return password.rangeOfCharacter(from: .decimalDigits) != nil
    }

    var isPasswordLengthValid: Bool {
        return password.count >= 8
    }

    var hasSpecialCharacter: Bool {
        let specialCharacterSet = CharacterSet(charactersIn: "!@#$%^&*()_-+=<>?")
        return password.rangeOfCharacter(from: specialCharacterSet) != nil
    }

    // Function to handle signup (interacting with SwiftData)
    func signUp(context: ModelContext) {
        guard !email.isEmpty, !password.isEmpty, !confirmPassword.isEmpty else {
            errorMessage = "All fields are required."
            showError = true
            return
        }

        guard password == confirmPassword else {
            errorMessage = "Passwords do not match."
            showError = true
            return
        }

        do {
            let existingUser = try context.fetch(FetchDescriptor<User>(predicate: #Predicate { $0.email == email }))
            guard existingUser.isEmpty else {
                errorMessage = "Email already registered."
                showError = true
                return
            }

            let newUser = User(email: "test@gmail.com", password: "hashedPass@4090")
            context.insert(newUser)
            try context.save()
            print("User signed up successfully, navigating to HomeView.")
        } catch {
            errorMessage = "Failed to sign up: \(error.localizedDescription)"
            showError = true
        }
    }
}
