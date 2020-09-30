Rails.application.routes.draw do
  resources :users, only: [:index, :show, :create, :update, :destroy]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  post "/login", to: "authentication#login"
  post "/profile", to: "users#profile"
  post "/profile/:username", to: "users#profile_by_user"
end
