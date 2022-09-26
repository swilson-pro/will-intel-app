class Company < ApplicationRecord
  belongs_to :user
  has_many :contacts
  has_many :products
end

def owner_name
  user.name
end

def contacts_count
  contacts.length
end
