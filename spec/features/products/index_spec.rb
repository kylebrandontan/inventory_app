require 'rails_helper'

RSpec.describe 'Index of all Products page', type: :feature do
  it 'has a table of products' do
    create_list(:product, 5)

    visit '/products'

    expect(page).to have_a_products_table
    expect(page).to have_products_with(count: 5)
    expect(page).to have_table_header_with(text: 'SKU')
    expect(page).to have_table_header_with(text: 'Name')
    expect(page).to have_table_header_with(text: 'Updated At')
  end

  private
  def have_a_products_table
    have_css('table#products-table')
  end

  def have_products_with(count:)
    have_css('table tbody tr', count: count)
  end

  def have_table_header_with(text:)
    have_css('table thead tr th', text: text)
  end

end
