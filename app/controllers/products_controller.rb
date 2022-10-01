class ProductsController < ApplicationController
    require 'will_paginate/array'

    def paginated_products

        puts "params: #{params}"

        passed_params = params.select {|k,v| k != "controller" and k != "action" and k != "page"}

        puts "passed_params: #{passed_params}"

        params_keys = passed_params.keys
        puts "params_keys: #{params_keys}"

        params_values = passed_params.values
        puts "params_values: #{params_values}"

        attribute = "#{params_keys.shift}"
        puts "attribute: #{attribute}"
        order = "#{params_values.shift}"
        puts "order: #{order}"

        puts "attribute.parameterize.underscore.to_sym: #{attribute.parameterize.underscore.to_sym}"


        products = Product.all.order("#{attribute} #{order}")
        paginated_products = products.paginate(page: params[:page], per_page: 10)
        render json: {
            products: ActiveModel::Serializer::CollectionSerializer.new(paginated_products, serializer: ProductTableSerializer),
            page: paginated_products.current_page,
            page_count: paginated_products.total_pages
        }
    end

    def index
        products = Product.all
        render json: products, each_serializer: ProductTableSerializer
    end

    def show
        product = Product.find(params[:id])
        render json: product, serializer: ProductSerializer
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

    def update
        product = Product.find(params[:id])
        if params[:name]
            product.update(name: params[:name])
        end
        if params[:brand]
            product.update(brand: params[:brand])
        end
        if params[:company_id]
            product.update(company_id: params[:company_id])
        end
        if params[:product_link]
            product.update(product_link: params[:product_link])
        end   
        if params[:website]
            product.update(website: params[:website])
        end          
        if params[:description]
            product.update(description: params[:description])
        end     

    end

    def destroy
        product = Product.find(params[:id])
        if product
            product.destroy
            render json: {}, status: 200
        else
            render json: { errors: "Product not found" }, status: 404
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
