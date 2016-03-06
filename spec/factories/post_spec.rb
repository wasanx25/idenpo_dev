FactoryGirl.define do
  factory :post do
    title: 'hoge'
    description: 'hogehoge'
    body: 'comment'
    url: 'http://hogehoge.com'
    image_url: 'hoge.jpg'
    site_name: 'hogesite'
  end
end
