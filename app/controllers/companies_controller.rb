class CompaniesController < ApplicationController
    def index
        companies = Company.all
        render json: companies, each_serializer: CompanyTableSerializer
    end

    def show
        company = Company.find(params[:id])
        render json: company, serializer: CompanySerializer
    end

    def create
        company = Company.new(company_params)
        if company.save
            render json: company, status: 201
        else
            render json: { errors: company.errors.full_messages }, status: 422
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
