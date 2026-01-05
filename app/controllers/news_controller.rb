class NewsController < ApplicationController
  def index
    @news = Article.published.order(published_at: :desc)
  end

  def show
    @news = Article.published.find(params[:id])
  end
end