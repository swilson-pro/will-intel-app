class CompanySerializer < ActiveModel::Serializer
  attributes :id, :name, :linkedin_company_id, :linkedin_regularCompanyUrl, :logoUrl, :description, :website, :pb_companyID, :company_also_known_as, :parent_company, :company_legal_name, :primary_industry_sector, :primary_industry_group, :primary_industry_code
end
