class RemoveColumnsFromLocation < ActiveRecord::Migration[7.0]
  def change
    remove_column :locations, :created_at, :string
    remove_column :locations, :updated_at, :string
  end
end
