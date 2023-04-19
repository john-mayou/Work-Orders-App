class RemoveColumnsFromTechnician < ActiveRecord::Migration[7.0]
  def change
    remove_column :technicians, :created_at, :string
    remove_column :technicians, :updated_at, :string
  end
end
