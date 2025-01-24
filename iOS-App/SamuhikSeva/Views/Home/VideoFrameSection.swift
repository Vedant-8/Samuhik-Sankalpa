//
//  VideoFrameSection.swift
//  SamuhikSeva
//
//  Created by Shrirang Zend on 23/01/25.
//

import SwiftUI

struct VideoFrameSection: View {
    var body: some View {
        VStack(alignment: .leading) {
            Text("Watch the Video")
                .font(.title2)
                .fontWeight(.bold)
                .padding(.bottom, 10)
            
            Rectangle()
                .fill(Color.gray.opacity(0.2))
                .frame(height: 200)
                .cornerRadius(10)
                .overlay(
                    Text("Video Frame")
                        .foregroundColor(.gray)
                        .font(.headline)
                )
        }
    }
}

#Preview {
    VideoFrameSection()
}
