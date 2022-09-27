class Contact < ApplicationRecord
    belongs_to :user
    belongs_to :company
    
    # def page_count
    #     Contact.count / 10
    # end
    def owner_name
        user.name
    end
    
    def company_products
        company.products
    end
    
    def company_logo
        company.logoUrl
    end
    
    def real_company_name
        company.name
    end
end
    