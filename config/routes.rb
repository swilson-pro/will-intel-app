Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"


  # pagination
  get '/contacts_paginated/:page', to: 'contacts#paginated_contacts'
  get '/owners_contacts_paginated/:user_id/:page', to: 'contacts#owners_contacts_paginated'



  get '/owners_contacts/:user_id', to: 'contacts#owners_contacts'


  get '/contacts', to: 'contacts#index'
  get '/contacts/:id', to: 'contacts#show'
  post '/contacts', to: 'contacts#create'
  patch '/contacts/:id', to: 'contacts#update'
  delete '/contacts/:id', to: 'contacts#destroy'

  get '/users', to: 'users#index'
  get'/users_names', to: 'users#shownames'


  get '/companies', to: 'companies#index'
  get '/companies/:id', to: 'companies#show'
  get '/companies_names', to: 'companies#names'
  post '/companies', to: 'companies#create'
  patch '/companies/:id', to: 'companies#update'
  delete '/companies/:id', to: 'companies#destroy'

  get '/products', to: 'products#index'
  get '/products/:id', to: 'products#show'
  post '/products', to: 'products#create'
  patch '/products/:id', to: 'products#update'
  delete '/products/:id', to: 'products#destroy'


  get '/notes', to: 'notes#index'
  get '/notes/:id', to: 'notes#show'
  post '/notes', to: 'notes#create'
end
