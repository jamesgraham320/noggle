class UsersController < ApplicationController
  def create
    user = User.find_by(user_params) || User.new(user_params)
    if user.save
      render json: {user: user, user_high_scores: user.high_scores}
    else
      render json: {errors: user.errors}
    end
  end

  def show
    user  = User.find(params[:id])
    ActionCable.server.broadcast 'game_channel', {user: user}
  end

  def index
    users = User.all
    users_online = users.select {|user| user.online == true}
    object = {users: users_online, high_scores: Score.high_scores}
    if Game.last.running
      object['game'] = Game.last.id
    end
    ActionCable.server.broadcast "game_channel", object
  end

  private
  def user_params
    params.require(:user).permit(:username)
  end

end
