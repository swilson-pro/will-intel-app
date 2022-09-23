class AddMoreColumnsToProduct < ActiveRecord::Migration[7.0]
  def change
    add_column :products, :input_company_name, :string
  end
end
