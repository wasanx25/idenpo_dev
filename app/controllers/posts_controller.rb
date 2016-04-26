# Posts
class PostsController < ApplicationController
  def index
    @posts = Post.all
  end

  def create
    @user_id = current_user.id unless current_user.id.blank?

    if scraping_and_save(params[:url], params[:body])
      redirect_to '/posts'
    else
      redirect_to '/posts/new'
    end
  end

  def new
    puts 'new'
  end

  def edit
    @post = Post.find(params[:id])
  end

  def show
    @post = Post.find(params[:id])
  end

  def update
    @post = Post.find(params[:id])
    @post.update(:body => params[:post][:body])
    redirect_to '/posts'
  end

  def destroy
    @post = Post.find(params[:id])
    @post.delete
    render :json => {:post => @post}
  end

  private

  def add_ogps(ogps)
    ogps.each do |key, value|
      v = value.to_s
      v = v.slice!(2...-2) if v =~ /\A\[.+\]\Z/
      set_ogp(key, v)
    end
  end

  def set_ogp(key, value)
    case key
    when 'og:title' then
      @new_post[:title] = value
    when 'og:description' then
      @new_post[:description] = value
    when 'og:site_name' then
      @new_post[:site_name] = value
    when 'og:image' then
      @new_post[:image_name] = value
    end
  end

  def scraping_and_save(url, body)
    page = MetaInspector.new(url)
    @new_post = Post.new(url: url, body: body, user_id: @user_id)
    add_ogps(page.meta_tags['property'])
    begin
      @new_post.save
      save_keywords(page.meta_tags['name']['keywords'])
    end
  end

  def save_keywords(keywords)
    keywords = keywords.to_s.split(/\s*,\s*/)
    return false if keywords.blank?
    keywords.each do |value|
      if value.start_with?('[')
        value = value.slice!(2..-1)
      elsif value =~ /\]\Z/
        value = value.slice!(0...-2)
      end
      Keyword.create(body: value, user_id: @user_id)
    end
  end
end
