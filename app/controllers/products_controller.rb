class ProductsController < ApplicationController
    def index
        products = Product.all
        render json: products
    end

    def create
        # company = Company.find(name: params[input_company_name])
        # company = Company.find_by(input_company_name: params[:input_company_name])
        product = Product.new(
            name: params[:name],
            brand: params[:brand],
            input_company_name: params[:input_company_name],
            price: params[:price],
            image_link: params[:image_link],
            website: params[:website],
            product_type: params[:product_type],
            category: params[:category],
        )
        # product.company_id = Company.find_by(name: product.input_company_name).id || Company.create!(name: product.name, user_id: User.first.id).id
        # product.company_id = Company.find_by(name: product.input_company_name).id || Company.create!(name: product.name, user_id: User.first.id).id
        # product.company_id = Company.find_or_create_by(name: product.input_company_name).id
        product.company_id = Company.find_or_create_by(name: product.input_company_name, user_id: User.first.id).id

        if product.save
            render json: product, status: 201
        else
            render json: { errors: product.errors.full_messages }, status: 422
        end
    end

    private

    def product_params
        params.permit(
            :name,
            :brand,
            :input_company_name,
            :price,
            :image_link,
            :website,
            :product_type,
            :category,
            :company_id
        )
    end
end
