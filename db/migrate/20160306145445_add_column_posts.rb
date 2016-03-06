class AddColumnPosts < ActiveRecord::Migration
  def change
    add_column :posts, :title, :string
    add_column :posts, :url, :string
    add_column :posts, :image_name, :string
    add_column :posts, :site_name, :string
    add_column :posts, :description, :string
  end
end
