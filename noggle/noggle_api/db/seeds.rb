# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
i = 1
10.times do
  User.create(username: 'bestnogger', online: false)


  game = Game.new
  game.running=false
  game.save


  scores = Score.create(:user_id => i, :game_id => i, :points => 21-i)
  i+=1
end
