class ContactTableSerializer < ActiveModel::Serializer
  attributes :id, :name, :company_name, :real_company_name, :position, :phone, :email, :location, :twitter_url, :linkedin_profile_url, :linkedin_company_url, :user_id, :image_url, :owner_name, :company_id, :bio, :notes, :notes_count
end
