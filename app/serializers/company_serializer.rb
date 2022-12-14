class CompanySerializer < ActiveModel::Serializer
  attributes :id, :name, :linkedin_company_id, :linkedin_regularCompanyUrl, :logoUrl, :website, :description, :pb_companyID, :company_also_known_as, :parent_company, :company_legal_name, :primary_industry_sector, :primary_industry_group, :primary_industry_code, :verticals, :employees, :year_founded, :primary_contact_pbid, :primary_contact, :hq_location, :hq_address_line_1, :hq_address_line_2, :hq_city, :hq_state_or_province, :hq_post_code, :hq_country_or_terrirory, :hq_phone, :hq_email, :hq_global_region, :hq_global_sub_region, :financing_status_note, :products, :contacts, :user_id, :owner_name

  has_many :notes
end
