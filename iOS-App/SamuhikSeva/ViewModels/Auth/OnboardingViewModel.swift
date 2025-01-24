//
//  OnboardingViewModel.swift
//  SamuhikSeva
//
//  Created by Shrirang Zend on 22/01/25.
//


import SwiftUI

class OnboardingViewModel: ObservableObject {
    @Published var currentPage: Int = 0 // Tracks the current page
    @Published var isFinished: Bool = false // Tracks if onboarding is completed

    func goToNextPage(totalPages: Int) {
        if currentPage < totalPages - 1 {
            currentPage += 1
        } else {
            isFinished = true
        }
    }
}
