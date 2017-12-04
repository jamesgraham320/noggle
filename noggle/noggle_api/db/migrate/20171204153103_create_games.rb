class CreateGames < ActiveRecord::Migration[5.1]
  def change
    create_table :games do |t|
      t.string :scramble
      t.string :solutions, array: true, default: []

      t.timestamps
    end
  end
end
