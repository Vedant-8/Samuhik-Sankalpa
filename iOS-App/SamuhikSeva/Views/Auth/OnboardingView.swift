//
//  OnboardingView.swift
//  SamuhikSeva
//
//  Created by Shrirang Zend on 22/01/25.
//
import SwiftUI

struct OnboardingView: View {
    @StateObject private var viewModel = OnboardingViewModel()

    // Dummy data for pages
    let pages = [
        OnboardingPage(imageName: "poor kids", title: "Vision & Mission",
                       description: "To provide individuals with a platform to engage with philanthropy and create bespoke fulfilling journey as lifelong givers."),
        OnboardingPage(imageName: "revolution_image", title: "Join us in the inspired giving revolution!",
                       description: "")
    ]

    var body: some View {
        ZStack {
            TabView(selection: $viewModel.currentPage) {
                ForEach(0..<pages.count, id: \.self) { index in
                    OnboardingPageView(page: pages[index], isLastPage: index == pages.count - 1) {
                        viewModel.goToNextPage(totalPages: pages.count)
                    }
                }
            }
            .tabViewStyle(PageTabViewStyle(indexDisplayMode: .never))

            // Line for Page Control
            VStack {
                Spacer()
                HStack {
                    ForEach(0..<pages.count, id: \.self) { index in
                        Rectangle()
                            .fill(viewModel.currentPage == index ? Color("green200") : Color.gray.opacity(0.5))
                            .frame(width: 80, height: 5)
                            .cornerRadius(5)
                    }
                }
                .padding(.bottom, 100) // Adjust based on design
            }
        }
        .ignoresSafeArea(.all)
        .fullScreenCover(isPresented: $viewModel.isFinished) {
            NavigationView { // Provide NavigationView here for SignupView
                SignupView(viewModel: SignupViewModel())
            }
        }
    }
}

struct OnboardingPageView: View {
    let page: OnboardingPage
    let isLastPage: Bool
    let onNext: () -> Void

    var body: some View {
        ZStack {
            // Background Image (Stretched to fit the entire screen)
            Image(page.imageName)
                .resizable()
                .scaledToFill()
                .frame(width: UIScreen.main.bounds.width, height: UIScreen.main.bounds.height)
                .clipped()
                .ignoresSafeArea(.all)
            
            LinearGradient(
                gradient: Gradient(colors: [Color.clear, Color.black.opacity(0.9)]),
                startPoint: .top,
                endPoint: .bottom
            )
            .ignoresSafeArea(.all)
            
            // Content Overlay
            VStack {
                Spacer()

                VStack(spacing: 16) {
                    Text(page.title)
                        .font(.title)
                        .fontWeight(.bold)
                        .foregroundColor(.white)
                        .multilineTextAlignment(.center)

                    if !page.description.isEmpty {
                        Text(page.description)
                            .font(.body)
                            .foregroundColor(.white.opacity(0.9))
                            .multilineTextAlignment(.center)
                            .padding(.horizontal, 20)
                    }
                }
                .padding(.horizontal, 10)
                .padding(.top, 450)

                Spacer()

                Button(action: {
                    onNext()
                }) {
                    Text(isLastPage ? "Get Started!" : "Next")
                        .frame(maxWidth: .infinity)
                        .padding()
                        .bold()
                        .background(Color("green600"))
                        .foregroundColor(.black)
                        .cornerRadius(10)
                }
                .padding(.horizontal, 40)
                .padding(.bottom, 40)
            }
        }
    }
}

struct OnboardingPage {
    let imageName: String
    let title: String
    let description: String
}

#Preview {
    OnboardingView()
}
