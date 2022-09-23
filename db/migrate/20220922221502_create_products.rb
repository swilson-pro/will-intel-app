class CreateProducts < ActiveRecord::Migration[7.0]
  def change
    create_table :products do |t|
      t.string :brand
      t.string :name
      t.decimal :price
      t.string :price_sign
      t.string :currency
      t.string :image_link
      t.string :product_link
      t.string :website
      t.text :description
      t.string :rating
      t.string :category
      t.string :product_type
      t.string :api_featured_image
      t.integer :company_id

      t.timestamps
    end
  end
end
