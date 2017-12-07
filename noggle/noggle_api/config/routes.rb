Rails.application.routes.draw do
  resources :games
  resources :users
  resources :scores

  post '/messages', to: 'messages#create'
  
  mount ActionCable.server, at: '/cable'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
