class CreateNotes < ActiveRecord::Migration[7.0]
  def change
    create_table :notes do |t|
      t.integer :user_id
      t.integer :contact_id
      t.text :content

      t.timestamps
    end
  end
end
