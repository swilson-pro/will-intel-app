class AddImageUrlToContacts < ActiveRecord::Migration[7.0]
  def change
    add_column :contacts, :image_url, :string
  end
end
