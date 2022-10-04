class AddMoreColumnsToNote < ActiveRecord::Migration[7.0]
  def change
    add_column :notes, :notable_id, :integer
    add_column :notes, :notable_type, :string
    add_index :notes, [:notable_id, :notable_type]
    remove_column :notes, :contact_id, :integer
  end
end
