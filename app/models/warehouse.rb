class Warehouse < ApplicationRecord
  validates :street, presence: true
  validates :city, presence: true
  validates :province, presence: true
end
