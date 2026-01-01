Rails.application.routes.draw do
  root "pages#home"

  get "news", to: "news#index"
  get "store", to: "store#index"
  get "company", to: "company#index"
  get "contact", to: "contact#index"
end