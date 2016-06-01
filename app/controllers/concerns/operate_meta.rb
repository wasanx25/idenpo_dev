module OperateMeta
  extend ActiveSupport::Concern

  def scraping_and_save(url, body)
    page = MetaInspector.new(url, faraday_options: { ssl: { verify: false } })
    @new_post = Post.new(url: url, body: body, user_id: @user_id)
    add_ogps(page.meta_tags['property'])
    @new_post[:image_name] = URI.join(url, @new_post[:image_name])
    begin
      @new_post.save
      save_keywords(page.meta_tags['name']['keywords'])
    end
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
