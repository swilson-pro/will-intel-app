class Product < ApplicationRecord
    belongs_to :company
    has_many :notes, as: :notable

    def company_name
        company.name
    end

    def company_logo
        company.logoUrl
    end

    def owner_name
        company.user.name
    end

    def company_contacts
        company.contacts
    end

    def company_products
        company.products
    end
end
