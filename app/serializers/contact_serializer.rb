class ContactSerializer < ActiveModel::Serializer
  attributes :id, :name, :company_name, :position, :phone, :email, :location, :bio, :twitter_url, :linkedin_profile_url, :linkedin_company_url, :user_id, :image_url, :owner_name, :company_id, :company_products, :company_logo, :input_owner_name, :real_company_name
end
