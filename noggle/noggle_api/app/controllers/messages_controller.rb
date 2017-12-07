class MessagesController < ApplicationController

  def create
    user = User.find(message_params[:user])
    ActionCable.server.broadcast 'game_channel', {message: {content: message_params[:content], user_name: user.username, user_color: user.color}}
  end

  private
  def message_params
    params.require(:message).permit(:content, :user)
  end
end
