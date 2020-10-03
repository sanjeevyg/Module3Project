class User < ApplicationRecord
    has_one :profile
    has_secure_password 
    validates :name, :username, :email, :password, presence: true
    validates :username, length: { minimum: 6, maximum: 18, message: "%{attribute} must be between 6 and 18 characters" }
    validates :username, uniqueness: { message: "%{attribute} must be unique, and %{value} has already been taken." }
    validates :password, length: { minimum: 6, maximum: 18, message: "%{attribute} must be between 6 and 18 characters" }
end
