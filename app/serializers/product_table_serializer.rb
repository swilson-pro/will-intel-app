class ProductTableSerializer < ActiveModel::Serializer
  attributes :id, :brand, :name, :price, :price_sign, :currency, :image_link, :product_link, :website, :description, :rating, :category, :product_type, :api_featured_image, :company_id, :input_company_name

  # , :company_name, :owner_name

  
end
