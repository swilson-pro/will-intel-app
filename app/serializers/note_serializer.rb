class NoteSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :content, :created_at, :updated_at, :user_name

  belongs_to :notable
end
