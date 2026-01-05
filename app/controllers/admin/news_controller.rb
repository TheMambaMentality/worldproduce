class Admin::NewsController < Admin::BaseController
  before_action :set_article, only: %i[show edit update destroy]

  def index
    @articles = Article.order(published_at: :desc)
  end

  def show
  end

  def new
    @article = Article.new(published_at: Time.current)
  end

  def create
    @article = Article.new(article_params)
    if @article.save
      redirect_to admin_news_path(@article), notice: "NEWSを作成しました"
    else
      render :new, status: :unprocessable_entity
    end
  end
  
  def update
    if @article.update(article_params)
      redirect_to admin_news_path(@article), notice: "NEWSを更新しました"
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @article.destroy
    redirect_to admin_news_index_path, notice: "NEWSを削除しました"
  end

  private

  def set_article
    @article = Article.find(params[:id])
  end

  def article_params
    params.require(:article).permit(:title, :body, :published_at, images: [])
  end
end