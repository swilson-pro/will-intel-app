class ChangelinkedinRegularyCompanyUrlTolinkedinRegularCompanyUrl < ActiveRecord::Migration[7.0]
  def change
    rename_column :companies, :linkedin_regularyCompanyUrl, :linkedin_regularCompanyUrl
  end
end
