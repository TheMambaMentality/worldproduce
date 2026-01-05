class NewsController < ApplicationController
  before_action :set_news, only: %i[show]

  def index
    @news = Article.published.order(published_at: :desc)
  end

  def show
    @prev_news = Article.published
                        .where("published_at > ?", @news.published_at)
                        .order(published_at: :asc)
                        .first

    @next_news = Article.published
                        .where("published_at < ?", @news.published_at)
                        .order(published_at: :desc)
                        .first
  end

  private

  def set_news
    @news = Article.published.find(params[:id])
  end
end