class GameInstanceChannel < ApplicationCable::Channel
  def subscribed
    self.current_user.online = true
    self.current_user.save
    stream_from "game_channel"
  end

  def unsubscribed
    self.current_user.online = false
    self.current_user.save
  end
end
