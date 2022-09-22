class AddMoreColumnsToCompany < ActiveRecord::Migration[7.0]
  def change
    add_column :companies, :pb_companyID, :string
    add_column :companies, :company_also_known_as, :string
    add_column :companies, :parent_company, :string
    add_column :companies, :company_legal_name, :string
    add_column :companies, :primary_industry_sector, :string
    add_column :companies, :primary_industry_group, :string
    add_column :companies, :primary_industry_code, :string
  end
end
