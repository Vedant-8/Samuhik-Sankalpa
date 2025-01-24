//
//  LoginView.swift
//  SamuhikSeva
//
//  Created by Shrirang Zend on 22/01/25.
//

import SwiftData
import SwiftUI

struct LoginView: View {
    @ObservedObject var viewModel: LoginViewModel
    @State private var navigateToHome = false
    @State private var showPassword = false // State for toggling password visibility

    var body: some View {
        VStack(spacing: 16) {
            Spacer()

            Text("Welcome back")
                .font(.largeTitle)
                .fontWeight(.bold)
                .foregroundColor(.white)

            Text("Please sign in to your account")
                .foregroundColor(.gray)

            TextField("Email", text: $viewModel.email)
                .keyboardType(.emailAddress)
                .autocapitalization(.none)
                .padding()
                .background(Color(.secondarySystemBackground))
                .cornerRadius(10)

            ZStack {
                if showPassword {
                    TextField("Password", text: $viewModel.password)
                        .padding()
                        .background(Color(.secondarySystemBackground))
                        .cornerRadius(10)
                } else {
                    SecureField("Password", text: $viewModel.password)
                        .padding()
                        .background(Color(.secondarySystemBackground))
                        .cornerRadius(10)
                }
                
                HStack {
                    Spacer()
                    Button(action: {
                        showPassword.toggle()
                    }) {
                        Image(systemName: showPassword ? "eye.slash.fill" : "eye.fill")
                            .foregroundColor(.gray)
                            .padding(.trailing, 10)
                    }
                }
            }

            Button(action: {
                viewModel.login()
                if viewModel.isAuthenticated {
                    navigateToHome = true
                }
            }) {
                Text("Sign in")
                    .frame(maxWidth: .infinity)
                    .bold()
                    .padding()
                    .background(Color("green600"))
                    .foregroundColor(.black)
                    .cornerRadius(10)
            }
            .background(
                NavigationLink("", destination: HomeView(), isActive: $navigateToHome)
                    .hidden()
            )

            Spacer()

            Text(viewModel.errorMessage)
                .foregroundColor(.red)
                .font(.caption)
                .padding(.top, 10)
        }
        .padding()
        .background(Color.black.ignoresSafeArea())
        .navigationBarBackButtonHidden(true)
    }
}



#Preview {
    NavigationView{
        LoginView(viewModel: LoginViewModel())
    }
}
