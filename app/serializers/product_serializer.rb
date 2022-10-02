class ProductSerializer < ActiveModel::Serializer
  attributes :id, :brand, :company_name, :name, :price, :price_sign, :currency, :image_link, :product_link, :website, :description, :rating, :category, :product_type, :api_featured_image, :company_id, :owner_name, :input_company_name, :company_contacts, :company_products
end
