class AddMoreColumnsToContact < ActiveRecord::Migration[7.0]
  def change
    add_column :contacts, :input_owner_name, :string
  end
end
