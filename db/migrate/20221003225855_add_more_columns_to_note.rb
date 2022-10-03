class AddMoreColumnsToNote < ActiveRecord::Migration[7.0]
  def change
    add_column :notes, :notable_id, :integer
    add_column :notes, :notable_type, :string
  end
end
