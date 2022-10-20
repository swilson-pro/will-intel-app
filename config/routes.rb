Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"


  # pagination
  get '/users', to: 'users#index'
  get '/count_users', to: 'users#count'
  get '/usercontacts/:id', to: 'users#show_contacts'
  get '/usercontactscount/:id', to: 'users#count_contacts'
  get '/usercompaniescount/:id', to: 'users#count_companies'
  get '/userproductscount/:id', to: 'users#count_products'
  get '/usernotescount/:id', to: 'users#count_contacts'
  get '/users/:id', to: 'users#show'
  get '/users_names', to: 'users#shownames'
  post '/users', to: 'users#create'
  get '/user_name_objects', to: 'users#user_name_objects'

  post '/login', to: 'users#login'

  get '/profile', to: 'users#profile'



  namespace :api do
    # resources :notes, only: [:index]

    # get "/me", to: "chickens#show"
    # post "/signup", to: "users#create"
    # post "/login", to: "sessions#create"
    # delete "/logout", to: "sessions#destroy"

    get '/companies_paginated/:page', to: 'companies#paginated_companies'

    get '/notes', to: 'notes#index'
    get '/count_notes', to: 'notes#count'
    get '/notes/:id', to: 'notes#show'
    post '/notes', to: 'notes#create'
    delete '/notes/:id', to: 'notes#destroy'

    get '/companies', to: 'companies#index'
    get '/count_companies', to: 'companies#count'
    get '/companies/:id', to: 'companies#show'
    get '/companies_names', to: 'companies#names'
    post '/companies', to: 'companies#create'
    patch '/companies/:id', to: 'companies#update'
    delete '/companies/:id', to: 'companies#destroy'

    get '/owners_contacts/:user_id', to: 'contacts#owners_contacts'

    get '/contacts_paginated/:page', to: 'contacts#paginated_contacts'
    get '/owners_contacts_paginated/:user_id/:page', to: 'contacts#owners_contacts_paginated'

    get '/contacts', to: 'contacts#index'
    get '/count_contacts', to: 'contacts#count'
    get '/contacts/:id', to: 'contacts#show'
    get '/dupes/contacts', to: 'contacts#dupes'
    get '/dupenames/contacts', to: 'contacts#dupe_names'
    post '/contacts', to: 'contacts#create'
    patch '/contacts/:id', to: 'contacts#update'
    delete '/contacts/:id', to: 'contacts#destroy'

    get '/products_paginated/:page', to: 'products#paginated_products'

    get '/products', to: 'products#index'
    get '/count_products', to: 'products#count'
    get '/products/:id', to: 'products#show'
    post '/products', to: 'products#create'
    patch '/products/:id', to: 'products#update'
    delete '/products/:id', to: 'products#destroy'
    get '/chickens', to: 'chickens#index'
    get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
  end
end
