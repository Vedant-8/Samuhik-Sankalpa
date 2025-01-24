//
//  SamuhikSevaApp.swift
//  SamuhikSeva
//
//  Created by Shrirang Zend on 22/01/25.
//

import SwiftUI

@main
struct SamuhikSevaApp: App {
    @AppStorage("isOnboardingComplete") private var isOnboardingComplete: Bool = false
    @AppStorage("isUserLoggedIn") private var isUserLoggedIn: Bool = false

    var body: some Scene {
        WindowGroup {
            if isUserLoggedIn {
                HomeView() // Show HomeView if the user is logged in
            } else if isOnboardingComplete {
                NavigationView {
                    LoginView(viewModel: LoginViewModel()) // Show LoginView after onboarding
                }
            } else {
                OnboardingView() // Start with onboarding
            }
        }
    }
}
