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
        user = User.create!(first_name: params[:first_name], last_name: params[:last_name], name:params[:name], email:params[:email], password:params[:password], image:params[:image])
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

    def count
        users = User.all.length
        render json: users
    end


    # def show
    #     user = User.find(params[:id])
    #     render json: user
    # end
    def show_contacts
        user = User.find(params[:id])
        # contacts = user.contacts
        contacts = Contact.find_by(user_id: params[:id])
        if user
            render json: contacts
        else
            render json: {errors: contacts.errors.full_messages}, status: 422
        end
    end

    def count_contacts
        user = User.find(params[:id])
        contacts = user.contacts.length
        if user
            render json: contacts
        else
            render json: {errors: contacts.errors.full_messages}, status: 422
        end
    end

    def count_companies
        user = User.find(params[:id])
        companies = user.companies.length
        if user
            render json: companies
        else
            render json: {errors: companies.errors.full_messages}, status: 422
        end
    end

    def count_products
        user = User.find(params[:id])
        products = user.products.length
        if user
            render json: products
        else
            render json: {errors: products.errors.full_messages}, status: 422
        end
    end

    def notes
        user = User.find(params[:id])
        notes = user.notes.length
        if user
            render json: notes
        else
            render json: {errors: notes.errors.full_messages}, status: 422
        end
    end

    def shownames
        users = User.all.pluck(:name)
        render json: users
    end
end
