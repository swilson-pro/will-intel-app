class UsersController < ApplicationController
    # before_action :set_user, only: %i[ show update destroy ]

    def index
        users = User.all
        render json: users
    end

    def show
        user = User.find(params[:id])
        render json: user
    end

    # POST /users

    def create
        user = User.create!(name:params[:name], email:params[:email], password:params[:password])
        render json: user
    end

    def login
        user = User.find_by(email:params[:email]).try(:authenticate, params[:password])
        if user
            token = generate_token(user.id)
            render json: { user: user, token: token }
        else
            render json: {error: "Invalid Password"}, status: 401
        end
    end

    def profile
        token = request.headers["token"]
        user_id = decode_token(token)
        user = User.find(user_id)
        if user
            render json: user
        else
            render json: {error: "401 incorrect token"}, status: 401
        end
    end

    def shownames
        users = User.all.pluck(:name)
        render json: users
    end


end
