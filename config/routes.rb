Rails.application.routes.draw do
  root "pages#home"

  # News（中身は Article）
  resources :news, controller: "news", only: [:index, :show]

  get "store",   to: "store#index"
  get "company", to: "company#index"
  get "contact", to: "contact#index"
end