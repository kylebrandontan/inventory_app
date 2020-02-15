require 'rails_helper'

RSpec.describe 'Shows the Product page', type: :system do
  it 'shows all product information', :js do
    product = create(:product, sku: 'CAS-012', name: 'Casio Watch')

    visit "/products/#{product.id}"

    expect(page).to have_attribute_for('sku', para_sa: product)
    expect(page).to have_attribute_for('name', para_sa: product)
  end

  private

  def have_attribute_for(name, para_sa:)
    have_css("#product--#{para_sa.id}_#{name}", text: value)
  end
end
