import SwiftUI

struct CustomTabViewTemplate<Content: View>: View {
    @Binding var selectedTab: String
    let tabs: [TabItem] // Pass an array of TabItem objects to define the tabs
    let content: (String) -> Content // Closure to determine the content based on the selected tab

    var body: some View {
        VStack(spacing: 0) {
            // Rendered content
            content(selectedTab)
                .frame(maxHeight: .infinity) // Occupy available space

            // TabView at the bottom
            HStack {
                ForEach(tabs, id: \.iconName) { tab in
                    TabButton(iconName: tab.iconName, selectedTab: $selectedTab)
                }
            }
            .padding(.vertical, 8)
            .background(
                BlurView(style: .systemMaterial)
                    .cornerRadius(25)
            )
            .padding(.horizontal)
        }
        .frame(maxHeight: .infinity, alignment: .bottom)
    }
}

struct TabItem {
    let iconName: String
    let label: String
}

struct TabButton: View {
    let iconName: String
    @Binding var selectedTab: String

    var body: some View {
        GeometryReader { button in
            Button {
                withAnimation(.linear(duration: 0.3)) {
                    selectedTab = iconName
                }
            } label: {
                VStack {
                    Image(systemName: "\(iconName)\(selectedTab == iconName ? ".fill" : "")")
                        .resizable()
                        .aspectRatio(contentMode: .fit)
                        .frame(width: 25, height: 25) // Adjusted size
                        .offset(y: selectedTab == iconName ? -5 : 0)
                        .scaleEffect(selectedTab == iconName ? 1.3 : 1.0)
                        .foregroundColor(selectedTab == iconName ? .black : Color.gray)

                    RoundedRectangle(cornerRadius: 1)
                        .frame(width: 20, height: 2)
                        .foregroundColor(selectedTab == iconName ? .black : Color.gray)
                        .opacity(selectedTab == iconName ? 1.0 : 0.0)
                        .padding(.top, 2)
                }
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
        }
        .frame(height: 50) // Adjusted height
    }
}

struct BlurView: UIViewRepresentable {
    var style: UIBlurEffect.Style

    func makeUIView(context: Context) -> UIVisualEffectView {
        let view = UIVisualEffectView(effect: UIBlurEffect(style: style))
        return view
    }

    func updateUIView(_ uiView: UIVisualEffectView, context: Context) {}
}

struct CustomTabViewTemplate_Previews: PreviewProvider {
    static var previews: some View {
        CustomTabViewTemplate(
            selectedTab: .constant("house"),
            tabs: [
                TabItem(iconName: "person", label: "Profile"),
                TabItem(iconName: "message", label: "Chatbot"),
                TabItem(iconName: "music.note.tv", label: "Song Player")
            ],
            content: { selectedTab in
                switch selectedTab {
                case "person":
                    Text("Profile Content")
                case "message":
                    Text("Chatbot Content")
                case "music.note.tv":
                    Text("Song Player Content")
                default:
                    Text("Profile Content")
                }
            }
        )
    }
}
