require 'rails_helper'

RSpec.describe PostsController, type: :controller do
  describe '#create' do
    it 'save og:title, og:site_name, og:description, og:image' do
      expect(create).to eq true
    end
    # TODO ミニマムだといらない
    # it 'save title tag when no og:title' do
    #
    # end
    # it 'save title tag when no og:site_name' do
    #
    # end
    # it 'save description tag when no og:description' do
    #
    # end
    # it 'save 32 points in body tag when no og:description and description' do
    #
    # end
    # it 'save first image in body tag when no og:image' do
    #
    # end
    # it 'save dummy image when no og:image first image in body' do
    #
    # end
  end
end
