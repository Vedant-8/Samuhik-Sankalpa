//
//  UserModel.swift
//  SamuhikSeva
//
//  Created by Shrirang Zend on 22/01/25.
//

import Foundation
import SwiftData

@Model
class User {
    @Attribute(.unique) var email: String
    var password: String // Store a hashed password for security

    init(email: String, password: String) {
        self.email = email
        self.password = password
    }
}

