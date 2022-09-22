class CreateCompanies < ActiveRecord::Migration[7.0]
  def change
    create_table :companies do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.string :name
      t.string :linkedin_company_id
      t.string :linkedin_regularyCompanyUrl
      t.string :logoUrl
      t.text :description
      t.string :website

      t.timestamps
    end
  end
end
