module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
      logger.add_tags 'ActionCable', current_user.id
    end

    private
    def find_verified_user
      user = User.find(request.params[:token].to_i)
      if user
        current_user = user
      else
        reject_unauthorized_connection
      end
    end
  end
end
