//
//  HomeContentView.swift
//  SamuhikSeva
//
//  Created by Shrirang Zend on 23/01/25.
//

import SwiftUI

struct HomeContentView: View {
    var body: some View {
        ScrollView {
            VStack(spacing: 20) {
                PhotoOverlaySection()
                HorizontalCardsView()
                VideoFrameSection()
            }
            .padding()
        }
    }
}

struct HomeContentView_Previews: PreviewProvider {
    static var previews: some View {
        HomeContentView()
    }
}
