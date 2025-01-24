//
//  ExploreView.swift
//  SamuhikSeva
//
//  Created by Shrirang Zend on 22/01/25.
//

import SwiftUI

struct ExploreView: View {
    @State private var projects: [Project] = []
    @State private var topCardIndex = 0
    @State private var dragOffset: CGSize = .zero

    var body: some View {
        ZStack {
            ForEach((0..<projects.count).reversed(), id: \ .self) { index in
                if index >= topCardIndex {
                    ProjectCardView(project: projects[index])
                        .zIndex(Double(projects.count - index)) // Ensure proper stacking order
                        .offset(
                            x: index == topCardIndex ? dragOffset.width : 0,
                            y: CGFloat(index - topCardIndex) * 10 + (index == topCardIndex ? dragOffset.height : 0)
                        )
                        .scaleEffect(index == topCardIndex ? 1.0 : 0.95)
                        .rotationEffect(
                            .degrees(index == topCardIndex ? 0 : Double(index - topCardIndex) * 3)
                        )
                        .gesture(
                            index == topCardIndex ?
                                DragGesture()
                                    .onChanged { value in
                                        handleDrag(value.translation)
                                    }
                                    .onEnded { value in
                                        handleDragEnd(value.translation)
                                    }
                                : nil
                        )
                        .animation(.easeInOut, value: dragOffset)
                }
            }

            if topCardIndex >= projects.count {
                Text("No more projects!")
                    .font(.headline)
                    .foregroundColor(.gray)
            }
        }
        .padding()
        .onAppear {
            loadProjects()
        }
        .navigationBarHidden(true) // Ensures no system navigation bar
        .navigationBarBackButtonHidden(true) // Removes the back button if navigating here
    }

    private func handleDrag(_ translation: CGSize) {
        dragOffset = translation
    }

    private func handleDragEnd(_ translation: CGSize) {
        if abs(translation.width) > 100 {
            withAnimation {
                dragOffset = .zero
                topCardIndex += 1
            }
        } else {
            withAnimation {
                dragOffset = .zero
            }
        }
    }

    private func loadProjects() {
        if let url = Bundle.main.url(forResource: "projects", withExtension: "json") {
            do {
                let data = try Data(contentsOf: url)
                let decodedProjects = try JSONDecoder().decode([Project].self, from: data)
                projects = decodedProjects
            } catch {
                print("Error loading projects: \(error)")
            }
        } else {
            print("JSON file not found!")
        }
    }
}

struct ExploreView_Previews: PreviewProvider {
    static var previews: some View {
        ExploreView()
    }
}
