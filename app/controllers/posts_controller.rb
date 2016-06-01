# Posts
class PostsController < ApplicationController
  before_action :authenticate_user!, :set_user
  protect_from_forgery with: :exception
  include OperateMeta
  
  def set_user
    @user_id = current_user.id unless current_user.id.blank?
  end
  
  def get_post
    posts = Post.where(user_id: @user_id).sort { |a, b| b <=> a }
    render :json => posts
  end

  def index
    @posts = Post.where(user_id: @user_id).sort { |a, b| b <=> a }
  end

  def create
    begin
      scraping_and_save(params[:url], params[:body])
    rescue
      raise
    end
    redirect_to '/'
  end

  def show
    post = Post.find(params[:id])
    agent = Mechanize.new
    page = agent.get(post.url)
    @post = page.search('body')
  end

  def update
    @post = Post.find(params[:id])
    @post.update(body: params[:post][:body])
    redirect_to '/posts'
  end

  def destroy
    @post = Post.find(params[:id])
    @post.delete
    render json: { post: @post }
  end
end
