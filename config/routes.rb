Rails.application.routes.draw do
  resources :products, only: %i[index show edit new create update destroy]
  resources :warehouses, only: %i[index show edit new create update destroy]
end
