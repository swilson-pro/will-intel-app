class Note < ApplicationRecord
    belongs_to :user
    belongs_to :notable, polymorphic: true
    

    def user_name
        user.name
    end
end
