//
//  LoginViewModel.swift
//  SamuhikSeva
//
//  Created by Shrirang Zend on 22/01/25.
//
import Foundation
import SwiftData

class LoginViewModel: ObservableObject {
    @Published var email: String = ""
    @Published var password: String = ""
    @Published var isAuthenticated: Bool = false
    @Published var showError: Bool = false
    @Published var errorMessage: String = ""

    // Hardcoded user credentials
    private let hardcodedEmail = "test@example.com"
    private let hardcodedPassword = "password123"

    func login() {
        if email == hardcodedEmail && password == hardcodedPassword {
            isAuthenticated = true
            print("✅ Login successful for user: \(email)")
        } else {
            isAuthenticated = false
            errorMessage = "Invalid email or password."
            showError = true
            print("❌ Login failed: Invalid email or password.")
        }
    }
}
