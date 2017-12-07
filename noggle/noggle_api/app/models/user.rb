class User < ApplicationRecord
  has_many :scores
  has_many :games, through: :scores

  validates :username, presence: true, uniqueness: true;
  before_save :generate_color

  def self.online
    self.all.where('online = ?', true)
  end

  def high_scores
    self.scores.order("points DESC").limit(10)
  end

  def generate_color
    self.color = "#{rand(0..255)}, #{rand(0..255)}, #{rand(0..255)}"
  end
end
