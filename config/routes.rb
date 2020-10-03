Rails.application.routes.draw do
  resources :profiles
  resources :users, only: [:index, :show, :profile, :create, :update, :destroy]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  post "login", to: "authentication#login"
  # get "/profile", to: "users#profile"
  # get "/profile/:username", to: "users#profile_by_user"
end
