class Product < ApplicationRecord
    belongs_to :company

    def company_name
        company.name
    end

    def owner_name
        company.user.name
    end
end
