class AddMoreColumnsToContact < ActiveRecord::Migration[7.0]
  def change
    add_column :contacts, :input_owner_name, :string
    add_column :contacts, :is_dupe_primary, :boolean
    add_column :contacts, :secondary_email, :string
    add_column :contacts, :secondary_phone, :string
  end
end
