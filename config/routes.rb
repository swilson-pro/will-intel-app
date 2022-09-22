Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  get '/contacts', to: 'contacts#index'
  post '/contacts', to: 'contacts#create'
  delete '/contacts/:id', to: 'contacts#destroy'

  get '/users', to: 'users#index'
  get'/users_names', to: 'users#shownames'


  get '/companies', to: 'companies#index'
  post '/companies', to: 'companies#create'
end
