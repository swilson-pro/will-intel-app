class CreateContacts < ActiveRecord::Migration[7.0]
  def change
    create_table :contacts do |t|
      t.string :name
      t.string :pbid
      t.string :company_name
      t.string :position
      t.string :bio
      t.string :phone
      t.string :email
      t.string :location
      t.string :twitter_url
      t.string :linkedin_profile_url
      t.string :linkedin_company_url

      t.timestamps
    end
  end
end
