class AdminController < ApplicationController
  before_action :authenticate_user!

  private
  # 
  # def redirect_to_products
  #   redirect_to products_path if user_signed_in?
  # end
end
