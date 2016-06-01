Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  resources :posts, :except => [:new, :edit, :index]
  root to: 'posts#index'
  get '/get_post', to: 'posts#get_post'
end
