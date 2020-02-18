require 'rails_helper'

RSpec.describe 'Shows the Warehouse page', type: :system do
  it 'shows all warehouse information', :js do
    warehouse = create(:warehouse, street: 'Tabora', city: 'Manila', province:
    'NCR')

    visit "/warehouses/#{warehouse.id}"

    expect(page).to have_attribute_for('street', value: 'Tabora', record: warehouse)
    expect(page).to have_attribute_for('city', value: 'Manila', record: warehouse)
    expect(page).to have_attribute_for('province', value: 'NCR', record: warehouse)
  end

  private

  def have_attribute_for(name, value:, record:)
    have_css("#warehouse--#{record.id}_#{name}", text: value)
  end
end
