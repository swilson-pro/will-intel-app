class CompaniesController < ApplicationController
    def index
        companies = Company.all
        render json: companies
    end

    def create
        company = Company.new(company_params)
        if company.save
            render json: company, status: 201
        else
            render json: { errors: company.errors.full_messages }, status: 422
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
