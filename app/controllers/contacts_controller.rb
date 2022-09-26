class ContactsController < ApplicationController

    def index
        contacts = Contact.all
        render json: contacts, each_serializer: ContactTableSerializer
    end

    def show
        contact = Contact.find(params[:id])
        render json: contact, serializer: ContactSerializer
    end

    def create
        contact = Contact.new(contact_params)
        if contact.save
            render json: contact, status: 201
        else
            render json: { errors: contact.errors.full_messages }, status: 422
        end
        
    end

    # def update
    #     contact = Contact.find_by(id: params[:id])
    #     if contact
    #         contact.assign_attributes(
    #             name: params[:name],
    #             phone: params[:phone],
    #             email: params[:email],
    #             image_url: params[:image_url],
    #             company_name: params[:company_name],
    #             position: params[:position],
    #             bio: params[:bio]
    #         )

    #         contact.company_id = Company.find_or_create_by(name: contact.company_name, user_id: User.first.id).id

    #         contact.save
    #         render json: contact, status: 204
    #     else
    #         render json: {error: "Contact not found"}, status: 422
    #     end
    # end


    def update
        contact = Contact.find_by(id: params[:id])
        if contact
            company = Company.find_or_create_by(name: params[:company_name], user_id: contact.user_id)

            # params[:name] ? contact.update(name: params[:name]) | contact.update(name: contact.name)
            if params[:name]
                contact.update(name: params[:name])
            end

            if params[:phone]
                contact.update(phone: params[:phone])
            end
            if params[:email]
                contact.update(email: params[:email])
            end
            if params[:image_url]
                contact.update(image_url: params[:image_url])
            end
            if params[:company_name]
                contact.update(company_name: params[:company_name])
            end
            if params[:position]
                contact.update(position: params[:position])
            end
            if params[:bio]
                contact.update(bio: params[:bio])
            end

            render json: contact, status: 204
        else
            render json: {error: "Contact not found"}, status: 422
        end
    end

    def destroy
        contact = Contact.find_by(id: params[:id])
        if contact
            contact.destroy
            render json: {}, status: 200
        else
            render json: { errors: "Contact not found" }, status: 404
        end
    end


    private

    def contact_params
        params.permit(
            :name,
            :pbid,
            :company_name,
            :position,
            :bio,
            :phone,
            :email,
            :location,
            :twitter_url,
            :linkedin_profile_url,
            :linkedin_company_url,
            :user_id,
            :company_id,
            :image_url
        )

    end

end
