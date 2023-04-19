class RemoveColumnsFromWorkOrder < ActiveRecord::Migration[7.0]
  def change
    remove_column :work_orders, :created_at, :string
    remove_column :work_orders, :updated_at, :string
  end
end
