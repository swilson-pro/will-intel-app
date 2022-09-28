class ContactsController < ApplicationController


    # this first attempt was a workaround b/c we couldn't get serializer to be respected for the paginated contacts fetch. we ended up getting it working tho
    # def paginated_contacts
    #     contacts = Contact.all
    #     paginated_contacts = contacts.paginate(page: params[:page], per_page: 10)
    #     x = paginated_contacts.as_json(only: [:id, :name, :company_name, :real_company_name, :position, :phone, :email, :location, :twitter_url, :linkedin_profile_url, :linkedin_company_url, :user_id, :image_url, :owner_name, :company_id])

    #     render json: {
    #         contacts: x,
    #         page: paginated_contacts.current_page,
    #         page_count: paginated_contacts.total_pages
    #     }
    # end

    def paginated_contacts
        contacts = Contact.all
        paginated_contacts = contacts.paginate(page: params[:page], per_page: 10)
        render json: {
            contacts: ActiveModel::Serializer::CollectionSerializer.new(paginated_contacts, serializer: ContactTableSerializer),
            page: paginated_contacts.current_page,
            page_count: paginated_contacts.total_pages
        }
    end

    def owners_contacts_paginated
        contacts = Contact.where(user_id: params[:user_id])
        paginated_contacts = contacts.paginate(page: params[:page], per_page: 10)
        render json: {
            contacts: ActiveModel::Serializer::CollectionSerializer.new(paginated_contacts, serializer: ContactTableSerializer),
            page: paginated_contacts.current_page,
            page_count: paginated_contacts.total_pages
        }
    end

    def owners_contacts
        contacts = Contact.where(user_id: params[:user_id])
        if contacts
            render json: contacts, each_serializer: ContactTableSerializer
        else
            render json: { errors: contacts.errors.full_messages }, status: 422
        end
    end

    # this only finds 1 contact of that owner.
    # def owners_contacts
    #     contacts = Contact.find_by(user_id: params[:user_id])
    #     if contacts
    #     render json: contacts, each_serializer: ContactTableSerializer
    #     else
    #         render json: { errors: contact.errors.full_messages }, status: 422
    #     end
    # end

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
            # company = Company.find_or_create_by(name: params[:company_name], user_id: contact.user_id)
            # company = Company.find_by(name: params[:company_name], user_id: contact.user_id)
            # user = User.find_by(name: params[:input_owner_name])

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
            if params[:input_owner_name]
                contact.update(user_id: user.id)
            end
            if params[:user_id]
                contact.update(user_id: params[:user_id])
            end
            if params[:company_id]
                contact.update(company_id: params[:company_id])
            end
            if params[:company_name]
                contact.update(company_name: params[:company_name])
                contact.update(company_id: company.id)
            end
            if params[:position]
                contact.update(position: params[:position])
            end
            if params[:linkedin_profile_url]
                contact.update(linkedin_profile_url: params[:linkedin_profile_url])
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
