//
//  Drawer.swift
//  SamuhikSeva
//
//  Created by Shrirang Zend on 22/01/25.
//

import SwiftUI

struct DrawerView: View {
    @Binding var isDrawerOpen: Bool
    
    let menuItems: [String] = [
        "Home",
        "Profile",
        "Settings",
        "Help",
        "Logout"
    ]

    var body: some View {
        VStack(alignment: .leading) {
            ForEach(menuItems, id: \ .self) { item in
                Button(action: {
                    print("\(item) selected")
                }) {
                    Text(item)
                        .font(.headline)
                        .padding(.vertical, 20)
                        .padding(.leading, 30)
                        .foregroundColor(.primary)
                }
                .frame(maxWidth: .infinity, alignment: .leading)
            }
            Spacer()
        }
        .padding(.top, 100)
        .frame(width: 200)
        .background(Color(UIColor.systemGray6))
        .edgesIgnoringSafeArea(.all)
        .gesture(
            DragGesture().onEnded { value in
                if value.translation.width < -100 { // Swipe left to close
                    withAnimation {
                        isDrawerOpen = false
                    }
                }
            }
        )
    }
}

struct DrawerView_Previews: PreviewProvider {
    static var previews: some View {
        DrawerView(isDrawerOpen: .constant(true))
    }
}
