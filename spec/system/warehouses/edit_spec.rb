require 'rails_helper'

RSpec.describe 'Edit warehouse page', type: :system do
  it 'allows to edit a warehouse' do
    warehouse = create(:warehouse, street: "Tabora", city: "Manila", province: "NCR")

    visit "/warehouses/#{warehouse.id}/edit"

    expect(page).to have_value_of("Tabora", attr: 'street')
    expect(page).to have_value_of("Manila", attr: 'city')
    expect(page).to have_value_of("NCR", attr: 'province')

    fill_in_warehouse_field('name', with: 'Sony')
    fill_in_warehouse_field('sku', with: 'SNY-65-LED')
    submit_form

    #
    expect(page).to have_attribute_of('name', value: 'Sony', record: warehouse)
    expect(page).to have_attribute_of('sku', value: 'SNY-65-LED', record: warehouse)
    expect(page).to have_a_success_message
  end

  it 'shows me test errors' do
    create(:warehouse, sku: 'PROD-001')
    warehouse = create(:warehouse)

    visit "/products/#{product.id}/edit"
    fill_in_warehouse_field('name', with: '')
    fill_in_warehouse_field('sku', with: '')
    submit_form

    expect(page).to show_error_for('name', message: "can't be blank")
    expect(page).to show_error_for('sku', message: "can't be blank")

    within('#warehouse-form') do
      fill_in_warehouse_field('sku', with: 'PROD-001')
      submit_form
    end

    expect(page).to show_error_for('sku', message: "has already been taken")
  end

  private

  def have_value_of(value, attr:)
    have_field("warehouse_#{attr}", with: value)
  end

  def fill_in_product_field(name, with:)
    page.find("#warehouse_#{name}").fill_in(with: with)
  end

  def submit_form
    page.find('#submit-button').click
  end

  def have_attribute_of(name, value:, record:)
    have_css("#warehouse--#{record.id}_#{name}", text: value)
  end

  def have_a_success_message
    have_text('Successfully updated product.')
  end

  def show_error_for(name, message:)
    have_css("#warehouse_#{name}_errors .error", text: message)
  end
end
