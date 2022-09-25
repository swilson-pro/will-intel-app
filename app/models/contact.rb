class Contact < ApplicationRecord
    belongs_to :user
    belongs_to :company
end

def owner_name
    user.name
end

def company_products
    company.products
end

def company_logo
    company.logoUrl
end
