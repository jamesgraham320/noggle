class UsersController < ApplicationController
  def create
    user = User.find_by(user_params) || User.new(user_params)
    if user.save
      render json: user
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
    ActionCable.server.broadcast 'game_channel', {users: users}
  end

  private
  def user_params
    params.require(:user).permit(:username)
  end

end
