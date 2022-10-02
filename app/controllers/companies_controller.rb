class CompaniesController < ApplicationController
    require 'will_paginate/array'



    def paginated_companies

        puts "params: #{params}"
        passed_params = params.select {|k,v| k != "action" and k != "controller" and k != "page"}

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

        companies = Company.all.order("#{attribute} #{order}")
        paginated_companies = companies.paginate(page: params[:page], per_page: 20)
        render json: {
            companies: ActiveModel::Serializer::CollectionSerializer.new(paginated_companies, serializer: CompanyTableSerializer),
            page: paginated_companies.current_page,
            page_count: paginated_companies.total_pages
        }
    end

    def index
        companies = Company.all
        render json: companies, each_serializer: CompanyTableSerializer
    end

    def show
        company = Company.find(params[:id])
        render json: company, serializer: CompanySerializer
    end


    def names
        companies = Company.all
        names = companies.pluck(:id, :name)
        render json: names
    end
    def create
        company = Company.new(company_params)
        if company.save
            render json: company, status: 201
        else
            render json: { errors: company.errors.full_messages }, status: 422
        end
    end

    def update
        company = Company.find_by(id: params[:id])
        if company
            if params[:name]
                company.update(name: params[:name])
            end
            if params[:website]
                company.update(website: params[:website])
            end
            if params[:linkedin_regularCompanyUrl]
                company.update(linkedin_regularCompanyUrl: params[:linkedin_regularCompanyUrl])
            end
            if params[:description]
                company.update(description: params[:description])
            end
        end
    end

    def destroy
        company = Company.find_by(id: params[:id])
        if company
            company.destroy
            render json: {}, status: 200
        else
            render json: { errors: "Company not found" }, status: 404
        end
    end

    private

    def company_params
        params.permit(
            :user_id,
            :name,
            :linkedin_company_id,
            :linkedin_regularCompanyUrl,
            :logoUrl,
            :description,
            :website
        )
    end
end
