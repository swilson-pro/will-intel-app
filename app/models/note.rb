class Note < ApplicationRecord
    belongs_to :contact
    belongs_to :user

    def user_name
        user.name
    end
end
