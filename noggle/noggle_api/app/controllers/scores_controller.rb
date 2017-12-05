class ScoresController < ApplicationController

  def update
    score = Score.find(params[:id])
    score.points += score_params[:points]
    score.save
    game = Game.find(score_params[:game])
    ActionCable.server.broadcast 'game_channel', {
      scores: {scores: game.scores, users: game.users}
    }
  end

  private

  def score_params
    params.require(:score).permit(:points, :game)
  end
end
