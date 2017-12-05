class AddStateToGames < ActiveRecord::Migration[5.1]
  def change
    add_column :games, :running, :boolean, default: true
  end
end
