//
//  HomeView.swift
//  SamuhikSeva
//
//  Created by Shrirang Zend on 22/01/25.
//

import SwiftUI

struct HomeView: View {
    @State private var selectedTab = "house"
    @State private var isDrawerOpen = false
    @State private var isTabViewVisible = true
    @State private var lastScrollOffset: CGFloat = 0

    var body: some View {
        ZStack(alignment: .leading) {
            // Main Content Area
            VStack(spacing: 0) {
                // Top App Bar
                HStack {
                    Button(action: {
                        withAnimation {
                            isDrawerOpen.toggle()
                        }
                    }) {
                        Image(systemName: "line.horizontal.3")
                            .resizable()
                            .frame(width: 25, height: 20)
                            .padding()
                            .foregroundColor(Color.green)
                    }

                    Spacer()

                    Text(pageTitle(for: selectedTab))
                        .font(.headline)

                    Spacer()

                    Image(systemName: "bell")
                        .resizable()
                        .frame(width: 25, height: 25)
                        .padding()
                }
                .background(Color.white)
                .zIndex(2) // Ensure top bar is above content

                // ScrollView for main content
                ScrollView {
                    GeometryReader { geometry in
                        Color.clear
                            .onAppear {
                                lastScrollOffset = geometry.frame(in: .global).minY
                            }
                            .onChange(of: geometry.frame(in: .global).minY) { newOffset in
                                handleScroll(newOffset: newOffset)
                            }
                    }
                    .frame(height: 0) // Prevent overlap
                }
            }

            // Drawer View
            if isDrawerOpen {
                Color.black.opacity(0.3)
                    .ignoresSafeArea()
                    .onTapGesture {
                        withAnimation {
                            isDrawerOpen = false
                        }
                    }
                    .zIndex(3)

                DrawerView(isDrawerOpen: $isDrawerOpen)
                    .frame(width: 200)
                    .transition(.move(edge: .leading))
                    .zIndex(4)
            }

            // Custom TabViewTemplate
            if isTabViewVisible {
                CustomTabViewTemplate(
                    selectedTab: $selectedTab,
                    tabs: [
                        TabItem(iconName: "house", label: "Home"),
                        TabItem(iconName: "map", label: "Explore"),
                        TabItem(iconName: "bag", label: "Shop"),
                        TabItem(iconName: "trophy", label: "Leaderboards"),
                        TabItem(iconName: "person", label: "Profile")
                    ],
                    content: { selectedTab in
                        Group {
                            switch selectedTab {
                            case "house":
                                HomeContentView()
                                    .padding(.top, 50)
                            case "map":
                                ExploreView()
                                    .navigationBarHidden(true)
                                    .navigationBarBackButtonHidden(true)
                            case "bag":
                                ShopView()
                                    .navigationBarHidden(true)
                                    .navigationBarBackButtonHidden(true)
                            case "trophy":
                                Text("Leaderboards")
                            case "person":
                                RewardsView()
                                    .navigationBarHidden(true)
                                    .navigationBarBackButtonHidden(true)
                            default:
                                EmptyView()
                            }
                        }
                    }
                )
                .opacity(isTabViewVisible ? 1 : 0)
                .zIndex(1)
            }
        }
        .navigationBarHidden(true) // Ensure no system navigation bar
    }

    // Helper function for TabView titles
    private func pageTitle(for tab: String) -> String {
        switch tab {
        case "house": return "Home"
        case "map": return "Explore"
        case "bag": return "Shop"
        case "trophy": return "Leaderboards"
        case "person": return "Profile"
        default: return "Home"
        }
    }

    // Scroll handling to show/hide TabView
    private func handleScroll(newOffset: CGFloat) {
        let threshold: CGFloat = 50
        let delta = newOffset - lastScrollOffset

//        if delta < -threshold, !isTabViewVisible {
//            withAnimation {
//                isTabViewVisible = true
//            }
//        } else if delta > threshold, isTabViewVisible {
//            withAnimation {
//                isTabViewVisible = false
//            }
//        }

        lastScrollOffset = newOffset
    }
}

struct HomeView_Previews: PreviewProvider {
    static var previews: some View {
        HomeView()
    }
}
