class User < ApplicationRecord
  has_many :scores
  has_many :games, through: :scores

  validates :username, presence: true
end
