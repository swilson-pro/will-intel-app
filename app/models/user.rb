require 'bcrypt'

class User < ApplicationRecord
    has_secure_password
    has_many :contacts
    has_many :companies
    has_many :notes
    has_many :products, through: :companies

end
