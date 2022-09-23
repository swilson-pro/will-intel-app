class AddMoreColumnsToCompany < ActiveRecord::Migration[7.0]
  def change
    add_column :companies, :pb_companyID, :string
    add_column :companies, :company_also_known_as, :string
    add_column :companies, :parent_company, :string
    add_column :companies, :company_legal_name, :string
    add_column :companies, :primary_industry_sector, :string
    add_column :companies, :primary_industry_group, :string
    add_column :companies, :primary_industry_code, :string
    add_column :companies, :verticals, :string
    add_column :companies, :employees, :string
    add_column :companies, :year_founded, :string
    add_column :companies, :primary_contact_pbid, :string
    add_column :companies, :primary_contact, :string
    add_column :companies, :hq_location, :string
    add_column :companies, :hq_address_line_1, :string
    add_column :companies, :hq_address_line_2, :string
    add_column :companies, :hq_city, :string
    add_column :companies, :hq_state_or_province, :string
    add_column :companies, :hq_post_code, :string
    add_column :companies, :hq_country_or_terrirory, :string
    add_column :companies, :hq_phone, :string
    add_column :companies, :hq_email, :string
    add_column :companies, :hq_global_region, :string
    add_column :companies, :hq_global_sub_region, :string
    add_column :companies, :financing_status_note, :text
    

  end
end
