class GamesController < ApplicationController

  def create
    current_game = Game.find_by(running: true) || Game.new
    current_game.users = User.online
    # Add logic for doing the word scramble
    if current_game.save
      ActionCable.server.broadcast 'game_channel', {current_game: {game_data: current_game, scores: current_game.scores, users: current_game.users}}
    else
      ActionCable.server.broadcast 'game_channel', {errors: current_game.errors}
    end
  end

  def update
    game = Game.find(params[:id])
    game.update(running: false)
    ActionCable.server.broadcast 'game_channel', {final_scores: {users: game.users, scores: game.scores}}
  end
end
