class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :body
      t.integer :user_id
      t.string :title
      t.string :url
      t.string :image_name
      t.string :site_name
      t.string :description
      t.timestamps null: false
    end
  end
end
