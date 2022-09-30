class User < ApplicationRecord
    has_many :contacts
    has_many :companies
    has_many :notes
end
