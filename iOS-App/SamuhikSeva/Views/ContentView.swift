//
//  ContentView.swift
//  SamuhikSeva
//
//  Created by Shrirang Zend on 22/01/25.
//

import SwiftUI

struct ContentView: View {
    @StateObject private var onboardingViewModel = OnboardingViewModel()
    @State private var isUserAuthenticated = false

    var body: some View {
        NavigationView {
            Group {
                if onboardingViewModel.isFinished {
                    if isUserAuthenticated {
                        HomeView()
                    } else {
                        SignupView(viewModel: SignupViewModel())
                    }
                } else {
                    OnboardingView()
                        .environmentObject(onboardingViewModel)
                }
            }
            .navigationBarHidden(true)
        }
    }
}

struct OnboardingView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationView {
            OnboardingView()
        }
    }
}
