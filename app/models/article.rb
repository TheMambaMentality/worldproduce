class Article < ApplicationRecord
    validates :title, :body, :published_at, presence: true
  
    scope :published, -> { where("published_at <= ?", Time.current) }
  end