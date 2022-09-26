Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

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
  delete '/companies/:id', to: 'companies#destroy'

  get '/products', to: 'products#index'
  get '/products/:id', to: 'products#show'
  post '/products', to: 'products#create'
end
