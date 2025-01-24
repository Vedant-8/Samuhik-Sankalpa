//
//  SignupView.swift
//  SamuhikSeva
//
//  Created by Shrirang Zend on 22/01/25.
//

import SwiftData
import SwiftUI

struct SignupView: View {
    @Environment(\.modelContext) private var context
    @ObservedObject var viewModel: SignupViewModel
    @State private var navigateToHome = false

    var body: some View {
        VStack(spacing: 16) {
            Spacer()

            // Title
            Text("Create new account")
                .font(.largeTitle)
                .fontWeight(.bold)
                .foregroundColor(Color("green200"))

            // Email Field
            TextField("Email", text: $viewModel.email)
                .keyboardType(.emailAddress)
                .autocapitalization(.none)
                .padding()
                .background(Color(.secondarySystemBackground))
                .cornerRadius(10)

            // Password Field
            SecureField("Password", text: $viewModel.password)
                .padding()
                .background(Color(.secondarySystemBackground))
                .cornerRadius(10)

            // Password Validation Hints
            VStack(alignment: .leading, spacing: 8) {
                ValidationCheckbox(isChecked: viewModel.hasLetter, text: "At least one letter")
                ValidationCheckbox(isChecked: viewModel.isPasswordLengthValid, text: "Minimum 8 characters")
                ValidationCheckbox(isChecked: viewModel.hasSpecialCharacter, text: "At least one special character (!@#%^&*)")
                ValidationCheckbox(isChecked: viewModel.hasNumber, text: "At least one number")
            }
            .padding(.top, 8)

            // Signup Button
            Button(action: {
                viewModel.signUp(context: context)
                if !viewModel.showError { // Navigate only if no errors
                    navigateToHome = true
                }
            }) {
                Text("Sign up")
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(Color("green600"))
                    .foregroundColor(.black)
                    .cornerRadius(10)
            }
            .background(
                NavigationLink("", destination: HomeView(), isActive: $navigateToHome)
                    .hidden()
            )
            .padding(.top, 20)

            Spacer()

            // Navigation to Login
            HStack {
                Text("Already have an account?")
                    .foregroundColor(.gray)

                NavigationLink(destination: LoginView(viewModel: LoginViewModel())) {
                    Text("Sign in")
                        .foregroundColor(Color("green400"))
                        .fontWeight(.bold)
                }
            }
        }
        .padding()
        .background(Color.black.ignoresSafeArea())
        .navigationBarBackButtonHidden(true)
    }
}


struct ValidationCheckbox: View {
    let isChecked: Bool
    let text: String

    var body: some View {
        HStack {
            Image(systemName: isChecked ? "checkmark.square" : "square")
                .foregroundColor(isChecked ? .green : .gray)
            Text(text)
                .foregroundColor(.gray)
        }
        .font(.footnote)
    }
}

struct SignUpView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationView { // Ensures navigation works in previews
            SignupView(viewModel: SignupViewModel())
        }
    }
}
