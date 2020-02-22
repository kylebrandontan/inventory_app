Rails.application.routes.draw do
  devise_for :users

  root 'pages#homepage'

  resources :products, only: %i[index show edit new create update destroy]
  resources :warehouses, only: %i[index show edit new create update destroy]
  resources :stocks, only: %i[index new show create]
  resources :orders, only: %i[index show edit new create update destroy] do
    resources :order_items, only: %i[create destroy]
  end
end

#don't nest more than thrice
