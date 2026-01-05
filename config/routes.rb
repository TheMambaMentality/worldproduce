Rails.application.routes.draw do
  devise_for :admins

  # -------------------------
  # Public（公開側）
  # -------------------------
  root "pages#home"

  # News（中身は Article）
  resources :news, controller: "news", only: [:index, :show]

  get "store",   to: "store#index"
  get "company", to: "company#index"
  get "contact", to: "contact#index"

  # お問い合わせ送信（POSTだけ）
  resources :inquiries, only: [:create]

  # -------------------------
  # Admin（管理側）
  # -------------------------
  namespace :admin do
    root to: "dashboard#index"
    resources :news
    resources :inquiries, only: [:index, :show, :destroy]
  end
end