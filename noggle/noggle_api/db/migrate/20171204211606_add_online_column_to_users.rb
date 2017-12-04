class AddOnlineColumnToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :online, :boolean, default: true
  end
end
