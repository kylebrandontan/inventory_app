class ProductsController < ApplicationController
  before_action :set_form_dependencies, only %i[new edit]

  def new

  end

  def edit

  end

  private

  def set_form_dependencies
    @products = Product.all
    @warehouses = Warehouse.all
  end
end
