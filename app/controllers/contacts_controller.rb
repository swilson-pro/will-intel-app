class ContactsController < ApplicationController
    require 'will_paginate/array'


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
        # puts request.query_parameters["brand"]

        # params.each do |key,value|
        #     puts "these are the params - #{key}: #{value}"
        # end

        # puts params

        passed_params = params.select {|k,v| k != "action" and k != "controller" and k != "page" and k != "contact"}
        puts "passed_params: #{passed_params}"

        # puts passed_params.keys

        params_keys = passed_params.keys
        puts "params_keys: #{params_keys}"

        params_values = passed_params.values
        puts "params_values: #{params_values}"
        
        # passed_params.each do |k|
        #     puts "i'm putsing #{k}"
        # end

        attribute = "#{params_keys.shift}"
        puts "attribute: #{attribute}"
        order = "#{params_values.shift}"
        puts "order: #{order}"

        puts "attribute.parameterize.underscore.to_sym: #{attribute.parameterize.underscore.to_sym}"
        


        # def sorter(a,b)
        #     if a == nil
        #     return 1
        #     end
        #     if b == nil
        #     return 0
        #     end
        #     a <=> b

        # end

        # Contact.all.sort {|a,b| sorter(a,b)}


        # @posts = Post.all.sort {|a,b| a.custom_method <=> b.custom_method}
        # contacts = Contact.all.sort {|a,b| a.name <=> b.name}

        # contacts = Contact.all.sort_by(&:company_name).reverse
        contacts = Contact.all.order("#{attribute} #{order}")

        # contacts = Contact.all.order("company_name asc")

        # contacts = Contact.all.order("#{attribute} ASC")
        # contacts = Contact.all.order("#{attribute} #{order}")
        # contacts.order(:position)
        paginated_contacts = contacts.paginate(page: params[:page], per_page: 20)

        # if request.query_parameters["brand"]
            # ?brand=nada ^^

        render json: {
            contacts: ActiveModel::Serializer::CollectionSerializer.new(paginated_contacts, serializer: ContactTableSerializer),
            page: paginated_contacts.current_page,
            page_count: paginated_contacts.total_pages
        }
    end

    def owners_contacts_paginated
        contacts = Contact.where(user_id: params[:user_id])
        paginated_contacts = contacts.paginate(page: params[:page], per_page: 20)
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

    def count
        contacts = Contact.all.length
        render json: contacts
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
