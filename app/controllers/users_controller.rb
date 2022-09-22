class UsersController < ApplicationController
    def index
        users = User.all
        render json: users
    end

    def shownames
        users = User.all.pluck(:name)
        render json: users
    end
end
