class PagesController < ApplicationController
  def home
    @latest_news = Article.published
                          .order(published_at: :desc)
                          .limit(5)
  end
end