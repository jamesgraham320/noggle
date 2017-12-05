class User < ApplicationRecord
  has_many :scores
  has_many :games, through: :scores

  validates :username, presence: true

  def self.online
    self.all.where('online = ?', true)
  end
end
