class AddForeignKeyus < ActiveRecord::Migration[7.0]
  def change
    add_foreign_key :work_orders, :locations, column: :location_id
    add_foreign_key :work_orders, :technicians, column: :technician_id
  end
end
