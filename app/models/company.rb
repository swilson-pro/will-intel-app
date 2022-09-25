class Company < ApplicationRecord
  belongs_to :user
  has_many :contacts
  has_many :products
end

def contacts_count
  contacts.length
end
